"""GAP 1: stress-test terminal_session_id as a session grouping.
GAP 2: sweep pre-login window W over the 120 A events; report ambiguity."""
import json, collections, statistics, datetime as dt
from pathlib import Path
ROOT = Path(r"C:\swym")
A = json.load(open(ROOT/"library_interactions_final.json", encoding="utf-8"))
B = json.load(open(ROOT/"library_sessions_final.json", encoding="utf-8"))
def parse(s): return dt.datetime.fromisoformat(s.replace("Z","+00:00"))

print("="*78)
print("GAP 1 - terminal_session_id stress test on A")
print("="*78)
groups = collections.defaultdict(list)
for r in A: groups[r["terminal_session_id"]].append(r)
print(f"terminal_session_id groups: {len(groups)}  (over {len(A)} events)")

# per-group metrics
event_counts = []
spans_sec = []
branch_counts = []
terminal_counts = []  # only counting rows that carry it
day_counts = []
groups_multi_branch = 0
groups_multi_terminal = 0
groups_multi_day = 0
groups_any_terminal = 0
groups_all_terminal = 0
for tsid, rows in groups.items():
    ts = [parse(r["timestamp"]) for r in rows]
    branches = {r["branch_id"] for r in rows}
    terms = {r.get("branch_terminal_id") for r in rows if r.get("branch_terminal_id")}
    days = {t.date() for t in ts}
    event_counts.append(len(rows))
    spans_sec.append((max(ts)-min(ts)).total_seconds())
    branch_counts.append(len(branches))
    terminal_counts.append(len(terms))
    day_counts.append(len(days))
    if len(branches) > 1: groups_multi_branch += 1
    if len(terms) > 1: groups_multi_terminal += 1
    if len(days) > 1: groups_multi_day += 1
    if terms: groups_any_terminal += 1
    if terms and all(r.get("branch_terminal_id") for r in rows): groups_all_terminal += 1

def dist(vals, label):
    c = collections.Counter(vals)
    print(f"\n  {label} distribution (value -> group count):")
    for k in sorted(c): print(f"    {k}: {c[k]}")
    print(f"    min/median/max = {min(vals)}/{statistics.median(vals):.1f}/{max(vals)}")

dist(event_counts, "events per group")
dist(branch_counts, "distinct branch_id per group")
dist(terminal_counts, "distinct branch_terminal_id per group (0 = field never present in group)")
dist(day_counts, "distinct calendar days per group")

# span dist as buckets
print(f"\n  wall-clock span (seconds) — full distribution:")
sspans = sorted(spans_sec)
buckets = [("=0",0,1),("1s..60s",1,60),("1m..10m",60,600),("10m..1h",600,3600),
           ("1h..6h",3600,21600),("6h..1d",21600,86400),("1d..7d",86400,604800),
           (">7d",604800,10**12)]
for lbl,lo,hi in buckets:
    c = sum(1 for v in sspans if lo<=v<hi)
    if c: print(f"    {lbl:>10s}: {c}")
print(f"    min={min(sspans):.0f}s  median={statistics.median(sspans):.0f}s  mean={statistics.mean(sspans):.0f}s  max={max(sspans):.0f}s")

print(f"\n  groups spanning >1 branch:   {groups_multi_branch}/{len(groups)}")
print(f"  groups spanning >1 terminal: {groups_multi_terminal}/{len(groups)}")
print(f"  groups spanning >1 day:      {groups_multi_day}/{len(groups)}")
print(f"  groups carrying branch_terminal_id on ANY row: {groups_any_terminal}/{len(groups)}")
print(f"  groups carrying branch_terminal_id on ALL rows: {groups_all_terminal}/{len(groups)}")

print("\n  behavioural coherence — one-line verdict computed from above:")
coherent_single_branch = groups_multi_branch == 0
coherent_single_terminal_when_known = groups_multi_terminal == 0
coherent_single_day = groups_multi_day == 0
print(f"    every group is single-branch:                  {coherent_single_branch}")
print(f"    every group is single-terminal (when known):   {coherent_single_terminal_when_known}")
print(f"    every group is single-day:                     {coherent_single_day}")
print(f"    span median = {statistics.median(sspans):.0f}s ({statistics.median(sspans)/3600:.2f}h) — realistic patron in-branch session? user decides")

print("\n" + "="*78)
print("GAP 2 - pre-login window sweep for A events with branch_terminal_id")
print("="*78)
a_with_term = [r for r in A if r.get("branch_terminal_id")]
n_a = len(a_with_term)
print(f"A events with branch_terminal_id: {n_a}")

# index B by terminal
b_by_term = collections.defaultdict(list)
for r in B: b_by_term[r["branch_terminal_id"]].append(r)

def sweep(window_sec, label):
    exactly_one = zero = two_plus = 0
    patrons_reached = set()
    tsids_reached = set()
    tsid_to_patrons = collections.defaultdict(set)
    two_plus_details = []
    for r in a_with_term:
        t = parse(r["timestamp"]); term = r["branch_terminal_id"]
        candidates = []
        for brow in b_by_term.get(term, []):
            login = parse(brow["login_timestamp"])
            delta = (login - t).total_seconds()  # positive means login AFTER event
            if 0 <= delta <= window_sec:
                candidates.append(brow)
        if len(candidates) == 0: zero += 1
        elif len(candidates) == 1:
            exactly_one += 1
            patrons_reached.add(candidates[0]["library_card_id"])
            tsids_reached.add(r["terminal_session_id"])
            tsid_to_patrons[r["terminal_session_id"]].add(candidates[0]["library_card_id"])
        else:
            two_plus += 1
            for c in candidates:
                patrons_reached.add(c["library_card_id"])
                tsid_to_patrons[r["terminal_session_id"]].add(c["library_card_id"])
            tsids_reached.add(r["terminal_session_id"])
            two_plus_details.append((r["event_id"], term, t.isoformat(), [c["library_card_id"] for c in candidates]))
    conflict_groups = sum(1 for tsid, ps in tsid_to_patrons.items() if len(ps) > 1)
    print(f"\n  W = {label}")
    print(f"    exactly 1 candidate:  {exactly_one}")
    print(f"    0 candidates:         {zero}")
    print(f"    >=2 candidates:       {two_plus}     <-- ambiguity")
    print(f"    distinct patrons reached:                    {len(patrons_reached)}")
    print(f"    distinct terminal_session_id groups reached: {len(tsids_reached)}")
    print(f"    terminal_session_id groups resolving to >1 patron (conflict): {conflict_groups}")
    return two_plus_details

for wsec, lbl in [(5*60,"5m"),(10*60,"10m"),(15*60,"15m"),(30*60,"30m"),(45*60,"45m"),(60*60,"60m"),(120*60,"120m")]:
    details = sweep(wsec, lbl)

# group-level resolution for the 29 terminal-carrying groups
print("\n" + "="*78)
print("GAP 2b - group-level resolution across sweep")
print("="*78)
groups_with_term = collections.defaultdict(list)
for r in a_with_term: groups_with_term[r["terminal_session_id"]].append(r)
print(f"terminal_session_id groups that carry branch_terminal_id on at least one row: {len(groups_with_term)}")
events_in_these_groups = sum(len(rs) for rs in groups_with_term.values())
print(f"A events living in those groups: {events_in_these_groups}")
# also count events across ALL rows of these groups (some rows may lack branch_terminal_id but share tsid)
all_events_all_groups = sum(len(groups[tsid]) for tsid in groups_with_term)
print(f"total events in those same groups (incl rows w/o branch_terminal_id): {all_events_all_groups}")

for wsec, lbl in [(15*60,"15m"),(30*60,"30m"),(60*60,"60m")]:
    one_patron = multi_patron = no_patron = 0
    for tsid, rows in groups_with_term.items():
        patrons = set()
        matched_events = 0
        for r in rows:
            term = r["branch_terminal_id"]; t = parse(r["timestamp"])
            for brow in b_by_term.get(term, []):
                delta = (parse(brow["login_timestamp"]) - t).total_seconds()
                if 0 <= delta <= wsec:
                    patrons.add(brow["library_card_id"]); matched_events += 1; break
        if not patrons: no_patron += 1
        elif len(patrons) == 1: one_patron += 1
        else: multi_patron += 1
    print(f"  W={lbl}: 1-patron groups={one_patron}  no-patron groups={no_patron}  multi-patron(conflict)={multi_patron}")

print("\n" + "="*78)
print("GAP 2c - hard coverage ceiling")
print("="*78)
no_term_rows = [r for r in A if not r.get("branch_terminal_id")]
no_term_groups = {r["terminal_session_id"] for r in no_term_rows}
print(f"A rows WITHOUT branch_terminal_id: {len(no_term_rows)}  (belong to {len(no_term_groups)} distinct terminal_session_id values)")
print(f"These rows CANNOT be joined to B by (terminal, time) — the field required for the join is absent.")
print(f"Hard ceiling on any (terminal-based) A->B coverage: {len(a_with_term)}/{len(A)} = {100*len(a_with_term)/len(A):.1f}% of A rows.")
print(f"                                                    {len(groups_with_term)}/{len(groups)} = {100*len(groups_with_term)/len(groups):.1f}% of terminal_session_id groups.")

print("\n[end]")
