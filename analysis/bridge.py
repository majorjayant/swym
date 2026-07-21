"""Supplementary: brief mis-states the join. A has terminal_session_id, B has session_record_id. Actual bridge is (branch_terminal_id, time-window)."""
import json, collections, datetime as dt, statistics
from pathlib import Path
ROOT = Path(r"C:\swym")
A = json.load(open(ROOT/"library_interactions_final.json", encoding="utf-8"))
B = json.load(open(ROOT/"library_sessions_final.json", encoding="utf-8"))

def parse(s): return dt.datetime.fromisoformat(s.replace("Z","+00:00"))

print("="*78)
print("BRIDGE 1 — (branch_terminal_id, time within [login, end]) between A and B")
print("="*78)
b_by_term = collections.defaultdict(list)
for r in B:
    b_by_term[r["branch_terminal_id"]].append((parse(r["login_timestamp"]), parse(r["session_end_timestamp"]), r))

a_terms = collections.Counter(r.get("branch_terminal_id") for r in A)
b_terms = set(b_by_term)
print(f"A branch_terminal_id: {len(set(a_terms))} distinct (incl None={a_terms[None]})")
print(f"B branch_terminal_id: {len(b_terms)} distinct")
print(f"A terminals NOT in B: {sorted(set(a_terms) - b_terms - {None})}")
print(f"B terminals NOT in A: {sorted(b_terms - set(a_terms))}")

a_with_term = [r for r in A if r.get("branch_terminal_id")]
print(f"\nA rows with branch_terminal_id: {len(a_with_term)} / {len(A)} ({100*len(a_with_term)/len(A):.1f}%)")

inside = before = after = no_b_for_terminal = 0
deltas_before = []; deltas_after = []
matched_sessions = collections.Counter()
matched_pairs = []  # (a_row, b_row)
for r in a_with_term:
    t = parse(r["timestamp"]); term = r["branch_terminal_id"]
    windows = b_by_term.get(term, [])
    if not windows:
        no_b_for_terminal += 1; continue
    hit = None
    for lo, hi, brow in windows:
        if lo <= t <= hi:
            hit = brow; break
    if hit is not None:
        inside += 1
        matched_sessions[hit["session_record_id"]] += 1
        matched_pairs.append((r, hit))
    else:
        best_lo, best_hi, best_row = min(windows, key=lambda w: min(abs((t-w[0]).total_seconds()), abs((t-w[1]).total_seconds())))
        if t < best_lo:
            before += 1; deltas_before.append(int((t-best_lo).total_seconds()))
        else:
            after += 1; deltas_after.append(int((t-best_hi).total_seconds()))

print(f"\nOf {len(a_with_term)} A rows with branch_terminal_id:")
print(f"  inside a B window: {inside}   before nearest B window: {before}   after nearest B window: {after}   no B session at that terminal: {no_b_for_terminal}")

def hist(vals, label):
    if not vals: print(f"  {label}: empty"); return
    print(f"  {label} n={len(vals)} min={min(vals)}s max={max(vals)}s median={statistics.median(vals):.0f}s")
    buckets = [("<-1d",-10**9,-86400),("-1d..-1h",-86400,-3600),("-1h..-10m",-3600,-600),
               ("-10m..-1m",-600,-60),("-1m..0s",-60,0),
               ("0s..1m",0,60),("1m..10m",60,600),("10m..1h",600,3600),
               ("1h..1d",3600,86400),(">1d",86400,10**9)]
    for lbl,lo,hi in buckets:
        c = sum(1 for v in vals if lo<=v<hi)
        if c: print(f"    {lbl:>10s}: {c}")

hist(deltas_before, "deltas before B window (seconds, negative)")
hist(deltas_after, "deltas after B window (seconds, positive)")

print(f"\nB sessions matched by >=1 A event: {len(matched_sessions)} / 95")
if matched_sessions:
    print(f"events matched into a single session: min={min(matched_sessions.values())} median={statistics.median(matched_sessions.values()):.0f} max={max(matched_sessions.values())}")

print("\n" + "="*78)
print("BRIDGE 2 — coverage of ALL A rows (with or without branch_terminal_id) via any B info")
print("="*78)
a_no_term = [r for r in A if not r.get("branch_terminal_id")]
print(f"A rows WITHOUT branch_terminal_id: {len(a_no_term)}")
b_by_branch = collections.defaultdict(list)
for r in B: b_by_branch[r["branch_id"]].append((parse(r["login_timestamp"]), parse(r["session_end_timestamp"]), r))
possible = 0
for r in a_no_term:
    t = parse(r["timestamp"]); br = r["branch_id"]
    for lo, hi, brow in b_by_branch.get(br, []):
        if lo <= t <= hi:
            possible += 1; break
print(f"  Of those, timestamp falls inside SOME B session at the same branch: {possible} ({100*possible/max(len(a_no_term),1):.1f}%)  (ambiguous — could match multiple terminals)")

print("\n" + "="*78)
print("BRIDGE 3 — terminal_session_id (A) vs session_record_id (B). Any prefix/value overlap?")
print("="*78)
a_term_sess = set(r["terminal_session_id"] for r in A)
b_sess = set(r["session_record_id"] for r in B)
print(f"A terminal_session_id distinct: {len(a_term_sess)}   prefix sample: {list(a_term_sess)[:3]}")
print(f"B session_record_id distinct: {len(b_sess)}   prefix sample: {list(b_sess)[:3]}")
print(f"Direct value overlap: {len(a_term_sess & b_sess)}")

# check if a terminal_session_id maps 1:1 to a B session via time-in-window
print("\nDo A terminal_session_id groups fall entirely inside one B session?")
groups = collections.defaultdict(list)
for r in A: groups[r["terminal_session_id"]].append(r)
one_to_one = 0
multi_session = 0
zero_hit = 0
inconclusive = 0
for tsid, rows in groups.items():
    # if any row has branch_terminal_id, try to place all rows via the group's terminal
    terms = {r.get("branch_terminal_id") for r in rows if r.get("branch_terminal_id")}
    if len(terms) != 1:
        inconclusive += 1; continue
    term = terms.pop()
    matches = set()
    for r in rows:
        t = parse(r["timestamp"])
        for lo, hi, brow in b_by_term.get(term, []):
            if lo <= t <= hi:
                matches.add(brow["session_record_id"])
    if len(matches) == 1: one_to_one += 1
    elif len(matches) == 0: zero_hit += 1
    else: multi_session += 1
print(f"  A terminal_session_id groups: {len(groups)}")
print(f"    all-events-in-one-B-session (1:1): {one_to_one}")
print(f"    events-span-multiple-B-sessions:  {multi_session}")
print(f"    no B session matches:             {zero_hit}")
print(f"    inconclusive (no or mixed terminal): {inconclusive}")

print("\n" + "="*78)
print("BRIDGE 4 — items in B.items_checked_out vs A.item_id")
print("="*78)
a_items = collections.Counter(r["item_id"] for r in A)
b_checkouts = collections.Counter()
for r in B:
    for i in (r.get("items_checked_out") or []):
        b_checkouts[i] += 1
print(f"A distinct item_ids: {len(a_items)}  total occurrences: {sum(a_items.values())}")
print(f"B distinct items_checked_out: {len(b_checkouts)}  total occurrences: {sum(b_checkouts.values())}")
print(f"Overlap (item appears in both): {len(set(a_items) & set(b_checkouts))}")
print(f"Items in B checkouts NOT in A: {sorted(set(b_checkouts) - set(a_items))}")

print("\n" + "="*78)
print("BRIDGE 5 — account_holds_active anomaly: 22-value cluster in B")
print("="*78)
vals = [r["account_holds_active"] for r in B]
c = collections.Counter(vals)
print(f"value -> count: {sorted(c.items())}")
big = [r for r in B if r["account_holds_active"] >= 15]
print(f"B rows with account_holds_active >= 15: {len(big)}")
for r in big:
    print(f"  {r['session_record_id']}  {r['library_card_id']}  branch={r['branch_id']}  ah={r['account_holds_active']}  login={r['login_timestamp']}  end={r['session_end_timestamp']}  checkouts={len(r['items_checked_out'])}")

print("\n" + "="*78)
print("BRIDGE 6 — session duration distribution (B)")
print("="*78)
durs = [(parse(r["session_end_timestamp"]) - parse(r["login_timestamp"])).total_seconds() for r in B]
print(f"duration seconds: min={min(durs):.0f} median={statistics.median(durs):.0f} mean={statistics.mean(durs):.0f} max={max(durs):.0f}")
neg = [d for d in durs if d < 0]
print(f"negative durations (end<login): {len(neg)}")

print("\n[end bridge]")
