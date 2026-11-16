# Sitemap

Version 0.1, 2026-11-17. Demo base path: `/demo` on the public site is NOT used; the demo is a separate Next.js app (`/demo` folder in the repo) with its own routes, run locally. Routes below are the app's routes. Keywords come from the research brief (pp. 13–14) and search_visibility.md; search volumes were not measured.

## Phase 0: built in this demo

### Public pages

| Route | Page | Purpose | Target keyword | Content file |
|---|---|---|---|---|
| `/` | Home | Route visitors to call, text, visit, or sell/trade; show proof | used cars Regina | `pages/home.ts` |
| `/about` | About Us | Story, founder, inspection and warranty standards, licence # | used car dealer Regina | `pages/about.ts` |
| `/contact` | Contact Us | Map, hours, call, text, email, form (client-side only), directions | used car dealership 8th Ave Regina | `pages/contact.ts` |
| `/faq` | FAQ | Fees, warranty, deposits, documents, financing questions | used car buying FAQ Saskatchewan | `pages/faq.ts` |
| `/privacy` | Privacy Policy | PIPEDA-shaped template | — | `pages/privacy.ts` |
| `/terms` | Terms & Conditions | Site terms, pricing display policy (drive-away) | — | `pages/terms.ts` |
| `*` (not-found) | 404 | Recover: links to Home, Contact, call | — | `pages/not-found.ts` |

### Global elements

| Element | Content file |
|---|---|
| Header + mobile menu + sticky mobile bar | `global/navigation.ts`, `global/site.ts` |
| Footer | `global/navigation.ts`, `global/site.ts` |
| Announcement bar | `global/announcement.ts` |
| Cookie banner | `global/cookie-banner.ts` |
| Contact details, hours, social links | `global/site.ts` |
| SEO defaults, JSON-LD AutoDealer | `global/seo.ts` |

### Header navigation (Phase 0)

1. Home `/`
2. About `/about`
3. FAQ `/faq`
4. Contact `/contact`
5. Button: Call (tel:) — primary
6. Button: Text (sms:) — secondary

Phase 2 adds Inventory, Financing, Sell/Trade before About (research brief p. 15). The nav is a content list, so the order is editable.

### Sticky mobile bottom bar (Phase 0)

Call · Text · Contact. (Research brief specifies Call · Text · Inventory; Inventory does not exist until Phase 2, so the third slot is a content field defaulting to Contact.)

### Footer navigation

- Column 1: Address, hours `[PLACEHOLDER]`, map link, phones, "DL #`[PLACEHOLDER]`"
- Column 2: Pages (About, FAQ, Contact)
- Column 3: Legal (Privacy Policy, Terms & Conditions; Pricing Policy later)
- Social links (each `[PLACEHOLDER: URL]`, hidden when empty)

### Admin portal (mock, local state only)

| Route | Screen |
|---|---|
| `/admin/login` | Login (non-functional; any input continues) |
| `/admin` | Dashboard: page list with draft/published state, global elements, "nothing is saved" notice |
| `/admin/pages/[slug]` | Page editor: sections, fields, SEO, preview, save draft / publish (mock) |
| `/admin/global/navigation` | Header/footer links, mobile bar slots |
| `/admin/global/site` | Contact details, hours, social links |
| `/admin/global/announcement` | Announcement bar |
| `/admin/global/cookie-banner` | Cookie banner text |
| `/admin/global/seo` | Site-wide SEO defaults and OG image |
| `/admin/preview/[slug]` | Preview of draft content in the public layout |

## Later phases (not built in Phase 0)

| Route | Page | Phase | Target keyword |
|---|---|---|---|
| `/inventory/` | Inventory list | 2 | pre-owned cars Regina |
| `/inventory/{year-make-model-trim-stock}/` | Vehicle detail | 2 | {year make model} for sale Regina |
| `/used-suvs-regina/`, `/used-trucks-regina/`, `/used-cars-under-15000-regina/` | Body-type and price landing pages | 2–3 | used SUVs Regina, used trucks Regina |
| `/financing/` | Financing hub | 2 | car financing Regina |
| `/financing/apply/` | Credit application | 2 | apply for car loan Regina |
| `/financing/bad-credit-car-loans/` | Credit situations | 2 | bad credit car loans Regina |
| `/sell-your-car/` | Sell or trade offer flow | 2 | sell my car Regina |
| `/trade-in/` | Trade-in value | 2 | car trade in Regina |
| `/book-test-drive/` | Test drive booking | 2 | book test drive Regina |
| `/reviews/` | Reviews | 3 | Mr Best Cars reviews |
| `/used-cars-{city}/` ×8 | City landing pages: Moose Jaw, Saskatoon, Prince Albert, Yorkton, Swift Current, Estevan, Weyburn, North Battleford | 3 | used cars {city} |
| `/guides/` + articles | Buying guides | 3 | e.g. how car financing works in Saskatchewan |
| `/pricing-policy/` | Drive-away pricing explainer | 2 | — |
