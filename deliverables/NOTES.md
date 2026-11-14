# Mr Best Cars: coming-soon page, delivery notes (v3: Brand Guidelines v1.0)

The live page is `site/swym/index.html` at https://jayantarora.in/swym/.
The folder `site/swym/` can be deployed as-is to any static host.

## Source
Brand Guidelines v1.0 (November 2026, 29 pages). The page now follows it. All logo artwork was extracted from the PDF's embedded masters (PNG with transparency). Nothing was redrawn.

| Asset | From the guideline PDF |
|---|---|
| Logo inlined in the page, `assets/mr-best-cars-logo.svg` | 1144×315 primary master (p. 3), traced to vectors in the two supplied colours #111315 / #E30613 |
| `assets/mr-best-cars-logo-on-dark.svg` | The same, with black swapped for white only, as p. 4 specifies |
| `assets/mr-best-cars-sedan-mark.svg`, also inlined | 1138×172 sedan mark (p. 8), used as the page's background decoration |
| `favicon-32.png`, `apple-touch-icon.png` | 297×290 app icon (p. 8), resized; no tracing |
| `og-image.png` | Primary logo on white plus the corner wedge, laid out like the social cover (p. 26) |

## Guideline rules applied
- **Palette (p. 11):** Ink #111315, Red #E30613, White, Light grey #DFE0E1 (card labels), Slate #3C4246 (secondary text). All pairings used are from p. 12: ink on white 18.6:1, slate on white 10.2:1, red on white 4.9:1, white on ink 18.6:1, light grey on ink 14.1:1. Red is never used for text on ink (p. 13).
- **Type (pp. 15–16):** Montserrat only, with two weights in the layout: Regular 400 and Bold 700. The headline is 40 px Bold in sentence case (32 px on phones). The "COMING SOON" label is 12 px Bold, capitals, tracked 18%.
- **Logo (pp. 5–7):** screen size 280–560 px wide, above the 260 px minimum. Clear space of one X is kept on every side. The logo is never placed on ink in full colour.
- **Graphic elements (p. 17):** short red rule between groups, red underline on contact links, and the corner wedge at the exact geometry (starts 79% along the bottom, meets the right edge at 77% of a 3.5×2 card). On tall phone cards it keeps the same angle.
- **Tone (p. 19):** "Warming up. Back shortly." is one of the guideline's own example headlines.

## Background
The supplied sedan mark sits at 5% opacity as a wide, full-bleed band across the bottom of the page, above the footer line and cropped by the screen edges. You chose this placement (Option A) from three mock-ups. It never sits behind text. It is decoration at large size, as p. 17 allows, and the primary logo stays the main brand mark. It is `aria-hidden`.

## Contact
Rohit Chawla and his title were removed at your request. The three phones are 639-480-4400, 306-999-2245 and 306-942-7200, all `tel:` links and all listed in the JSON-LD. The address is 909 8th Ave, Regina, SK  S4N 6S3, with a maps link and the postal code in the JSON-LD. The card uses small "Call" and "Visit" labels.

## Loader
The car sweeps in from the left, the letters rise in with a stagger, the red underline draws and the tagline fades in. Then the logo settles into the header as the white overlay fades. It ends within about 2.3 s, plays once per session, and any click, tap or key skips it. It animates only transform and opacity, with no library. With reduced motion or no JavaScript, the finished page shows immediately. Letters move only during the intro and end exactly where the master puts them (p. 5: "do not rebuild or re-space").

## Open items and assumptions
1. The guideline (p. 29) asks the designer for **vector masters**. Mine are high-fidelity traces of the PNG masters. Swap them in when the real SVG or PDF files arrive.
2. **Monochrome logos and the MR monogram are marked MISSING (p. 9).** None were made. The favicon uses the supplied app icon.
3. **Page line:** "Pre-owned cars in Regina. Buy · Sell · Trade." is kept from the original brief. The guideline story line is "Buy, sell and trade pre-owned cars on 8th Ave in Regina." Say if you want it switched.
4. **"Kilometres"** is not used, because nothing on the page refers to distance.
5. **Lighthouse not re-run:** you asked for no local server, and this environment cannot reach the live domain. Please run it on the live URL. HTML is about 49 KB (about 15 KB gzipped) plus a 38 KB font.
6. **Checked:** no horizontal scroll at 360, 768 and 1440 px, all links 44 px tall or more, no console errors, and the page renders fully with JavaScript off.
