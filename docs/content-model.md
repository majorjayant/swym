# Content model

Version 0.1, 2026-11-17. This is the CMS-shaped schema every component reads from. No component may contain a visible string; it must read a field defined here. The shape is plain JSON-compatible so it can move to a headless CMS and API in Phase 1 without component changes.

## 1. File layout (for the Designer)

```
demo/
  src/
    content/
      schema.ts            # all TypeScript types below (single source of truth)
      index.ts             # getContent(locale, state) -> loads the files below
      global/
        site.ts            # SiteSettings
        navigation.ts      # Navigation
        announcement.ts    # AnnouncementBar
        cookie-banner.ts   # CookieBanner
        seo.ts             # SEODefaults + JSON-LD inputs
      pages/
        home.ts            # Page<HomeSections>
        about.ts
        contact.ts
        faq.ts
        privacy.ts
        terms.ts
        not-found.ts
      ui/
        microcopy.ts       # Microcopy (buttons, form errors, empty states, admin UI labels)
      themes/
        tokens.ts          # DesignTokens for Brand Guidelines v1.0 (owner decision, BRD s. 7)
```

Rules:
- Every exported object is typed with `satisfies` against `schema.ts`.
- Admin portal edits a copy of these objects in React state (draft) and shows them in preview; "publish" swaps draft into the in-memory published copy. Nothing is written to disk (Phase 0).
- `getContent(locale, state)` returns the published or draft tree for one locale.

## 2. i18n strategy

Recommended: **localized string objects**, not per-locale documents.

```ts
type LocalizedString = { en: string; pa?: string; hi?: string; fr?: string };
type Locale = 'en' | 'pa' | 'hi' | 'fr';
```

- Every text field is a `LocalizedString`. Only `en` is required in Phase 0.
- Components call `t(field, locale)` which falls back to `en`.
- Why this over per-locale documents: one document per page keeps structure (sections, order, images, links) identical across languages and lets the admin edit a translation next to the source. A CMS such as Sanity or Payload maps this to field-level localization directly. Per-locale documents drift (different section counts) and double the admin work.
- Non-text fields (images, links, numbers, booleans) are not localized, except `Image.alt` and `Link.label`.
- A `languageToggle` setting (hidden in Phase 0) lists enabled locales.

## 3. Base types

| Type | Fields | Notes |
|---|---|---|
| `LocalizedString` | `en` (string, required), `pa`, `hi`, `fr` (optional) | all visible text |
| `Image` | `src` (string, required), `alt` (LocalizedString, required, ≤ 125 chars), `width` (number), `height` (number), `focalPoint` ({x,y} 0–1, optional) | `alt` may be empty string only when `decorative: true` |
| `Link` | `label` (LocalizedString, ≤ 40), `href` (string), `kind` (`'internal' \| 'external' \| 'tel' \| 'sms' \| 'mailto' \| 'map'`), `newTab` (boolean, default false), `ariaLabel` (LocalizedString, optional) | |
| `CTA` | extends `Link`; `variant` (`'primary' \| 'secondary' \| 'text'`), `icon` (string enum, optional) | |
| `RichText` | array of blocks: `paragraph`, `heading` (level 2–4), `list` (ordered/unordered), `link` | legal pages, long answers |
| `Placeholder` | `value` (string), `isPlaceholder` (boolean), `note` (string) | wraps any fact the owner must supply; rendered with a visible marker while `isPlaceholder` is true |
| `PublishState` | `'draft' \| 'published'` | |
| `DocumentMeta` | `id`, `updatedAt` (ISO), `updatedBy` (string), `state` (PublishState), `version` (number) | on every document |

## 4. Global documents

### SiteSettings (`global/site.ts`)

| Field | Type | Req | Limits | Default |
|---|---|---|---|---|
| `businessName` | LocalizedString | yes | ≤ 60 | Mr Best Cars |
| `legalName` | string | no | ≤ 120 | `[PLACEHOLDER: registered legal name]` |
| `tagline` | LocalizedString | yes | ≤ 60 | Buy · Sell · Drive Better (Brand Guidelines v1.0) |
| `logo` | `{ light: Image; dark: Image; icon: Image }` | yes | SVG/PNG | copied unmodified from `site/assets/` into `demo/public/brand/`: `mr-best-cars-logo.svg` (on light), `mr-best-cars-logo-on-dark.svg` (on ink), `favicon-32.png` / `apple-touch-icon.png` (app icon) |
| `address` | `{ street, city, region, postalCode, country, mapUrl }` | yes | | 909 8th Ave / Regina / SK / S4N 6S3 / CA / Google Maps search URL |
| `geo` | `{ lat, lng }` | no | | `[PLACEHOLDER: coordinates]` |
| `phones` | `Phone[]` → `{ label: LocalizedString, number: string (E.164), display: string, primary: boolean, sms: boolean }` | yes, ≥ 1 | ≤ 3 shown in footer | 639-480-4400 (primary), 306-999-2245, 306-942-7200; `sms` is `[PLACEHOLDER: which number accepts texts]` |
| `email` | string | no | | `[PLACEHOLDER: public email]` (hidden when empty) |
| `whatsapp` | string | no | E.164 | `[PLACEHOLDER]` (hidden when empty) |
| `hours` | `Hours` | yes | | all days `[PLACEHOLDER]` |
| `dealerLicence` | Placeholder | yes | ≤ 20 | `[PLACEHOLDER: DL number]` |
| `foundedYear` | Placeholder | no | 4 digits | `[PLACEHOLDER]` |
| `socialLinks` | `SocialLink[]` → `{ platform: enum('facebook','instagram','google','youtube','tiktok','x'), url, label: LocalizedString }` | no | | empty; each hidden when `url` empty |
| `enabledLocales` | Locale[] | yes | | `['en']` |
| `mobileBar` | `{ slots: CTA[] }` | yes | exactly 3 | Call, Text, Contact |

### Hours

| Field | Type | Req | Limits | Default |
|---|---|---|---|---|
| `days` | `DayHours[7]` → `{ day: enum(mon..sun), open: 'HH:MM' \| null, close: 'HH:MM' \| null, closed: boolean, note: LocalizedString? }` | yes | 7 entries | `[PLACEHOLDER]`, `closed: false` |
| `holidayNote` | LocalizedString | no | ≤ 120 | empty |
| `timezone` | string | yes | | America/Regina |

### Navigation (`global/navigation.ts`)

| Field | Type | Req | Limits | Default |
|---|---|---|---|---|
| `header.links` | Link[] | yes | ≤ 7 | Home, About, FAQ, Contact |
| `header.ctas` | CTA[] | yes | ≤ 2 | Call (primary), Text (secondary) |
| `header.skipLinkLabel` | LocalizedString | yes | ≤ 40 | from microcopy |
| `footer.columns` | `{ heading: LocalizedString, links: Link[] }[]` | yes | ≤ 4 columns, ≤ 8 links each | Pages, Legal |
| `footer.legalLine` | LocalizedString | yes | ≤ 200 | © line with `{year}` token |
| `footer.showLicence` | boolean | yes | | true |
| `mobileMenu.links` | Link[] | yes | ≤ 8 | same as header plus legal |

### AnnouncementBar (`global/announcement.ts`)

| Field | Type | Req | Limits | Default |
|---|---|---|---|---|
| `enabled` | boolean | yes | | false |
| `text` | LocalizedString | yes | ≤ 110 | `[PLACEHOLDER]` |
| `link` | Link | no | | none |
| `dismissible` | boolean | yes | | true |
| `theme` | enum('ink','accent') | yes | | ink |
| `startAt`, `endAt` | ISO date | no | | none |

### CookieBanner (`global/cookie-banner.ts`)

| Field | Type | Req | Limits | Default |
|---|---|---|---|---|
| `enabled` | boolean | yes | | true |
| `title` | LocalizedString | yes | ≤ 60 | agent 3 |
| `body` | LocalizedString | yes | ≤ 300 | agent 3 |
| `acceptLabel`, `rejectLabel`, `settingsLabel` | LocalizedString | yes | ≤ 30 | agent 3 |
| `categories` | `{ key: enum('necessary','analytics','marketing'), label, description, required: boolean }[]` | yes | 3 | necessary required |
| `policyLink` | Link | yes | | /privacy |

### SEODefaults (`global/seo.ts`)

| Field | Type | Req | Limits | Default |
|---|---|---|---|---|
| `siteUrl` | string | yes | | https://mrbestcars.ca |
| `titleTemplate` | string | yes | ≤ 30 | `%s | Mr Best Cars` |
| `defaultTitle` | LocalizedString | yes | ≤ 60 | agent 3 |
| `defaultDescription` | LocalizedString | yes | ≤ 155 | agent 3 |
| `ogImage` | Image | yes | 1200×630 | `site/assets/og-image.png` |
| `twitterCard` | enum | yes | | summary_large_image |
| `jsonLd.type` | enum('AutoDealer') | yes | | AutoDealer |
| `jsonLd.aggregateRating` | `{ enabled: boolean, value?, count? }` | yes | | `enabled: false` until real reviews exist |
| `robots` | `{ index: boolean }` | yes | | demo: false |

## 5. Page documents

### Page<TSections>

| Field | Type | Req | Limits | Default |
|---|---|---|---|---|
| `meta` | DocumentMeta | yes | | |
| `slug` | string | yes | | per page |
| `seo` | `SEOFields` → `{ title: LocalizedString ≤ 60, description ≤ 155, ogTitle? ≤ 70, ogDescription? ≤ 200, ogImage?: Image, canonical?: string, noindex: boolean }` | yes | | agent 3 |
| `breadcrumbLabel` | LocalizedString | yes | ≤ 30 | |
| `sections` | `Section[]` (ordered; admin can reorder within allowed set) | yes | | per page |

### Section variants

Each section has `id`, `type`, `enabled: boolean`, `anchor?: string`, `theme: enum('light','dark')`.

| Type | Fields (all text LocalizedString) | Limits | Used on |
|---|---|---|---|
| `hero` | `slides: HeroSlide[]`, `autoplay: boolean`, `intervalMs: number` | 1–5 slides; 4000–10000 ms | Home |
| `pageHeader` | `eyebrow?` ≤ 30, `heading` ≤ 70, `intro?` ≤ 220, `image?: Image` | | About, Contact, FAQ, legal, 404 |
| `proofBar` | `items: ProofItem[]` → `{ label ≤ 30, value: Placeholder, suffix? ≤ 20, link?: Link }` | 2–5 items | Home |
| `steps` | `heading` ≤ 60, `intro?` ≤ 200, `steps: { title ≤ 40, body ≤ 160, icon: enum }[]`, `cta?: CTA` | 3–4 steps | Home |
| `splitCta` (sell-or-trade band) | `heading` ≤ 60, `body` ≤ 220, `primary: CTA`, `secondary?: CTA`, `image?: Image` | | Home |
| `reviews` | `heading` ≤ 60, `intro?` ≤ 160, `rating: Placeholder`, `count: Placeholder`, `items: Review[]` → `{ quote ≤ 280, author ≤ 40, source: enum('google','facebook','other'), date?: ISO, isPlaceholder: boolean }`, `profileLink?: Link` | 3–6 items | Home |
| `areasServed` | `heading` ≤ 60, `intro?` ≤ 200, `areas: { name ≤ 40, href?: string }[]` | ≤ 12 | Home |
| `visitUs` | `heading` ≤ 60, `body?` ≤ 200, `showMap: boolean`, `mapEmbedUrl?`, `showHours: boolean`, `ctas: CTA[]` | ≤ 3 CTAs | Home, Contact |
| `richText` | `heading?` ≤ 70, `body: RichText` | | About, legal |
| `team` | `heading` ≤ 60, `members: { name ≤ 60, role ≤ 60, photo?: Image, bio? ≤ 300 }[]` | ≤ 8 | About |
| `standards` (inspection/warranty) | `heading` ≤ 60, `items: { title ≤ 50, body: Placeholder, icon: enum }[]` | ≤ 6 | About |
| `contactForm` | `heading` ≤ 60, `intro?` ≤ 200, `fields: FormField[]`, `consentText` ≤ 400, `submitLabel` ≤ 30, `successTitle` ≤ 60, `successBody` ≤ 200, `disabledNotice` ≤ 200 | | Contact |
| `faqList` | `heading` ≤ 60, `intro?` ≤ 200, `groups: FAQGroup[]` | | FAQ; `faqTeaser` variant on Home with `limit` |
| `legalBody` | `effectiveDate: ISO`, `lastReviewed: ISO`, `disclaimer` ≤ 300, `body: RichText`, `lawyerMarkers: boolean` | | Privacy, Terms |
| `notFound` | `heading` ≤ 60, `body` ≤ 200, `ctas: CTA[]` | ≤ 3 | 404 |

### HeroSlide

| Field | Type | Req | Limits | Default |
|---|---|---|---|---|
| `id` | string | yes | | |
| `media.kind` | enum('image','video') | yes | | image |
| `media.image` | Image | yes (poster when video) | ≥ 1920×1080 | `[PLACEHOLDER: lot photo]` |
| `media.video` | `{ src: string, muted: true, loop: boolean }` | when kind=video | ≤ 8 MB, no audio | none |
| `scrim` | `{ kind: enum('gradient','solid'), opacity: 0–1, direction: enum }` | yes | | gradient 0.55 |
| `eyebrow` | LocalizedString | no | ≤ 30 | |
| `headline` | LocalizedString | yes | ≤ 60 | agent 3 |
| `subhead` | LocalizedString | no | ≤ 140 | agent 3 |
| `primaryCta` | CTA | yes | | |
| `secondaryCta` | CTA | no | | |
| `textLink` | Link | no | | "Sell or trade your car" |
| `align` | enum('left','centre') | yes | | left |
| `enabled` | boolean | yes | | true |

### FAQGroup / FAQItem

| Field | Type | Req | Limits |
|---|---|---|---|
| `FAQGroup.id`, `title` (≤ 40), `items: FAQItem[]` | | yes | ≤ 12 items per group |
| `FAQItem.id` | string | yes | |
| `FAQItem.question` | LocalizedString | yes | ≤ 120 |
| `FAQItem.answer` | RichText | yes | ≤ 800 chars plain |
| `FAQItem.order` | number | yes | |
| `FAQItem.needsOwnerInput` | boolean | yes | marks answers with placeholders |
| `FAQItem.showOnHome` | boolean | yes | |

### FormField (client-side only in Phase 0)

| Field | Type | Limits |
|---|---|---|
| `name` | string | |
| `label` | LocalizedString | ≤ 40 |
| `type` | enum('text','email','tel','textarea','select','checkbox') | |
| `required` | boolean | |
| `placeholder?` | LocalizedString | ≤ 40 |
| `options?` | `{ value, label }[]` | select |
| `validation` | `{ pattern?: string, minLength?, maxLength?, errorMessage: LocalizedString ≤ 120 }` | |
| `autocomplete?` | string | |

## 6. Microcopy (`ui/microcopy.ts`)

All LocalizedString. Groups: `nav` (skip link, open menu, close menu, call, text), `buttons` (learn more, read more, back home, submit, sending, try again), `forms` (required, invalid email, invalid phone, too long, consent required, generic error, success), `states` (loading, empty, offline), `cookie` (handled in CookieBanner), `faq` (expand, collapse, no results), `placeholderBadge` (the visible "[PLACEHOLDER]" label text and tooltip), `admin` (all portal labels: dashboard, pages, global, draft, published, save draft, publish, discard, preview, exit preview, nothing-is-saved notice, add item, remove, move up, move down, login fields, sign in).

## 7. Design tokens (`themes/tokens.ts`)

`DesignTokens` = `{ colour: Record<'ink'|'red'|'white'|'lightGrey'|'slate', string>, font: { body: 'Montserrat' }, scale (p. 16: display 64/800, headline 40/700, title 24/600, body 16/400, caption 12/500, label 12/700 tracked 18%), spacing, radius (cards square in print; app icon 19%; web: 8 px cards per live site), shadow (none in brand; keep to subtle elevation only), motion }`. One token set, `brandV1`, with the Guidelines v1.0 values: Ink #111315, Red #E30613, White #FFFFFF, Light grey #DFE0E1, Slate #3C4246. The schema keeps a `theme` key so a future CMS could add another.

## 8. Admin document shape

```ts
type Store = {
  published: ContentTree;   // loaded from content files
  draft: ContentTree;       // deep copy, edited in the portal
  dirty: boolean;           // true after any edit; "nothing is saved" notice always shown
  previewMode: boolean;     // public layout reads draft when true
};
```

Every editor renders from the schema: a field's `type` chooses the input, `limits` set `maxLength`, `required` sets validation. Lists (slides, FAQ items, links, phones, team) support add, remove, move up/down.

## 9. Placeholder register (owner must supply)

Dealer licence number · opening hours · founding year · public email · which number accepts texts · WhatsApp number · Google rating and review count · review quotes · inspection checklist · warranty terms · exchange/return policy · hero photos or video · team photos and bios · legal name · map coordinates · social URLs · whether consignment is offered · delivery/pickup policy.
