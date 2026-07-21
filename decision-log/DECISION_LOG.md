# Decision Log

<!-- Chronological. Timestamped [T+MM] from CLOCK START. -->
<!-- Entries are Jayant's words, transcribed — not AI-authored. -->

## [T+25] CLOCK START — dataset opened

What I looked at first, in my words from the Phase 1 brief I gave the agent: "This phase is facts only. No recommendations, no ideas, no problem framing." I ordered one profiling script covering structure, field inventory (partial fields matter more than complete ones), cross-file overlap, key analysis, integrity, session-field stress tests, distributions, and the temporal relationship between the files — every number from executed code, saved to /analysis/profile_output.txt.

What it told me: file A is 470 interaction events with NO library_card_id and NO device_session_id — the brief's stated join fields don't exist in the data. File B is 95 identified sessions, one per patron. The only shared fields are branch_id and branch_terminal_id. The connection the brief implies has to be earned, not joined.

## [T+33] Decision reconsidered mid-task (1): the join I almost wrote off

The agent's first pass concluded "no join is possible" because zero A events fall inside any B session window. I caught that this tested the wrong relation — its own finding showed all 120 terminal-bearing events land 65s–1857s BEFORE the nearest same-terminal login, one-sided. In my words from the rework order: "You found a pattern and then tested for a different one. Run the test your own finding points at."

What I believed before: the files might not connect at all. What I believe now: a deterministic pre-login bridge exists — at a 45-minute window, all 120 events resolve to exactly one session each, zero ambiguity, zero conflicts (stress_and_bridge_output.txt). I still chose NOT to build on it (option 1 deferred) — but as a decision, not a data failure. Same rework killed terminal_session_id as a "session": 86/150 groups span multiple branches, median span ~16 days. Any per-visit funnel died with it (option 6).

## [T+62] Decision reconsidered mid-task (2): option 5's "high reach"

I called the high-holds flag "impactful and high reach." The agent flagged the computed number: 8 patrons of 95 = 8.4% — low reach, high per-account impact. I accepted the correction; RICE scored it with the measured reach and it dropped to last among buildables. Option 5 stayed deferred.

## [T+64→71] Build order

On the agent's three scope questions I said "do as you like" — threshold derived from the distribution and marked CONFIGURABLE, caveat baked into every gap row, script-form prototype. Ordered the Phase 3 build under the non-negotiable working method (increments, validation alongside logic, counts must reconcile). The agent flagged its clock had passed my T+68 freeze while my phone timer ran behind; I ordered the build anyway — one increment, then assembly. Final order: "go ahead and complete all of it discussed until now and make sure it works even as a dashboard insight or prototype."

## [T+59] Option triage (my dispositions, from the 8-option list)

- Option 1 (pre-login linker): not needed for now. We can add agents to it later. Even bots can handle that type of privacy and we can always add URLs to block in our network.
- Option 2 (hold-queue pressure): yes — it's genuine & required.
- Option 3 (interest-vs-circulation gap): yes, it's needed — to generate more engagement, see which titles are not performing and how to make them perform. These insights would be valuable.
- Option 4 (terminal utilisation): not impacting a lot of users; on the compliance side maybe — if the library has enough resources we can plan it for later.
- Option 5 (high-holds flag): we can use it, seems impactful and high reach, though low in confidence. [AI flagged: data says reach is 8/95 patrons = 8.4% — low reach, high per-account impact.]
- Option 6 (session funnel): good option but not recommended for now. Would require slight engg expertise as well — maybe we'd need to add redis etc — so skip.
- Option 7 (patron profiles): later, once the system is capable enough.
- Option 8 (data contract): yes — we need to suggest all of it to them. But not build.

Asked for a RICE pass over the shortlist with assumptions to see what makes sense.

## [T+61] Final choice

Go with 8, 2 & 3 — something like basic, performance & delightful. Using the Kano model for this assignment: 8 (data contract) = basic, 2 (hold-queue pressure) = performance, 3 (interest-vs-circulation gap) = delightful.

Rejected alternatives, in my words: 1 (linker) not needed for now, agents/bots later; 4 (utilisation) low user impact, compliance-side, later if resources allow; 5 (high-holds flag) usable but low confidence [and AI flagged reach is 8/95, not high]; 6 (funnel) would need engg expertise/redis, skip; 7 (profiles) later once the system is capable enough.

## [T+61, expanded at interview] The problem I decided to solve

The first thing that I wanted to solve after seeing the assignment and data was any kind of engagement issue or visibility issue. Once I went deeper I saw staff didn't know which titles had long queues, a very genuine issue that had to be taken up. And the titles that never get seen, that's the kind of reach issue which I want to target during my initial build planning. The export issue was highlighted after phase 1 forensics itself — I wanted to solve that too, as a recommendation.

**Why over the others, naming them:** 1 (pre-login linker) not needed for now — agents/bots can handle it later, network controls exist. 4 (terminal utilisation) low user impact, compliance-side, later if resources allow. 5 (high-holds flag) usable but low confidence, and reach turned out to be 8/95. 6 (session funnel) do-not-build — the field it needs is provably not a session. 7 (patron profiles) later, once the system is capable enough.
