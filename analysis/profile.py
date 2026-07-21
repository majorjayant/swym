"""Phase 1 dataset profiler — facts only. Every number reported to the user must appear in profile_output.txt."""
import json, sys, os, statistics, collections, datetime as dt
from pathlib import Path

ROOT = Path(r"C:\swym")
FA = ROOT / "library_interactions_final.json"
FB = ROOT / "library_sessions_final.json"

def load(p):
    with open(p, "r", encoding="utf-8") as f:
        return json.load(f)

def hdr(t):
    print("\n" + "="*78 + f"\n{t}\n" + "="*78)

def pytype(v):
    if v is None: return "None"
    t = type(v).__name__
    if t == "list":
        inner = sorted({pytype(x) for x in v}) or ["<empty>"]
        return f"list[{'|'.join(inner)}]"
    return t

def field_inventory(recs, name):
    hdr(f"B. Field inventory — {name}  (records={len(recs)})")
    fields = collections.OrderedDict()
    for r in recs:
        for k, v in r.items():
            fields.setdefault(k, [])
            fields[k].append(v)
    total = len(recs)
    print(f"{'field':32s} {'types':22s} {'fill':>6s} {'fill%':>6s} {'distinct':>8s}  examples / range")
    print("-"*140)
    partial = []
    for k, vals in fields.items():
        types = sorted({pytype(v) for v in vals if v is not None or True})
        fill = sum(1 for v in vals if v not in (None, "", []))
        fillp = 100*fill/total
        # distinct handling for hashables
        try:
            distinct = len({(v if not isinstance(v, list) else tuple(v)) for v in vals})
        except TypeError:
            distinct = "?"
        # examples
        ex = []
        seen = set()
        for v in vals:
            key = str(v)[:40]
            if key in seen: continue
            seen.add(key); ex.append(v)
            if len(ex) == 3: break
        ex_str = " | ".join(repr(e)[:32] for e in ex)
        # numeric / date range
        rng = ""
        nums = [v for v in vals if isinstance(v, (int, float)) and not isinstance(v, bool)]
        if nums:
            rng = f" min={min(nums)} max={max(nums)} mean={statistics.mean(nums):.2f}"
        elif all(isinstance(v, str) for v in vals if v is not None):
            date_vals = []
            for v in vals:
                if isinstance(v, str) and len(v) >= 19 and v[4] == "-" and "T" in v:
                    try: date_vals.append(dt.datetime.fromisoformat(v.replace("Z","+00:00")))
                    except Exception: pass
            if date_vals and len(date_vals) == fill:
                rng = f" date_min={min(date_vals).isoformat()} date_max={max(date_vals).isoformat()}"
        print(f"{k:32s} {','.join(types)[:22]:22s} {fill:>6d} {fillp:>5.1f}% {str(distinct):>8s}  {ex_str}{rng}")
        if fill < total:
            partial.append((k, fill, total-fill))
    if partial:
        print("\n  Partial fields (present in some records, absent in others):")
        for k, f, miss in partial:
            print(f"    {k}: present={f}, absent={miss}")
    return fields, partial

def partial_field_divergence(recs, partial_keys, name):
    hdr(f"B.1 Partial-field divergence — {name}")
    for k, _, _ in partial_keys:
        has = [r for r in recs if k in r and r.get(k) not in (None, "", [])]
        hasnot = [r for r in recs if not (k in r and r.get(k) not in (None, "", []))]
        print(f"\n-- field '{k}': has={len(has)}, has-not={len(hasnot)}")
        other_keys = set()
        for r in recs: other_keys.update(r.keys())
        other_keys.discard(k)
        for ok in sorted(other_keys):
            def dist(rows):
                vals = [r.get(ok) for r in rows]
                nn = sum(1 for v in vals if v not in (None, "", []))
                try: d = len({(v if not isinstance(v,list) else tuple(v)) for v in vals})
                except TypeError: d = "?"
                return nn, d
            fh, dh = dist(has); fn, dn = dist(hasnot)
            hp = 100*fh/max(len(has),1); np_ = 100*fn/max(len(hasnot),1)
            if abs(hp-np_) > 2 or dh != dn:
                print(f"   {ok:30s} has: fill={fh}/{len(has)} ({hp:.1f}%) distinct={dh}   hasnot: fill={fn}/{len(hasnot)} ({np_:.1f}%) distinct={dn}")

def id_analysis(recs, name):
    hdr(f"D. Key analysis — {name}")
    fields = collections.defaultdict(list)
    for r in recs:
        for k, v in r.items():
            if isinstance(v, str) and ("_id" in k or k.endswith("id")):
                fields[k].append(v)
    for k, vals in fields.items():
        u = len(set(vals))
        print(f"  {k}: n={len(vals)} unique={u} PK-candidate={u==len(vals)}")
    return fields

def cross_file(a, b, aname, bname):
    hdr(f"C/D. Cross-file — {aname} vs {bname}")
    def scalar_field_values(recs):
        out = collections.defaultdict(list)
        for r in recs:
            for k, v in r.items():
                if isinstance(v, (str, int, float)) and not isinstance(v, bool):
                    out[k].append(v)
        return out
    def nested_string_values(recs):
        out = set()
        def walk(x):
            if isinstance(x, str): out.add(x)
            elif isinstance(x, list):
                for i in x: walk(i)
            elif isinstance(x, dict):
                for v in x.values(): walk(v)
        for r in recs: walk(r)
        return out
    afields = scalar_field_values(a); bfields = scalar_field_values(b)
    shared = sorted(set(afields) & set(bfields))
    print(f"  Shared field names: {shared}")
    for k in shared:
        av, bv = set(afields[k]), set(bfields[k])
        ov = av & bv
        print(f"    {k}: A_n={len(afields[k])} A_distinct={len(av)}  B_n={len(bfields[k])} B_distinct={len(bv)}  overlap_values={len(ov)}  ov%_of_A={100*len(ov)/max(len(av),1):.1f}%  ov%_of_B={100*len(ov)/max(len(bv),1):.1f}%")
    a_strings_all = nested_string_values(a); b_strings_all = nested_string_values(b)
    print(f"\n  Nested-string bag: |A_strings|={len(a_strings_all)}  |B_strings|={len(b_strings_all)}  overlap={len(a_strings_all & b_strings_all)}")
    a_only_fields = set(afields) - set(bfields); b_only_fields = set(bfields) - set(afields)
    print(f"\n  Referential candidates (A-only field values found in B's nested strings):")
    for k in sorted(a_only_fields):
        vals = set(afields[k])
        if not vals: continue
        hits = vals & b_strings_all
        if hits:
            prefixes = collections.Counter(v.split("_")[0]+"_" for v in vals if "_" in v).most_common(3)
            print(f"    {k}: A_distinct={len(vals)} of which {len(hits)} appear anywhere in B ({100*len(hits)/len(vals):.1f}%)  prefixes={prefixes}")
    print(f"\n  Referential candidates (B-only field values found in A's nested strings):")
    for k in sorted(b_only_fields):
        vals = set(bfields[k])
        if not vals: continue
        hits = vals & a_strings_all
        if hits:
            prefixes = collections.Counter(v.split("_")[0]+"_" for v in vals if "_" in v).most_common(3)
            print(f"    {k}: B_distinct={len(vals)} of which {len(hits)} appear anywhere in A ({100*len(hits)/len(vals):.1f}%)  prefixes={prefixes}")

def integrity_and_anomalies(recs, name):
    hdr(f"E. Integrity & anomalies — {name}")
    full = [json.dumps(r, sort_keys=True) for r in recs]
    dupe_full = len(full) - len(set(full))
    print(f"  duplicate whole records: {dupe_full}")
    for k in (recs[0].keys() if recs else []):
        vals = [r.get(k) for r in recs]
        empties = sum(1 for v in vals if v in (None, "", []))
        placeholders = sum(1 for v in vals if isinstance(v,str) and v.lower() in ("null","none","na","n/a","unknown","-"))
        if empties or placeholders:
            print(f"  {k}: empty/None/[]={empties}  placeholder-strings={placeholders}")
    ts_fields = [k for k in (recs[0].keys() if recs else []) if "time" in k.lower() or "stamp" in k.lower() or "date" in k.lower()]
    for k in ts_fields:
        vals = []
        for r in recs:
            v = r.get(k)
            if isinstance(v,str):
                try: vals.append(dt.datetime.fromisoformat(v.replace("Z","+00:00")))
                except Exception: pass
        if vals:
            tzs = {v.tzinfo for v in vals}
            print(f"  {k}: parsed={len(vals)}/{len(recs)}  tz_variants={tzs}  min={min(vals).isoformat()}  max={max(vals).isoformat()}")

def session_stress(recs, name):
    hdr(f"E.1 Session-grouping stress — {name}")
    grp_key = None
    for cand in ("session_id","device_session_id","session_record_id"):
        if recs and cand in recs[0]:
            grp_key = cand; break
    if not grp_key:
        print(f"  no session-like field on top level of {name}; skipping")
        return
    groups = collections.defaultdict(list)
    for r in recs: groups[r[grp_key]].append(r)
    sizes = [len(v) for v in groups.values()]
    print(f"  grouping field: {grp_key}  groups={len(groups)}  events_per_group min/median/max = {min(sizes)}/{statistics.median(sizes):.0f}/{max(sizes)}")
    span_over_day = spans_over_branch = spans_over_terminal = 0
    span_secs = []
    for g, rows in groups.items():
        ts_field = None
        for k in ("timestamp","event_timestamp","created_at","login_timestamp"):
            if k in rows[0]: ts_field = k; break
        if not ts_field: continue
        ts = []
        for r in rows:
            v = r.get(ts_field)
            if isinstance(v,str):
                try: ts.append(dt.datetime.fromisoformat(v.replace("Z","+00:00")))
                except Exception: pass
        if len(ts) < 2: continue
        span = (max(ts)-min(ts)).total_seconds()
        span_secs.append(span)
        if span > 86400: span_over_day += 1
        branches = {r.get("branch_id") for r in rows if r.get("branch_id") is not None}
        terminals = {r.get("branch_terminal_id") or r.get("terminal_id") for r in rows}
        if len(branches) > 1: spans_over_branch += 1
        if len(terminals) > 1: spans_over_terminal += 1
    if span_secs:
        print(f"  group wall-clock span: min={min(span_secs):.0f}s  median={statistics.median(span_secs):.0f}s  max={max(span_secs):.0f}s  mean={statistics.mean(span_secs):.0f}s")
    print(f"  groups spanning >1 day: {span_over_day}  spanning >1 branch: {spans_over_branch}  spanning >1 terminal: {spans_over_terminal}")

def distributions(recs, name):
    hdr(f"F. Distributions — {name}")
    for k in ("event_type","action","action_type","interaction_type","branch_id","branch_terminal_id","terminal_id"):
        if recs and k in recs[0]:
            c = collections.Counter(r.get(k) for r in recs).most_common(20)
            print(f"  {k}: {c}")
    ts_field = None
    for k in ("timestamp","event_timestamp","login_timestamp"):
        if recs and k in recs[0]: ts_field = k; break
    if ts_field:
        hours = collections.Counter()
        days = collections.Counter()
        for r in recs:
            v = r.get(ts_field)
            if isinstance(v,str):
                try:
                    t = dt.datetime.fromisoformat(v.replace("Z","+00:00"))
                    hours[t.hour] += 1
                    days[t.date().isoformat()] += 1
                except Exception: pass
        print(f"  {ts_field} hour-of-day counts: {dict(sorted(hours.items()))}")
        print(f"  {ts_field} day range: {min(days)}..{max(days)}  distinct_days={len(days)}  events_per_day min/median/max = {min(days.values())}/{statistics.median(days.values()):.0f}/{max(days.values())}")

def temporal_bridging(a, b):
    hdr(f"G. Temporal relationship — signed deltas from A events to nearest B session sharing same key")
    shared_keys = ("library_card_id","device_session_id")
    ts_a = None
    for k in ("timestamp","event_timestamp","created_at"):
        if a and k in a[0]: ts_a = k; break
    if not ts_a:
        print("  no A timestamp field; skipping"); return
    for key in shared_keys:
        if not (a and key in a[0]) or not (b and key in b[0]):
            print(f"  key {key}: not present in both; skipping"); continue
        b_by_key = collections.defaultdict(list)
        for r in b:
            v = r.get(key)
            if v is None: continue
            try:
                lo = dt.datetime.fromisoformat(r.get("login_timestamp").replace("Z","+00:00"))
                hi = dt.datetime.fromisoformat(r.get("session_end_timestamp").replace("Z","+00:00"))
                b_by_key[v].append((lo, hi))
            except Exception: pass
        deltas = []
        matched_in_window = 0
        unmatched = 0
        for r in a:
            v = r.get(key)
            if v is None: continue
            try: t = dt.datetime.fromisoformat(r.get(ts_a).replace("Z","+00:00"))
            except Exception: continue
            windows = b_by_key.get(v, [])
            if not windows:
                unmatched += 1; continue
            best = min(windows, key=lambda w: min(abs((t-w[0]).total_seconds()), abs((t-w[1]).total_seconds())))
            lo, hi = best
            if lo <= t <= hi: matched_in_window += 1; deltas.append(0)
            elif t < lo: deltas.append(int((t-lo).total_seconds()))  # negative
            else: deltas.append(int((t-hi).total_seconds()))  # positive
        print(f"\n  key={key}: A_events_with_key={sum(1 for r in a if r.get(key) is not None)}  unmatched(no B row with same key)={unmatched}  inside_B_window={matched_in_window}")
        if deltas:
            neg = sorted(d for d in deltas if d < 0)
            pos = sorted(d for d in deltas if d > 0)
            zero = sum(1 for d in deltas if d == 0)
            print(f"  deltas count={len(deltas)}  inside_window(delta=0)={zero}  before_B={len(neg)}  after_B={len(pos)}")
            def hist(vals, label, bins_min):
                if not vals: return
                buckets = [("<-1d", -10**9, -86400), ("-1d..-1h", -86400, -3600), ("-1h..-10m", -3600, -600),
                           ("-10m..-1m", -600, -60), ("-1m..0", -60, 0),
                           ("0..1m", 0, 60), ("1m..10m", 60, 600), ("10m..1h", 600, 3600),
                           ("1h..1d", 3600, 86400), (">1d", 86400, 10**9)]
                print(f"  histogram {label} (seconds):")
                for lbl, lo, hi in buckets:
                    c = sum(1 for v in vals if lo <= v < hi)
                    if c: print(f"    {lbl:>10s}: {c}")
            hist(neg + [0]*zero + pos, "signed", 0)

def coverage(a, b):
    hdr("F.1 Coverage — fraction of A associable with B under LOOSEST rule")
    keys = [k for k in ("library_card_id","device_session_id","session_id") if a and k in a[0] and b and k in b[0]]
    if not keys:
        print("  no shared key; loosest rule undefined"); return
    b_vals = {k: set(r.get(k) for r in b if r.get(k) is not None) for k in keys}
    linkable = 0
    total_a = len(a)
    for r in a:
        for k in keys:
            v = r.get(k)
            if v is not None and v in b_vals[k]:
                linkable += 1; break
    print(f"  A total={total_a}  associable_via_any_of({keys})={linkable} ({100*linkable/total_a:.1f}%)  never_associable={total_a-linkable}")

def brief_checks(a, b):
    hdr("Brief-vs-data cross-check")
    print(f"  brief says ~450–500 interaction events in file A; actual len(A) = {len(a)}")
    print(f"  brief says events include: holds, checkouts, reading list saves, browse, session metadata")
    print(f"  brief says some events tied to library_card_id, others carry only device_session_id")
    print(f"  brief says B is 'identified session log'")
    lc_a = sum(1 for r in a if r.get("library_card_id") not in (None,""))
    ds_a = sum(1 for r in a if r.get("device_session_id") not in (None,""))
    print(f"  A rows with library_card_id: {lc_a}  with device_session_id: {ds_a}  both: {sum(1 for r in a if r.get('library_card_id') not in (None,'') and r.get('device_session_id') not in (None,''))}  neither: {sum(1 for r in a if r.get('library_card_id') in (None,'') and r.get('device_session_id') in (None,''))}")
    lc_b = sum(1 for r in b if r.get("library_card_id") not in (None,""))
    print(f"  B rows with library_card_id: {lc_b}/{len(b)}")

def main():
    a = load(FA); b = load(FB)
    hdr("A. Structure")
    print(f"  file A: {FA.name}  top_type={type(a).__name__}  n={len(a)}  first_keys={sorted(a[0].keys()) if a else []}")
    print(f"  file B: {FB.name}  top_type={type(b).__name__}  n={len(b)}  first_keys={sorted(b[0].keys()) if b else []}")
    a_keysets = collections.Counter(tuple(sorted(r.keys())) for r in a)
    b_keysets = collections.Counter(tuple(sorted(r.keys())) for r in b)
    print(f"  file A distinct keysets: {len(a_keysets)}  most-common counts: {[(len(k), n) for k,n in a_keysets.most_common(5)]}")
    print(f"  file B distinct keysets: {len(b_keysets)}  most-common counts: {[(len(k), n) for k,n in b_keysets.most_common(5)]}")
    print(f"  A keyset breakdown:")
    for ks, n in a_keysets.most_common():
        print(f"    n={n}: {list(ks)}")
    print(f"  B keyset breakdown:")
    for ks, n in b_keysets.most_common():
        print(f"    n={n}: {list(ks)}")
    fa, pa = field_inventory(a, FA.name)
    partial_field_divergence(a, pa, FA.name)
    fb, pb = field_inventory(b, FB.name)
    if pb: partial_field_divergence(b, pb, FB.name)
    id_analysis(a, FA.name); id_analysis(b, FB.name)
    cross_file(a, b, FA.name, FB.name)
    integrity_and_anomalies(a, FA.name); integrity_and_anomalies(b, FB.name)
    session_stress(a, FA.name); session_stress(b, FB.name)
    distributions(a, FA.name); distributions(b, FB.name)
    temporal_bridging(a, b)
    coverage(a, b)
    brief_checks(a, b)
    print("\n[end]")

if __name__ == "__main__":
    main()
