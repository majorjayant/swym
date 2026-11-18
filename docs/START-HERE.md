# Mr Best Cars: start here

Version 1.0, 2026-11-18. This page lists every document in the pack, the roadmap, and every integration the business will need. Costs come from vendor pricing pages checked on 2026-11-17 (details and source links in `integrations.md`). Most are in USD; confirm currency and tax before budgeting. Effort figures are estimates, not quotes.

Live review copy: https://mrbestcars.ca/demo/ (admin and owner console: https://mrbestcars.ca/demo/admin). The coming-soon page stays at https://mrbestcars.ca/.

## 1. What's in the pack

| Group | Document | What it is for |
|---|---|---|
| Business | `BRD.md` | Business goals, scope, success measures |
| | `PRD.md` | What the site and admin must do, page by page |
| | `audience-insights.md` | Who buys from a Regina used-car dealer and what makes them trust one |
| Site | `sitemap.md` | Every page and how it links |
| | `content-model.md` | The CMS fields behind every page (what the admin edits) |
| | `content-deck.md` | All site copy and keywords |
| | `design-system.md` | Brand Guidelines v1.0 applied: colours, type, components |
| Quality | `qa-report.md` | Every test run and its result (site, sample data, console) |
| | `compliance-checklist.md` | Saskatchewan dealer rules, privacy, consent, accessibility |
| | `legal/privacy-policy-template.md`, `legal/terms-and-conditions-template.md` | Templates for lawyer review |
| Plan | `roadmap.md` | Phases, effort, monthly cost, risks |
| | `integrations.md` | Every outside service compared, with prices and sources |
| Owner console | `console/marketing.md`, `console/analytics.md`, `console/finance.md`, `console/growth.md` | One spec per area, each with its review of the others |
| | `console/decisions.md` | The 12 decisions that settled overlaps between the four areas |
| | `console/launch-plan.md` | Day 1, the first 30 days, the day-30 review, and when to start ads |
| History | `agent-log.md` | Who did what and when |
| Earlier notes | `NOTES.md`, `BACKGROUND_RESEARCH.md` | Coming-soon page notes, domain setup, background research |
| Pictures | `screenshots/` | Desktop and phone screenshots of every page and the console |

## 2. Roadmap at a glance

| Phase | What you get | Effort (estimate) | Monthly running cost |
|---|---|---|---|
| **0. Demo (done)** | New site design, 10 sample vehicles, admin with editing and preview, owner console (Overview, Marketing, Analytics, Finance, Growth). Online at mrbestcars.ca/demo, hidden from search. | Done | $0 (on the current Cloudflare Worker) |
| **1. Go live** | Real CMS and database, admin login, contact form that sends, consent banner and log, image uploads, replace the coming-soon page. Console goes live with **site events, owner entries and Search Console only**. | 3–5 weeks | About $5 (free tiers), or about $30 with Canadian data hosting, plus domains |
| **Days 1–30 of Phase 1: observe** | No ads. Record sales, watch leads, fix aged stock. About 10 minutes a week. | Owner time | Same as Phase 1 |
| **Day-30 review** | Freeze the baseline. Start ads only if lead to sale is at least 10% and every sale has its gross recorded. | 1 hour | — |
| **After day 30, if go** | Google Search ads first, Meta second. Connect the Google Ads and Meta APIs so spend shows in the console. | 2–3 days | API $0; ad spend is the cost (start about $300–500 for 30 days on Google) |
| **2. Inventory and finance** | Live inventory feed, vehicle pages with CARFAX links, financing step 1, trade-in wizard, test-drive booking, search. | 6–10 weeks | Phase 1 + dealer platform (EDealer from $299; others by quote) + CARFAX (quote) |
| **3. Reach and reviews** | 8 city pages, live Google reviews, buying guides, Punjabi then Hindi, chat, SMS follow-up. | 4–8 weeks + translation | Phase 2 + SMS usage |

## 3. Every integration needed

Order: what Phase 1 needs first, then what waits for a trigger.

| Integration | What it is for | When | Monthly cost | Details |
|---|---|---|---|---|
| Cloudflare Workers Paid | Hosting (the site already runs on Cloudflare) | Phase 1 | $5 | integrations s. 18 |
| Payload (self-hosted) or Sanity Free | CMS behind the admin | Phase 1 | $0 | s. 1 |
| Cloudflare D1, or Supabase Pro in Canada | Database for content, forms, consent and console entries | Phase 1 | $0, or $25 | s. 2 |
| Cloudflare Access | Admin login | Phase 1 | $0 (under 50 users) | s. 3 |
| Worker endpoint + Resend Free | Contact form email | Phase 1 | $0 | s. 4 |
| `tel:`, `sms:` and `wa.me` links | Call, text and WhatsApp buttons | Phase 1 | $0 | s. 5 |
| Directions link; Google Maps embed after consent | Map | Phase 1 | $0 | s. 6 |
| Own consent banner + database log | Cookie and marketing consent (CASL, PIPEDA) | Phase 1 | $0 | s. 8 |
| Cloudflare R2 + Images | Vehicle and site photos | Phase 1 | $0 at launch volumes | s. 17 |
| **Site event beacon** (first-party, cookie-free, to the Worker) | Visits, vehicle views, calls, texts, forms: the console's lead data | Phase 1 | $0 | `console/analytics.md`. Replaces Cloudflare Web Analytics as the main analytics; that one stays optional for raw traffic. |
| **Google Search Console API** (read-only) | Search clicks, impressions and terms; keyword opportunities, automated later | Phase 1 | $0 | `console/marketing.md` |
| **Google Ads API** (read-only) | Ad spend and clicks into the console | After the day-30 go | $0 (ad spend is separate) | `console/launch-plan.md` |
| **Meta Marketing API** (read-only) | Facebook and Instagram ad spend and clicks | After Google ads prove out | $0 (ad spend is separate) | `console/launch-plan.md` |
| **Google Analytics 4** | Cross-device and audience reports, Google Ads conversion import | Only if the day-30 review needs it | $0 | `console/analytics.md` |
| **Microsoft Clarity** | Session recordings for cars with views but no leads | Only if needed | $0 | `console/analytics.md` |
| Dealer platform feed (EDealer, Hillz or D2C) | Live inventory, cost and date acquired | Phase 2 | EDealer from $299; others by quote | s. 10 |
| CARFAX Canada | Vehicle history links | Phase 2 | By quote | s. 11 |
| Custom finance form; AV Pre-qualify later | Financing step 1 | Phase 2 | $0; AV $500 setup + $7 per approved lead | s. 12 |
| In-house trade-in wizard | Sell or trade offers | Phase 2 | $0 (build time) | s. 13 |
| Database search or Pagefind | Inventory search | Phase 2 | $0 | s. 16 |
| Google Business Profile API | Live rating and reviews (replaces weekly manual entry) | Phase 3 | $0 | s. 9 |
| tawk.to | Chat | Phase 3 | $0 | s. 14 |
| Meta Graph API | Social feed on the site | Phase 3 | $0 | s. 15 |
| Twilio | SMS follow-up with consent | Phase 3 | $0.0083 per segment + number rental | s. 5 |
| Accounting CSV (QuickBooks or Xero) | Sales and expenses into Finance instead of typing them in | Optional, any time after Phase 1 | $0 (export) | `console/finance.md` |

**Phase 1 total:** about $5–30 a month plus domains. The biggest later cost is the dealer platform in Phase 2.

## 4. Still needed from you

**Facts for the live site.** The demo uses sample values for all of these:
- dealer licence number, legal name and hours
- which numbers take texts and WhatsApp
- privacy officer contact
- real photos
- warranty, exchange and deposit terms
- lawyer review of the Privacy and Terms pages

**Decisions:**
1. CMS: Payload (one codebase) or Sanity (hosted editor).
2. Must form data be hosted in Canada? This decides D1 or Supabase in Canada.
3. Dealer platform: get written quotes and a sample feed from EDealer, Hillz and D2C.
4. Financing partner, and what step 1 asks for.
5. Trade-in promises the business can keep every time (how long an offer is valid, when it is paid).

**Console setup on day 1:**
- date acquired, cost and reconditioning for each car
- this month's expenses
- the Google rating
- add `utm_source=gbp` to the Google Business Profile website link
