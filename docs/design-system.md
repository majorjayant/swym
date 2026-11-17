# Design system

Mr Best Cars demo, Phase 0. Stage 1 (tokens and components). Brand: **Brand Guidelines v1.0** only (owner decision, Gate 1). Code lives in `demo/`. Tokens are mirrored in `demo/src/content/themes/tokens.ts` (typed) and `demo/src/app/globals.css` (Tailwind v4 `@theme`); keep the two in sync.

## 1. Tokens

### Colour (guideline p. 11–13)

| Token | Hex | Use | Never |
|---|---|---|---|
| `ink` | #111315 | Text on light, dark bands, footer, icons | — |
| `red` | #E30613 | Primary buttons, short rules, underlines, wedge, labels on light, active states | Body text on ink (3.8:1, p. 13) |
| `white` | #FFFFFF | Page background, text on ink and red | — |
| `grey` (light grey) | #DFE0E1 | Input borders, secondary text on ink (14.1:1), eyebrow labels on ink | Text on white |
| `slate` | #3C4246 | Secondary text on white (10.2:1) | — |
| `line` / `line-dark` | ink 12% / white 16% | Hairlines only | Text |
| `surface` | #F4F4F5 | Alternate light band (light grey at ~32% on white) | — |

Only these colours exist in the Tailwind theme (`--color-*: initial`), so an off-palette class fails to compile.

Contrast pairs used (p. 12): ink/white 18.6:1, slate/white 10.2:1, red/white 4.9:1 (labels and buttons), white/red 4.9:1 (button text), grey/ink 14.1:1, white/ink 18.6:1.

### Type (p. 15–16)

One family: Montserrat, self-hosted (`/fonts/montserrat-latin.woff2`, variable 400–800, SIL OFL), `font-display: swap` with a metric-adjusted Arial fallback to limit layout shift.

**Two weights per layout (p. 16): 400 and 700.** The guideline's Display weight (800) is reserved for covers and signage, so the web uses 700 for every heading, including the hero.

| Role | Token / utility | Size | Weight | Line height | Notes |
|---|---|---|---|---|---|
| Display (hero, page h1) | `text-display-fluid` | 36 → 64 px (clamp) | 700 | 1.05 | sentence case |
| Headline (section h2) | `text-headline-fluid` | 28 → 40 px | 700 | 1.15 | |
| Title (h3, cards) | `text-title-fluid` | 20 → 24 px | 700 | 1.25 | |
| Lead | `text-lead` | 18 px | 400 | 1.55 | intros |
| Body | `text-body` | 16 px | 400 | 1.5 | |
| Caption | `text-caption` | 12 px | 400 | 1.4 | |
| Label | `.label` | 12 px | 700 | 1.2 | capitals, tracked 18% |

### Spacing, radius, elevation, motion

| Token | Value |
|---|---|
| Spacing scale | 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px (Tailwind 4 px base) |
| Section padding | `sm` 40/56, `md` 56/80/96, `lg` 64/96/128 px (mobile/tablet/desktop) |
| Radius | cards 8 px, controls 6 px, app icon 19% (p. 17; print cards are square) |
| Elevation | `--shadow-card` used only on the floating cookie dialog. No drop shadows elsewhere. |
| Motion durations | fast 150 ms (hover, colour), base 250 ms (accordion, header), slow 450 ms (reveal, hero crossfade, page enter) |
| Easing | `cubic-bezier(.22,.61,.36,1)` |

## 2. Brand graphic elements (p. 17)

| Element | Implementation |
|---|---|
| Corner wedge | `.wedge` (`::after`, clip-path triangle, 21% wide, aspect 21/13.14 = starts 79% along the bottom, meets the right edge at 77% of a 3.5×2 card). `.wedge-sm` 12%, `.wedge-xs` min(10%, 140 px). Fixed aspect, so the angle stays the same on tall mobile cards. |
| Short red rule | `.short-rule` 36 × 2 px, before section headings in feature bands |
| Red underline | `.link-underline` 2 px red, 0.3 em offset; turns to text colour on hover. Used for contact details and links. |
| Sedan mark | Decoration only, inside image placeholders and the map placeholder, at low opacity. Supplied colours unchanged; on ink only the red part reads. |
| Logo | Supplied files only (`/brand/*.svg`). Full colour on light; on-dark file on ink (p. 4). Header 150–200 px wide; footer 200 px. |

## 3. Layout and breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| base | 360 px+ | single column; 16 px gutters; mobile bar fixed at the bottom; menu drawer |
| `md` | 768 px | 32 px gutters; two-column grids (steps, cards) |
| `lg` | 1024 px | inline nav and header CTAs; mobile bar hidden; split sections; sticky FAQ / legal side nav |
| `xl` | 1440 px | 40 px gutters; container max 1280 px |
| `2xl` | 1920 px | content stays at 1280 px; hero and bands stay full-bleed |

The container is `container-page` (max 80 rem). Text measure is capped at about 64–68 ch.

## 4. Components and states

| Component | File | States |
|---|---|---|
| Button / ButtonLink | `components/ui/button.tsx` | primary (red), secondary (outline ink, or white on dark), text (red underline); hover, focus-visible, active (1 px press), disabled, loading (spinner plus label); sizes sm 40 px, md 48 px, lg 56 px. Link kinds resolve `tel:`, `sms:`, `mailto:`, `wa.me`; placeholder hrefs render as disabled. |
| Icon | `components/ui/icon.tsx` | 24 grid, 2 px stroke, round ends; decorative by default |
| Container, SectionShell, Heading, Eyebrow, ShortRule, Card | `components/ui/layout.tsx` | SectionShell: light / grey / dark, padding scale, anchor |
| PlaceholderBadge, PlaceholderValue, RichInline, MarkerChip | `components/ui/placeholder.tsx` | dashed `[PLACEHOLDER]` chip with tooltip; `[LAWYER TO CONFIRM]` and `[OWNER]` marks inside text |
| MediaImage | `components/ui/media.tsx` | owner photo, or an ink/grey placeholder block with the sedan mark and chip. No stock photos. |
| Reveal | `components/ui/reveal.tsx` | hidden → revealed (opacity plus 16 px rise), staggered via `--reveal-delay` |
| Header | `components/site/header.tsx` | top / compact on scroll; nav hover underline grows from the left; `aria-current` |
| MobileMenu | `components/site/mobile-menu.tsx` | open / closed; portalled to body; focus trap including the toggle; Escape; scroll lock |
| MobileBar | `components/site/mobile-bar.tsx` | 3 slots, first in red; under 1024 px only; body padding |
| Footer | `components/site/footer.tsx` | NAP, hours, DL # chip, columns, social (hidden when empty), cookie settings button, wedge |
| AnnouncementBar | `components/site/announcement-bar.tsx` | ink / red; dismissed per session; reappears when the text changes |
| CookieBanner | `components/site/cookie-banner.tsx` | banner, settings, decided (hidden); necessary locked; `mbc-consent` in localStorage; reopened from the footer |
| HoursTable | `components/site/hours.tsx` | placeholder rows, closed, today in bold |
| Hero | `components/sections/hero.tsx` | 1–5 slides; image or muted video; gradient/solid scrim; crossfade; prev/next/dots/pause; autoplay pauses on hover, focus or reduced motion; swipe; h1 on slide 1 only; inactive slides `inert` |
| PageHeader, ProofBar, Steps, SplitCta, Reviews, AreasServed, Team, Standards, NotFound | `components/sections/blocks.tsx` | Reviews: no stars while the rating is a placeholder; dashed placeholder cards. Team returns nothing while it has no members. |
| VisitUs | `components/sections/visit-us.tsx` | map placeholder → embed after marketing consent or "Load the map" |
| ContactCards, ContactForm | `components/sections/contact.tsx` | idle, invalid (inline message, error summary focused, `aria-invalid`), submitting (spinner), success (mock) plus "nothing is sent" notice; separate unticked optional marketing consent |
| FAQList, FAQTeaser | `components/sections/faq.tsx` | collapsed, expanded (plus rotates to ×, red), hover, focus; single or multiple open; jump links; empty state |
| RichTextBody, RichTextBlock, LegalBody | `components/sections/rich-text.tsx` | lawyer/owner marker callouts; merge tokens `{legalName}` `{businessName}` `{privacyEmail}` `{address}`; table of contents sticky from 1024 px |

All visible strings, including aria-labels, come from the content tree via `useT()`. Sections render through `SectionRenderer` (switch on `section.type`); pages render via `PageView`, which reads the tree in context, so admin preview can swap in the draft tree with no page changes.

## 5. Motion rules

- Only `transform` and `opacity` animate. The exceptions are the accordion (`grid-template-rows`) and small colour, width and border transitions on hover.
- Reveal on scroll is only active when JS has run (`html.js`) and `prefers-reduced-motion: no-preference`. Without JS, everything is visible.
- Hero autoplay never runs under reduced motion; it pauses on hover and focus, with a visible pause button. Interval is 4–10 s, so nothing changes more than once every 4 s.
- Page transition: 450 ms fade and rise on `main` per route. Nothing blocks content or delays LCP.
- A global reduced-motion rule sets all durations to 0.01 ms.

## 6. Images

- Hero: at least 1920 × 1080, subject on the right third (the scrim darkens the left, where the text sits). Video: muted, no audio, 8 MB or less, poster required.
- Scrim method: gradient from ink at (opacity + 0.1) on the text side to ink 15% on the far side. With the default 0.6, white text sits on at least 70% ink, which keeps it at or above 4.5:1 for any photo. Bottom scrims use opacity + 0.15 at the bottom.
- Until the owner supplies photos, every image slot shows the placeholder block, never a stock photo.

## 7. Accessibility rules

Skip link first; landmarks (`header`, `nav` with labels, `main#main`, `footer`); one `h1` per page (checked at 360 and 1440); focus ring 2 px red with 3 px offset (white on dark); tap targets at least 44 px; form errors are text plus icon, not colour alone; placeholders announced with their note; carousel uses `aria-roledescription` with labelled controls; FAQ uses buttons with `aria-expanded` and a `region`; the cookie dialog is non-modal and labelled; maps load only after consent.

## 8. Self-critique

### Stage 1 (layout → visual → motion)

| What was weak | What changed |
|---|---|
| Every page rendered in italic: the two downloaded Montserrat files were swapped (detected on screenshot, confirmed by matching the live site's upright file byte for byte). | Files renamed correctly; screenshots retaken. |
| The mobile menu drawer was trapped inside the sticky header, because `backdrop-filter` makes a containing block for fixed children. | Drawer portalled to `<body>`, sits under the header; the focus trap includes the header toggle so keyboard users can close it. |
| The hero headline at weight 800 made three weights in one layout (guideline: two). | All headings use 700. |
| React lint flagged state set inside effects (consent, announcement, hours, header, cookie banner). | Moved to `useSyncExternalStore` for storage, time and hydration; menu closes on route change during render; cookie settings state remounts per open. |
| The full-width footer wedge at 21% was too large and would sit under small text. | Footer uses `.wedge-xs`; split bands use the full wedge, where nothing sits in the corner. |
| The placeholder image block on ink with an inverted mark would recolour the logo. | Mark shown in its supplied colours at low opacity. |

Still weak (for stage 2): pages are image-placeholder heavy until real photos exist; the proof bar is all chips; the Visit-us section and the footer both show the full hours table on the home page. The mobile bar and mobile menu share the same `nav` label (needs a separate microcopy string, e.g. `nav.quickActions`).

## 9. Gate 2 self-critique (home + contact, 1440×900 and iPhone 13)

Screenshots: `docs/screenshots/gate2/` (`{home,contact}-{1440,390}-{a-banner,b-accepted,c-full}.png`, deviceScaleFactor 2) and `motion-home.mp4` (4 s, desktop, hero slide change and scroll reveals).

### Pass 1: layout

| Weak | Changed | Open |
|---|---|---|
| Hero slides were absolutely positioned inside a fixed min-height, so tall mobile content overflowed upward and the eyebrow was clipped under the sticky header. | Slides now share one CSS grid cell, so the hero grows to its tallest slide; content padding clears the header at every breakpoint (mobile `pt-8`, tablet `pt-16`, desktop `pt-20`). | — |
| Mobile cookie banner covered about 55% of the screen. | Bottom sheet above the mobile bar: body clamped to 3 lines (full text and settings behind "Choose"), buttons in one row, max 40% of the viewport. Measured 165 px = 25% of the 664 px iPhone 13 viewport. Desktop: 416 px card bottom-right, 27% of the height; no hero CTA under it at 1440×900 (checked by bounding boxes). | On a 664 px-tall iPhone viewport the sheet still overlaps the secondary "Text us" button and the text link until the visitor decides. The primary Call button stays visible, and Call/Text are always in the mobile bar. On the desktop Contact page the card covers the third phone card until dismissed. |
| Hero carousel controls sat bottom-right, under where the cookie card goes. | Controls moved bottom-left on desktop, aligned with the text column. | — |
| Small buttons were 40 px tall. | `sm` buttons are 44 px (our tap-target rule). | — |

### Pass 2: visual

| Weak | Changed | Open |
|---|---|---|
| The hero without a photo read as an empty black box, and the placeholder chip overlapped the headline on mobile. | Intentional placeholder: ink, the corner wedge, and the sedan mark large and cropped toward the bottom-right at 8%. The chip is small, bottom-right of the media, never over text. | Needs owner approval: on ink, the full-colour sedan mark's black half is invisible, so I added `mr-best-cars-sedan-mark-on-dark.svg`, the same shapes with black swapped for white only (the p. 4 rule used for the reversed logo; red unchanged). |
| No proof that the scrim works over a real photo. | Scrim rule: ink alpha ≥ 0.6 behind text (white text needs ≥ 0.576 over pure white). Desktop gradient is 0.8 → 0.72 across the text column → 0.21 at the far right; mobile is an even 0.7–0.8 overlay. Measured with test images (mid-grey, pure white, bright "sky/snow/red car") by hiding the text and reading the brightest pixel behind every text box: see the contrast table below. | Real lot photos may still need a focal point (`image.focalPoint`) so the car sits on the right. |
| The mobile bar reused the menu's label. | New microcopy `nav.quickActions` ("Quick contact"). | — |

Measured contrast, worst pixel behind the hero text:

| Test image | Viewport | Worst background | White headline | Light-grey subhead/eyebrow (#DFE0E1) |
|---|---|---|---|---|
| Mid-grey #808080 | 390 / 1024 / 1440 | rgb(50,51,53) / (48,50,51) / (46,48,49) | 12.65 / 12.89 / 13.26 : 1 | 9.57 / 9.75 / 10.03 : 1 |
| Pure white #FFFFFF | 390 / 1024 / 1440 | rgb(87,88,90) / (83,85,86) / (80,81,83) | 7.12 / 7.50 / 7.95 : 1 | 5.39 / 5.67 / 6.01 : 1 |
| Bright mixed | 390 / 1024 / 1440 | rgb(77,84,90) / (80,83,86) / (78,80,83) | 7.69 / 7.74 / 8.09 : 1 | 5.82 / 5.86 / 6.12 : 1 |

The first run of the desktop gradient (0.65 mid-stop) gave 4.28:1 for the grey subhead over pure white at 1024 px; the mid-stop was raised to 0.72 and re-measured.

### Pass 3: motion

| Weak | Changed | Open |
|---|---|---|
| Hero text and media changed at the same moment. | Media crossfades over 450 ms; text rises 16 px with a 100 ms delay; nothing moves under reduced motion and autoplay is off. | — |
| Reveals could start before JS or run twice. | Reveals only arm when `html.js` is set and motion is allowed; each element is revealed once (observer unobserves). | Reveal stagger on long lists (areas served) is 40 ms per item; fine at 9 items, should be capped if lists grow. |
| Page transition also played on first load. | It is a 450 ms opacity/transform enter on `main`, so it doesn't delay LCP (no layout change) and is skipped under reduced motion. | Measure LCP in Lighthouse at QA. |

## 10. Admin portal components (stage 3)

Routes (`demo/src/app/admin/**`, all `noindex`, no public chrome):

| Route | Screen |
|---|---|
| `/admin/login` | Non-functional sign-in: any input continues to the dashboard. Auth arrives in Phase 1 (`admin.login.note`). |
| `/admin` | Dashboard: a card per page (7) and per global document (6), with Draft/Published badge, Unsaved chip, last updated, open link |
| `/admin/pages/[slug]` | Page editor: section list plus field panel, SEO panel, page settings |
| `/admin/global/[element]` | Global editor: site (contact, phones, hours, licence, social, privacy officer), navigation (incl. 3 mobile bar slots), announcement, cookie banner, SEO defaults, interface text |
| `/admin/preview/[slug]` | The public page and chrome rendered from the DRAFT tree, under a sticky red "Previewing draft" bar with Exit |

| Component | File | Notes |
|---|---|---|
| AdminStoreProvider / useAdminStore | `components/admin/store.tsx` | `{ published, draft, dirty, previewMode }`, a deep copy of `publishedContent`, in React state only (no storage). Shared by every admin route through `app/admin/layout.tsx`, so edits survive client navigation to preview and back. Reload resets. |
| validateDoc / limitFor / isRequired | `components/admin/validate.ts` | Limits from `FIELD_LIMITS` (content model); required fields: headlines, headings, titles, link labels, names, questions, SEO title/description. The shipped content passes with 0 errors. |
| ValueEditor / ObjectEditor | `components/admin/fields.tsx` | Schema-driven: chooses the input from the value's shape and key. Covers LocalizedString (input/textarea with counter), Placeholder (value, "not supplied" toggle, note), Image (URL, alt, decorative, preview, upload-disabled note), Link/CTA (label, href, kind, style, icon, new tab), enums as selects, booleans, numbers (scrim opacity as slider), dates, times, nested objects. System fields (`meta`, `id`, `order`) are hidden; `type`, `key`, `day`, `slug` are read-only. |
| ArrayEditor | same | Add (blank copy with new id; respects max: slides 5, steps 4, CTAs 3, FAQ items 12, …), remove (respects min), move up/down; collapsible items with summary; fixed lists (mobile bar slots, days, consent categories) can't be added to or removed. Focus moves to the new item's first input; after remove, focus returns to Add; after a move, focus stays on the moved item's arrow. |
| RichTextEditor | same | Paragraph, heading (level), list (items, numbered), link, marker (lawyer/owner) blocks; add, remove, reorder. |
| PageEditor / GlobalEditor | `components/admin/editor.tsx` | Sticky action bar: Discard, Preview, Save draft, Publish; `role=status` live message; error summary (`role=alert`, focused, links to each field). Publish is blocked on validation errors; otherwise the draft is copied to published and the version is bumped. Section list: enable toggle, select, move up/down, error count per section. SEO panel: counters (60/155) and a search-result preview. |
| AdminShell, NothingSavedBanner, StateBadge | `components/admin/shell.tsx` | Ink top bar (logo on dark, Dashboard / View site / Sign out); persistent red-tint banner "Demo only. Nothing you change here is saved…" on every admin screen including login. Badge: Published (ink) or Draft (dashed red), plus Unsaved chip. |
| PreviewView, PreviewBar | `components/admin/preview.tsx`, `editor.tsx` | Nested `ContentProvider` with the draft tree inside the real `SiteChrome`; the public header sticks below the bar via `--sticky-offset`. |

Layout: two columns from 768 px (17–20 rem section list plus `minmax(0,1fr)` field panel); single column, stacked, at 360–767 px. Every grid uses explicit `grid-cols-1`/`minmax(0,1fr)` and fieldsets have `min-width: 0` (a select's intrinsic width otherwise widened the phone layout to 543 px).

All labels come from `microcopy.admin` (field names from `admin.fieldLabels`, section names from `admin.sectionTypes`). An unknown key falls back to a humanised key name.

### Stage 3 self-critique

| Weak | Changed |
|---|---|
| New FAQ items put focus on a read-only `id` field. | `id`/`order` hidden; focus goes to the first editable input. |
| Error summary said "Item 1 › Slides…" (section index). | Uses the section's name: "Hero banner › Slides › Item 1 › Headline". |
| A stray "0" legend inside each list item. | List items render their fields without a second frame. |
| Phone layout of the editor overflowed to 543 px. | `grid-cols-1` / `minmax(0,1fr)` everywhere; `fieldset { min-width: 0 }`. |
| Legal pages had about 160 px of empty space between header and body. | Legal body uses a `follow` padding (small top). |
| Four plain-bracket gaps in the legal copy ("[name or role]", "[age]", "[licence number]", "[email]") rendered as literal text. | Converted to `[OWNER: …]`, `[LAWYER TO CONFIRM: …]` and `[PLACEHOLDER: …]` so they show as chips. |
| Page transition was 450 ms. | 250 ms, opacity/transform only, off under reduced motion. |

Open: the admin edits English only (other locales are in the schema but not shown); optional fields that are absent in the content (e.g. a missing `secondaryCta`) can't be added from the UI; the admin interface itself reads published microcopy, so editing "Interface text" changes the site preview, not the admin labels.
