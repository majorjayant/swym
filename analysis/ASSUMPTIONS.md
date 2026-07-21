# Assumptions register

Running list. Every rule in `prototype/pressure_and_gap.py` traces here.

| # | Assumption | Status | How it would be verified |
|---|---|---|---|
| 1 | `hold_position` = live queue depth at hold time | **UNVERIFIED** | Per-item positions should increment monotonically over time as holds accumulate; or system documentation. Not computed — 65-day window has no per-item position sequences dense enough tested. |
| 2 | B `items_checked_out` is a complete record of that session's checkouts | **UNVERIFIED** | Reconcile against the circulation ledger (not provided). |
| 3 | B's 12 checkout-bearing sessions represent overall circulation | **UNVERIFIED — likely FALSE** | 22 occurrences vs a full ledger; desk checkouts absent from both files. Gap table therefore carries an INDICATIVE ONLY caveat on every row. |
| 4 | Trigger threshold max `hold_position` >= 13 | **CONFIGURABLE, unvalidated** | Default = P75 of per-item max hold_position (quartiles 7.0/10.0/13.0, printed in prototype_output.txt). No fulfilment/wait-time data exists to derive a cutoff from outcomes; parameter exposed with comment. |
| 5 | `item_id` maps 1:1 to title and genre | **VERIFIED in-data** | Ambiguity check prints 0 items with >1 title/genre (prototype_output.txt). |
| 6 | Timestamps are UTC and sane | **VERIFIED in-data** | profile_output.txt E: 470/470 and 95/95 parse, single tz, no negative durations. |
| 7 | `terminal_session_id` is a session | **VERIFIED FALSE** | stress_and_bridge_output.txt: 86/150 groups span >1 branch, 96/150 span >1 day, median span ~15.9 days. Excluded from scope for this reason. |
| 8 | A-to-B row linkage is usable for the chosen scope | **NOT USED** | Pre-login bridge exists (zero-ambiguity at W=45m, 120/470 rows ceiling) but frozen scope forbids linking; documented in option-8 recommendations only. |
