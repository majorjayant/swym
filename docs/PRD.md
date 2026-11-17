# Product Requirements Document (PRD)

Mr Best Cars demo redesign, Phase 0. Version 0.1, 2026-11-17. Scope: public demo pages (Home, About Us, Contact Us, FAQ, Privacy Policy, Terms & Conditions, 404), global elements, and the mock admin portal. No backend. Every visible string is a field in `docs/content-model.md`; this document names fields, not copy.

Goal IDs (G1–G7) are defined in `docs/BRD.md`. Requirement IDs are `AREA-nn`.

## 0. Cross-cutting requirements

| ID | Requirement | Acceptance criteria | Goal |
|---|---|---|---|
| X-01 | No hard-coded visible text | A grep of `demo/src/components` and `demo/src/app` for string literals inside JSX finds none except aria/role tokens; all strings resolve via `t(field)`. | G6 |
| X-02 | Placeholder visibility | Any `Placeholder` with `isPlaceholder: true` renders its value with a visible badge (microcopy `placeholderBadge`) in the demo. | G3, G7 |
| X-03 | Mobile first | Layouts checked at 360, 768, 1024, 1440, 1920 px; no horizontal scroll; tap targets ≥ 44×44 px. | G2 |
| X-04 | Accessibility | WCAG 2.2 AA: one `h1` per page, logical heading order, visible focus, contrast ≥ 4.5:1 (3:1 large), reduced-motion respected, skip link, landmarks. | G3 |
| X-05 | Performance | Lighthouse mobile ≥ 90 on Home and one inner page for Performance, Accessibility, Best Practices, SEO, or the gap explained in qa-report. | G4 |
| X-06 | SEO | Per-page `title`, `description`, canonical, OG tags, JSON-LD `AutoDealer` on every page from `global/seo.ts`; `robots noindex` while demo. | G4 |
| X-07 | Brand | Brand Guidelines v1.0 only (owner decision, 2026-11-17): Ink #111315, Red #E30613, White, Light grey #DFE0E1, Slate #3C4246; Montserrat, two weights per layout; the black/red logo files from `site/assets/` copied unmodified into `demo/public/brand/`; one X clear space; red never used for body text on ink (p. 13); logo never in full colour on ink (p. 4). | C3 |
| X-08 | No invented facts | Every rating, count, year, warranty, licence, rate is a `Placeholder`. | C5 |
| X-09 | Pricing wording | No "+ taxes and fees" wording anywhere; any pricing explanation uses the drive-away wording from the Terms/FAQ fields. | G1, C7 |
| X-10 | Motion | Scroll reveals, hover and page transitions only on transform/opacity; none block content; all disabled under `prefers-reduced-motion`. | G3 |
| X-11 | Live site untouched | `site/`, `src/worker.js`, `wrangler.toml` unchanged on this branch; demo in `demo/`. | C1 |

## 1. Global elements

### Header (HDR)

| ID | Component | States | Acceptance criteria |
|---|---|---|---|
| HDR-01 | Logo link to `/` | default, focus | Uses `SiteSettings.logo`; alt from field; min width 120 px (no-tagline) / 260 px (with tagline) per guideline. |
| HDR-02 | Primary nav (`Navigation.header.links`) | default, hover, focus, active (current page `aria-current`) | ≥ 1024 px inline; below that behind menu button. |
| HDR-03 | CTAs (`Navigation.header.ctas`): Call (tel:), Text (sms:) | default, hover, focus, active | Phone from `SiteSettings.phones[primary]`; Text hidden if no phone has `sms: true`. |
| HDR-04 | Menu button | default, hover, focus, expanded | `aria-expanded`, `aria-controls`; Escape closes; focus trapped while open. |
| HDR-05 | Sticky behaviour | scrolled / top | Compact on scroll (height reduces); no layout shift. |
| HDR-06 | Skip link | focus | First focusable element; jumps to `main`. |

### Mobile menu (MNU)

| ID | Component | States | Acceptance criteria |
|---|---|---|---|
| MNU-01 | Full-height drawer with `mobileMenu.links`, CTAs, phones, hours summary | open, closing, closed | Body scroll locked; focus returns to menu button on close. |
| MNU-02 | Sticky bottom bar (`SiteSettings.mobileBar.slots`, 3 slots) | default, active | Visible < 1024 px; each slot ≥ 44 px tall; does not overlap footer content (padding-bottom on body). |

### Footer (FTR)

| ID | Component | Acceptance criteria |
|---|---|---|
| FTR-01 | NAP block: address (link to `mapUrl`), phones (tel:), email (if set) | Matches `SiteSettings`; same text as Contact page. |
| FTR-02 | Hours (`Hours.days`) | Placeholder badge until supplied; "Closed" rows when `closed: true`. |
| FTR-03 | Licence line "DL #" + `dealerLicence` | Shown when `footer.showLicence`; placeholder badge until supplied. |
| FTR-04 | Link columns (`footer.columns`) | Hover/focus states; external links marked. |
| FTR-05 | Social links | Only those with a URL; icon + accessible label. |
| FTR-06 | Legal line with `{year}` token | Year computed at build. |

### Announcement bar (ANN)

| ID | Requirement | States | Acceptance criteria |
|---|---|---|---|
| ANN-01 | Renders `AnnouncementBar` above header when `enabled` and within dates | visible, dismissed | Dismiss stores a session flag; re-appears when `text` changes (hash). |
| ANN-02 | Optional link | hover, focus | Whole bar is not a link; only the link element. |

### Cookie banner (COK)

| ID | Requirement | States | Acceptance criteria |
|---|---|---|---|
| COK-01 | Shows on first visit when `enabled` | visible, settings open, accepted, rejected | Stores choice in `localStorage` key `mbc-consent`; no analytics script loads before accept (none exist in Phase 0; a stub logs the decision). |
| COK-02 | Three categories; `necessary` locked | | Settings panel has per-category toggle; "reject" = necessary only. |
| COK-03 | Accessible | | `role="dialog"`, labelled, does not trap focus (non-modal), keyboard reachable. |

## 2. Pages

### HOME (`/`), keyword: used cars Regina

Sections in order (all `Section` types from the content model; each `enabled` toggle editable):

| ID | Section | Components and states | Acceptance criteria |
|---|---|---|---|
| HOME-01 | `hero` | Slides (1–5): media (image or muted video with poster), scrim, eyebrow, headline (`h1` on slide 1 only), subhead, primary CTA, secondary CTA, text link. Controls: prev/next, dots, pause. States: idle, transitioning, paused, reduced-motion (static first slide), video unsupported (poster). | Text contrast ≥ 4.5:1 on every slide via scrim; LCP element is the poster image, preloaded; autoplay off when reduced motion; slide change ≤ 3 per second never; swipe on touch. |
| HOME-02 | `proofBar` | 2–5 items: value (Placeholder), label, optional link | All four default values (vehicle count, Google rating, years in business, DL #) carry placeholder badges. |
| HOME-03 | `steps` ("how it works") | 3 steps with icon, title, body; optional CTA | Scroll reveal, staggered ≤ 60 ms; no reveal under reduced motion. |
| HOME-04 | `splitCta` (sell or trade) | heading, body, primary CTA (→ `/contact`), secondary CTA (tel:), image | No VIN tool; CTA target editable. |
| HOME-05 | `reviews` | rating + count (Placeholder), 3–6 review cards (`isPlaceholder` badge), profile link | Placeholder cards visibly labelled; no star graphics rendered when rating is placeholder. |
| HOME-06 | `faqTeaser` | items with `showOnHome`, limit 4, link to `/faq` | Accordion (see FAQ-02). |
| HOME-07 | `areasServed` | heading, intro, 8 area names as text (no links until Phase 3) | Names: Regina plus Moose Jaw, Saskatoon, Prince Albert, Yorkton, Swift Current, Estevan, Weyburn, North Battleford. |
| HOME-08 | `visitUs` | map link or embed, hours, CTAs (Call, Text, Directions) | Map embed lazy-loaded and only after cookie consent for marketing; otherwise static link. |

### ABOUT (`/about`), keyword: used car dealer Regina

| ID | Section | Acceptance criteria |
|---|---|---|
| ABT-01 | `pageHeader` (eyebrow, `h1`, intro, image) | Image optional; alt required. |
| ABT-02 | `richText` story | Founder name from `team` or text field; founding year is a Placeholder. |
| ABT-03 | `team` | Default member: Rohit Chawla, Marketing Director & Founder (from the owner's brief); photo placeholder; section can be disabled or members changed in the admin. Owner to confirm at Gate 1 whether the founder is shown publicly, since the name was removed from the live coming-soon page. |
| ABT-04 | `standards` (inspection, warranty, exchange policy) | Each `body` is a Placeholder until owner supplies; SK minimum warranty wording may be cited only as "minimum required by Saskatchewan law" with a lawyer marker. |
| ABT-05 | Licence line | Same `dealerLicence` field as footer. |
| ABT-06 | `visitUs` CTA strip | Shared section. |

### CONTACT (`/contact`), keyword: used car dealership 8th Ave Regina

| ID | Section / component | States | Acceptance criteria |
|---|---|---|---|
| CON-01 | `pageHeader` | | `h1` from field. |
| CON-02 | Contact cards: Call (each phone), Text, Email, WhatsApp | default, hover, focus; hidden when field empty | `tel:`/`sms:`/`mailto:`/`wa.me` links from `SiteSettings`. |
| CON-03 | Hours table | placeholder | From `Hours`; today highlighted. |
| CON-04 | Map | consent-gated embed or static link | Directions link opens `mapUrl`. |
| CON-05 | Directions text (`richText`) | | Placeholder until owner supplies routes. |
| CON-06 | `contactForm` (name, phone, email, message, preferred contact method, consent checkbox) | default, focus, invalid, valid, submitting (mock), success, disabled notice | Client-side validation with messages from `FormField.validation.errorMessage`; errors announced (`aria-live`); submit shows mock success and the `disabledNotice` that nothing is sent in the demo; consent text from field (CASL-shaped). |

### FAQ (`/faq`), keyword: used car buying FAQ Saskatchewan

| ID | Component | States | Acceptance criteria |
|---|---|---|---|
| FAQ-01 | `pageHeader` + group jump links | | Groups from `faqList.groups`. |
| FAQ-02 | Accordion item | collapsed, expanded, hover, focus | Button with `aria-expanded`, panel `region`; one or many open (setting); animation height/opacity ≤ 250 ms, none under reduced motion; `needsOwnerInput` answers show placeholder badge. |
| FAQ-03 | `FAQPage` JSON-LD | | Emitted only with items present on the page and not marked `needsOwnerInput`. |
| FAQ-04 | Empty state | | Microcopy `faq.noResults` when a group has no items. |

### PRIVACY (`/privacy`) and TERMS (`/terms`)

| ID | Component | Acceptance criteria |
|---|---|---|
| LGL-01 | `pageHeader` + `legalBody` | Effective date, last reviewed, disclaimer ("not legal advice") from fields. |
| LGL-02 | Table of contents from `heading` blocks | Anchor links; sticky on ≥ 1024 px. |
| LGL-03 | `[LAWYER TO CONFIRM]` markers | Rendered as visible highlight blocks while `lawyerMarkers: true`. |
| LGL-04 | Terms include the pricing display policy block | Drive-away wording field; cross-link to FAQ. |

### NOT FOUND (404)

| ID | Component | Acceptance criteria |
|---|---|---|
| NF-01 | `notFound` section: heading, body, CTAs (Home, Contact, Call) | HTTP 404 status; header and footer present; no index. |

## 3. Coming next (not built in Phase 0)

Inventory list · Vehicle detail · Financing hub, pre-qualify and application · Sell/trade-in offer flow (VIN, condition, photos) · Test-drive booking · Reviews page with live Google rating · 8 city landing pages · Body-type and price landing pages · Buying guides · Pricing policy page · Language toggle.

Each is a nav item or CTA target in the content model already; Phase 0 routes them to Contact.

## 4. Admin portal (design only, local mock state)

Global rules: `/admin/*` routes; no auth; persistent banner "Demo: nothing is saved" (microcopy `admin.nothingSaved`); all labels from `microcopy.admin`; keyboard accessible; full editors at ≥ 768 px; at 360 px the dashboard and editors still work (single column, field panel stacked under the section list) but preview opens in the public layout instead of side by side.

| ID | Screen / component | States | Acceptance criteria |
|---|---|---|---|
| ADM-01 | Login `/admin/login`: email, password, sign in | default, focus, invalid, loading (mock) | Any input continues to dashboard; note that auth is Phase 1. |
| ADM-02 | Dashboard `/admin`: page cards (state badge draft/published, last updated), global element cards, preview toggle | | Clicking a card opens its editor. |
| ADM-03 | Page editor `/admin/pages/[slug]`: section list (enable/disable, reorder within allowed types), field panel per section, SEO panel, actions: Save draft, Publish, Discard, Preview | clean, dirty, saving (mock), saved (mock), error (validation) | Field inputs chosen by schema type; `maxLength` enforced with counter; required fields validated; publish blocked on validation errors. |
| ADM-04 | Hero slides editor | | Add (≤ 5), remove, move up/down, media kind toggle, image URL/alt, scrim opacity slider, CTAs, enable toggle; live thumbnail. |
| ADM-05 | FAQ editor | | Groups and items: add, remove, move up/down, `showOnHome`, `needsOwnerInput`; RichText answer editor (paragraph/list/link only). |
| ADM-06 | Legal page editor | | RichText body, effective/reviewed dates, lawyer-marker toggle. |
| ADM-07 | SEO per page | | Title and description with character counters (60/155) and a search-result preview. |
| ADM-08 | Global: contact details `/admin/global/site` | | Address, phones (add/remove/primary/sms), email, WhatsApp, hours (7 rows + closed toggle), licence, founded year, social links. |
| ADM-09 | Global: navigation, announcement, cookie banner, SEO defaults | | Same field rules; announcement has enable and date range. |
| ADM-10 | Preview mode `/admin/preview/[slug]` | on/off | Public layout renders the draft tree; banner "Preview: draft content"; exit returns to editor. |
| ADM-11 | Draft / published | | Publish copies draft → published (in memory); badge updates; reload resets (stated in UI). |
| ADM-12 | Image fields | | URL input + alt + preview; upload disabled with note (Phase 1). |

## 5. Traceability

| Requirement | Goal |
|---|---|
| X-01, X-06, ADM-* | G6 |
| X-02, X-08, HOME-02, HOME-05, ABT-04 | G3, C5 |
| X-03, HDR-03, MNU-02, FTR-01, CON-02, CON-03, HOME-08 | G2 |
| X-04, X-05, X-10 | G3, M5, M6 |
| X-06, HOME-07, FAQ-03, SEO fields | G4 |
| X-09, LGL-04, FAQ pricing items, FTR-03 | G1, G7 |
| HOME-04 | G5 |
| COK-*, CON-06 consent, LGL-* | G7 |
| X-07, X-11 | C1, C3 |
| ABT-* | G3 |
| NF-01 | G2 |
