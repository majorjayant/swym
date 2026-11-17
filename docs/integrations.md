# Integrations

Version 0.1, 2026-11-17. Author: Integrations Manager agent. Phases follow `docs/BRD.md` s. 8: 0 = this demo (none needed), 1 = CMS, database, portal auth, live forms, analytics with consent, 2 = inventory, vehicle pages, financing, sell/trade, 3 = city pages, reviews, multilingual, marketing automation.

Rules used: every price comes from the vendor's own page, fetched on 2026-11-17 (the "Checked" column). Where the vendor page could not be fetched, the row says so and gives the URL. Where no price is public, the row says "not published, contact vendor". Prices are USD unless marked CAD. Third-party review-site figures are marked as such and are not treated as vendor prices.

Nothing here is a contract or a recommendation to sign; confirm every figure with the vendor before committing.

## 1. Headless CMS (Phase 1)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Sanity | Free plan: up to 20 user seats, 2 public datasets, unlimited content types and locales | Growth $15 per seat/month | Yes (Content Lake, GROQ, GraphQL) | https://www.sanity.io/pricing | 2026-11-17 | Field-level localisation maps to the `LocalizedString` model. Hosted; no published Canadian region. |
| Payload | Open source, self-hosted, free | Payload Cloud: new deployments paused after the Figma acquisition; existing customers unchanged | Yes (REST and GraphQL, generated from the schema) | https://payloadcms.com/cloud-pricing | 2026-11-17 | Runs inside a Next.js app, so it can live in the same repo. Needs a Postgres or MongoDB database (see s. 2). Host it on Cloudflare Workers or any Node host. |
| Strapi Cloud | Self-hosted Community edition free | Starter $35 per project/month (100k API requests, 50 GB assets) | Yes | https://strapi.io/pricing-cloud | 2026-11-17 | Cloud regions not listed on pricing page. |
| Contentful | Free: 2 roles, 2 locales, 100k API calls/month, 50 GB bandwidth | Paid tiers not shown on the fetched page (contact sales) | Yes | https://www.contentful.com/pricing/ | 2026-11-17 | EU data residency listed; no Canadian option shown. |
| Directus | Self-hosted free; Open Innovation Grant for organisations under $5M revenue and under 50 staff | Cloud Core $89/month billed yearly or $99 monthly | Yes (REST and GraphQL) | https://directus.io/pricing | 2026-11-17 | Grant covers a dealership of this size. |

Recommendation: Payload (self-hosted inside the Next.js app) if the owner wants one codebase and one host; Sanity Free if the owner wants a hosted editor with no servers to run. Phase 1.

## 2. Database (Phase 1)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Cloudflare D1 | Workers Free: 5 million rows read/day, 100k rows written/day, 5 GB storage, 10 databases | Workers Paid $5/month account minimum; first 25 billion reads and 50 million writes per month included, then $0.001 per million reads, $1.00 per million writes, $0.75/GB-month over 5 GB | Yes (Workers binding, REST) | https://developers.cloudflare.com/d1/platform/pricing/ | 2026-11-17 | SQLite. Same account as the live site. |
| Neon (Postgres) | Free: 100 projects, 100 CU-hours per project per month, 1 GB storage per project | Launch usage-based, typical spend $15/month ($0.106 per CU-hour, $0.35/GB-month) | Yes | https://neon.com/pricing | 2026-11-17 | Regions page fetched but did not list a Canadian region in the excerpt; confirm at https://neon.com/docs/introduction/regions. |
| Supabase (Postgres) | Free: 500 MB database, 50k MAU, 1 GB storage; projects pause after 1 week idle | Pro $25/month | Yes (REST, Realtime, Auth, Storage) | https://supabase.com/pricing | 2026-11-17 | Canada (Central) `ca-central-1` region available: https://supabase.com/docs/guides/platform/regions. |
| PlanetScale (Postgres) | None listed on fetched page | Single node from $5/month | Yes | https://planetscale.com/pricing | 2026-11-17 | Enterprise can deploy in any AWS/GCP region. |

Recommendation: Supabase Pro ($25/month) if Canadian data residency matters for form submissions (ca-central-1); D1 if staying entirely on Cloudflare and residency is not required. Phase 1.

## 3. Auth for the admin portal (Phase 1)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Cloudflare Access (Zero Trust) | Free plan up to 50 users | Pay-as-you-go $7/user/month above 50 | Yes | https://www.cloudflare.com/plans/zero-trust-services/ | 2026-11-17 | Puts a login wall in front of `/admin` with no app code; email one-time-PIN or Google login. Fits a 1–5 person dealership. |
| Clerk | Hobby free: 50,000 monthly retained users, 3 dashboard seats | Pro $25/month ($20 annual) | Yes | https://clerk.com/pricing | 2026-11-17 | Full user management in the app. |
| Auth.js (NextAuth) | Open source, free | n/a | n/a (library) | https://authjs.dev/ | 2026-11-17 | Needs a database adapter and an email or OAuth provider; most code to maintain. |
| Supabase Auth | Included in Supabase Free/Pro (s. 2) | see s. 2 | Yes | https://supabase.com/pricing | 2026-11-17 | Sensible if Supabase is the database. |

Recommendation: Cloudflare Access (free) for Phase 1; it protects the whole portal without storing passwords in the app.

## 4. Forms and email (Phase 1)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Resend | Free: 3,000 emails/month, 100/day | Pro $20/month (50,000 emails) | Yes | https://resend.com/pricing | 2026-11-17 | Contact-form notifications fit the free tier. |
| Postmark | Free developer plan: 100 emails/month | Basic $15/month (10,000 emails) | Yes (REST, SMTP) | https://postmarkapp.com/pricing | 2026-11-17 | |
| Twilio SendGrid | Price not on the fetched page (site merged into twilio.com) | not fetched | Yes | https://www.twilio.com/en-us/sendgrid/pricing | 2026-11-17 | Page returned a redirect notice without plan figures. |
| Cloudflare Email Service | Routing free; sending to arbitrary recipients needs Workers Paid ($5/month, s. 17) | pricing page not fetched | Yes (Workers binding, REST, SMTP) | https://developers.cloudflare.com/email-service/ | 2026-11-17 | Same account as hosting. |
| Formspree | Free: 50 submissions/month, 2 linked emails | Personal $15/month (200 submissions) | API on Professional ($30/month) and up | https://formspree.io/plans | 2026-11-17 | No-backend option; CASL consent text must be captured as a field. |

Recommendation: a Worker endpoint that validates, stores the submission (s. 2) with the consent record, and sends via Resend Free. Phase 1.

## 5. SMS and WhatsApp (Phase 1 for "Text us" links, which need no vendor; Phase 3 for sending)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Twilio SMS (Canada) | Trial credit only | $0.0083 per outbound or inbound SMS segment on long codes or toll-free; number rental extra | Yes | https://www.twilio.com/en-us/sms/pricing/ca | 2026-11-17 | Carrier pass-through fees may apply. CASL consent required before any marketing text. |
| Vonage SMS | Not shown | Canada rate not shown on fetched page ("refer to dashboard") | Yes | https://www.vonage.com/communications-apis/sms/pricing/ | 2026-11-17 | Not published on page; check dashboard. |
| Meta WhatsApp Cloud API | Non-template messages inside the 24-hour customer-service window are free | Per delivered template message; rate by category and country, table not in fetched excerpt | Yes | https://developers.facebook.com/docs/whatsapp/pricing | 2026-11-17 | A `wa.me` link on the site costs nothing and needs no API. |

Recommendation: Phase 1 uses plain `sms:` and `wa.me` links (no vendor). Twilio only if two-way texting from a shared inbox is wanted (Phase 3).

## 6. Maps (Phase 1)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Google Maps Embed API | Free, unlimited requests; API key and billing account required | $0 for Embed; other Maps SKUs have 10,000 free events/month then e.g. $2.83 per 1,000 (Autocomplete) | Yes | https://developers.google.com/maps/documentation/embed/usage-and-billing | 2026-11-17 | Loads Google cookies; gate behind consent (PRD CON-04). |
| Mapbox | Pay-as-you-go with free tiers per product; web map-load tier not in the fetched excerpt | see page | Yes | https://www.mapbox.com/pricing | 2026-11-17 | Docs pricing page could not be fetched (CRAWL_NOT_FOUND): https://docs.mapbox.com/help/dive-deeper/pricing/ |
| OpenStreetMap + Leaflet | Open source, free; tile usage policy applies | n/a | Tiles, no commercial API | https://operations.osmfoundation.org/policies/tiles/ | not fetched | No third-party cookies; good for a consent-free static map. |

Recommendation: static "Get directions" link to Google Maps everywhere (free, no cookies); Google Embed only after consent. Phase 1.

## 7. Analytics (Phase 1)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Cloudflare Web Analytics | Free; no cookies or localStorage | n/a | Yes (GraphQL Analytics API) | https://www.cloudflare.com/web-analytics/ | 2026-11-17 | Already available on the account hosting mrbestcars.ca. |
| Plausible | 30-day trial | Starter $9/month (10k pageviews, 1 site) | Stats API on Business $19/month | https://plausible.io/#pricing | 2026-11-17 | EU-hosted; no cookies. |
| Umami | Self-hosted free (MIT); Cloud Hobby plan exists | Cloud Pro $20/month (1M events) | API on Pro | https://umami.is/pricing | 2026-11-17 | |
| Google Analytics 4 | Free (standard) | Analytics 360: not published, contact vendor | Yes | https://support.google.com/analytics/answer/1070015 | page not fetched | Needs consent before loading; Consent Mode v2. |

Recommendation: Cloudflare Web Analytics (free, consent-free) for Phase 1; add GA4 behind consent only if ad campaigns need it (Phase 3).

## 8. Consent management (Phase 1)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| CookieConsent v3 (orestbida) | Open source, free | n/a | JS API | https://cookieconsent.orestbida.com/ | 2026-11-17 | Self-hosted; no consent log server. |
| Klaro | Open source client free for commercial use | Hosted subscriptions exist; prices not in fetched excerpt (tiers by 500/2,000/10,000 URL scans) | REST API on hosted plans | https://www.klaro.org/pricing | 2026-11-17 | |
| Cookiebot | Free plan, one domain (page limit per vendor page: fewer than 50 subpages) | Premium Lite $10/month per domain | Yes | https://www.cookiebot.com/en/pricing/ | 2026-11-17 | Automatic scans and consent logs. |
| Osano | 30-day trial | not published, contact vendor | Yes (Core API) | https://www.osano.com/pricing | 2026-11-17 | |

Recommendation: the demo's own banner (PRD COK-01..03) stores consent locally; in Phase 1 keep it and log consents to the database, or swap in CookieConsent v3. Cookiebot Free is the no-code fallback.

## 9. Reviews (Phase 3)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Google Business Profile API | Free; access requires approval and a business reason | n/a | Yes (reviews list, reply) | https://developers.google.com/my-business/content/review-data | 2026-11-17 | Only route that shows the real rating from the owner's own profile. |
| Elfsight Google Reviews widget | Free: 200 views/month, 1 widget, Elfsight branding | Basic $5/month billed yearly ($6 monthly), 5,000 views | No public API | https://www.elfsight.com/pricing/ | 2026-11-17 | Third-party script on the page. |
| Trustindex | Free account offered | Pricing page returned 404; not fetched | Unknown | https://www.trustindex.io/pricing/ | 2026-11-17 | Could not verify. |

Recommendation: Google Business Profile API (free) via a small Worker that caches the rating daily; `aggregateRating` JSON-LD only from that source. Phase 3.

## 10. Inventory feed / dealer platform (Phase 2)

Vendor pricing pages are mostly private. Figures from the research brief s. 8 are marked [brief].

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| EDealer | None | Independent dealers: Light $299/month (50 vehicles or less) to Ignition+ $699/month; Plus $1,049/month; Easy Offer add-on $199/month | Not stated on page; syndication to Kijiji, AutoTrader, CarGurus [brief] | https://www.edealer.ca/pricing | 2026-11-17 | Canadian. Vehicle pages blocked crawlers in the research study. |
| ZopDealer | None | Vendor pricing page returned 404; third-party listings (Capterra) show "from $99/month"; brief notes US Advanced plan $299/month [brief] | Not stated | https://www.zopdealer.com/pricing/ | 2026-11-17 | Not published on the fetched vendor page; contact vendor. |
| AutoManager | None | Dealer website and marketing from $70/month; DMS from $88/month; DMS + website from $144/month | Not stated | https://automanager.com/pricing/ | 2026-11-17 | US vendor; Facebook Marketplace and Google listing tools. |
| Hillz Dealer | None | not published, contact vendor (pricing page 404) | Not stated | https://www.hillzdealer.com/ | 2026-11-17 | Canadian DMS + website. |
| D2C Media | None | not published, contact vendor | Not stated | https://www.d2cmedia.ca/ | 2026-11-17 | Canadian; "1,100 Canadian dealers" (vendor claim). |
| Custom feed (CSV/JSON from the chosen DMS into the site's database) | n/a | Developer time only | n/a | n/a | n/a | Gives the site its own vehicle pages with drive-away price, stock number and licence number (BRD G1). |

Recommendation: ask EDealer, Hillz and D2C for written quotes and a feed export; build vehicle pages on the site from that feed rather than embedding a template. Phase 2.

## 11. Vehicle history (Phase 2)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| CARFAX Canada dealer products (VHR links, Vehicle Trade-in Widget, Value Range) | Trade-in widget described as included with a VVR subscription (vendor claim via search) | not published, contact vendor; dealer page returned HTTP 403 | Dealer integrations exist; public API not confirmed | https://www.carfax.ca/dealers | 2026-11-17 (403) | The only history provider competitors use; 32% show a report link. |
| Link to a CARFAX report per VIN (no integration) | Free to link | report cost per dealer plan | n/a | https://www.carfax.ca/ | not fetched | Minimum viable: a "View CARFAX report" link on each vehicle page. |

Recommendation: start with per-vehicle report links; request dealer pricing from CARFAX Canada. Phase 2.

## 12. Financing application (Phase 2)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| AutoVerify AV Pre-qualify (Equifax data; TD Auto Finance partner) | None | TD-approved dealer promotion: $0 monthly for 12 months, $500 setup, $7 per approved lead, pass-through fees (promo terms, subject to change); standard price not published | Integrates with Dealertrack and RouteOne (vendor claim) | https://autoverify.com/td-incentive-program and https://autoverify.com/product-av-pre-qualify | 2026-11-17 | This is the "TD / Powered by Equifax" widget seen on Roadway, Siman, WOW and Prairie West. |
| Dealertrack Canada credit application | None | not published, contact vendor; site could not be fetched (connect error) | Lender network, not a public API | https://www.dealertrackcanada.com/dealertrack-credit-application-network/ | 2026-11-17 | Sends the shopper to a Dealertrack-hosted form (as Band City does). |
| Custom two-step form (pre-qualify fields, then full application) | Developer time | n/a | n/a | n/a | n/a | Keeps the shopper on-site; collects SIN and date of birth only in step 2 (research brief s. 7); needs consent wording and secure storage (Compliance). |

Recommendation: custom step-1 form in Phase 2 (no credit pull), with AV Pre-qualify evaluated once the dealer is TD-approved.

## 13. Trade-in valuation (Phase 2)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| CARFAX Canada Vehicle Trade-in Widget | See s. 11 | not published, contact vendor | Dealer widget | https://www.carfax.ca/dealers | 2026-11-17 (403) | Used by Roadway and Wheat Country. |
| Canadian Black Book APIs (Used Car Web API, Custom Trade API) | None | not published, contact vendor ("Talk to a Product Specialist") | Yes (Used Car, Custom Trade, Retail Market Insights APIs) | https://www.canadianblackbook.com/automotive-solutions/ | 2026-11-17 | Used by O'Brians and Regina Nissan. |
| "TradeBoost" (seen on Village Auto) | Vendor not identified; tradeboost.ca is an unrelated marketing agency | n/a | n/a | https://www.tradeboost.ca/ | 2026-11-17 | Could not identify the product; do not plan on it. |
| In-house photo-based offer wizard (Ride Time pattern) | Developer time | n/a | n/a | n/a | n/a | Highest lead quality in the research; needs staff to reply fast. |

Recommendation: in-house wizard (VIN, condition, photos, contact) in Phase 2; add a Black Book or CARFAX estimate later if a quote is acceptable.

## 14. Chat (Phase 3)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| tawk.to | Free: unlimited agents and history, JavaScript API | Add-ons only (video/voice) | JS API | https://www.tawk.to/pricing/ | 2026-11-17 | Used by MCS Auto Group. |
| Crisp | Free: 2 agents | Mini $45/month (4 agents) | Developer APIs on paid plans | https://crisp.chat/en/pricing/ | 2026-11-17 | |
| Intercom | Free trial | Essential $29 per seat/month ($19 annual, new-customer discount shown); Fin AI from $0.99 per outcome | Yes | https://www.intercom.com/pricing | 2026-11-17 | Oversized for one lot. |

Recommendation: none in Phase 1; tawk.to (free) in Phase 3 if staff can answer within business hours, otherwise keep call/text.

## 15. Social feeds (Phase 3)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Meta Graph API (Instagram Platform, Facebook Page) | Free; app review required | n/a | Yes | https://developers.facebook.com/docs/instagram-platform | 2026-11-17 | Instagram Basic Display API is retired; use Instagram API with business login. |
| Elfsight Instagram/Facebook feed widget | Free: 200 views/month, 1 widget | Basic $5/month billed yearly | No | https://www.elfsight.com/pricing/ | 2026-11-17 | Third-party script. |

Recommendation: footer social links only (Phase 1); a feed is Phase 3 and only via Graph API cached server-side.

## 16. Site search (Phase 2, with inventory)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Pagefind | Open source, free; static index built at deploy | n/a | JS API | https://pagefind.app/ | 2026-11-17 | Enough for pages and guides; not for live inventory filters. |
| Meilisearch | Self-hosted free (MIT) | Cloud from $20/month | Yes | https://www.meilisearch.com/pricing | 2026-11-17 | Inventory facets (make, body, price). |
| Algolia | Free: 10,000 search requests/month, 100,000 records | Usage above free tier | Yes | https://www.algolia.com/pricing | 2026-11-17 | |

Recommendation: inventory filters run as database queries in Phase 2; Pagefind for content pages if needed. No paid search at launch.

## 17. Image hosting / CDN (Phase 1)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Cloudflare Images | Free: 5,000 unique transformations/month on images stored elsewhere (e.g. R2) | Paid: $5 per 100,000 images stored, $1 per 100,000 delivered, $0.50 per 1,000 transformations above 5,000 | Yes | https://developers.cloudflare.com/images/pricing/ | 2026-11-17 | Same account as hosting. |
| Cloudinary | Free forever: 25 credits/month, 3 users | Plus $99/month ($89 annual) | Yes | https://cloudinary.com/pricing | 2026-11-17 | |
| imgix | 30-day trial, 100 credits | Starter $25/month | Yes | https://imgix.com/pricing | 2026-11-17 | |

Recommendation: Cloudflare R2 + Images transformations (free tier) for site and vehicle photos. Phase 1.

## 18. Hosting (Phase 1)

| Option | Free tier | Paid from | Official API | Pricing URL | Checked | Notes |
|---|---|---|---|---|---|---|
| Cloudflare Workers (current host of mrbestcars.ca) | Free: 100k requests/day, 10 ms CPU per invocation; static asset requests free and unlimited | Workers Paid $5/month minimum (10M requests and 30M CPU-ms included, then $0.30 per million requests) | Yes | https://developers.cloudflare.com/workers/platform/pricing/ | 2026-11-17 | Next.js runs via the OpenNext Cloudflare adapter. Cloudflare has data centres in Canada but does not sell a Canada-only region on these plans. |
| Vercel | Hobby free (non-commercial use per Vercel terms) | Pro price not on fetched page; see https://vercel.com/pricing | Yes | https://vercel.com/docs/plans/hobby | 2026-11-17 | Hobby plan page fetched; Pro figure not captured. |
| Netlify | Free: 300 credits, custom domains with SSL | Personal $9/month; Pro $20/month | Yes | https://www.netlify.com/pricing/ | 2026-11-17 | |

Recommendation: stay on Cloudflare Workers; Phase 1 likely needs the $5/month Paid plan once email sending and D1 limits apply.

## 19. Summary

| Integration | Recommended | Phase | Expected monthly cost at launch of that phase | Source row |
|---|---|---|---|---|
| Hosting | Cloudflare Workers Paid | 1 | $5 | s. 18 |
| CMS | Payload (self-hosted) or Sanity Free | 1 | $0 | s. 1 |
| Database | Supabase Pro (ca-central-1) or D1 | 1 | $25 or $0 | s. 2 |
| Portal auth | Cloudflare Access | 1 | $0 (under 50 users) | s. 3 |
| Forms + email | Worker endpoint + Resend Free | 1 | $0 | s. 4 |
| SMS/WhatsApp | `sms:` and `wa.me` links | 1 | $0 | s. 5 |
| Maps | Directions link; Google Embed after consent | 1 | $0 | s. 6 |
| Analytics | Cloudflare Web Analytics | 1 | $0 | s. 7 |
| Consent | Own banner + DB log (or CookieConsent v3) | 1 | $0 | s. 8 |
| Images/CDN | Cloudflare R2 + Images | 1 | $0 at launch volumes | s. 17 |
| Inventory feed | DMS feed into site DB (EDealer/Hillz/D2C quote) | 2 | EDealer from $299 (others not published) | s. 10 |
| Vehicle history | CARFAX report links | 2 | not published | s. 11 |
| Financing | Custom step-1 form; AV Pre-qualify later | 2 | $0; AV promo $500 setup + $7 per approved lead | s. 12 |
| Trade-in | In-house wizard | 2 | $0 (developer time) | s. 13 |
| Search | DB queries; Pagefind | 2 | $0 | s. 16 |
| Reviews | Google Business Profile API | 3 | $0 | s. 9 |
| Chat | tawk.to | 3 | $0 | s. 14 |
| Social feeds | Meta Graph API | 3 | $0 | s. 15 |
| SMS sending | Twilio | 3 | $0.0083 per segment + number rental | s. 5 |

Phase 1 running cost with the recommended set: $5–$30/month plus domains. Phase 2 adds the dealer platform fee, which is the largest cost and is quote-based.

## 20. Could not be fetched or not published (verify by hand)

- CARFAX Canada dealers page: HTTP 403 (https://www.carfax.ca/dealers).
- Dealertrack Canada: connection error (https://ca.dealertrack.com/); product page found via search only.
- ZopDealer pricing: vendor page 404; third-party figures only.
- Hillz Dealer pricing: 404; D2C Media: no public pricing.
- Trustindex pricing: 404.
- Mapbox docs pricing page: not found by the fetcher; main pricing page fetched.
- SendGrid: pricing moved into twilio.com; figures not on the fetched page.
- Vercel Pro price, GA4 support page, OSM tile policy: not fetched.
- Vonage Canada SMS rate: not on page.
- Canadian Black Book, Osano, Hillz, D2C, Dealertrack, CARFAX: not published, contact vendor.
