# Finance

**Owner:** Finance lead · **Page:** `/admin/finance`

## 1. Purpose
Show whether the lot is making money: what sold, what it earned per car, what is sitting too long, and whether the month covered its costs.

## 2. Metrics Finance owns
All money figures **exclude GST and PST** everywhere. Taxes are collected for the government, not earned.

| Metric | Formula | Source |
|---|---|---|
| Units sold | Count of recorded sales in the period | Record a sale |
| Revenue | Sum of sale prices (before GST/PST) | Record a sale |
| Gross per car (front-end) | Sale price − purchase cost − reconditioning | Record a sale |
| Total gross | Sum of gross per car in the period | Record a sale |
| Days in stock | Sold: sale date − date acquired. Unsold: today − date acquired | Owner sample data (date acquired) + Record a sale |
| Aged cars | Unsold cars over 60 days; over 90 days shown separately | Inventory |
| Monthly expenses | Rent + payroll + utilities + insurance + marketing + other (6 categories max) | Monthly expenses form |
| Net | Total gross − monthly expenses | Calculated |
| Break-even units | Monthly expenses ÷ average gross per car (rounded up) | Calculated |

Example (illustrative cost): MB1003 Civic sold at $19,995, bought for $15,200, $900 reconditioning → gross $3,895.

## 3. "Record a sale" form (8 fields)
1. **Stock #** (required): dropdown of unsold stock (MB1001–MB1010); fills year, make, model
2. **Sale date**: defaults to today
3. **Sale price**: before taxes; defaults to the list price
4. **Purchase cost**: what we paid for the car
5. **Reconditioning**: repairs, detailing and safety inspection
6. **Lead source**: Marketing's list (Google search, Google Business Profile, Facebook/Marketplace, walk-in, referral, direct/other; later Google Ads, Meta ads). It pre-fills from the lead tied to that stock #, and the owner can change it
7. **Checkboxes**: trade-in · repeat customer
8. **Notes**: optional

Saving marks the car Sold and removes it from aged stock. Expenses are a separate monthly form: one amount per category.

## 4. What the Finance page shows
- **3 tiles:** units sold · total gross (with average per car) · net this month (with break-even units)
- **1 chart:** gross per week, bars, last 30 days
- **1 table:** unsold stock sorted by days in stock: stock #, vehicle, list price, cost + recon, days in stock; flags at 60+ (amber) and 90+ (red)
- **Source line:** "Owner entries: sales and monthly expenses. No accounting system connected."

## 5. Ads-ready (switched off)
**Cost per sale** = ad spend ÷ units sold where lead source is a paid source (Google Ads, Meta).
Ownership is shared: **Marketing** owns ad spend and the paid lead-source values. **Finance** owns units sold and shows the result. Until ads run, it shows "Not running".

## Later (not built)
- Accounting CSV export (QuickBooks/Xero) of sales and expenses.
- Dealer platform feed for cost, recon and acquired date instead of typing them in.

## 6. Open questions for other leads
1. **Marketing:** please confirm the final lead-source list, with paid sources kept separate (Google Ads, Meta) so cost per sale works later.
2. **Analytics:** the funnel's last step is "sale". Will you count sales from my Record a sale entries, with no second count? I suggest Finance owns "units sold" and Analytics reads it.
3. **Growth:** the monthly units target should be at least break-even units. Can targets show break-even as a floor?

## Review of other leads
- **Answers:** Analytics, yes: every sale has a stock #. It is required and picked from the stock list, so sales join to vehicle views. Growth, yes: field 7 becomes two checkboxes (trade-in, repeat customer), so the form stays at 8 fields. Marketing, yes: Finance owns cost per sale and reads ad spend from your panels. Growth's rule "Meta only if cost per sale is under 15% of gross per car" uses my number, which is fine. Ad spend is not an expense category, so it is not counted twice. Marketing spend goes in the "marketing" expense category, entered by the owner.
- **Sample data:** the lead is adding date acquired, purchase cost and reconditioning to the owner's sample data. That covers days in stock, aged cars and gross per car. No new source is needed.
- **Duplicate (Leads):** Marketing's "Leads" includes walk-ins and referrals. Analytics' "Lead actions" is call/text/form only. The overview and Growth's 60-lead target need one definition. I suggest Marketing's total is the "Leads" number, and Analytics keeps "lead actions" for the website funnel only.
- **No owner yet:** lead-to-sale rate, an overview tile and Growth's go/no-go rule. I suggest Analytics owns it: units sold (Finance) ÷ leads, same period. Growth reads it.
- **Lead source twice:** it is stored on the lead (Marketing) and again on the sale (my field 6). The sale's value pre-fills from the lead and wins if the owner changes it. Growth's repeat/referral share reads the sale's value.
- **Sources:** all three pages stay inside the day-1 list (site events, owner entries, GSC). GA4, Clarity, the GBP API and the Ads/Meta APIs are all marked later or off. I agree with all three pages.
