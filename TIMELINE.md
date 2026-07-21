# Timeline

<!-- One line per event. Format: ISO timestamp | T+MM | event -->

2026-07-22T21:34Z | pre-clock | setup phase begin
2026-07-22T21:34Z | pre-clock | scaffold folders created
2026-07-22T21:35Z | pre-clock | phase 0 deploy — shell build begin
2026-07-22T21:36Z | pre-clock | site scaffold written (4 HTML + CSS, 51 lines)
2026-07-22T21:36Z | pre-clock | wrangler.toml written (route jayantarora.in/swym*)
2026-07-22T21:37Z | pre-clock | wrangler 4.113.0 installed globally, needs `wrangler login`
2026-07-22T21:37Z | pre-clock | git init in C:\swym, identity set (majorjayant)
2026-07-22T21:37Z | pre-clock | verified github.com/majorjayant/swym exists (HTTP 200, 1 commit on main)
2026-07-22T21:37Z | pre-clock | blocked — awaiting: force-push OK, rm swym-main OK, CF token or skip
2026-07-22T21:59Z | pre-clock | CF deploy #1 failed (no wrangler.toml on remote — deployed against throwaway initial commit)
2026-07-22T22:04Z | pre-clock | swym-main/ removed; .gitignore updated (datasets, PDF, .claude/settings.local.json)
2026-07-22T22:05Z | pre-clock | commit 4319984 force-pushed over remote (14 files, 417 insertions)
2026-07-22T22:05Z | pre-clock | awaiting CF deploy retry
2026-07-22T22:18Z | pre-clock | all four /swym* routes verified live (200 after CF trailing-slash 307)
2026-07-22T22:20Z | pre-clock | phase 0 close; ~25 min spent (Gemini+Opus4.8 ideation, Opus4.7 deploy); waiting on CLOCK START for phase 1 (Fable)
2026-07-22T22:28Z | T+25 | CLOCK START — datasets opened; CLOCK.txt written
2026-07-22T22:29Z | T+26 | analysis/profile.py written (181 lines, over 100-line gate — flagged inline, single comprehensive pass)
2026-07-22T22:30Z | T+27 | profile_output.txt saved — brief mismatch found (A has no library_card_id, no device_session_id)
2026-07-22T22:32Z | T+30 | analysis/bridge.py written + run; bridge_output.txt saved — 0/120 A events fall inside any B session window
2026-07-22T22:52Z | T+49 | Phase 1 rework: stress_and_bridge.py written + run; terminal_session_id NOT a session (median span 15.9 days); zero-ambiguity pre-login bridging at W>=45m; hard coverage ceiling = 25.5% of A rows
2026-07-22T22:56Z | T+53 | Phase 2 begin — options list generated (8 options), awaiting user choice
2026-07-22T23:05Z | T+62 | user triaged options at T+59; RICE run (analysis/rice.py); reach contradiction on option 5 flagged (8/95, not high)
2026-07-22T23:11Z | T+67 | user chose 2+3+8 (Kano: basic/performance/delight), logged as T+61; AI counter-argument delivered (SCRATCH.md); scope-freeze paragraph + 3 build questions issued; freeze imminent
2026-07-22T23:15Z | T+71 | Phase 3 begin on user order (user timer behind CLOCK.txt; T+68 freeze overrule logged); single-increment build authorized
2026-07-22T23:19Z | T+75 | prototype/pressure_and_gap.py runs clean (1 fix: f-string header, not data); prototype_output.txt saved; ASSUMPTIONS.md written; 15 flagged items, 42-row gap list, 0 ambiguity, 0 negative failures
2026-07-22T23:24Z | T+79 | Phase 4 assembly: DECISION_LOG closed out; all three site pages rendered (decisionlog, prototype w/ dashboard tiles+tables, aitrace); committing + pushing
