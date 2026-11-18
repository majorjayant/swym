# Product roadmap

Version 0.1, 2026-11-17. Prices are from `docs/integrations.md` (vendor pricing pages checked 2026-11-17; follow the section reference for the source URL). Effort figures are the lead's estimates for one experienced full-stack developer, not quotes; they assume the owner supplies facts and photos on time. All amounts are as published by each vendor (most in USD); confirm currency and tax before budgeting.

## Phase 0: this demo (done on branch `claude/mbc-demo-redesign`)

| Item | Detail |
|---|---|
| Features | Home, About, Contact, FAQ, Privacy, Terms, 404; header, footer, mobile menu, sticky Call · Text · Contact bar, announcement bar, cookie banner; design system (Brand Guidelines v1.0); typed CMS-shaped content model; mock admin portal (edit, preview, draft/publish in memory) |
| Integrations | None. `tel:`, `sms:` and map links only. |
| Effort | Done |
| Running cost | $0 (online for review at mrbestcars.ca/demo on the existing Worker, hidden from search) |
| Risks | Placeholders mistaken for facts (mitigated: visible badges); demo deployed by accident (mitigated: separate folder, branch, no wrangler change) |

## Phase 1: CMS, database, portal auth, live forms

| Item | Detail |
|---|---|
| Features | Real CMS behind the existing content model; admin login; contact form that sends (with separate enquiry and marketing consent, consent records kept); analytics after consent; Google Map after consent; image uploads; replace the coming-soon page at mrbestcars.ca with the new site |
| Integrations (recommended) | CMS: Payload self-hosted or Sanity Free (s. 1). Database: Cloudflare D1 or Supabase Pro in ca-central-1 (s. 2). Auth: Cloudflare Access (s. 3). Email: Worker endpoint + Resend Free (s. 4). Analytics: Cloudflare Web Analytics (s. 7). Consent: own banner + DB log (s. 8). Images: Cloudflare R2 + Images (s. 17). Hosting: Cloudflare Workers Paid (s. 18). |
| Effort (estimate) | 3–5 weeks |
| Monthly cost | Free-tier path: about $5 (Workers Paid; everything else on free tiers). With Supabase Pro for Canadian data residency: about $30. Plus domains. Source: integrations s. 19. |
| Owner inputs needed first | Dealer licence #, hours, legal name, privacy officer contact, which numbers take texts/WhatsApp, photos, lawyer review of Privacy and Terms |
| Risks | Next.js on Workers needs the OpenNext adapter (test early); CMS choice locks editor experience (pilot both with the owner for a day); consent logging must exist before any marketing email (CASL) |

## Phase 2: inventory, vehicle pages, financing, trade-in

| Item | Detail |
|---|---|
| Features | Inventory list with filters and crawlable URLs; vehicle detail pages with drive-away price, stock #, bi-weekly estimate with total payable, CARFAX link, inspection and warranty facts, similar vehicles, save; financing hub with soft-check step 1 then optional full application; sell/trade-in offer wizard (VIN, condition, photos); test-drive booking; body-type and price landing pages; pricing-policy page; hero CTAs switch to Shop cars / Get pre-approved |
| Integrations | Dealer platform feed into the site's database: EDealer from $299/month (Light, ≤ 50 vehicles); Hillz and D2C not published, contact vendor (s. 10). Vehicle history: CARFAX Canada, not published (s. 11). Financing: custom step-1 form; AV Pre-qualify promo $500 setup + $7 per approved lead (s. 12). Trade-in: in-house wizard (s. 13). Search: database queries or Pagefind, $0 (s. 16). |
| Effort (estimate) | 6–10 weeks, depending on the feed format the platform provides |
| Monthly cost | Phase 1 cost + dealer platform fee (largest item; quote-based, from $299 for EDealer) + CARFAX (quote) + per-lead financing fees if used |
| Risks | FCAA rules apply to every vehicle page (drive-away price, stock #, total payable next to any payment, 2% deposit cap for any reserve feature); feed quality; CARFAX and lender branding need programme agreements; collecting SIN or date of birth only in the full application, never step 1 |

## Phase 3: local reach, reviews, languages, marketing

| Item | Detail |
|---|---|
| Features | 8 city landing pages with unique local copy (Moose Jaw, Saskatoon, Prince Albert, Yorkton, Swift Current, Estevan, Weyburn, North Battleford); reviews page and live Google rating; buying guides; Punjabi then Hindi translations (professional, reviewed); chat; social feed; SMS follow-up with consent |
| Integrations | Google Business Profile API, $0 (s. 9); tawk.to, $0 (s. 14); Meta Graph API, $0 (s. 15); Twilio SMS $0.0083 per segment + number rental (s. 5) |
| Effort (estimate) | 4–8 weeks, plus translation time |
| Monthly cost | Phase 2 cost + SMS usage; translation is a one-off cost per page (quote from a translator) |
| Risks | Thin duplicate city pages hurt search (each needs real local content); machine translation of money and contract text can mislead; aggregateRating in structured data only from real reviews |

## Owner console track (designed in Phase 0)

Overview, Marketing, Analytics, Finance and Growth are designed in the demo with sample data (`docs/console/`). **Phase 1:** go live with the site beacon, owner entries and Search Console only, and observe for 30 days (`docs/console/launch-plan.md`). **After the day-30 review:** add the Google Ads and Meta APIs if the go/no-go is met; add GA4 or Clarity only if needed.

## Cross-phase decisions

1. CMS: Payload (one codebase) or Sanity (hosted editor).
2. Data residency: is Canadian hosting of form data a requirement? Decides D1 vs Supabase ca-central-1.
3. Dealer platform: get written quotes and a sample feed from EDealer, Hillz and D2C before Phase 2 design.
4. Financing partner and what step 1 collects.
5. Sell/trade promises (offer validity, payout time) the business can keep every time.
