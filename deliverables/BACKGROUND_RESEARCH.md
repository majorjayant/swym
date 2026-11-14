# Background art for the Mr Best Cars page: research and recommendation

**Question:** Would adding fine-art automobile components to the page background make the page better, and if so, which treatment?

**Answer:** Yes, but only in one narrow form. Use a single fine-line drawing of a wheel with its brake disc, in brand black at about 7% opacity. It sits at the bottom-right edge, partly cropped by the screen, and never sits behind text. Everything else tested worse on the evidence below.

Preview (not indexed, main page unchanged): https://jayantarora.in/swym/preview-bg/
Screenshots: `deliverables/preview-bg-desktop-1440.png`, `-tablet-768.png`, `-mobile-360.png`

---

## 1. What the page has to do, psychologically

1. **Earn trust quickly, in a low-trust category.** In Gallup's 2023 honesty and ethics poll, only about 8% of Americans rated car salespeople high or very high for honesty, putting them near the bottom with members of Congress and advertising practitioners. A used-car brand starts with a trust deficit, so the visuals must signal credibility, not hype.
2. **The first impression forms in under a second and sticks.** Lindgaard et al. (2006) found that website judgements made at 50 ms correlate very strongly with those made at 500 ms. Reinecke et al. (CHI 2013) found that this first impression later colours judgements of usability and **trustworthiness**.
3. **Looks are read as credibility.** In Fogg's Stanford study (2,684 participants), "design look" was the most mentioned credibility factor, appearing in 46.1% of comments.
4. **The goal is a phone call.** Anything that pulls the eye away from the phone numbers costs money.

## 2. The evidence that decides the treatment

| Finding | Source | What it means here |
|---|---|---|
| Low visual complexity and high prototypicality are judged most appealing, within 50 ms | Tuch et al. 2012, *IJHCS* 70(11) | Add as little complexity as possible. Use a familiar, instantly recognised object. |
| Visual complexity predicts appeal far more than colourfulness does | Reinecke et al. 2013, CHI | The cost of an added element is mainly the complexity it adds, so keep it to one element at low contrast. |
| Easy processing feels beautiful; symmetry, figure-ground contrast and prototypicality raise fluency | Reber, Schwarz & Winkielman 2004, *PSPR* 8(4) | A circular, symmetrical object behind high-contrast text keeps the page easy to process. |
| Visual art raises perceived luxury and evaluations of ordinary products, regardless of what the art depicts | Hagtvedt & Patrick 2008, *JMR* 45(3) ("art infusion") | A crafted, artistic line drawing can lift perceived quality even when it is subtle, because the art connotation does the work. |
| Higher text-background contrast means better readability; aesthetic ratings predict purchase intention; black on white is rated most professional | Hall & Hanna 2004, *Behaviour & IT* 23(3) | Keep text in black on white and never put art behind it. The art may add appeal, but not at the cost of contrast. |
| Users ignore decorative stock photos; they look at real, relevant images | Nielsen Norman Group eyetracking ("Photos as Web Content") | Generic car photography would be skipped, or worse, read as filler. |
| Red prices make men perceive bigger savings | Puccinelli et al. 2013, *J. Retailing* 89(2) | Large areas of red cue "discount" more than "trustworthy". Keep red to small accents. |

## 3. Options compared

| Option | Trust and credibility | Complexity and legibility | Brand fit | Performance | Verdict |
|---|---|---|---|---|---|
| A. Plain white (current) | Good: clean, professional | Best | Neutral | Best | Safe but anonymous; misses art infusion |
| B. Car or showroom photography | **Risky.** NN/g shows decorative stock is ignored. The board's mock-ups show a building and vehicles that are not the dealership, so using them would mislead | Hurts legibility; adds complexity | Generic | Heavy images, slower load | **Reject** |
| C. Bold red speed stripes or vehicle-wrap graphics | Reads as sale or discount (red cue) | High complexity and arousal; competes with the logo | On-board but loud | Light | Reject for the page; keep it for vehicle wraps |
| D. Full-bleed blueprint grid or pattern | Neutral | Raises complexity across the whole page and lowers figure-ground contrast | Weak | Light | Reject |
| E. Engine internals (pistons, gears) | Suggests repair or servicing, which the dealership does not advertise | Medium | Off-message | Light | Reject |
| **F. Single fine-line wheel and brake disc, about 7% black, cropped at the edge** | **Gains** from art infusion while staying calm and professional | Lowest possible addition: one symmetrical, prototypical object, never behind text | Echoes the black/red car identity and the logo's motion | +7 KB inline SVG, no requests | **Recommend** |

### Why the wheel over other components
- **It is the most prototypical car part.** It is recognised instantly as "car" (Tuch 2012; Reber 2004 on prototypicality).
- **Its radial symmetry** is processed fluently (Reber 2004) and balances the strongly horizontal logo.
- **Cropping it at the screen edge** implies scale and motion without adding a second object, and leaves the centre column free for reading.
- **It reads as automotive in general, not mechanical repair.** Pistons and gears would suggest a service shop.

## 4. Guardrails (built into the preview)
- One element only, in brand black, line art, about 7.5% opacity on desktop and 6% on mobile.
- It never sits behind the heading, paragraph or contact details, so text contrast is unchanged (body text is about 18:1, links on the card about 17:1).
- Static: no animation, so it never competes with the loader or the phone numbers.
- `aria-hidden` and `pointer-events:none`, so screen readers and taps ignore it.
- Fixed position, so it adds no scroll height or horizontal scroll at 360, 768 or 1440 px.
- On mobile it sits mostly behind the contact card. On small screens extra complexity costs the most, so it is kept nearly invisible there.

## 5. How to validate it with real customers
The research supports option F, but the decision should rest on your own visitors. For a cheap check, run the main page and the preview as an A/B test for 2–4 weeks once launch traffic arrives.

| Metric | Why |
|---|---|
| Tap-to-call rate (`tel:` clicks per visit) | The business goal. Track it with a click event in Cloudflare Web Analytics or GA4. |
| Map-link click rate | Intent to visit |
| Bounce rate and time on page | Engagement. Expect little change; a big drop would signal distraction. |
| Optional 2-question survey: "This dealership looks trustworthy" and "…looks premium" (1–5) | Tests the trust and art-infusion claims directly |

**Decision rule:** ship F if tap-to-call is not worse (within ±5%) and the trust or premium score is higher; otherwise keep plain white. With low traffic, a 5-second test (show each version for 5 s, then ask for 3 words that describe the dealership) with 20–30 local people gives a fast qualitative read.

## 6. Caveats
- The studies cover websites, ads and products in general, not Regina used-car buyers specifically. They point in a direction; they do not guarantee an effect size.
- Gallup surveys US adults. No equivalent Canadian ranking was checked.
- The Hagtvedt & Patrick effect was shown with recognisable fine art. A subtle technical line drawing is a lighter version of it, so the lift may be smaller.
- No fresh guideline file arrived with this request (the uploads hold only the original PDF and the brand board). If new guidelines specify background rules, they override this recommendation.

## Sources
- Gallup, honesty and ethics of professions (2023), as reported by the [ABA Journal](https://www.abajournal.com/news/article/lawyers-viewed-as-more-ethical-than-car-salespeople-and-us-lawmakers), with [Gallup's summary](https://news.gallup.com/poll/608903/ethics-ratings-nearly-professions-down.aspx%C2%A0)
- Tuch et al. 2012, [The role of visual complexity and prototypicality regarding first impression of websites](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/); [Google Research blog summary](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/)
- Reinecke et al. 2013, [Predicting users' first impressions of website aesthetics](https://www.eecs.harvard.edu/~kgajos/papers/2013/reinecke13predicting.shtml)
- Reber, Schwarz & Winkielman 2004, [Processing Fluency and Aesthetic Pleasure](https://pages.ucsd.edu/~pwinkielman/reber-schwarz-winkielman-beauty-PSPR-2004.pdf)
- Hagtvedt & Patrick 2008, [Art Infusion](https://www.bauer.uh.edu/vpatrick/docs/Art%20Infusion.pdf); [SSRN abstract](https://papers.ssrn.com/abstract=2086795)
- Hall & Hanna 2004, [Text-background colour combinations](https://scholarsmine.mst.edu/bio_inftec_facwork/103); [author's notes](https://web.mst.edu/rhall/web_design/color_readability.html)
- Fogg et al. 2002, Stanford web credibility study, as summarised by [Consumer Reports](https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility)
- Nielsen Norman Group, [Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/)
- Puccinelli et al. 2013, [Are Men Seduced by Red?](https://researchportal.bath.ac.uk/en/publications/are-men-seduced-by-red-the-effect-of-red-versus-black-prices-on-p/)
