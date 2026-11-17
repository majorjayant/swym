# QA report (Phase 0 demo)

Version 1.0, 2026-11-17. Tester: QA agent. Build under test: `demo/` production build (`npm run build && npx next start -p 3100`), Chromium (Playwright), Lighthouse 12.6.0, axe-core via `@axe-core/playwright`.

**Result: pass. 0 open high-severity issues.** 12 issues logged: 0 high, 4 medium (all fixed), 8 low (1 fixed, 1 not a defect, 6 open with reasons).

## 1. Summary of results

| Area | Checks | Result |
|---|---|---|
| Layout at 360, 768, 1024, 1440, 1920 px | 7 public pages + admin login, dashboard and home editor (50 page × width combinations) | No horizontal overflow; one `h1` per page |
| Links | Every internal `href` on all public pages crawled | All 200 (the not-found route returns 404 as intended); `tel:`/`sms:` all `+1` + 10 digits; same-page anchors all resolve |
| Functional (public) | 39 scripted checks: cookie banner, mobile menu, mobile bar, FAQ accordion, contact form validation and success, hero carousel, reduced motion, keyboard, target sizes | 39/39 pass after fixes |
| Functional (admin → preview) | 13 scripted checks, one per editor type | 13/13 pass |
| Accessibility (axe, WCAG 2.0/2.1/2.2 A and AA) | 10 routes at 360 and 1440 px | 0 violations after fixes |
| Keyboard | Home: 44 tab stops | Skip link first, moves focus to `main`; focus ring visible on every stop; no focus on hidden slides; no traps |
| Lighthouse | Home and Contact, mobile and desktop | Performance 96–100, Accessibility 100, Best Practices 100; SEO 66 because of the deliberate demo `noindex`, 100 with that one audit excluded |
| Compliance grep (PRD X-12) | Built public HTML | No restricted words, no competitor names, no personal names |
| Content rule (no hard-coded text) | `src/components/**`, `src/app/**`, `src/lib/**` | No visible string literals after fix QA-05 |

## 2. Issues

| ID | Area | Severity | Steps | Expected | Actual | Fix | Retest |
|---|---|---|---|---|---|---|---|
| QA-01 | Admin header (a11y) | Medium | Open `/admin` at 360 px; run axe | Logo link has an accessible name | axe `link-name` (serious): the logo `img` had `alt=""` and the "Mr Best Cars admin" text is hidden below 640 px | `components/admin/shell.tsx`: logo `alt` now reads `site.logo.dark.alt` | Pass (0 violations at 360 and 1440) |
| QA-02 | Home proof bar (WCAG 2.2 2.5.8) | Medium | iPhone 13, Home; measure the "Dealer licence" link | Target ≥ 24 × 24 px | 99 × 18 px | `components/sections/blocks.tsx`: proof-bar links `inline-flex min-h-6 items-center` | Pass |
| QA-03 | Contact form checkboxes | Low | iPhone 13, Contact; measure consent checkboxes | ≥ 24 px (our rule) | 20 × 20 px (the clickable label makes the real target larger, so arguably already compliant) | `components/sections/contact.tsx`: checkboxes `size-6` | Pass |
| QA-04 | Admin selects | Medium | Open the home editor; look at Kind / Theme / Direction / Style selects | Human labels | Raw values (`image`, `gradient`, `dark`, `left`, `primary`) | New `microcopy.admin.optionLabels` (field-specific key such as `variant.text` wins over the plain value); `SelectInput` in `components/admin/fields.tsx` uses it; schema updated | Pass (e.g. Theme=Dark, Kind=Image, Kind=Phone call, Style=Main (red)) |
| QA-05 | Contact select (content rule) | Medium | Contact form, "How should we reply?" | Empty option text comes from content | Hard-coded `—` in the component | New `microcopy.forms.selectPrompt` ("Choose one"), or the field's own `placeholder` if set; content deck updated | Pass |
| QA-06 | Home contrast at 360 px | Low (not a defect) | axe right after `networkidle` on Home at 360 px | No contrast failures | 2 `color-contrast` nodes flagged in one run | None needed: axe measured text mid-way through a scroll-reveal fade. Re-run after the reveal settles (and under reduced motion): 0 nodes | Pass |
| QA-07 | Cookie banner timing | Low, open | Load Home in a fresh browser | Banner visible on first paint | Appears about 170–190 ms after load, because it renders on the client once it has checked for a stored choice; CLS stays 0 | Accepted for Phase 0. In Phase 1 a consent cookie read on the server can render it on first paint | n/a |
| QA-08 | Cookie sheet on phones | Low, open | iPhone 13, Home, first visit | Hero buttons all visible | The bottom sheet covers the secondary "Text us" hero button and the text link until the visitor chooses; Call stays visible and Call/Text are always in the mobile bar | Accepted (known from Gate 2); revisit if analytics show hero Text taps matter | n/a |
| QA-09 | SEO score | Low, expected | Lighthouse SEO on any page | ≥ 90 | 66 | Caused only by `is-crawlable`: the demo sets `robots noindex` on purpose (content `seo.robots.index: false`). With that audit skipped: 100 on Home and Contact. Flip the field before launch | n/a |
| QA-10 | Home LCP on mobile | Low, open | Lighthouse mobile, Home | LCP < 2.5 s | 2.7 s (score still 96); the hero has no real image yet | When the real hero photo arrives: serve AVIF/WebP at responsive sizes and preload slide 1's poster (already wired as priority) | n/a |
| QA-11 | Hours table | Low, accepted | Hours with placeholder values | No hard-coded text | A decorative en dash literal, `aria-hidden`, next to the visible placeholder badge | Kept: punctuation, not copy; the badge carries the meaning | n/a |
| QA-12 | Admin scope | Low, open | Try to add a second button that is missing from a slide; switch language | Add optional fields; edit other locales | Not possible: the editor edits fields that exist, in English only (known from the Designer's stage 3 log) | Phase 1, with the real CMS (which provides both) | n/a |

## 3. Functional checks (final run)

Public (39/39): same-page anchors on 6 pages; `/about#licence` target; `tel:`/`sms:` format; cookie banner shown on first visit, hidden after "Necessary only", choice stored in `mbc-consent`, stays hidden after reload, reopened by the footer "Cookie settings" button with 3 category toggles; mobile menu opens (`aria-expanded`), Escape closes and returns focus to "Open menu"; mobile bar fixed at the bottom and the footer clears it on every page; FAQ Enter expands, panel linked with `aria-controls`, Space collapses; contact empty submit focuses the error summary; invalid fields get `aria-invalid` and `aria-describedby`; invalid email and phone messages; consent required message; both consent boxes unchecked by default; success state shows the demo notice; hero next/previous, pause toggles to play, hidden slides are inert; reduced motion: no autoplay after 9 s, all reveals visible; skip link is the first tab stop and moves focus to `main`; focus visible on all 44 tab stops; target size ≥ 24 px on Home, Contact and FAQ.

Admin → preview (13/13): text field (hero headline); image address and alt text; section toggle (Reviews hidden); section reorder (Visit us above Areas served); placeholder toggle (badge removed, value 42 shown); rich text (privacy paragraph); global phone (footer updates); announcement enable (bar visible); edits kept across editors; reload resets the draft; no page errors. The Designer's own 19 checks (login, publish blocked on an empty required field, publish success, FAQ add) also passed in stage 3.

## 4. Lighthouse (scores only)

| Page | Device | Performance | Accessibility | Best practices | SEO | SEO without `is-crawlable` | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|---|
| Home | Mobile | 96 | 100 | 100 | 66 | 100 | 2.7 s | 50 ms | 0 |
| Home | Desktop | 100 | 100 | 100 | 66 | — | 0.6 s | 0 ms | 0 |
| Contact | Mobile | 99 | 100 | 100 | 66 | 100 | 2.1 s | 60 ms | 0 |
| Contact | Desktop | 100 | 100 | 100 | 66 | — | 0.6 s | 0 ms | 0 |

Total transfer about 300 KiB per page. Remaining Lighthouse hints are framework-level (about 26 KiB unused JS, 13 KiB legacy JS polyfills) and not worth custom work in Phase 0.

## 5. Evidence (`docs/screenshots/qa/`)

`cookie-1440.png` (banner on first visit), `mobile-menu-390.png`, `mobile-footer-bottom-390.png` (footer clears the mobile bar), `focus-skiplink-1440.png`, `focus-faq-1440.png`, `contact-errors-1440.png`, `contact-success-1440.png`, `admin-select-labels-1440.png` (QA-04), `admin-preview-announcement-1440.png` (admin edit visible in preview).

## 6. Not covered

- Real devices and Safari/Firefox: Chromium emulation only.
- Screen readers: structure checked (roles, names, live regions) but no NVDA/VoiceOver session.
- The live Google Map embed: Google is blocked in this sandbox, so the consent-gated iframe was not seen loading.
- Lighthouse ran on localhost; numbers on Cloudflare will differ.
