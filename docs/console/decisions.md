# Owner console: decisions

Lead's ruling after one review round between Marketing, Analytics, Finance and Growth (2026-11-18). One owner per number. No number needs a source outside the day-1 list.

| # | Question raised | Decision |
|---|---|---|
| 1 | "Leads" was defined twice (Marketing counted walk-ins and referrals; Analytics did not). | Two names. **Lead actions** = site calls + texts + forms (owner: Analytics). **Leads** = lead actions + owner-entered walk-ins and referrals (owner: Marketing). The overview and Growth targets use Leads. |
| 2 | Lead to sale had no owner. | Analytics owns it: cars sold since launch ÷ leads since launch. It is the go/no-go number for ads (≥ 10%). |
| 3 | Lead source was set in two places. | Set on the lead by Marketing's rules (UTM, then Business Profile tag, then referrer, then owner entry). The Record a sale form asks for it too, and that value is the one used for cost per sale. |
| 4 | Is a lead every click or one per person per day? | One click. Repeat taps on the same car in the same tab session count once. Per-person counting is impossible without cookies, and we don't use them. |
| 5 | Lead source can't be decided unless events carry the visit's referrer and UTM. | The beacon keeps the landing referrer/UTM in memory for the tab session and adds it to every lead event. |
| 6 | Cost per sale. | Finance shows it and Marketing supplies spend. It stays "Not running" until ads start. |
| 7 | Repeat customers. | A "Repeat customer" checkbox is on the Record a sale form, next to Trade-in. |
| 8 | Units target floor. | The units target should not be set below break-even units (Finance). |
| 9 | Month-1 leads target. | Growth proposed 60. The sample baseline already shows about 3 site leads a day, so the sample target is **90**. The owner can edit it on the Growth page. |
| 10 | Aged-stock colours. | Amber isn't in the brand. Over 60 days = slate flag; over 90 = red flag. |
| 11 | Marketing chart. | Weekly stacked bars were replaced by one bar per source since launch. It reads faster with only 3 weeks of data. Weekly stacking can come back after day 30. |
| 12 | Collection tool. | A first-party cookie-free beacon to the Cloudflare Worker (Analytics). GA4 and Clarity are added only if the day-30 review shows a need. |

Specs: `marketing.md`, `analytics.md`, `finance.md`, `growth.md` (each ends with its review of the others).
