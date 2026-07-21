# Prototype — what connects to what

Built from the decision log; each artifact traces to a decision.

| Artifact | Produced by which decision |
|---|---|
| `pressure_and_gap.py` — hold-queue pressure table + trigger (`max hold_position >= 13`, CONFIGURABLE, P75-derived) | [T+61] option 2 — "staff didn't know which titles had long queues, a very genuine issue" |
| `pressure_and_gap.py` — interest-vs-circulation gap table, caveat on every row | [T+61] option 3 — "the titles that never get seen, that's the kind of reach issue" |
| Data-contract recommendations (rendered on the prototype page, deliberately not code) | [T+59] option 8 — "we need to suggest all of it to them. but not build" |
| `../analysis/` — 4 profiling/bridging scripts + raw outputs | [T+25] "facts only" phase; every claim in the log traces to these files |
| `../analysis/ASSUMPTIONS.md` — 8-entry register | [T+64] build order: every rule derived or marked CONFIGURABLE |
| `STOPPED_HERE.md` — freeze record, next steps, limitations | [T+68 rule] hard freeze, enforced by the agent at my order |

Run: `python prototype/pressure_and_gap.py` (Python 3, stdlib only; reads the two dataset JSONs from repo root — not committed). Verified stdout: `prototype_output.txt`.

Rejected/deferred options and the do-not-builds: decision log [T+53–61].
