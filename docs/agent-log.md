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

### Gate 1 outcome
Approved by the owner on 2026-11-17 with two decisions: Brand Guidelines v1.0 (black/red, Montserrat); no personal names on public pages (team section disabled by default).

## 2. Audience & Psychology Analyst (audience-insights.md)

Date: 2026-11-17. Output: `docs/audience-insights.md`.

### Checked
1. Stereotype pass: re-read every audience row asking "situation or trait?". Rewrote A4 and A5 so they describe circumstances (no credit history, documents, budget, who joins the decision) and not characteristics; channel and decision-maker claims marked [HYPOTHESIS].
2. Every statistic sourced: feature matrix percentages (text 68%, licence 16%, hours 95%, map 89%, warranty claim 89%, soft check 42%, valuation 32%, we-buy 37%, bi-weekly 11%, other language 11%, Google rating 26%, testimonials 63%, test drive 58%), research brief sections 1, 4, 5, 8, Gallup via BACKGROUND_RESEARCH.md (noted as US data).
3. Every recommendation maps to a PRD ID (HOME-01..08, MNU-02, FAQ-*, CON-*) or is a stated proposal.
4. No approval, rate or warranty claims; all such facts are placeholders.

### Found and fixed
- The research brief's hero CTAs (Shop cars / Get pre-approved) have no pages in Phase 0; recommended Call / Text us now, with the swap in Phase 2 as a content-only change.
- SGI registration mention had no source in the attachments; marked [HYPOTHESIS] and kept out of claims.
- Language toggle: evidence too thin for Phase 0; recommended Phase 3 with professional translation and an interim English sentence welcoming someone to translate.

### Proposed PRD changes (for the lead)
- Move HOME-06 (FAQ teaser) above HOME-04 (sell or trade).
- Hero primary CTA = Call, secondary = Text us, text link = Sell or trade (HOME-01 defaults).
- Add FAQ groups: Buying, Pricing and fees, Financing and credit, Selling and trade-in, Newcomers and documents, Visiting us (21 questions listed; `needsOwnerInput` flags given).
- Optional: mobile bar Text slot may become WhatsApp once staffed and measured.

## 7. Compliance Reviewer

Date: 2026-11-17. Output: `docs/compliance-checklist.md`, `docs/legal/privacy-policy-template.md`, `docs/legal/terms-and-conditions-template.md`. Not legal advice; for a lawyer to confirm.

### Checked
1. Every checklist row carries an official source URL and the date checked. The sandbox blocks direct fetches, so pages were confirmed through the research connectors (OPC, CRTC, FCAA, Justice Laws, Accessible SK, W3C, Google Fonts). Two URLs I tried returned 404 (an ISED CASL FAQ page and a Competition Bureau drip-pricing page); the CRTC page and the Act text are cited instead.
2. No legal conclusion is stated as certain; each item is pass / fix / needs lawyer / needs owner info.
3. Forbidden-words list traced to the FCAA Vehicle Dealer Information Guide 2024 s. 4, the FCAA "as is" bulletin and Competition Act s. 74.01.
4. Templates follow the ten PIPEDA principles and mark every owner fact and legal judgement.
5. Canadian spelling throughout.

### Found and fixed
- The content model had one consent field; CASL express consent for marketing should be separate and unchecked. Requested `contactForm.marketingConsentText`.
- No privacy officer contact existed anywhere. Requested `SiteSettings.privacyOfficer`.
- No way to reopen the cookie banner after a choice. Requested a "Cookie settings" footer link.
- Phase 2 badges (CARFAX, TD/Equifax) seen on competitor sites would need programme licences; recorded as text-only references for Phase 0.
- Saskatchewan has no private-sector privacy statute; PIPEDA applies. Recorded with the OPC and SK IPC sources so the copywriter does not cite FOIP.

### Open
- Six PRD/content-model changes listed in checklist s. 6 for the lead to apply.
- Owner inputs: licence number, legal name, privacy officer contact, retention periods, providers, image licences, trademark search.

## 6. Integrations Manager (docs/integrations.md)

Date: 2026-11-17. Output: `docs/integrations.md`.

### Checked
1. Every price in the tables has a vendor pricing URL and a "Checked 2026-11-17" stamp, or says "not published, contact vendor" / "not fetched" with the URL. Third-party review-site figures (ZopDealer) are labelled as such.
2. Phases match BRD s. 8: Phase 1 = CMS, DB, auth, forms, analytics, consent, images, hosting; Phase 2 = inventory, history, financing, trade-in, search; Phase 3 = reviews, chat, social, SMS sending.
3. Canadian residency noted where a vendor publishes it (Supabase ca-central-1; Cloudflare no Canada-only plan region; Contentful EU only).
4. No invented options: every vendor is one the brief named or one seen on a competitor site in the research brief.

### Found and fixed
- Parallel Search hit its free-tier limit on the first fetch; switched to Exa and TinyFish fetches, and WebSearch for the dealer-industry vendors.
- "TradeBoost" (seen on Village Auto) could not be identified; tradeboost.ca is an unrelated marketing agency. Flagged, not recommended.
- Payload Cloud has paused new deployments (Figma acquisition); kept Payload as self-hosted only.
- Instagram Basic Display API is retired; replaced with the Instagram API under Meta Graph.
- AV Pre-qualify pricing exists only as a TD promotion ($500 setup, $7 per approved lead); recorded as promo terms, not list price.

### Open for the lead
- Seven vendor pages could not be fetched or publish no price (s. 20); the owner should request quotes from EDealer, Hillz, D2C, CARFAX Canada, Canadian Black Book and Dealertrack before Phase 2 budgeting.
