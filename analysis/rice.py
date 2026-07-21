"""RICE scoring on user-shortlisted options. R/C grounded in computed data where
possible; I and E are stated ASSUMPTIONS (user-approved dummy set). Score = R*I*C/E."""
rows = [
    # name, Reach (entities touched, from data), Impact (1-3 assumed),
    # Confidence (verification-based), Effort (est. build minutes), basis note
    ("2 hold-queue pressure",   225, 2.0, 0.50, 10, "R=225 hold_placed events (P:147); C=0.5 hold_position meaning UNVERIFIED"),
    ("3 interest-vs-circ gap",   42, 2.0, 0.20,  8, "R=42 items flagged (B:43-45); C=0.2 checkout sample almost surely unrepresentative"),
    ("5 high-holds flag",         8, 3.0, 0.30,  5, "R=8 patrons of 95 = 8.4% (B:52); C=0.3 counter meaning UNVERIFIED, n=8"),
    ("8 data-contract writeup", 565, 1.5, 1.00, 12, "R=all 470+95 records governed (P:5-6); C=1.0 verified by construction"),
]
print(f"{'option':26s} {'R':>5s} {'I':>4s} {'C':>5s} {'E(min)':>6s} {'RICE':>8s}  basis")
for name, r, i, c, e, note in rows:
    print(f"{name:26s} {r:>5d} {i:>4.1f} {c:>5.2f} {e:>6d} {r*i*c/e:>8.1f}  {note}")
print("\nDeferred/rejected by user (not scored): 1 linker (later, agents), 4 utilisation (later, compliance), 6 funnel (do-not-build + infra cost), 7 profiles (later, system maturity)")
