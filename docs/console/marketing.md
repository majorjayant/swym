# Marketing (owner console)

Owner: Marketing lead. Sample-data demo; all numbers shown are placeholders.

## 1. Purpose
Show where leads come from and what people search to find the site. Days 1–30: observe only, no ads.

## 2. Metrics I own

| Metric | Definition | Day-1 source |
|---|---|---|
| Leads (total) | Count of call, text and form clicks on the site, plus owner-entered walk-ins and referrals. | Site events + owner entries |
| Leads by source | Leads split into: Google search, Google Business Profile, Facebook/Marketplace, walk-in, referral, direct/other. | Site events + owner entries |
| Top search terms | Per query: clicks, impressions, CTR (clicks ÷ impressions), average position. Last 28 days. | Google Search Console (read-only) |
| Keyword opportunities | Queries at average position 5–20 with ≥ 100 impressions in 28 days. Manual list for now; automate later. | Google Search Console |

**How source is decided** (first rule that matches wins):
1. UTM tags on the landing URL (`utm_source`). None exist until ads start.
2. Business Profile link: the profile's website link carries `utm_source=gbp`, so it is not lumped in with search.
3. Referrer: `google.*` → Google search. `facebook.com`, `m.facebook.com`, `l.facebook.com` → Facebook/Marketplace.
4. Owner entry in admin: walk-in or referral (these never touch the site).
5. Anything else, or no referrer → direct/other.

Source is stored on the lead at the time of the click. It is not changed later.

## 3. What the Marketing page shows
- **Tiles (3):** Leads this period (with change) · Top lead source (name and share) · Search clicks from GSC (with change).
- **Chart (1):** Leads per week, stacked by source.
- **Table (1):** Top search terms — query, clicks, impressions, CTR, avg position. Opportunity rows are flagged.
- **Source line:** "Site events, owner entries, Google Search Console."

## 4. Ads-ready, switched off
- **Google Ads panel** and **Meta panel:** spend, leads, cost per lead (spend ÷ leads). Both show "Not running" until connected.
- **UTM convention** for every ad link:
  - `utm_source` = `google` | `meta`
  - `utm_medium` = `cpc` (Google) | `paid_social` (Meta)
  - `utm_campaign` = `<yyyy-mm>-<theme>`, e.g. `2027-01-trucks`
  - `utm_content` = `<stock#>` for single-vehicle ads
- Paid UTMs add two sources: Google Ads, Meta ads. They take priority over referrer rules.
- **Connect then:**
  - Google Ads API: daily spend and clicks per campaign (read-only).
  - Meta Marketing API: daily spend and clicks per campaign (read-only).
- Leads still come from site events. The APIs only supply spend.

## 5. Weekly 5-minute check (days 1–30)
- Leads this week vs last week. Note any big swing and why.
- Source split: is "direct/other" over a third? If so, check tagging (GBP link, Marketplace links).
- Walk-ins and referrals entered for the week? Missing entries skew the split.
- GSC: list new opportunity queries. No action yet; they feed the day-30 review.

## 6. Open questions for other leads
1. **Analytics:** who owns the funnel (vehicle view → lead → sale)? I propose Analytics; I only report lead counts by source.
2. **Finance:** cost per sale needs ad spend from my panels. Confirm Finance owns that number and reads spend from Marketing.
3. **Growth:** the monthly leads target — does it count walk-ins and referrals, or only site leads?

## Review of other leads
- **Duplicate, needs a decision: "leads".** Analytics' "Lead actions" (site call/text/form) and my "Leads" tile overlap. Proposal: Analytics owns the site lead count. Marketing owns only the split by source. That includes walk-ins and referrals, which never hit the site. Total leads = lead actions + owner-entered walk-ins/referrals. Lead for decisions.md.
- **Answer to Analytics Q1:** source is decided by rule (UTM → GBP tag → referrer → owner entry → direct/other), not picked by the owner. Marketing owns the rule. Analytics' beacon supplies the inputs. One gap: `call_click`/`text_click`/`form_submit` carry no referrer. The beacon must keep the visit's landing `referrer_host`/UTM and attach it to each lead event.
- **Answer to Finance Q1:** final list is Google search, Google Business Profile, Facebook/Marketplace, walk-in, referral, direct/other. Google Ads and Meta ads are added as separate values once ads run. Agree on shared cost per sale: Marketing supplies spend, Finance shows the result. One change: for a site lead, "Record a sale" should prefill the source from the lead, not ask again, so the same lead never ends up with two different sources.
- **Answer to Growth Q1:** "referral" is chosen when the lead comes in, as an owner entry, the same as walk-ins. The sale reads it and never sets it. Growth reads the field and does not own it.
- **Agree:** no metric in the three pages needs a source outside the day-1 list. The GBP API (Growth) and GA4/Clarity (Analytics) are correctly marked as later. Finance's "date acquired" is a new owner-entered field, which is fine.
- **Agree with a note:** Growth's plan to run Google Search first and Meta second makes sense. The $300–500 budget is a sample figure, not advice. The channel choice and UTMs at switch-on belong to Marketing. The go/no-go rule belongs to Growth.
