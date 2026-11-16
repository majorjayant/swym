# Business Requirements Document (BRD)

Mr Best Cars demo redesign, Phase 0. Version 0.1, 2026-11-17. Author: Product Analyst agent. Status: draft for Gate 1.

Sources used: Brand Guidelines v1.0 (Nov 2026), earlier brand guideline (gold/ink), Competitor Website Research & Developer Brief (17 Nov 2026), feature_matrix.csv (19 sites), master_list.csv (50 sites), search_visibility.md, the live site at mrbestcars.ca. Anything not in those sources is a `[PLACEHOLDER: ...]`.

## 1. Business summary

| Item | Value |
|---|---|
| Business | Mr Best Cars, pre-owned car dealer. Buy · Sell · Trade. |
| Address | 909 8th Ave, Regina, SK S4N 6S3 |
| Phones | 639-480-4400, 306-999-2245, 306-942-7200 |
| Contact | Rohit Chawla, Marketing Director & Founder |
| Live site | https://mrbestcars.ca/ (coming-soon page; must stay unchanged) |
| Brand values | Bold. Trusted. Local. (Brand Guidelines v1.0, p. 2 and p. 18) |
| Dealer licence | `[PLACEHOLDER: SK dealer licence number]` |
| Years in business | `[PLACEHOLDER: founding year]` |
| Hours | `[PLACEHOLDER: opening hours]` |

## 2. Business goals

Goals come from the research brief's five opportunities (section 1) and the brand values.

| ID | Goal | Evidence | Phase 0 contribution |
|---|---|---|---|
| G1 | Be the Regina dealer that is transparent on price: drive-away price, stock number and licence number on every vehicle. | SK law requires drive-away price plus stock number (FCAA). Only 3 of 19 sites (16%) show a licence number. | Price policy wording on FAQ and Terms; licence-number field in footer (placeholder). |
| G2 | Make every contact path easy: call, text, visit. | 68% of competitors offer text/SMS; 95% show hours; 89% show a map. These are table stakes. | Sticky mobile bar (Call · Text · Contact; Inventory replaces Contact in Phase 2), contact page, footer NAP, tap-to-call everywhere. |
| G3 | Earn trust before the visit. | Google rating shown by 26%; testimonials 63%; warranty/inspection claim 89%; licence # 16%. | Proof bar (placeholders), About page (story, inspection, warranty fields), reviews block (placeholders), FAQ. |
| G4 | Own local search for Regina and 8 SK towns. | City landing pages exist on 21% of sites; O'Brians' Regina city page ranks #1 and #3 for "used cars Regina" (Parallel index). | One target keyword per page, specific meta descriptions, JSON-LD AutoDealer, "areas served" list. City pages in Phase 3. |
| G5 | Give selling and trading equal weight to buying. | Only 32% have an instant valuation tool; 37% a "we buy cars" page. MCS gives selling equal weight. | Sell-or-trade band on Home with CTA. Offer flow in Phase 2. |
| G6 | Run the site without a developer: every word editable. | User constraint (no hard-coded text; CMS-shaped content). | Content model, typed content files, mock admin portal. |
| G7 | Stay compliant with SK dealer advertising rules and Canadian privacy law. | FCAA drive-away pricing, Regulations s. 5-21, PIPEDA, CASL. | Legal page templates, cookie banner, consent wording, no unsubstantiated claims. |

## 3. Audiences (hypotheses to test, not assumptions)

Listed in the user's brief. Agent 2 will detail needs, objections and what to show first. These are working labels only.

| ID | Audience | Phase 0 touchpoint |
|---|---|---|
| A1 | Regina locals | Home, Contact, areas served |
| A2 | First-time buyers | FAQ, How it works |
| A3 | Families | Home, About, Contact |
| A4 | Newcomers to Canada (including the Punjabi and wider South Asian community, and others) | FAQ, financing FAQ items (placeholder answers), i18n-ready fields |
| A5 | Students | FAQ, Contact |
| A6 | People rebuilding credit | FAQ, Home "how it works" |
| A7 | People selling or trading in | Sell-or-trade band, FAQ, Contact |

## 4. Competitors: table stakes vs gaps

From feature_matrix.csv, 19 sites analysed (12 Regina, 4 other SK, 3 MB/AB). "NF" counts as not seen, so percentages are a floor.

### Table stakes (60%+ of sites)

| Feature | % | Phase 0 answer |
|---|---|---|
| Online finance application | 95% | Phase 2. Phase 0 links to a "coming soon" state. |
| Hours shown | 95% | Hours field (placeholder) in footer and Contact. |
| Warranty / inspection claim | 89% | About page fields, placeholder until owner confirms. |
| Map / directions | 89% | Map link on Contact and footer. |
| Specific meta description | 84% | SEO fields per page. |
| Price shown on listings | 79% | Phase 2. Pricing policy in FAQ/Terms. |
| Trade-in page | 79% | Phase 2. Sell-or-trade band now. |
| "All credit" wording | 68% | FAQ item (placeholder, needs owner approval). |
| Text / SMS | 68% | Text button in header bar and Contact. |
| Testimonials | 63% | Reviews block, placeholder cards. |

### Differentiators (under 30%)

| Feature | % | Plan |
|---|---|---|
| Weekly / bi-weekly payment shown | 11% | Phase 2 |
| Dealer licence # shown | 16% | Phase 0 footer field |
| City landing pages | 21% | Phase 3 |
| Google rating on site | 26% | Phase 0 placeholder; live in Phase 3 |
| Similar vehicles, save/favourite | 16% | Phase 2 |
| French or other language | 11% | i18n-ready fields now; content Phase 3 |
| Trade-in photo upload | 5% | Phase 2 |
| Lenders named | 0% | Phase 2 decision |

### Patterns to adopt and avoid (research brief, section 5)

- Adopt: two primary actions above the fold, proof bar under the hero, trust strip repeated, one price format sitewide.
- Avoid: template filler copy, mixed messages (two different warranties or founding years), diluted navigation, placeholder phone links, generic meta descriptions, "+ taxes and fees" wording.

## 5. Success metrics

No baselines exist yet. Measurement starts when analytics with consent is live (Phase 1).

| ID | Metric | How measured | Target |
|---|---|---|---|
| M1 | Tap-to-call rate | `tel:` click events per session | `[PLACEHOLDER: target after 4 weeks of data]` |
| M2 | Text/SMS taps | `sms:` click events | placeholder |
| M3 | Map/directions taps | outbound click | placeholder |
| M4 | Contact form submissions (Phase 1) | form submit events | placeholder |
| M5 | Lighthouse mobile scores | Performance, Accessibility, Best Practices, SEO | 90+ each (Phase 0 QA gate) |
| M6 | WCAG 2.2 AA | axe and manual pass | zero high-severity issues |
| M7 | Content editable without a developer | every visible string is a content field | 100% |
| M8 | Local search visibility for "used cars Regina", "pre-owned cars Regina" | Google Search Console (Phase 1) | placeholder |

## 6. Constraints

| ID | Constraint | Source |
|---|---|---|
| C1 | Live site at mrbestcars.ca stays unchanged. No push to `main`, no deploy. Demo lives on branch `claude/mbc-demo-redesign` in a separate app folder. | User brief, rule 1 |
| C2 | No database, API, auth or backend in Phase 0. Admin uses local mock state. | User brief |
| C3 | Brand fixed: use the guideline exactly; never redraw the logo. | User brief, rule 3; Brand Guidelines p. 10 |
| C4 | No hard-coded text. All strings from typed content files shaped like a CMS schema. | User brief, rule 4 |
| C5 | No invented facts. Reviews, ratings, years, awards, counts, rates, approval claims, warranties, licence numbers are `[PLACEHOLDER]`. | User brief, rule 5 |
| C6 | Canadian spelling; "kilometres". | User brief |
| C7 | SK advertising rules (summarised from research brief section 9; confirm with FCAA or a lawyer): if a price is shown it must be the drive-away price including all dealer fees except PST/GST, with a stock number; ads must show the dealer name or "DL" + licence number; periodic payments must show total amount payable; no "savings", "discount", "free", "wholesale" or superiority claims unless substantiated; minimum powertrain warranty 30 days / 1,000 km under 200,000 km; deposits capped at 2% of list price before contract; keep a record of every ad. Sources: FCAA "Drive-away pricing" page, FCAA Vehicle Dealer Information Guide (2024), Consumer Protection and Business Practices Regulations s. 5-21, FCAA dealer bulletins. | Research brief s. 9; search_visibility.md |
| C8 | PIPEDA and CASL apply to any form, email or SMS consent. | User brief (compliance agent) |
| C9 | Accessibility: WCAG 2.2 AA. | User brief |

## 7. Open decision for the owner (Gate 1)

> **The brief and the newest brand guideline disagree on the palette and typeface.** The lead will ask you to choose at Gate 1. Both are stated here neutrally.

| | Option A: earlier guideline (as written in your brief and the research brief) | Option B: Brand Guidelines v1.0 (Nov 2026) and the live site |
|---|---|---|
| Colours | Ink #1B1512, Cream #F6F0E6, Rust #A94A22, Gold #C9A24A, plus Deep rust #6E2A14, Light gold #E3C98A | Ink #111315, Red #E30613, White #FFFFFF, Light grey #DFE0E1, Slate #3C4246 |
| Logo | Gold tapered roofline over cream Michroma lettering | Black and red split car silhouette over heavy italic name, tagline "Buy · Sell · Drive Better" |
| Text typeface | Manrope 400–700 | Montserrat 400–800 (two weights per layout) |
| Logo typeface | Michroma (outlined in the logo file) | Unidentified heavy italic (outlined in the logo file) |
| Tagline | Buy · Sell · Trade | Buy · Sell · Drive Better |
| Where it is used today | Nowhere live | mrbestcars.ca coming-soon page, business card, app icon |

Everything downstream (design tokens, copy tagline, logo files, OG images) depends on this choice. The content model is written so either palette can be loaded as a theme.

## 8. Phases

| Phase | Scope | Backend |
|---|---|---|
| 0 (this demo) | Home, About, Contact, FAQ, Privacy, Terms, 404; header, footer, cookie banner, announcement bar, mobile menu; design system; content model; mock admin portal | None |
| 1 | Headless CMS, database, portal auth, live contact form with consent, analytics with consent | CMS + DB + auth + email |
| 2 | Inventory feed, inventory list, vehicle detail, financing hub and pre-qualify, sell/trade-in offer flow, test-drive booking | Dealer platform feed, CARFAX, valuation, credit app |
| 3 | 8 city landing pages, body-type landing pages, reviews page with live Google rating, multilingual content, guides/blog, marketing automation | Reviews API, i18n, email/SMS |

## 9. Risks

| ID | Risk | Mitigation |
|---|---|---|
| R1 | Palette decision delayed blocks design | Tokens built as a theme; both palettes prepared as token sets |
| R2 | Placeholders shipped as if real (ratings, warranty, licence) | Every placeholder renders with a visible `[PLACEHOLDER]` label in the demo; QA checklist item; pre-publish checklist |
| R3 | Copy makes claims the FCAA guide forbids | Compliance review before copy is final; word list in compliance checklist |
| R4 | Content model does not fit the CMS chosen in Phase 1 | Model uses plain JSON-compatible types; no CMS-specific features |
| R5 | Demo accidentally deployed | Separate folder, separate branch, wrangler config untouched, README warning |
| R6 | Lighthouse 90+ missed because of hero video | Poster image first, video optional and lazy, reduced-motion fallback |
| R7 | Competitor research gaps (vehicle pages blocked, no Google rankings) | Treat percentages as floors; verify on a phone before final sign-off |
