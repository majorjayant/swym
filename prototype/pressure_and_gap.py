"""Prototype (frozen scope T+67): (2) hold-queue pressure table + trigger rule,
(3) interest-vs-circulation gap table. Files are read as-is; no linking, no imputation.
Validation is inline: correctness (independent recompute), ambiguity, coverage, negative."""
import json, collections, statistics
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
A = json.load(open(ROOT / "library_interactions_final.json", encoding="utf-8"))
B = json.load(open(ROOT / "library_sessions_final.json", encoding="utf-8"))
print(f"IN: A={len(A)}  B={len(B)}")

holds   = [r for r in A if r["event_type"] == "hold_placed"]
cancels = [r for r in A if r["event_type"] == "hold_cancelled"]
other   = [r for r in A if r["event_type"] not in ("hold_placed", "hold_cancelled")]
ok = len(holds) + len(cancels) + len(other) == len(A)
print(f"A split: hold_placed={len(holds)}  hold_cancelled={len(cancels)}  browse/save={len(other)}  reconciles={ok}")
assert ok

# AMBIGUITY: does any item_id map to more than one title or genre?
tmap, gmap = collections.defaultdict(set), collections.defaultdict(set)
for r in A:
    tmap[r["item_id"]].add(r["item_title"]); gmap[r["item_id"]].add(r["item_genre"])
amb = [i for i in tmap if len(tmap[i]) > 1 or len(gmap[i]) > 1]
print(f"AMBIGUITY: item_ids with >1 title/genre: {len(amb)} {sorted(amb)}")

# NEGATIVE: hold_cancelled rows must carry no hold_position (profile says 0 do)
neg = [r["event_id"] for r in cancels if "hold_position" in r]
print(f"NEGATIVE: cancels carrying hold_position (expect 0): {len(neg)}")

# ---------- (2) hold-queue pressure ----------
per = collections.defaultdict(lambda: {"holds": 0, "cancels": 0, "maxpos": 0})
for r in holds:
    d = per[r["item_id"]]; d["holds"] += 1; d["maxpos"] = max(d["maxpos"], r["hold_position"])
for r in cancels:
    per[r["item_id"]]["cancels"] += 0 or 1

# CORRECTNESS: recompute hold counts a second, independent way
check = collections.Counter(r["item_id"] for r in A if r.get("hold_position") is not None)
assert sum(d["holds"] for d in per.values()) == len(holds) == sum(check.values())
for i, c in check.items():
    assert per[i]["holds"] == c, f"count mismatch on {i}"
print(f"CORRECTNESS: per-item hold counts recomputed via hold_position presence — agree (total {len(holds)})")

maxpos_dist = collections.Counter(d["maxpos"] for d in per.values() if d["holds"] > 0)
print(f"DISTRIBUTION per-item max hold_position -> item count: {sorted(maxpos_dist.items())}")
qs = statistics.quantiles([d["maxpos"] for d in per.values() if d["holds"] > 0], n=4)
print(f"quartiles of per-item max hold_position: {qs}")
# CONFIGURABLE: no fulfilment/wait-time data exists to validate a cutoff. Default = P75.
FLAG_MAXPOS = int(qs[2])
print(f"TRIGGER RULE: flag item when max hold_position >= {FLAG_MAXPOS}  [CONFIGURABLE, default=P75, unvalidated]")

flagged = sorted((i for i in per if per[i]["holds"] and per[i]["maxpos"] >= FLAG_MAXPOS),
                 key=lambda i: (-per[i]["maxpos"], -per[i]["holds"]))
print(f"\nPRESSURE TABLE ({len(flagged)} flagged of {len([i for i in per if per[i]['holds']])} items with holds):")
print(f"{'item_id':<15s} {'genre':28s} {'holds':>5s} {'maxpos':>6s} {'cancels':>7s}  title")
for i in flagged:
    print(f"{i:<15s} {next(iter(gmap[i])):28s} {per[i]['holds']:>5d} {per[i]['maxpos']:>6d} {per[i]['cancels']:>7d}  {next(iter(tmap[i]))}")
genre_roll = collections.Counter()
for r in holds: genre_roll[r["item_genre"]] += 1
print(f"\nGENRE ROLLUP (holds): {genre_roll.most_common()}")

# COVERAGE for (2): which A rows feed the pressure table, remainder handled where?
used2 = len(holds) + len(cancels)
print(f"COVERAGE(2): {used2}/{len(A)} A rows used ({100*used2/len(A):.1f}%); remainder {len(other)} browse/save rows are used by (3) below, not dropped")

# ---------- (3) interest-vs-circulation gap ----------
CAVEAT = "INDICATIVE ONLY - evidence base: B checkout lists"
b_items = collections.Counter()
sessions_with = 0
for r in B:
    items = r.get("items_checked_out") or []
    if items: sessions_with += 1
    for i in items: b_items[i] += 1
print(f"\nB checkout evidence: {sum(b_items.values())} occurrences of {len(b_items)} distinct items in {sessions_with}/{len(B)} sessions")
print(f"CAVEAT applied to every row: '{CAVEAT} ({sum(b_items.values())} occurrences, {sessions_with}/{len(B)} sessions)'")

eng = collections.defaultdict(collections.Counter)
for r in A: eng[r["item_id"]][r["event_type"]] += 1
gap = sorted((i for i in eng if i not in b_items),
             key=lambda i: -sum(eng[i].values()))
# NEGATIVE for (3): no checked-out item may appear in the gap list
assert not (set(gap) & set(b_items)), "checked-out item leaked into gap list"
print(f"NEGATIVE: checked-out items appearing in gap list (expect 0): {len(set(gap) & set(b_items))}")
# CORRECTNESS for (3): 18 + 42 must equal 60 distinct items
assert len(gap) + len(b_items) == len(eng), "gap + checked-out != total items"
print(f"CORRECTNESS: gap({len(gap)}) + checked_out({len(b_items)}) == items_with_activity({len(eng)})")

print(f"\nGAP TABLE top 15 (of {len(gap)}), each row carries the caveat:")
for i in gap[:15]:
    e = eng[i]
    print(f"  {i:<15s} {next(iter(gmap[i])):28s} browse={e['browse_event']:>3d} save={e['reading_list_save']:>3d} hold={e['hold_placed']:>3d} cancel={e['hold_cancelled']:>3d}  {next(iter(tmap[i]))[:34]}  [{CAVEAT}]")
print(f"COVERAGE(3): all {len(A)} A rows aggregated; {len(B)-sessions_with} B sessions carry no item evidence and contribute nothing (stated, not dropped)")
print(f"\nOUT: pressure_rows={len(flagged)}  gap_rows={len(gap)}  ambiguous={len(amb)}  negative_failures={len(neg)}")
print("[end prototype]")
