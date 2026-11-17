# Agent log

Each agent records its self-review here before handing off: what it checked, what it found, what it fixed. Work that fails its gate goes back, not forward.

## 1. Product Analyst (BRD, PRD, sitemap, content model)

Date: 2026-11-17. Output: `docs/BRD.md`, `docs/PRD.md`, `docs/sitemap.md`, `docs/content-model.md`.

### Checked
1. Every PRD requirement traces to a BRD goal: traceability table in PRD s. 5 covers X-, HDR-, MNU-, FTR-, ANN-, COK-, HOME-, ABT-, CON-, FAQ-, LGL-, NF-, ADM- IDs.
2. Every visible-text element named in the PRD is a field in the content model: section types (hero, pageHeader, proofBar, steps, splitCta, reviews, faqTeaser, areasServed, visitUs, richText, team, standards, contactForm, faqList, legalBody, notFound) all defined; microcopy groups cover buttons, forms, states, admin labels.
3. No invented facts: grep of all four files for percentages and years. Every percentage matches the research brief s. 3 table (19 sites). Ratings, counts, years, hours, licence, warranty, email, WhatsApp, social URLs, geo are `[PLACEHOLDER]`.
4. Canadian spelling: grep for color/center/favorite/license/organization/catalog/behavior returned nothing.
5. Phase 0 scope only in PRD; later pages listed under "Coming next" and in sitemap as later.

### Found and fixed
- The research brief's mobile bar is Call · Text · Inventory, but Inventory does not exist in Phase 0. Fixed: third slot is a content field defaulting to Contact; noted in BRD G2 and sitemap.
- The user's brief and the research brief use the earlier palette (Ink #1B1512, Cream, Rust, Gold, Manrope, Michroma), while Brand Guidelines v1.0 and the live site use Ink #111315, Red #E30613, Montserrat and the black/red logo. Not resolved by me: written up neutrally as BRD s. 7 "Open decision for the owner" for Gate 1. Content model ships a `theme` selector with two token sets so either choice loads without component changes.
- Tagline differs by palette (Buy · Sell · Trade vs Buy · Sell · Drive Better): made `SiteSettings.tagline` a field with the default tied to the Gate 1 decision.
- The brief's hero asks for video; added poster-first, lazy, muted, reduced-motion rules (HOME-01, R6) to protect the Lighthouse 90+ target.
- Google Map embed would load third-party cookies before consent; made it consent-gated with a static link fallback (HOME-08, CON-04).
- `FAQPage` JSON-LD could expose placeholder answers to search engines; emitted only for items without `needsOwnerInput` (FAQ-03).
- `aggregateRating` in JSON-LD disabled by default until real reviews exist (SEODefaults).

### Open for the lead
- Gate 1 question to the owner: palette/typeface/logo option A or B (BRD s. 7).
- Owner placeholders listed in content-model s. 9.
- Demo app location recommended as `demo/` (separate Next.js app), to keep `site/` and `wrangler.toml` untouched (C1, X-11).

## 1b. Lead review of Gate 1 (2026-11-17)

Read all four documents end to end after the owner chose Brand Guidelines v1.0.

### Found and fixed
- PRD X-07, BRD C3 and R1, content-model s. 1 and s. 7 still described the palette as undecided with two token sets. Rewritten for one token set (`brandV1`) with the Guidelines v1.0 values and type scale (p. 11, p. 16).
- `SiteSettings.tagline` default set to "Buy · Sell · Drive Better"; `logo` default now points to copies of the live site's logo files in `demo/public/brand/` instead of reaching into `site/`.
- ADM-08 "theme select" removed (nothing to select).
- Admin at 360 px was "read-only summary"; the brief is mobile-first, so editors now work single-column on phones, with preview opening in the public layout.
- ABT-03: the owner removed Rohit Chawla's name from the live page, but the brief lists him as contact and the research brief puts the founder on About. Kept as the editable default and raised as a Gate 1 question.

### Checked and left as is
- All 19-site percentages match the feature matrix "%" row.
- Every PRD ID appears in the traceability table; every section type in the PRD exists in the content model.
- No numbers or claims outside the sources; placeholders are consistent.
- Mobile bar Call · Text · Contact (Inventory arrives in Phase 2).
