# Mr Best Cars: coming-soon page, delivery notes (v2: black/red identity)

The live page is `site/swym/index.html`. Cloudflare serves it at `https://jayantarora.in/swym/`.
The folder `site/swym/` can also be deployed as-is to any static host.

## Source artwork
The design comes from the brand identity board image (MR_Best_Cars_Brand_Identity_Board.png, 1672×941).
The attached PDF is the earlier gold/ink guideline; it was not used for v2.
Nothing was redrawn. All artwork was extracted from the board:

| Asset | How it was made |
|---|---|
| `assets/mr-best-cars-logo.svg` (also inlined in the page) | Logo crop (car silhouette, wordmark, red underline, tagline), upscaled 4× and traced with potrace into two flat colours. It is split into `#car`, `#wordmark .letter` ×10, `#underline` and `#tagline` so the loader can animate the parts. |
| `assets/mr-best-cars-logo-on-dark.svg` | Same vectors with the black recoloured white, as the board shows on the shopfront and the black business card. |
| `assets/mr-best-cars-icon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Traced from the board's black rounded app icon |
| `assets/og-image.png` | Logo on white, 1200×630 |
| Colours | Sampled from the board's swatches: black #101416, red #E40103, light grey #DFE0E1, plus white |
| Red corner on the contact card | Taken from the board's business-card mock-up |

## Changes from v1
- White page with black and red, matching the board. The gold, ink and Manrope look is gone.
- Font: Montserrat (SIL OFL, self-hosted, weights 400–800). It is the closest open font to the board's spaced caption type. The logo lettering itself is vector outlines.
- Loader: the car sweeps in from the left, the letters rise in with a stagger, the red underline draws, the tagline fades in, then the logo moves to the header as the white overlay fades. It ends within about 2.3 s, plays once per session and can be skipped. It animates only transform and opacity, uses no library, and respects reduced motion and no-JS. The v1 "roofline sheen" was dropped because this logo has no single roofline stroke.
- Contact details and page copy are unchanged.

## Assumptions and limits
1. The logo's red has a soft shading gradient in the board image. The vector uses the flat red sampled from the swatch, which also follows the board's "flat" logic for print.
2. The logo's own tagline reads "Buy • Sell • Drive Better", and the page line keeps the brief's "Buy · Sell · Trade." Tell me if the page line should switch.
3. The board's lifestyle mock-ups (shopfront, SUV wrap, business cards) are not used as photos. They are generated mock-ups of a building and vehicle that are not the dealership, and they are too low-resolution for the web.
4. Address: 909 8th Ave, Regina, SK  S4N 6S3 (confirmed by the client). It is on the page, in the maps link and in the JSON-LD. The meta description keeps the brief's wording.
5. "Kilometres" is not used, because nothing on the page refers to distance.
6. Not verified: Lighthouse was not re-run for v2, since you asked for no local server and this environment cannot reach the live domain. Please run it on the live URL. v1 scored 100/100/100/100; v2 uses the same structure, but the inline logo is larger (page HTML about 66 KB, roughly 25 KB gzipped).
7. Checked: no horizontal scroll at 360, 768 and 1440 px, all links 44 px tall or more, and no console errors. The page renders fully with JavaScript off.
