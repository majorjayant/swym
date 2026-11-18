# Growth

**Purpose:** Show whether the month is on track against the owner's targets, and whether buyers turn into reviews and referrals. Growth owns the targets and the pace. The underlying counts belong to other leads.

## Metrics Growth owns

| Metric | Definition | Source |
|---|---|---|
| Monthly targets | Units sold, leads and new reviews for the month. The owner sets them. | Owner entry (Growth table) |
| Pace (per target) | actual ÷ (target × days elapsed ÷ days in month). Below 85% shows **Behind pace** and adds a "Needs attention" item. | Calculated |
| Google rating | Star rating as shown on Google, one decimal. | Owner entry, weekly |
| Google review count | Total reviews on Google. New reviews this month = count now − count on the 1st. | Owner entry, weekly |
| Review ask rate | New reviews this month ÷ units sold this month. | Calculated (units come from Finance) |
| Repeat/referral share | Sales where lead source = referral **or** the owner ticked "repeat customer", ÷ units sold. | Lead source (Marketing) + owner flag on the sale |

Units sold and leads are counted by Finance and Analytics. Growth only compares them with the targets. Later, the Google Business Profile API replaces the weekly rating and count entry. Nothing else changes.

## Default targets for month 1 (sample; the owner edits them)

| Target | Value | Why |
|---|---|---|
| Units sold | 12 | With 10–15 cars on the lot, this is about one full turn a month. That keeps cars under the 60-day aged line. |
| Leads | 60 | About 5 leads per sale, which is a 20% lead-to-sale rate. That is normal for a small lot where buyers call about a specific car. |
| New reviews | 8 | Asking about two of every three buyers. That is realistic when the owner asks in person at handover. |

## The 30-day baseline

At day 30 the console freezes 5 numbers as the baseline: **leads, lead-to-sale rate, units sold, average gross per car, and new reviews (with rating)**.

Baseline ready = every lead has an outcome (sold / not sold), every sale has its price, cost and reconditioning entered, and the rating has been entered at least 4 times.

Go for ads only if lead-to-sale is at least 10% **and** gross per car is known for every sale. Otherwise run another 30 days of observation.

Start with Google Search only, on a small fixed budget (e.g. $300–500 for 30 days), aimed at people already searching for used cars in Regina. Add Meta in the second month, and only if Google's cost per sale (Finance) stays under about 15% of gross per car.

## What the Growth page shows

- **3 tiles:**
  1. Units vs target (pace %)
  2. Leads vs target (pace %)
  3. Google rating ★ and review count (+ new this month vs target)
- **1 chart:** a month-to-date line of cumulative units and leads, against a dashed straight "on pace" line for each target.
- **1 table (editable targets):**
  - Columns: metric | target | actual | pace % | status.
  - Rows: units, leads, new reviews, review ask rate, repeat/referral share.
  - The new-reviews row has the weekly entry for rating and count.
  - Edits are kept in memory through `useAdminStore`.
- **Source line:** "Site events, owner entries, Google reviews typed weekly by the owner."

## Open questions for other leads

1. **Marketing:** Is "referral" chosen when the lead comes in, or when the sale is recorded? Growth needs one field that it reads and does not own.
2. **Finance:** Can "Record a sale" add a "repeat customer" checkbox? That flag feeds repeat/referral share.
3. **Analytics:** Does a lead mean every call/text/form click, or one per person per day? The 60-lead target and the 10% go/no-go rule depend on it.

## Review of other leads

- **Answer to Marketing and Analytics: yes, the leads target includes walk-ins and referrals.** It uses Marketing's "Leads (total)", which is site lead actions plus owner-entered walk-ins and referrals. Lead-to-sale in the go/no-go rule uses the same total, so the target and the ad decision measure the same thing. Analytics' count should be labelled "Site lead actions" so there aren't two numbers called "Leads".
- **Answer to Finance: yes, break-even is the floor for the units target.** The units row shows "Break-even: N" taken from Finance. If the owner sets a target below it, the row turns amber. The default units target is whichever is larger: 12 or break-even.
- **Agree:** Finance owns units sold, and Analytics and Growth only read it. The lead-source field on "Record a sale" answers my Marketing question, because referral share reads that field. One request to Finance: add a 9th field, "Repeat customer: yes/no". Nothing else captures repeat buyers.
- **Duplicate:** lead source is set in two places, on the lead (Marketing) and on the sale (Finance). Suggestion: Marketing owns the field. A sale's dropdown starts with the source of the lead linked to it, and the owner can change it only for walk-ins and referrals.
- **No owner yet:** the overview tile "lead-to-sale rate" (sales ÷ leads total) doesn't appear on any page. Suggest Analytics owns it as the last step of its funnel. It is also my go/no-go number.
- **Sources:** all three pages stay within the day-1 list (site events, owner entries, GSC). Two pieces of new work to note in decisions.md:
  - Finance's "date acquired" is a new inventory field the owner types in.
  - Analytics' beacon needs storage in the Worker. That is new infrastructure, but no new API.
