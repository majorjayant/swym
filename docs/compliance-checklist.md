# Compliance checklist (Phase 0 demo)

**This is not legal advice. Templates and checks are for a lawyer to confirm.**

Version 0.1, 2026-11-17. Author: Compliance Reviewer agent. Scope: everything the Phase 0 demo will publish (see `docs/PRD.md` and `docs/content-model.md`). Sources were checked on 2026-11-17 through the research connectors; this sandbox cannot open sites directly, so a lawyer should re-open each link. Status key: **pass** (the design already meets it), **fix** (change needed before publishing), **needs lawyer**, **needs owner info**.

## 1. Which laws apply

| Area | Applies? | Why | Source |
|---|---|---|---|
| PIPEDA (federal private-sector privacy) | Yes | Saskatchewan has no private-sector privacy law deemed substantially similar; only Alberta, B.C. and Quebec do. Saskatchewan's FOIP, LA FOIP and HIPA cover public bodies and health trustees, not a car dealer. | [OPC: provincial laws that may apply instead of PIPEDA](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/legislation-related-to-pipeda/provincial-legislation-deemed-substantially-similar-to-pipeda/); [Saskatchewan IPC: legislation](https://oipc.sk.ca/legislation/) |
| CASL (anti-spam) | Yes, for any email or SMS the business sends | Applies to commercial electronic messages. Phase 0 sends nothing, but the contact form's consent wording must be CASL-shaped so Phase 1 can use it. | [CRTC: CASL Act, regulations and guidelines](https://crtc.gc.ca/eng/internet/anti/reg.htm) |
| Saskatchewan Consumer Protection and Business Practices Act and Regulations, Part 5 Division 2 (vehicle dealers) | Yes | Licensed vehicle dealer advertising on the public site. | [FCAA: Drive-away pricing](https://fcaa.gov.sk.ca/consumers-investors-pension-plan-members/consumers/purchasing-goods-and-services/purchasing-and-repairing-a-vehicle/the-drive-away-price); [FCAA dealer bulletins](https://fcaa.gov.sk.ca/regulated-businesses-persons/businesses/vehicle-dealers/bulletins); [Vehicle Dealer Information Guide 2024 (PDF)](https://fcaa.gov.sk.ca/public/CKeditorUpload/CPD/VehicleDealerInformationGuide_20241.pdf); [Regulations C-30.2 Reg 1 (PDF)](https://publications.saskatchewan.ca/api/v1/products/71437/formats/79510/download) |
| Competition Act (federal), false or misleading representations and drip pricing | Yes | Applies to any price representation to the public. | [Competition Act s. 74.01](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html); [s. 52](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-52.html) |
| The Accessible Saskatchewan Act, 2023 | Not yet for a private business | The 2023 Regulations only list public sector bodies that must publish accessibility plans; standards for other organisations are still being developed. WCAG 2.2 AA is adopted as the project's own standard. | [Accessible Saskatchewan Regulations](https://accessiblesk.saskatchewan.ca/the-accessible-saskatchewan-regulations); [WCAG 2.2](https://www.w3.org/TR/WCAG22/) |

## 2. Checklist

| # | Item | Applies to | Status | Requirement summary | Official source | Checked on |
|---|---|---|---|---|---|---|
| P1 | Privacy Policy published and linked from every page | FTR-04, LGL-01, COK-01 | fix (template provided; lawyer to confirm) | PIPEDA Principle 8 (Openness): policies must be readily available. | [PIPEDA fair information principles](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/) | 2026-11-17 |
| P2 | Privacy officer named with a contact route | Privacy template s. 1 | needs owner info | Principle 1 (Accountability): someone must be accountable; give a way to reach them. | same | 2026-11-17 |
| P3 | Purposes stated at or before collection | CON-06 (contact form intro and consent text) | pass in design; copy to confirm | Principle 2 (Identifying purposes). Consent text must say what the form data is used for. | same | 2026-11-17 |
| P4 | Meaningful consent: no pre-ticked boxes, no bundling, key points up front | CON-06, COK-01 | pass in design | OPC/OIPC guidelines: emphasise key elements, allow choice, no consent "buried" in a policy. | [Guidelines for obtaining meaningful consent](https://www.priv.gc.ca/en/privacy-topics/collecting-personal-information/consent/gl_omc_201805/) | 2026-11-17 |
| P5 | Cookies and analytics: no non-essential tracking before a choice; analytics category off by default; no fingerprinting or persistent "zombie" cookies | COK-01, COK-02, HOME-08 map embed | pass in design | OPC guidance on online behavioural advertising and tracking. Demo loads no analytics; Phase 1 must keep the gate. | [OPC: online behavioural advertising guidelines](https://www.priv.gc.ca/en/privacy-topics/ai-technology-and-innovation/online-privacy-tracking-cookies/tracking-and-ads/gl_ba_1112/) | 2026-11-17 |
| P6 | Collect only what the form needs | CON-06 | pass | Principle 4 (Limiting collection). Phase 0 form: name, phone, email, message, preferred contact. No date of birth or SIN anywhere on the public site. | PIPEDA principles (above) | 2026-11-17 |
| P7 | Cross-border storage disclosed | Privacy template s. 7 | needs owner info | If the Phase 1 CMS or form provider stores data outside Canada, say so. | OPC principles (Principle 7, Safeguards; Principle 8, Openness) | 2026-11-17 |
| P8 | Access and correction route | Privacy template s. 9 | pass (template) | Principle 9 (Individual access). | PIPEDA principles | 2026-11-17 |
| C1 | CASL-shaped consent on the contact form: unchecked box, plain wording, who is asking, what they will send, how to withdraw | CON-06 `consentText` | fix (copywriter to use the wording in s. 4 below) | Express consent must be sought clearly; a request for consent is itself a CEM, so collect it on the form, not by email. | [CRTC CASL requirements](https://crtc.gc.ca/eng/internet/anti/reg.htm); [CRTC guidance on implied consent](https://crtc.gc.ca/eng/com500/guide.htm) | 2026-11-17 |
| C2 | Keep consent records (date, wording, source) | Phase 1 form backend | needs owner info (Phase 1) | Sender must be able to prove consent. | same | 2026-11-17 |
| C3 | Every outgoing email/SMS identifies the business, gives a mailing address and contact, and has a working unsubscribe honoured promptly | Phase 1 email/SMS | pass (Phase 0 sends nothing) | CASL identification and unsubscribe requirements. | same | 2026-11-17 |
| D1 | Dealer name or "DL" + licence number in every advertisement, including the website footer | FTR-03 `dealerLicence` | needs owner info | Regulations s. 5-21(1). The site is an advertisement. | [FCAA dealer bulletins](https://fcaa.gov.sk.ca/regulated-businesses-persons/businesses/vehicle-dealers/bulletins); [Regulations C-30.2 Reg 1](https://publications.saskatchewan.ca/api/v1/products/71437/formats/79510/download) | 2026-11-17 |
| D2 | No vehicle price without a drive-away price and stock number | Phase 2 inventory; Phase 0 FAQ/Terms wording | pass (no vehicles in Phase 0); rule recorded for Phase 2 | s. 5-21(2): price shown for a specific vehicle must be the drive-away price (all dealer fees and pre-installed products, excluding PST/GST) plus a stock number. | [FCAA: Drive-away pricing](https://fcaa.gov.sk.ca/consumers-investors-pension-plan-members/consumers/purchasing-goods-and-services/purchasing-and-repairing-a-vehicle/the-drive-away-price) | 2026-11-17 |
| D3 | No "+ taxes and fees", "plus admin fee" or similar wording anywhere | X-09, FAQ, Terms | pass in design | Drive-away rule and Competition Act drip-pricing provision. | FCAA drive-away page; [Competition Act s. 74.01(1.1)](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html) | 2026-11-17 |
| D4 | No periodic payment shown without total amount payable on the same page | Phase 2 | pass (none in Phase 0) | s. 5-21(5); FCAA bulletin: required information must be on the page where the ad appears, not only behind a link. | FCAA bulletins | 2026-11-17 |
| D5 | No unsubstantiated "savings", "discount", "free", "wholesale", "below invoice", "guaranteed approval", "#1" or similar claims | All copy | fix (forbidden-words list in s. 3; copywriter and QA to grep) | Vehicle Dealer Information Guide 2024, s. 4 (advertising); Competition Act s. 74.01(1)(a). | [Vehicle Dealer Information Guide 2024](https://fcaa.gov.sk.ca/public/CKeditorUpload/CPD/VehicleDealerInformationGuide_20241.pdf) | 2026-11-17 |
| D6 | Warranty wording: do not state a warranty until the owner confirms terms; minimum powertrain warranty 30 days / 1,000 km on used vehicles under 200,000 km must not be described as a dealer "extra" | ABT-04, FAQ | needs owner info + needs lawyer | Guide s. 9; FCAA bulletin on "as is" sales. | Guide 2024; FCAA bulletins | 2026-11-17 |
| D7 | "As is" wording not used on the site | All copy | pass (no inventory) | FCAA alert bulletin, 16 Feb 2022, on misleading "as is" terms. | [FCAA dealer bulletins](https://fcaa.gov.sk.ca/regulated-businesses-persons/businesses/vehicle-dealers/bulletins) | 2026-11-17 |
| D8 | Deposit statements: any future "reserve online" feature capped at 2% of list price before a contract | Phase 2 | pass (none in Phase 0) | FCAA bulletin (April 2016), as summarised in the research brief. Lawyer to confirm the current bulletin text. | FCAA dealer bulletins | 2026-11-17 |
| D9 | Keep a record of every advertisement | Site releases | needs owner info (process) | Guide s. 4: dealers must keep records of ads. Suggest: Git history plus a dated screenshot per release. | Guide 2024 | 2026-11-17 |
| D10 | "Years in business", "vehicle count", "Google rating" shown only when real | HOME-02, HOME-05 | pass (placeholders with visible badge) | Competition Act s. 74.01(1)(a): representations must not be false or misleading in a material respect. | Competition Act s. 74.01 | 2026-11-17 |
| K1 | Price representations attainable: any price shown must be reachable without fixed obligatory charges other than government-imposed amounts | FAQ pricing item, Terms pricing block, Phase 2 | pass in wording (drive-away wording used) | Competition Act s. 52(1.3) and s. 74.01(1.1) (2022 amendments): a price that cannot be attained because of fixed obligatory charges is false or misleading, except amounts imposed by federal or provincial law. | [Competition Act s. 74.01](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html); [s. 52](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-52.html) | 2026-11-17 |
| K2 | Testimonials and reviews: genuine, with permission, not edited to mislead | HOME-05 | needs owner info | Competition Act s. 74.01(1)(a). Placeholders in demo. | Competition Act s. 74.01 | 2026-11-17 |
| A1 | WCAG 2.2 Level AA across all pages (contrast 4.5:1, focus visible, target size 24×24 minimum (2.5.8), focus not obscured (2.4.11), dragging alternatives, consistent help, accessible authentication on the admin login) | X-04, QA | pass in design; QA to verify | WCAG 2.2 Recommendation, 12 Dec 2024. | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | 2026-11-17 |
| A2 | Accessible Saskatchewan Act obligations | Site-wide | pass (no current private-sector standard); monitor | Regulations (in force 3 Dec 2023) list public bodies only; standards for other sectors in development. | [Accessible Saskatchewan Regulations](https://accessiblesk.saskatchewan.ca/the-accessible-saskatchewan-regulations) | 2026-11-17 |
| A3 | Accessibility statement with a feedback route (recommended, not required) | Footer link, Phase 1 | needs owner info | Good practice; aligns with the Act's plan-and-feedback model. | same | 2026-11-17 |
| L1 | Montserrat font licence | X-07 | pass | SIL Open Font License 1.1: free to embed and self-host; cannot be sold by itself; reserved names not used. | [Montserrat licence (Google Fonts)](https://fonts.google.com/specimen/Montserrat/license) | 2026-11-17 |
| L2 | Logo and brand files | X-07 | needs owner info | Owner-supplied; confirm the designer assigned copyright or granted a licence to Mr Best Cars. | Brand Guidelines v1.0 p. 29 (vector masters still to be supplied) | 2026-11-17 |
| L3 | Hero and lot imagery | HOME-01 | needs owner info | Use the dealership's own photos, or stock with a commercial licence kept on file. Placeholders in demo; no stock photos shipped. | n/a (contract) | 2026-11-17 |
| L4 | Google Maps embed terms | HOME-08, CON-04 | needs lawyer (Phase 1) | Consent-gated embed in design; Google's terms apply when enabled. | Google Maps Platform terms (vendor) | 2026-11-17 |
| T1 | Competitor names never on public pages | All copy | pass in design; QA grep | Avoids disparagement and trademark issues. The research docs stay internal. | Trademarks Act (general); internal rule | 2026-11-17 |
| T2 | Third-party brands (CARFAX Canada, Google) only as factual references or with programme permission; no logos without a licence | Phase 2 trust badges; HOME-05 "Google" label | fix (rule for copy and design: text references only in Phase 0) | Trademark use; vendor brand guidelines. | vendor terms | 2026-11-17 |
| T3 | "Mr Best Cars" name: CIPO trademark search before investing further | Brand | needs owner info | Brand Guidelines v1.0 p. 29 lists this as pending. | [CIPO Canadian trademarks database](https://ised-isde.canada.ca/site/canadian-intellectual-property-office/en/canadian-trademarks-database) | 2026-11-17 |
| T4 | Business legal name and registration in Terms | Terms template s. 1 | needs owner info | Identify the contracting entity. | Saskatchewan ISC corporate registry (owner to supply) | 2026-11-17 |

## 3. Forbidden and restricted words for the copywriter

Source: FCAA Vehicle Dealer Information Guide 2024, s. 4 (advertising rules, as summarised in the research brief s. 9), Competition Act s. 74.01(1)(a) and (b). Treat as restricted until the owner can substantiate the claim in writing.

| Do not use | Why | Use instead |
|---|---|---|
| savings, save $X, discount, sale, clearance, reduced | "Savings" claims need a substantiated regular price | plain drive-away price (Phase 2); no price talk in Phase 0 |
| free (anything), no-cost, complimentary | "Free" claims regulated; pre-installed products must be in the price | describe what is included |
| wholesale, below invoice, dealer cost, at cost | restricted comparative price claims | none |
| guaranteed approval, everyone approved, 100% approved, no credit check | unsubstantiated financing claim; lenders decide | "all credit situations welcome; approval depends on the lender" with owner confirmation |
| #1, best deals, lowest prices, Canada's best, Regina's largest | superiority claims need proof | "straight prices", "plain talk" |
| + taxes and fees, plus admin fee, plus doc fee, fees extra | contradicts drive-away pricing and drip-pricing rules | "plus GST and PST" only, next to a drive-away price |
| as is | FCAA alert bulletin 2022 | describe the vehicle's condition and disclosures |
| certified, inspected, warranty-backed (until confirmed) | needs real inspection and warranty terms | `[PLACEHOLDER]` until the owner supplies terms |
| any competitor's name | internal research only | none |
| CARFAX, Canadian Black Book, TD, Equifax as badges | brand use needs a programme licence | text reference only, or omit in Phase 0 |

## 4. Required elements and wording

- **Footer, every page:** business name as licensed, and "DL #[OWNER: licence number]"; address 909 8th Ave, Regina, SK S4N 6S3; phone numbers.
- **Contact form consent (CASL-shaped, unchecked):** "Yes, Mr Best Cars may contact me by [email/text/phone] about my enquiry. I can withdraw this at any time by replying STOP or emailing [OWNER: email]. Mr Best Cars, 909 8th Ave, Regina, SK S4N 6S3." A separate unchecked box for marketing: "Send me occasional updates by email or text. Unsubscribe any time." Lawyer to confirm.
- **Pricing statement (Terms and FAQ):** "When we show a price for a specific vehicle it is the drive-away price: it includes every fee and charge we collect, including documentation fees, freight and any products installed on the vehicle, except GST and PST. The stock number is shown with the price." Lawyer to confirm against s. 5-21.
- **Cookie banner:** necessary cookies only by default; analytics and marketing off until accepted; link to the Privacy Policy; a way to change the choice later (footer link "Cookie settings").
- **Placeholders:** every `[PLACEHOLDER]` must be resolved or the element removed before publishing. Shipping a placeholder as if real is a misleading representation.

## 5. Pre-publish checklist (owner and lawyer)

| Item | Status | Source |
|---|---|---|
| Dealer licence number in footer and About | needs owner info | FCAA s. 5-21(1) |
| Legal name and privacy officer contact in Privacy Policy and Terms | needs owner info | PIPEDA Principle 1 |
| Privacy Policy reviewed | needs lawyer | PIPEDA |
| Terms & Conditions reviewed | needs lawyer | general |
| Pricing statement wording | needs lawyer | FCAA s. 5-17, 5-21; Competition Act |
| Warranty, inspection and exchange wording | needs owner info, then lawyer | FCAA Guide s. 9 |
| Consent wording on form | needs lawyer | CASL, PIPEDA |
| All placeholders cleared; QA grep for `[PLACEHOLDER]` and forbidden words | fix before publish | Competition Act s. 74.01 |
| Cookie banner behaviour verified (no third-party requests before consent) | QA | OPC guidance |
| WCAG 2.2 AA pass (axe + manual) | QA | WCAG 2.2 |
| Image licences on file | needs owner info | contract |
| Trademark search for "Mr Best Cars" | needs owner info | CIPO |
| Ad record-keeping process (dated snapshot per release) | needs owner info | FCAA Guide s. 4 |

## 6. Changes requested in the PRD and content model

1. Add `SiteSettings.privacyOfficer` (`{ name?: string; email: string; phone?: string }`), published in the Privacy Policy and footer. (P2)
2. Add `contactForm.marketingConsentText` as a second, separate, unchecked consent field; `consentText` stays for the enquiry itself. (C1)
3. Add a footer link `Cookie settings` that reopens the banner (COK-01). (P5)
4. Add `legalBody` fields `legalName`, `privacyContact` tokens so templates can merge owner values. (T4, P2)
5. QA acceptance criterion: grep the built HTML for the forbidden words in s. 3 and for competitor names from `master_list.csv`. (D5, T1)
6. Phase 2 (recorded now): vehicle cards and pages must carry drive-away price + stock number, and any payment must show the total amount payable on the same page. (D2, D4)
