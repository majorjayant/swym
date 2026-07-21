# STOPPED HERE — freeze record

Frozen at hard stop. Final end-to-end pipeline run: all five scripts exit 0
(`analysis/profile.py`, `analysis/bridge.py`, `analysis/stress_and_bridge.py`,
`analysis/rice.py`, `prototype/pressure_and_gap.py`). Outputs saved and committed.

## Finished and works

- **Hold-queue pressure table** — 15 items flagged of 59 with holds; trigger
  `max hold_position >= 13` (P75 of measured distribution, quartiles 7.0/10.0/13.0,
  CONFIGURABLE). Validated: independent recompute of per-item counts (225 both ways),
  ambiguity 0, negative check 0, counts reconcile 225+20+225=470.
- **Interest-vs-circulation gap table** — 42 items with A activity and zero B
  checkouts; caveat string on every row; correctness check 42+18=60 exact.
- **Data-contract recommendations** — 6 items, prose only (deliberately not built),
  each traced to a computed fact; rendered on the prototype page.
- **Deploy pipeline** — push-to-live proven twice; all four URLs verified 200 with
  final content.

## Half-finished

- Nothing half-finished in the shipped scope. The genre rollup and both tables on
  the site page are static renders of `prototype_output.txt` — correct at freeze,
  but they do not regenerate from the script (see next steps, item 6).

## Broken (ships broken, documented)

- **Cosmetic non-determinism in `analysis/bridge.py` (BRIDGE 3 block):** the three
  "prefix sample" IDs are taken via `list(set)[:3]`, whose order changes per Python
  process (hash randomization). Every computed number is stable across runs; only the
  example IDs shown differ. Left unfixed under the freeze rule.

## What I would do next — ordered, specific

1. **Test `hold_position` semantics** (the assumption that can invalidate table 1):
   for each of the 59 items with holds, sort its 225 `hold_placed` events by
   `timestamp` and count violations of "position never decreases except after a
   `hold_cancelled` on that item." Print violation count per item.
2. **Explain the unlinked majority of B:** the pre-login bridge reaches 28 patrons =
   28 of 95 sessions (95 − 28 = 67 never linked). Check how many of those 67 sit at
   the 3 terminals with zero A activity (BR001_T3, BR002_T2, BR003_T2) versus
   terminals where A rows simply lack `branch_terminal_id`.
3. **Identify the one no-patron group at W=15m** (it resolves at W=30m; print its
   `terminal_session_id`, its event timestamps, and the login delta that exceeds 15m).
4. **Sensitivity of the trigger:** recompute the flag list at thresholds 12 and 14
   and print the symmetric set difference against threshold 13, so the cost of the
   CONFIGURABLE choice is visible.
5. **Per-branch split** of the pressure table (225 hold rows all carry `branch_id`).
6. **Auto-render:** make `pressure_and_gap.py` emit the HTML table fragments the site
   page currently hard-codes, so the page regenerates from data.
7. **Option 5 trigger rule** (`account_holds_active >= 15`, 8 rows) — 5-minute build,
   deferred by choice, in scope order after the above.

## What I would need that I do not have

- **Circulation ledger** (desk + self-check checkouts) — without it the gap table
  stays a lead list; 22 terminal-session checkout occurrences cannot represent
  circulation.
- **Hold fulfilment / wait-time events** — the only way to validate any pressure
  threshold against outcomes.
- **Copy counts per item** — queue depth without holdings count is not pressure.
- **A data dictionary or emitter source** — to confirm `hold_position` and
  `terminal_session_id` semantics instead of inferring them.
- **`library_card_id` / `device_session_id` on interaction events** — the fields the
  brief claims exist; would replace the 45-minute inference bridge with a join.
- **A longer window with repeat visits** — 95 patrons × exactly 1 session each
  cannot support any per-patron analysis.

## Honest limitations — where this fails in the real world

- **`hold_position` proxy:** real ILS queue positions are per-patron at placement
  time and get recycled as holds are fulfilled; our per-item max conflates queue
  depth with elapsed time and will overstate pressure on old, slow-moving titles.
- **No holdings data:** a 15-deep queue on an item with 20 copies is healthy; the
  standard metric is holds-to-copies ratio, which we cannot compute.
- **Gap table false positives:** most real checkouts happen at desks and self-check
  kiosks, not terminal sessions. Against a real system, most of the 42 "never
  circulates" items would in fact circulate — the caveat on every row exists because
  the false-positive rate is expected to be high, not hypothetical.
- **Relative threshold drift:** P75 is recomputed from whatever data arrives, so the
  trigger reflags ~25% of items regardless of whether absolute pressure changed. A
  production rule needs an absolute, policy-set threshold.
- **Single-genre, single-title assumption:** verified true here (ambiguity check = 0)
  but real catalogs have editions and multiple classifications; the check would
  report conflicts rather than fail silently, but downstream tables assume 1:1.
- **Timezone:** all timestamps here are clean UTC; real branch terminals emit local
  time and DST transitions, which would break naive window comparisons. (Every parse
  in the pipeline assumes ISO-8601 Zulu.)
- **Scale:** everything is stdlib, in-memory, single `json.load`. Fine to low
  millions of events on a laptop; breaks when a file no longer fits in RAM
  (~GB-scale exports) — would need streaming parse or a database. No index
  structures: the bridge is O(events × sessions-per-terminal), acceptable here,
  quadratic-ish against a year of dense data.
- **Event taxonomy:** only 4 event types exist in this export; renewals, returns,
  ILL requests, and in-person interactions are invisible, so "interest" is defined
  narrowly as terminal activity.
