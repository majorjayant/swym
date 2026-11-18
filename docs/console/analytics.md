# Analytics: owner console

## 1. Purpose
Show how many people visit the site, which cars they look at, and how many of them call, text or send a form. Analytics owns traffic and the funnel. Lead sources belong to Marketing and sales/gross belong to Finance.

**Collection choice:** a tiny first-party beacon to our Cloudflare Worker. It is cookie-free and needs no external API. Cloudflare Web Analytics alone can't see per-vehicle clicks, so one beacon covering every event is simpler than running two tools.

## 2. Metrics I own
| Metric | Definition | Day-1 source |
|---|---|---|
| Visits | Count of `page_view` events, grouped into a visit by tab session (in memory, no cookie) | Site beacon |
| Vehicle page views | Count of `vehicle_view` events | Site beacon |
| Lead actions | `call_click` + `text_click` + `form_submit` (directions is tracked but is **not** a lead) | Site beacon |
| Lead rate | Lead actions ÷ visits, same period | Site beacon |
| Funnel | Vehicle page views → lead actions on vehicle pages → sales marked "sold" for that stock # | Beacon + owner entries |
| Top vehicle pages | Per stock #: views, leads, lead rate (leads ÷ views) | Site beacon |
| Views but no leads | Vehicle with ≥ 40 views and 0 leads in the last 14 days → goes to "Needs attention" | Site beacon |

Sales come from Finance's owner entries. Analytics only reads them to close the funnel.

## 3. Site events (6)
| Event | When it fires | Properties |
|---|---|---|
| `page_view` | Any page loads | `path`, `referrer_host`, `utm_source/medium/campaign` (if present), `device` (mobile/desktop) |
| `vehicle_view` | A vehicle detail page loads | `path`, `stock` |
| `call_click` | Tap on a `tel:` link | `path`, `stock` (if on a vehicle page) |
| `text_click` | Tap on an `sms:` link | `path`, `stock` (if any) |
| `form_submit` | Contact or finance form sent successfully | `path`, `stock` (if any), `form` (contact/finance) |
| `directions_click` | Tap on the map/directions link | `path` |

**No personal data in events:** no names, phone numbers, emails, IPs, form contents or user IDs. The Worker stores only the event name, its properties, and a timestamp rounded to the hour.

## 4. Analytics page (`/admin/analytics`)
- **3 tiles:** Visits · Lead actions · Lead rate (each with the change vs. the previous period).
- **1 chart:** daily visits (line) with daily lead actions (bars), last 30 days.
- **1 table:** top vehicle pages showing stock #, vehicle, views, leads, lead rate and a "views but no leads" flag. Sorted by views.
- **Source line:** "Site events (first-party, cookie-free) · sales from owner entries."

## 5. Ads-ready
Once ads are live, tag their links with UTMs and use `utm_medium` (cpc/paid_social vs. none) to split visits, leads and lead rate into **paid** and **organic**. The tiles stay the same and gain a paid/organic toggle.

## Add after day 30, only if needed
- **GA4:** add only if we need cross-device or audience reports, or Google Ads conversion import, that the beacon can't give us.
- **Microsoft Clarity:** add only if a vehicle page keeps hitting "views but no leads" and we need session recordings to see why.

## 6. Open questions
1. **Marketing:** should the lead source for a site lead come from `referrer_host`/UTM (mine), or only from what the owner picks? We need one owner for this.
2. **Finance:** will a sale always carry the stock #, so the funnel can join sales to vehicle views?
3. **Growth:** should the monthly "leads" target count only lead actions (call/text/form), with walk-ins and referrals left out?

## Review of other leads
- **Growth Q3 (what counts as a lead):** a lead is one lead action, with repeat taps of the same type on the same car in the same tab session counted once. We can't do "one per person per day": being cookie-free with no personal data means we have no person ID. For the 10% go/no-go, lead-to-sale should use owner-logged leads with an outcome, not raw clicks.
- **Duplicate (Marketing "Leads (total)" vs. my "Lead actions"):** these must not be two numbers. Proposal: Analytics owns site lead actions. Marketing owns **Leads (total)** = site lead actions + walk-ins + referrals, and the split by source. Growth's leads target reads Marketing's total. The lead lead to settle this in `decisions.md`.
- **Marketing Q1 (funnel owner):** agreed, Analytics owns the funnel. To support Marketing's "source is fixed at click" rule, the beacon will copy the visit's landing `referrer_host`/UTM onto each lead event. No new data is collected for this.
- **Finance Q2 (sales in the funnel):** agreed. Finance owns units sold, and the funnel reads Record a sale entries by stock #, with no second count. Note that walk-in sales have no vehicle view, so the funnel covers site-sourced sales only.
- **Sources check:** all three pages stay within the day-1 list. Finance's "date acquired" is a new inventory field, not a new source. The GBP API, Ads/Meta APIs and accounting export are correctly marked as later.
- **Agree:** Growth's 85% pace rule and baseline gate; Marketing's UTM convention, which uses the same `utm_medium` values my paid/organic split relies on.
