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
