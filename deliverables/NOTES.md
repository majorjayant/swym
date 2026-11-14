# Mr Best Cars: coming-soon page, delivery notes

The live page is `site/swym/index.html`. Cloudflare serves it at `https://jayantarora.in/swym/`.
The folder `site/swym/` can also be deployed as-is to any static host.

## What's here

| File | What it is |
|---|---|
| `site/swym/index.html` | The page: one HTML file with critical CSS, the logo SVG and the loader script all inline (about 19 KB) |
| `site/swym/assets/manrope-latin.woff2` | Manrope variable font, weights 400–700, Latin subset, self-hosted (SIL OFL, fine for commercial use) |
| `site/swym/assets/mr-monogram-dark.svg` | Favicon (SVG) |
| `site/swym/assets/favicon-32.png`, `apple-touch-icon.png` | PNG favicon fallbacks |
| `site/swym/assets/og-image.png` | 1200×630 social share image (monogram on ink) |
| `site/swym/assets/mr-best-cars-logo-animatable.svg` | Standalone copy of the inlined logo |
| `deliverables/screenshot-*.png` | Final state at 360, 768 and 1440 px (2× scale) |
| `deliverables/loader-recording.mp4` | The loader at 1280×800, about 3 s |

## Checks run
- Lighthouse 12.6, mobile and desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100. CLS 0. Total transfer 45 KB including the font (about 21 KB without it).
- At 360, 768 and 1440 px: no horizontal scroll. Both links are 44 px tall or more.
- Loader: plays once per session, and any click, tap or key skips it. It ends within about 2.4 s; a 2.45 s timer and a CSS failsafe at 2.5 s guarantee that.
- No JavaScript: the full page and logo show with no overlay. Reduced motion: no animation.
- No animation library. The loader uses plain CSS and the Web Animations API, and animates only `transform`, `opacity` and `stroke-dashoffset`.

## Assumptions and things I could not verify

1. **The two logo SVGs were not supplied.** Only the brand-guidelines PDF was attached, and every page of it is a flat raster image with no vector artwork. I traced the logo and the MR monogram from the PDF's 3840 px artwork (pages 1 and 8) using potrace. I did not redraw them. The traced logo uses the structure the brief specifies: `#roofline`, `#roofline-center` inside a mask with `pathLength="1"`, and 10 `path.letter` elements inside `#wordmark`. **Swap in the approved `mr-best-cars-logo-animatable.svg` before launch.** Paste it over the `<svg>` inside `<div id="logo">`. The loader script reads only those IDs and the class, so it should work unchanged. If the approved file's viewBox is not 1180×189, also update `aspect-ratio` on `.logo`. Then replace `assets/mr-monogram-dark.svg` and regenerate the PNG icons and the OG image.
2. **Nose direction.** I took the right end as the nose (long hood) and the left as the tail, so the roofline draws left to right.
3. **Two different headings in the brief.** "Page content" asks for the heading "Coming soon"; "Copy and SEO" asks for "Warming up. Back shortly." The h1 is "Warming up. Back shortly." and "Coming soon" sits above it as a short gold label.
4. **SEO phrases.** "pre-owned cars Regina" appears through the given line "Pre-owned cars in Regina." For "used cars Regina" I added one footer line: "Used cars in Regina, bought, sold and traded on 8th Ave." "used cars Regina" without "in" does not read naturally. This is the only text added beyond the specified content.
5. **"Kilometres"** does not appear: nothing on the page refers to distance, and adding it would mean inventing content.
6. **Address.** Confirmed by the client: 909 8th Ave, Regina, SK  S4N 6S3. It appears on the page, in the maps link and in the JSON-LD (with the postal code). The meta description keeps the brief's wording, "909 8th Ave, Regina".
7. **JSON-LD type.** The type is `AutoDealer`, which is a schema.org subtype of `LocalBusiness`. It contains only the name, phone, address, URL, image and founder with job title.
8. **Canonical and OG URLs** are set to `https://jayantarora.in/swym/`. If the site moves to its own domain, update `canonical`, `og:url`, `og:image` and the JSON-LD `url` and `image`.
9. **Font loading** uses `font-display: optional` with a preload, so the layout never shifts. On a very slow first visit the system font may show until the next page load.
10. **Rust #A94A22** is not used anywhere; the page is all on ink.
11. **Not verified:** Lighthouse was run against a local server, not the live Cloudflare URL (the network here blocks that domain). I also have no real Safari or iOS device, so I could not check the transform-scaled logo for raster softness there.
