# Mr Best Cars: demo redesign (Phase 0)

A working demo of the new Mr Best Cars website and a mock admin portal. Frontend only: no database, no API, no login.

> **Review copy online:** https://mrbestcars.ca/demo/ (admin: https://mrbestcars.ca/demo/admin/login). The coming-soon page stays at https://mrbestcars.ca/. The demo is a static export of this folder copied into `../site/demo/` and served by the live site's Worker with `noindex`. It processes no data.

## Run it

Needs Node 20 or newer.

```bash
cd demo
npm install
npm run dev        # http://localhost:3000
```

For a production-like check: `npm run build` (static export to `out/`).

**Publish the review copy** to mrbestcars.ca/demo: `npm run build:live` (builds with base path `/demo` and copies `out/` to `../site/demo/`), then commit `site/demo/` and push to `main`. Cloudflare redeploys automatically.

- Public site: `/`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms` (any other path shows the 404 page)
- Admin portal: `/admin/login` (any email and password continue)

## Where the content lives

Every word, image, link, SEO field, FAQ item and legal paragraph comes from typed content files. No component contains visible text.

| What | File |
|---|---|
| Types for every field (the CMS schema) | `src/content/schema.ts` |
| Contact details, phones, address, hours, licence, social links, mobile bar | `src/content/global/site.ts` |
| Header, footer and mobile menu links | `src/content/global/navigation.ts` |
| Announcement bar | `src/content/global/announcement.ts` |
| Cookie banner | `src/content/global/cookie-banner.ts` |
| Site-wide SEO, Open Graph, structured data | `src/content/global/seo.ts` |
| Pages (sections, copy, page SEO) | `src/content/pages/*.ts` |
| Buttons, form errors, empty states, admin labels | `src/content/ui/microcopy.ts` |
| Brand tokens (Brand Guidelines v1.0) | `src/content/themes/tokens.ts`, `src/app/globals.css` |
| Brand files (unmodified copies from the live site) | `public/brand/` |

To change text, edit the content file and save; the dev server reloads. The same fields are what the admin portal edits.

**Placeholders.** Anything the owner has not confirmed (licence number, hours, reviews, warranty, years in business and so on) is a `Placeholder` with `isPlaceholder: true` and shows a visible `[PLACEHOLDER]` chip on the page. The full list is in `../docs/content-deck.md`. To fill one, set its `value` and `isPlaceholder: false`.

**Languages.** Every text field is `{ en, pa?, hi?, fr? }`. Only English is filled. See `../docs/audience-insights.md` s. 5.

## Admin portal

Design only. It edits an in-memory copy of the content: changes appear in Preview, Publish marks them as published, and **reloading the page resets everything**. Nothing is written to disk or sent anywhere, and the portal says so on every screen. Real saving, login and image upload arrive in Phase 1 (`../docs/roadmap.md`).

## Code map

| Folder | Contents |
|---|---|
| `src/app/(site)` | Public routes |
| `src/app/admin` | Admin login, dashboard, editors, preview |
| `src/components/sections` | One component per section type, plus the section renderer |
| `src/components/site` | Header, footer, mobile menu and bar, cookie banner, announcement bar |
| `src/components/ui` | Buttons, icons, layout pieces, placeholder chip |
| `src/components/admin` | Field editors generated from the content shape |
| `src/lib` | Content context, consent, SEO metadata and JSON-LD, link helpers |

## Project documents

All in `../docs/`: BRD, PRD, sitemap, content model, audience insights, content deck, design system, QA report, integrations, roadmap, compliance checklist, legal templates (`legal/`), agent log, and screenshots (`screenshots/`).

## Fonts and licences

Montserrat is self-hosted from `public/fonts/` under the SIL Open Font License 1.1 (`public/fonts/OFL.txt`). The logo and app icon are the owner's files. The page carries no stock photos; hero and section images are branded placeholders until the owner supplies photos.
