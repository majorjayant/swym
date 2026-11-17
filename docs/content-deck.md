# Content deck

Version 1, 2026-11-17. Author: Copy, Keyword & Social Specialist (agent 3).

Every string on the demo site, with its CMS field path. The source of truth is the typed content in `demo/src/content/**`; this deck is generated from it, so field paths match the code exactly. Section and list items are addressed by their `id` (for example `sections[hero]`, `slides[slide-1]`), not by position, so reordering in the admin does not change a path.

**Voice:** straight, calm, sure (Brand Guidelines v1.0, pp. 18–19). Canadian spelling. Short sentences. No hype, no exclamation marks, none of the restricted words in `docs/compliance-checklist.md` s. 3.

**Placeholders:** anything the owner must supply is shown as `[PLACEHOLDER: ...]`; facts held in a `Placeholder` field render with a visible badge in the demo. Notes for the legal pages appear as marker blocks ("Owner: ..." or "Lawyer to confirm ...") and render highlighted while `lawyerMarkers` is true.

**Merge tokens:** `{year}` in the footer; `{n}` in the hero dot labels; `{count}` and `{max}` in the reviews and admin counters; `{legalName}`, `{businessName}`, `{privacyEmail}`, `{address}` in the privacy and terms bodies, resolved from site settings at render.

## Keywords placed (visible text, once per page)

| Page | Keyword | Where |
|---|---|---|
| Home | used cars Regina | `pages.home.sections[hero].slides[slide-1].subhead` ("Used cars in Regina, ...") |
| Home | pre-owned cars Regina | `pages.home.sections[hero].slides[slide-1].eyebrow` ("Pre-owned cars in Regina") |
| Home | sell my car Regina | `pages.home.sections[sell-or-trade].body` |
| About | used car dealer Regina | `pages.about.sections[header].heading` |
| Contact | used car dealership 8th Ave Regina | `pages.contact.sections[header].intro` |
| FAQ | used car buying FAQ Saskatchewan | `pages.faq.sections[header].intro` |
| FAQ | car financing Regina | FAQ item `no-credit` |
| FAQ | car trade in Regina | FAQ item `value` |

## 1. Pages

### Page: home (`/`)

| Field | String |
|---|---|
| `pages.home.seo.title` | Used Cars Regina, SK |
| `pages.home.seo.description` | Pre-owned cars, SUVs and trucks at 909 8th Ave, Regina. Drive-away prices. Buy, sell or trade. Call or text 639-480-4400. |
| `pages.home.seo.ogTitle` | Mr Best Cars \| Used Cars in Regina, SK |
| `pages.home.seo.ogDescription` | Pre-owned cars at 909 8th Ave, Regina. The price you see is the drive-away price. Buy, sell or trade. |
| `pages.home.breadcrumbLabel` | Home |
| `pages.home.sections[hero].controls.previous` | Previous slide |
| `pages.home.sections[hero].controls.next` | Next slide |
| `pages.home.sections[hero].controls.pause` | Pause slides |
| `pages.home.sections[hero].controls.play` | Play slides |
| `pages.home.sections[hero].controls.goTo` | Go to slide {n} |
| `pages.home.sections[hero].slides[slide-1].media.image.src` | `/brand/placeholder-hero-1.jpg` |
| `pages.home.sections[hero].slides[slide-1].media.image.alt` | Pre-owned cars on the Mr Best Cars lot at 909 8th Ave, Regina |
| `pages.home.sections[hero].slides[slide-1].eyebrow` | Pre-owned cars in Regina |
| `pages.home.sections[hero].slides[slide-1].headline` | Good cars. Straight prices. On 8th Ave. |
| `pages.home.sections[hero].slides[slide-1].subhead` | Used cars in Regina, bought, sold and traded. The price you see is the drive-away price. Only GST and PST are added. |
| `pages.home.sections[hero].slides[slide-1].primaryCta.label` | Call 639-480-4400 |
| `pages.home.sections[hero].slides[slide-1].primaryCta.href` | `tel:+16394804400` |
| `pages.home.sections[hero].slides[slide-1].secondaryCta.label` | Text us |
| `pages.home.sections[hero].slides[slide-1].secondaryCta.href` | `sms:+16394804400` |
| `pages.home.sections[hero].slides[slide-1].textLink.label` | Sell or trade your car |
| `pages.home.sections[hero].slides[slide-1].textLink.href` | `#sell-or-trade` |
| `pages.home.sections[hero].slides[slide-2].media.image.src` | `/brand/placeholder-hero-2.jpg` |
| `pages.home.sections[hero].slides[slide-2].media.image.alt` | A customer handing over car keys at the Mr Best Cars desk |
| `pages.home.sections[hero].slides[slide-2].eyebrow` | Sell or trade |
| `pages.home.sections[hero].slides[slide-2].headline` | Selling your car? Get a straight number. |
| `pages.home.sections[hero].slides[slide-2].subhead` | Bring your car in. We will look it over and explain our offer, whether you buy from us or not. |
| `pages.home.sections[hero].slides[slide-2].primaryCta.label` | Call 639-480-4400 |
| `pages.home.sections[hero].slides[slide-2].primaryCta.href` | `tel:+16394804400` |
| `pages.home.sections[hero].slides[slide-2].secondaryCta.label` | Text us |
| `pages.home.sections[hero].slides[slide-2].secondaryCta.href` | `sms:+16394804400` |
| `pages.home.sections[hero].slides[slide-2].textLink.label` | How selling works |
| `pages.home.sections[hero].slides[slide-2].textLink.href` | `/faq#selling-and-trade-in` |
| `pages.home.sections[proof].items[0].label` | Vehicles on the lot |
| `pages.home.sections[proof].items[0].value` | [PLACEHOLDER: Live vehicle count (Phase 2 feed)] |
| `pages.home.sections[proof].items[1].label` | Google rating |
| `pages.home.sections[proof].items[1].value` | [PLACEHOLDER: Google Business Profile rating] |
| `pages.home.sections[proof].items[1].suffix` | out of 5 |
| `pages.home.sections[proof].items[2].label` | Years in Regina |
| `pages.home.sections[proof].items[2].value` | [PLACEHOLDER: Years since founding] |
| `pages.home.sections[proof].items[3].label` | Dealer licence |
| `pages.home.sections[proof].items[3].value` | [PLACEHOLDER: SK dealer licence number] |
| `pages.home.sections[proof].items[3].link.label` | About our licence |
| `pages.home.sections[proof].items[3].link.href` | `/about#licence` |
| `pages.home.sections[how-it-works].heading` | How it works |
| `pages.home.sections[how-it-works].intro` | Three steps. No pressure at any of them. |
| `pages.home.sections[how-it-works].steps[0].title` | Call or text |
| `pages.home.sections[how-it-works].steps[0].body` | Tell us what you are after, or ask a question. No obligation. |
| `pages.home.sections[how-it-works].steps[1].title` | Come and see |
| `pages.home.sections[how-it-works].steps[1].body` | Look the car over at 909 8th Ave. Bring whoever helps you decide. |
| `pages.home.sections[how-it-works].steps[2].title` | Drive it home |
| `pages.home.sections[how-it-works].steps[2].body` | Agree the drive-away price, sort the paperwork, take the keys. |
| `pages.home.sections[faq-teaser].heading` | Questions people ask first |
| `pages.home.sections[faq-teaser].intro` | Straight answers before you call. |
| `pages.home.sections[faq-teaser].moreLink.label` | See all questions |
| `pages.home.sections[faq-teaser].moreLink.href` | `/faq` |
| `pages.home.sections[sell-or-trade].heading` | Sell your car or trade it in |
| `pages.home.sections[sell-or-trade].body` | Thinking "I want to sell my car in Regina"? We buy cars outright and we take trade-ins toward your next one. We explain how we got to the number. [PLACEHOLDER: offer terms and payout time] |
| `pages.home.sections[sell-or-trade].primary.label` | Ask about selling |
| `pages.home.sections[sell-or-trade].primary.href` | `/contact` |
| `pages.home.sections[sell-or-trade].secondary.label` | Call 639-480-4400 |
| `pages.home.sections[sell-or-trade].secondary.href` | `tel:+16394804400` |
| `pages.home.sections[sell-or-trade].image.src` | `/brand/placeholder-sell.jpg` |
| `pages.home.sections[sell-or-trade].image.alt` | A car being appraised outside the Mr Best Cars office |
| `pages.home.sections[reviews].heading` | What people say |
| `pages.home.sections[reviews].intro` | Reviews come from our Google profile. We will show them here as they come in. |
| `pages.home.sections[reviews].rating` | [PLACEHOLDER: Google rating] |
| `pages.home.sections[reviews].count` | [PLACEHOLDER: Review count] |
| `pages.home.sections[reviews].sourceLabel` | Google review |
| `pages.home.sections[reviews].items[0].quote` | [PLACEHOLDER: real Google review, quoted with permission] |
| `pages.home.sections[reviews].items[0].author` | [PLACEHOLDER: first name] |
| `pages.home.sections[reviews].items[1].quote` | [PLACEHOLDER: real Google review, quoted with permission] |
| `pages.home.sections[reviews].items[1].author` | [PLACEHOLDER: first name] |
| `pages.home.sections[reviews].items[2].quote` | [PLACEHOLDER: real Google review, quoted with permission] |
| `pages.home.sections[reviews].items[2].author` | [PLACEHOLDER: first name] |
| `pages.home.sections[reviews].profileLink.label` | Read reviews on Google |
| `pages.home.sections[reviews].profileLink.href` | `[PLACEHOLDER: Google Business Profile URL]` |
| `pages.home.sections[areas].heading` | Buyers come from across southern Saskatchewan |
| `pages.home.sections[areas].intro` | We are in Regina. People drive in from these places too. Call ahead and we will have the car ready. |
| `pages.home.sections[areas].areas[0].name` | Regina |
| `pages.home.sections[areas].areas[1].name` | Moose Jaw |
| `pages.home.sections[areas].areas[2].name` | Saskatoon |
| `pages.home.sections[areas].areas[3].name` | Prince Albert |
| `pages.home.sections[areas].areas[4].name` | Yorkton |
| `pages.home.sections[areas].areas[5].name` | Swift Current |
| `pages.home.sections[areas].areas[6].name` | Estevan |
| `pages.home.sections[areas].areas[7].name` | Weyburn |
| `pages.home.sections[areas].areas[8].name` | North Battleford |
| `pages.home.sections[visit].heading` | Visit us on 8th Ave |
| `pages.home.sections[visit].body` | 909 8th Ave, Regina. Call first if you want a particular car ready when you arrive. |
| `pages.home.sections[visit].mapEmbedUrl` | `https://www.google.com/maps?q=909%208th%20Ave%2C%20Regina%2C%20SK%20S4N%206S3&output=embed` |
| `pages.home.sections[visit].mapConsentNotice` | The map loads from Google once you allow maps and media in cookie settings. |
| `pages.home.sections[visit].mapLoadLabel` | Load the map |
| `pages.home.sections[visit].hoursHeading` | Hours |
| `pages.home.sections[visit].ctas[0].label` | Call |
| `pages.home.sections[visit].ctas[0].href` | `tel:+16394804400` |
| `pages.home.sections[visit].ctas[1].label` | Text |
| `pages.home.sections[visit].ctas[1].href` | `sms:+16394804400` |
| `pages.home.sections[visit].ctas[2].label` | Directions |
| `pages.home.sections[visit].ctas[2].href` | `https://www.google.com/maps/search/?api=1&query=909%208th%20Ave%2C%20Regina%2C%20SK%20S4N%206S3` |

### Page: about (`/about`)

| Field | String |
|---|---|
| `pages.about.seo.title` | About Us, Used Car Dealer in Regina |
| `pages.about.seo.description` | Who we are, how we check our cars and how we price them. Mr Best Cars, a licensed used car dealer at 909 8th Ave, Regina. |
| `pages.about.breadcrumbLabel` | About |
| `pages.about.sections[header].eyebrow` | About us |
| `pages.about.sections[header].heading` | A used car dealer in Regina that talks straight |
| `pages.about.sections[header].intro` | We sell pre-owned cars, buy cars, and take trade-ins, from one lot on 8th Ave. |
| `pages.about.sections[header].image.src` | `/brand/placeholder-about.jpg` |
| `pages.about.sections[header].image.alt` | The Mr Best Cars lot and office on 8th Ave, Regina |
| `pages.about.sections[story].heading` | Our story |
| `pages.about.sections[story].body[0].text` | Mr Best Cars is a local business. We opened in [PLACEHOLDER: founding year] with one idea: buying a used car should not feel like a contest. |
| `pages.about.sections[story].body[1].text` | So we keep it plain. Every car has one price, and it is the drive-away price. We tell you what we know about each car. If we do not know something, we say so. |
| `pages.about.sections[story].body[2].text` | Whether you are buying your first car, replacing the family vehicle, or have just moved to Saskatchewan, you will get the same answers and the same price. |
| `pages.about.sections[standards].heading` | What we check and what we stand behind |
| `pages.about.sections[standards].intro` | These are the facts about our cars. We will fill them in before launch, not with slogans. |
| `pages.about.sections[standards].items[0].title` | Inspection |
| `pages.about.sections[standards].items[0].body` | [PLACEHOLDER: What the pre-sale inspection covers, point by point] |
| `pages.about.sections[standards].items[1].title` | Warranty |
| `pages.about.sections[standards].items[1].body` | [PLACEHOLDER: Warranty terms. Saskatchewan sets a minimum for used vehicles; lawyer to confirm wording] |
| `pages.about.sections[standards].items[2].title` | History report |
| `pages.about.sections[standards].items[2].body` | [PLACEHOLDER: Whether a vehicle history report is provided and from whom] |
| `pages.about.sections[standards].items[3].title` | Pricing |
| `pages.about.sections[standards].items[3].body` | The price you see is the drive-away price. Only GST and PST are added. Every advertised price comes with its stock number. |
| `pages.about.sections[team].heading` | The people you will meet |
| `pages.about.sections[licence].heading` | Licensed in Saskatchewan |
| `pages.about.sections[licence].body[0].text` | Mr Best Cars is a licensed vehicle dealer in Saskatchewan. Our dealer licence number is DL #[PLACEHOLDER: licence number]. You can look up any dealer licence with the Financial and Consumer Affairs Authority of Saskatchewan. |
| `pages.about.sections[licence].body[1].link.label` | Check a dealer licence with the FCAA |
| `pages.about.sections[licence].body[1].link.href` | `https://fcaa.gov.sk.ca/` |
| `pages.about.sections[visit].heading` | Come and see for yourself |
| `pages.about.sections[visit].body` | 909 8th Ave, Regina. Bring your questions and anyone who helps you decide. |
| `pages.about.sections[visit].mapConsentNotice` | The map loads from Google once you allow maps and media in cookie settings. |
| `pages.about.sections[visit].mapLoadLabel` | Load the map |
| `pages.about.sections[visit].hoursHeading` | Hours |
| `pages.about.sections[visit].ctas[0].label` | Call 639-480-4400 |
| `pages.about.sections[visit].ctas[0].href` | `tel:+16394804400` |
| `pages.about.sections[visit].ctas[1].label` | Contact us |
| `pages.about.sections[visit].ctas[1].href` | `/contact` |

### Page: contact (`/contact`)

| Field | String |
|---|---|
| `pages.contact.seo.title` | Contact and Directions, 909 8th Ave Regina |
| `pages.contact.seo.description` | Call or text 639-480-4400, or visit our used car dealership at 909 8th Ave, Regina, SK. Hours, map and directions. |
| `pages.contact.breadcrumbLabel` | Contact |
| `pages.contact.sections[header].eyebrow` | Contact us |
| `pages.contact.sections[header].heading` | Call, text or come by |
| `pages.contact.sections[header].intro` | We are a used car dealership on 8th Ave, Regina. Pick whichever way suits you. |
| `pages.contact.sections[cards].heading` | Ways to reach us |
| `pages.contact.sections[cards].callLabel` | Call |
| `pages.contact.sections[cards].textLabel` | Text |
| `pages.contact.sections[cards].emailLabel` | Email |
| `pages.contact.sections[cards].whatsappLabel` | WhatsApp |
| `pages.contact.sections[cards].directionsLabel` | Directions |
| `pages.contact.sections[visit].heading` | Find us |
| `pages.contact.sections[visit].body` | 909 8th Ave, Regina, SK  S4N 6S3. [PLACEHOLDER: directions from Ring Road and the main routes into Regina] |
| `pages.contact.sections[visit].mapEmbedUrl` | `https://www.google.com/maps?q=909%208th%20Ave%2C%20Regina%2C%20SK%20S4N%206S3&output=embed` |
| `pages.contact.sections[visit].mapConsentNotice` | The map loads from Google once you allow maps and media in cookie settings. |
| `pages.contact.sections[visit].mapLoadLabel` | Load the map |
| `pages.contact.sections[visit].hoursHeading` | Hours |
| `pages.contact.sections[visit].ctas[0].label` | Get directions |
| `pages.contact.sections[visit].ctas[0].href` | `https://www.google.com/maps/search/?api=1&query=909%208th%20Ave%2C%20Regina%2C%20SK%20S4N%206S3` |
| `pages.contact.sections[form].heading` | Send us a message |
| `pages.contact.sections[form].intro` | Tell us what you are looking for, or what you want to sell. We reply by the method you choose. If you speak a language other than English, you are welcome to bring someone to translate when you visit. |
| `pages.contact.sections[form].fields[name].label` | Your name |
| `pages.contact.sections[form].fields[name].validation.errorMessage` | Please enter your name. |
| `pages.contact.sections[form].fields[phone].label` | Phone |
| `pages.contact.sections[form].fields[phone].placeholder` | 306-555-0100 |
| `pages.contact.sections[form].fields[phone].validation.errorMessage` | Please enter a valid phone number. |
| `pages.contact.sections[form].fields[email].label` | Email |
| `pages.contact.sections[form].fields[email].validation.errorMessage` | Please enter a valid email address. |
| `pages.contact.sections[form].fields[preferred].label` | How should we reply? |
| `pages.contact.sections[form].fields[preferred].options[0].label` | Call me |
| `pages.contact.sections[form].fields[preferred].options[1].label` | Text me |
| `pages.contact.sections[form].fields[preferred].options[2].label` | Email me |
| `pages.contact.sections[form].fields[preferred].options[3].label` | WhatsApp |
| `pages.contact.sections[form].fields[preferred].validation.errorMessage` | Please choose how we should reply. |
| `pages.contact.sections[form].fields[message].label` | Your message |
| `pages.contact.sections[form].fields[message].validation.errorMessage` | Please write a few words about what you need. |
| `pages.contact.sections[form].fields[consent].label` | Yes, Mr Best Cars may contact me by the method I chose about this enquiry. I can withdraw this at any time by replying STOP or by emailing [PLACEHOLDER: email]. Mr Best Cars, 909 8th Ave, Regina, SK  S4N 6S3. |
| `pages.contact.sections[form].fields[consent].validation.errorMessage` | Please tick the box so we can reply to you. |
| `pages.contact.sections[form].consentText` | We use your details only to answer this enquiry. We do not sell them or add you to a mailing list. Read our privacy policy at /privacy. [LAWYER TO CONFIRM consent wording] |
| `pages.contact.sections[form].marketingConsentText` | Send me occasional updates by email or text. Unsubscribe any time. (Optional.) [LAWYER TO CONFIRM] |
| `pages.contact.sections[form].submitLabel` | Send message |
| `pages.contact.sections[form].submittingLabel` | Sending |
| `pages.contact.sections[form].successTitle` | Thanks. We have your message. |
| `pages.contact.sections[form].successBody` | We reply during opening hours by the method you chose. If it is urgent, call 639-480-4400. |
| `pages.contact.sections[form].disabledNotice` | This is a demo. Messages are not sent. To reach us today, call or text 639-480-4400. |
| `pages.contact.sections[form].errorSummaryTitle` | Please check these fields |

### Page: faq (`/faq`)

| Field | String |
|---|---|
| `pages.faq.seo.title` | Used Car Buying FAQ, Saskatchewan |
| `pages.faq.seo.description` | Plain answers on drive-away prices, fees, deposits, financing, trade-ins and buying a car in Saskatchewan as a newcomer. |
| `pages.faq.breadcrumbLabel` | FAQ |
| `pages.faq.sections[header].eyebrow` | Questions and answers |
| `pages.faq.sections[header].heading` | Straight answers before you call |
| `pages.faq.sections[header].intro` | Our used car buying FAQ for Saskatchewan: prices, fees, financing, selling and paperwork. If your question is not here, call or text 639-480-4400. |
| `pages.faq.sections[faq].heading` | Frequently asked questions |
| `pages.faq.sections[faq].jumpLinksLabel` | Jump to a topic |
| `pages.faq.sections[faq].groups[buying].title` | Buying |
| `pages.faq.sections[faq].groups[buying].items[drive-away-price].question` | What does "drive-away price" mean? |
| `pages.faq.sections[faq].groups[buying].items[drive-away-price].answer[0].text` | It means the price you see is the price you pay, plus GST and PST. It includes every fee we charge, such as documentation fees, freight and anything already installed on the car. |
| `pages.faq.sections[faq].groups[buying].items[drive-away-price].answer[1].text` | In Saskatchewan, any price a dealer advertises for a vehicle must be the drive-away price, shown with the stock number. We think that is how it should be. |
| `pages.faq.sections[faq].groups[buying].items[drive-away-price].answer[2].text` | Compliance to confirm wording against FCAA drive-away pricing rules. |
| `pages.faq.sections[faq].groups[buying].items[test-drive].question` | Can I take a test drive? |
| `pages.faq.sections[faq].groups[buying].items[test-drive].answer[0].text` | Yes. Bring a valid driver's licence. Call or text ahead and we will have the car ready. [PLACEHOLDER: owner to confirm test-drive policy, for example insurance and accompanied drives] |
| `pages.faq.sections[faq].groups[buying].items[inspection].question` | Do you inspect your cars before you sell them? |
| `pages.faq.sections[faq].groups[buying].items[inspection].answer[0].text` | [PLACEHOLDER: owner to describe what is inspected before sale.] We will tell you what we checked on the car you are looking at, and what we found. |
| `pages.faq.sections[faq].groups[buying].items[warranty].question` | Is there a warranty? |
| `pages.faq.sections[faq].groups[buying].items[warranty].answer[0].text` | [PLACEHOLDER: owner to state warranty terms.] Saskatchewan law sets a minimum powertrain warranty for many used vehicles sold by dealers. We will explain exactly what applies to the car you choose, in writing. |
| `pages.faq.sections[faq].groups[buying].items[warranty].answer[1].text` | Lawyer to confirm how to describe the Saskatchewan minimum warranty. |
| `pages.faq.sections[faq].groups[buying].items[own-mechanic].question` | Can I have my own mechanic check the car? |
| `pages.faq.sections[faq].groups[buying].items[own-mechanic].answer[0].text` | [PLACEHOLDER: owner to confirm whether off-site or on-site inspections by your mechanic are allowed, and how to arrange one.] |
| `pages.faq.sections[faq].groups[pricing-and-fees].title` | Pricing and fees |
| `pages.faq.sections[faq].groups[pricing-and-fees].items[doc-fees].question` | Are there documentation or admin fees on top of the price? |
| `pages.faq.sections[faq].groups[pricing-and-fees].items[doc-fees].answer[0].text` | No. When we show a price for a car, it already includes every fee we charge. The only additions are GST and PST. |
| `pages.faq.sections[faq].groups[pricing-and-fees].items[doc-fees].answer[1].text` | [PLACEHOLDER: owner to confirm whether any fee applies in the cases the rules allow, for example when a trade-in is involved or when we arrange financing.] |
| `pages.faq.sections[faq].groups[pricing-and-fees].items[doc-fees].answer[2].text` | Lawyer to confirm fee wording. |
| `pages.faq.sections[faq].groups[pricing-and-fees].items[deposit].question` | Do I need a deposit to hold a car? Is it refundable? |
| `pages.faq.sections[faq].groups[pricing-and-fees].items[deposit].answer[0].text` | [PLACEHOLDER: owner to state deposit policy and refund terms.] Saskatchewan limits how much a dealer can take as a deposit before a contract is signed. |
| `pages.faq.sections[faq].groups[pricing-and-fees].items[deposit].answer[1].text` | Lawyer to confirm the deposit limit wording (FCAA bulletin, 2% of list price). |
| `pages.faq.sections[faq].groups[pricing-and-fees].items[taxes].question` | Which taxes apply when I buy a car in Saskatchewan? |
| `pages.faq.sections[faq].groups[pricing-and-fees].items[taxes].answer[0].text` | GST and PST. They are the only amounts added to our drive-away price. We show them separately on your bill of sale so you can see the total. |
| `pages.faq.sections[faq].groups[financing-and-credit].title` | Financing and credit |
| `pages.faq.sections[faq].groups[financing-and-credit].items[no-credit].question` | Can I get financing with bad credit or no credit history? |
| `pages.faq.sections[faq].groups[financing-and-credit].items[no-credit].answer[0].text` | Ask us. People in all kinds of credit situations look for car financing in Regina, and we will tell you plainly what is possible. Lenders make the final decision, so we never promise approval. |
| `pages.faq.sections[faq].groups[financing-and-credit].items[no-credit].answer[1].text` | [PLACEHOLDER: owner to confirm which lenders or programmes you work with.] |
| `pages.faq.sections[faq].groups[financing-and-credit].items[credit-score].question` | Will asking about financing affect my credit score? |
| `pages.faq.sections[faq].groups[financing-and-credit].items[credit-score].answer[0].text` | Talking to us does not. A credit check only happens with your written consent. [PLACEHOLDER: owner to confirm whether a soft check is offered before a full application.] |
| `pages.faq.sections[faq].groups[financing-and-credit].items[lenders-look-at].question` | What do lenders look at? |
| `pages.faq.sections[faq].groups[financing-and-credit].items[lenders-look-at].answer[0].text` | Usually your income and how steady it is, your existing payments, your credit history if you have one, and the car and down payment. Each lender weighs these differently. |
| `pages.faq.sections[faq].groups[financing-and-credit].items[finance-documents].question` | What documents do I need for financing? |
| `pages.faq.sections[faq].groups[financing-and-credit].items[finance-documents].answer[0].text` | [PLACEHOLDER: owner to list documents, for example driver's licence, proof of income and proof of address.] |
| `pages.faq.sections[faq].groups[selling-and-trade-in].title` | Selling and trade-in |
| `pages.faq.sections[faq].groups[selling-and-trade-in].items[value].question` | How do you value my car? |
| `pages.faq.sections[faq].groups[selling-and-trade-in].items[value].answer[0].text` | We look at the car itself, its history, its kilometres and what similar cars sell for. We explain how we got to our number. Whether you sell it outright or use it as a car trade-in in Regina, the approach is the same. [PLACEHOLDER: owner to confirm valuation method and tools.] |
| `pages.faq.sections[faq].groups[selling-and-trade-in].items[offer-timing].question` | How long is your offer good for, and how fast am I paid? |
| `pages.faq.sections[faq].groups[selling-and-trade-in].items[offer-timing].answer[0].text` | [PLACEHOLDER: owner to state how long an offer holds and how and when payment is made.] |
| `pages.faq.sections[faq].groups[selling-and-trade-in].items[lien].question` | I still owe money on my car. Can I sell or trade it? |
| `pages.faq.sections[faq].groups[selling-and-trade-in].items[lien].answer[0].text` | Usually, yes. The loan has to be paid out as part of the sale or trade. [PLACEHOLDER: owner to explain how payout is handled and what you need to bring.] |
| `pages.faq.sections[faq].groups[selling-and-trade-in].items[consignment].question` | Do you sell cars on consignment? |
| `pages.faq.sections[faq].groups[selling-and-trade-in].items[consignment].answer[0].text` | [PLACEHOLDER: owner to say yes or no, and the terms if yes.] |
| `pages.faq.sections[faq].groups[newcomers-and-documents].title` | Newcomers and documents |
| `pages.faq.sections[faq].groups[newcomers-and-documents].items[new-to-canada].question` | I am new to Canada. Can I buy a car here? |
| `pages.faq.sections[faq].groups[newcomers-and-documents].items[new-to-canada].answer[0].text` | Yes. Many people buy their first car soon after they arrive. Bring your documents and we will go through the steps with you. [PLACEHOLDER: owner to list the documents you accept, for example passport, permit and driver's licence.] |
| `pages.faq.sections[faq].groups[newcomers-and-documents].items[new-to-canada].answer[1].text` | If you are paying with financing, lenders decide; we will tell you plainly what is possible before you commit. |
| `pages.faq.sections[faq].groups[newcomers-and-documents].items[register-insure].question` | How do I register and insure a car in Saskatchewan? |
| `pages.faq.sections[faq].groups[newcomers-and-documents].items[register-insure].answer[0].text` | In Saskatchewan, registration and basic insurance go through SGI, usually at a motor licence issuer. You need a valid driver's licence and the bill of sale. [PLACEHOLDER: owner to confirm current process and what we help with on the day.] |
| `pages.faq.sections[faq].groups[newcomers-and-documents].items[bring-someone].question` | Can I bring a family member or friend to help? |
| `pages.faq.sections[faq].groups[newcomers-and-documents].items[bring-someone].answer[0].text` | Yes, please do. Bring whoever helps you decide, including someone to translate if that is easier for you. Take as long as you need. |
| `pages.faq.sections[faq].groups[visiting-us].title` | Visiting us |
| `pages.faq.sections[faq].groups[visiting-us].items[where-when].question` | Where are you and when are you open? |
| `pages.faq.sections[faq].groups[visiting-us].items[where-when].answer[0].text` | We are at 909 8th Ave, Regina, SK  S4N 6S3. [PLACEHOLDER: opening hours.] |
| `pages.faq.sections[faq].groups[visiting-us].items[text-whatsapp].question` | Can I reach you by text or WhatsApp? |
| `pages.faq.sections[faq].groups[visiting-us].items[text-whatsapp].answer[0].text` | You can text 639-480-4400. [PLACEHOLDER: owner to confirm which numbers take texts, and whether WhatsApp is available.] |
| `pages.faq.sections[visit].heading` | Still have a question? |
| `pages.faq.sections[visit].body` | Call or text us. If it is easier to talk in person, come by 909 8th Ave. |
| `pages.faq.sections[visit].mapConsentNotice` | The map loads from Google once you allow maps and media in cookie settings. |
| `pages.faq.sections[visit].mapLoadLabel` | Load the map |
| `pages.faq.sections[visit].hoursHeading` | Hours |
| `pages.faq.sections[visit].ctas[0].label` | Call 639-480-4400 |
| `pages.faq.sections[visit].ctas[0].href` | `tel:+16394804400` |
| `pages.faq.sections[visit].ctas[1].label` | Text us |
| `pages.faq.sections[visit].ctas[1].href` | `sms:+16394804400` |

### Page: privacy (`/privacy`)

| Field | String |
|---|---|
| `pages.privacy.seo.title` | Privacy Policy |
| `pages.privacy.seo.description` | How Mr Best Cars collects, uses and protects personal information, and how to ask questions or make a request. |
| `pages.privacy.breadcrumbLabel` | Privacy |
| `pages.privacy.sections[header].eyebrow` | Legal |
| `pages.privacy.sections[header].heading` | Privacy policy |
| `pages.privacy.sections[header].intro` | How we collect, use and protect your personal information. |
| `pages.privacy.sections[body].effectiveLabel` | Effective date |
| `pages.privacy.sections[body].reviewedLabel` | Last reviewed |
| `pages.privacy.sections[body].disclaimer` | Template for review. This is not legal advice. Highlighted notes must be confirmed by the owner or a lawyer before this page is published. |
| `pages.privacy.sections[body].tocHeading` | On this page |
| `pages.privacy.sections[body].body[0].text` | This policy explains how {legalName}, operating as {businessName} at {address}, collects, uses and protects personal information. It follows the Personal Information Protection and Electronic Documents Act (PIPEDA). |
| `pages.privacy.sections[body].body[1].text` | Owner: registered legal name |
| `pages.privacy.sections[body].body[2].text` | Lawyer to confirm: that PIPEDA, not a provincial law, applies |
| `pages.privacy.sections[body].body[3].text` | 1. Who is responsible |
| `pages.privacy.sections[body].body[4].text` | We are responsible for personal information under our control. Our privacy officer is [name or role]. You can reach them at {privacyEmail} or 639-480-4400, or by mail at {address}. |
| `pages.privacy.sections[body].body[5].text` | Owner: name or role |
| `pages.privacy.sections[body].body[6].text` | Owner: email |
| `pages.privacy.sections[body].body[7].text` | Owner: phone |
| `pages.privacy.sections[body].body[8].text` | 2. What we collect and why |
| `pages.privacy.sections[body].body[9].text` | We collect only what we need for a clear purpose. We tell you the purpose at or before the time we collect it. |
| `pages.privacy.sections[body].body[10].items[0]` | Contact form and enquiries: your name, phone number, email address, your message and how you prefer to be contacted. Purpose: to answer your enquiry. |
| `pages.privacy.sections[body].body[10].items[1]` | Calls and texts: the number you call or text from, and what you tell us. Purpose: to respond and keep a record of the enquiry. |
| `pages.privacy.sections[body].body[10].items[2]` | Website use: basic technical data such as pages visited and browser type, only if you accept analytics cookies. Purpose: to understand how the site is used. |
| `pages.privacy.sections[body].body[10].items[3]` | Vehicle purchase, sale, trade or financing: identification, vehicle details, and financial information, collected in person or through forms we add later. Purpose: to complete the transaction, meet legal obligations, and, with your consent, arrange financing. |
| `pages.privacy.sections[body].body[11].text` | Owner: confirm fields match the live form. |
| `pages.privacy.sections[body].body[12].text` | Owner: name the analytics tool, or delete this point if none is used. |
| `pages.privacy.sections[body].body[13].text` | Lawyer to confirm: wording when these features launch |
| `pages.privacy.sections[body].body[14].text` | We do not collect a Social Insurance Number or date of birth on this website. |
| `pages.privacy.sections[body].body[15].text` | Owner: confirm; update when a credit application is added. |
| `pages.privacy.sections[body].body[16].text` | 3. Consent |
| `pages.privacy.sections[body].body[17].text` | We ask for your consent before collecting, using or sharing your personal information, except where the law allows or requires otherwise. Consent boxes on our forms are unchecked until you choose them. You can withdraw consent at any time by contacting our privacy officer, subject to legal or contractual limits. If you withdraw consent, we will tell you what that means for the service you asked for. |
| `pages.privacy.sections[body].body[18].text` | For marketing email or text messages we ask for separate, express consent, as required by Canada's Anti-Spam Legislation. Every marketing message identifies us and includes a way to unsubscribe. |
| `pages.privacy.sections[body].body[19].text` | Lawyer to confirm this section. |
| `pages.privacy.sections[body].body[20].text` | 4. Limiting collection |
| `pages.privacy.sections[body].body[21].text` | We collect personal information by fair and lawful means and only what is needed for the purposes we have identified. |
| `pages.privacy.sections[body].body[22].text` | 5. Use, disclosure and retention |
| `pages.privacy.sections[body].body[23].text` | We use personal information only for the purposes we told you about, or for purposes you later agree to, or as the law requires. |
| `pages.privacy.sections[body].body[24].text` | We may share information with service providers who help us run the website, forms and messaging. They may only use it to provide the service to us. We may share information with lenders when you ask us to arrange financing. We may disclose information when the law requires it. |
| `pages.privacy.sections[body].body[25].text` | Owner: list providers, for example website hosting, form or email service, analytics. |
| `pages.privacy.sections[body].body[26].text` | Lawyer to confirm this section. |
| `pages.privacy.sections[body].body[27].text` | We keep personal information only as long as needed for the purpose, and as long as the law requires. |
| `pages.privacy.sections[body].body[28].text` | Lawyer to confirm this point. |
| `pages.privacy.sections[body].body[29].text` | Owner: state retention periods, for example enquiries kept for X months; transaction records kept for the period required by Saskatchewan vehicle dealer rules |
| `pages.privacy.sections[body].body[30].text` | 6. Accuracy |
| `pages.privacy.sections[body].body[31].text` | We keep personal information as accurate, complete and up to date as the purpose requires. Tell us if your details change. |
| `pages.privacy.sections[body].body[32].text` | 7. Safeguards |
| `pages.privacy.sections[body].body[33].text` | We protect personal information with safeguards appropriate to its sensitivity, including access limits, secure connections (HTTPS) and staff training. |
| `pages.privacy.sections[body].body[34].text` | Owner: describe physical and technical measures at the dealership. |
| `pages.privacy.sections[body].body[35].text` | Some service providers may store information outside Canada. While it is there, it may be subject to the laws of that country. |
| `pages.privacy.sections[body].body[36].text` | Lawyer to confirm this point. |
| `pages.privacy.sections[body].body[37].text` | Owner: name the countries or delete if all storage is in Canada |
| `pages.privacy.sections[body].body[38].text` | 8. Openness |
| `pages.privacy.sections[body].body[39].text` | This policy is available on every page of our website. Ask our privacy officer if you want more detail about our practices. |
| `pages.privacy.sections[body].body[40].text` | 9. Your access and correction rights |
| `pages.privacy.sections[body].body[41].text` | You may ask to see the personal information we hold about you and to correct it. Write to our privacy officer. We will respond within the time the law allows, normally 30 days, and may ask you to verify your identity. We may charge a small fee for copies and will tell you first. |
| `pages.privacy.sections[body].body[42].text` | Lawyer to confirm this section. |
| `pages.privacy.sections[body].body[43].text` | 10. Questions and complaints |
| `pages.privacy.sections[body].body[44].text` | Contact our privacy officer first. If you are not satisfied, you may contact the Office of the Privacy Commissioner of Canada. |
| `pages.privacy.sections[body].body[45].text` | 11. Cookies and analytics |
| `pages.privacy.sections[body].body[46].text` | Our website uses necessary cookies to work. It uses analytics or marketing cookies only if you accept them in the cookie banner. You can change your choice at any time through "Cookie settings" in the footer. We do not use tracking methods that cannot be cleared, such as device fingerprinting. |
| `pages.privacy.sections[body].body[47].text` | Owner: list each cookie, provider and purpose once the Phase 1 tools are chosen. |
| `pages.privacy.sections[body].body[48].text` | 12. Third-party links and embedded content |
| `pages.privacy.sections[body].body[49].text` | Our site may link to or embed third-party content such as maps or review platforms. Those providers have their own privacy policies. Embedded content loads only after you accept the related cookie category. |
| `pages.privacy.sections[body].body[50].text` | 13. Children |
| `pages.privacy.sections[body].body[51].text` | Our website and services are intended for adults. We do not knowingly collect personal information from children under [age]. |
| `pages.privacy.sections[body].body[52].text` | Lawyer to confirm this point. |
| `pages.privacy.sections[body].body[53].text` | Owner: age |
| `pages.privacy.sections[body].body[54].text` | 14. Changes to this policy |
| `pages.privacy.sections[body].body[55].text` | We may update this policy. The effective date at the top shows the current version. Significant changes will be noted on this page. |
| `pages.privacy.sections[body].body[56].text` | 15. Contact |
| `pages.privacy.sections[body].body[57].text` | {businessName}, {address}. Privacy officer: {privacyEmail}, 639-480-4400. |
| `pages.privacy.sections[body].body[58].text` | Owner: confirm. |

### Page: terms (`/terms`)

| Field | String |
|---|---|
| `pages.terms.seo.title` | Terms and Conditions |
| `pages.terms.seo.description` | The terms for using the Mr Best Cars website, including how we show drive-away prices and how enquiries work. |
| `pages.terms.breadcrumbLabel` | Terms |
| `pages.terms.sections[header].eyebrow` | Legal |
| `pages.terms.sections[header].heading` | Terms and conditions |
| `pages.terms.sections[header].intro` | The terms for using this website, including how we show prices. |
| `pages.terms.sections[body].effectiveLabel` | Effective date |
| `pages.terms.sections[body].reviewedLabel` | Last reviewed |
| `pages.terms.sections[body].disclaimer` | Template for review. This is not legal advice. Highlighted notes must be confirmed by the owner or a lawyer before this page is published. |
| `pages.terms.sections[body].tocHeading` | On this page |
| `pages.terms.sections[body].body[0].text` | These terms apply to the website of {legalName}, operating as {businessName}, {address}, a vehicle dealer licensed in Saskatchewan, DL #[licence number]. By using this website you agree to these terms. If you do not agree, please do not use the site. |
| `pages.terms.sections[body].body[1].text` | Owner: registered legal name |
| `pages.terms.sections[body].body[2].text` | Owner: licence number |
| `pages.terms.sections[body].body[3].text` | 1. Using this website |
| `pages.terms.sections[body].body[4].text` | You may use this site to learn about our business and contact us. You must not misuse the site, attempt to gain unauthorised access, or use automated tools to copy its content without permission. |
| `pages.terms.sections[body].body[5].text` | Lawyer to confirm this section. |
| `pages.terms.sections[body].body[6].text` | 2. Information, not an offer |
| `pages.terms.sections[body].body[7].text` | Content on this site is general information. It is not an offer to sell or buy a vehicle, provide financing, or enter any contract. Any purchase, sale, trade or financing is subject to a separate written agreement, availability, and applicable law. |
| `pages.terms.sections[body].body[8].text` | Lawyer to confirm this section. |
| `pages.terms.sections[body].body[9].text` | 3. How we show prices |
| `pages.terms.sections[body].body[10].text` | When we show a price for a specific vehicle, it is the drive-away price. It includes every fee and charge we collect, including documentation fees, freight, government levies and any products installed on the vehicle, except GST and PST. The stock number is shown with the price. If we show a periodic payment, we show the total amount payable on the same page. |
| `pages.terms.sections[body].body[11].text` | Lawyer to confirm: against The Consumer Protection and Business Practices Regulations, s. 5-17 and 5-21, and the Competition Act drip-pricing provisions |
| `pages.terms.sections[body].body[12].text` | Owner: this section can be published once vehicle listings exist; until then it may be kept with a note that no vehicles are listed on this site yet. |
| `pages.terms.sections[body].body[13].text` | 4. Accuracy of listings and content |
| `pages.terms.sections[body].body[14].text` | We try to keep vehicle details, availability and other content accurate and current. Errors can occur. We will correct errors we find and will not knowingly rely on an error to complete a transaction. Photos may show optional equipment. |
| `pages.terms.sections[body].body[15].text` | Lawyer to confirm this section. |
| `pages.terms.sections[body].body[16].text` | 5. Warranties and inspections |
| `pages.terms.sections[body].body[17].text` | Any warranty, inspection or exchange policy we offer is described in the written agreement for that vehicle. Nothing on this site creates a warranty. |
| `pages.terms.sections[body].body[18].text` | Lawyer to confirm this point. |
| `pages.terms.sections[body].body[19].text` | Owner: once warranty and inspection terms are confirmed, state them here or link to them.  against Saskatchewan minimum warranty requirements |
| `pages.terms.sections[body].body[20].text` | 6. Enquiries, forms and messages |
| `pages.terms.sections[body].body[21].text` | Forms on this site send us an enquiry; they do not reserve a vehicle or create a contract. We contact you only in the ways you consented to. See our Privacy Policy for how we handle your information. |
| `pages.terms.sections[body].body[22].text` | 7. Intellectual property |
| `pages.terms.sections[body].body[23].text` | The {businessName} name, logo and site content belong to {legalName} or its licensors. You may not copy or reuse them without written permission. Other brand names on this site belong to their owners and are used only to identify their products or services. |
| `pages.terms.sections[body].body[24].text` | Lawyer to confirm this section. |
| `pages.terms.sections[body].body[25].text` | 8. Third-party links and services |
| `pages.terms.sections[body].body[26].text` | Links to other websites and embedded services (such as maps) are provided for convenience. We do not control them and are not responsible for their content or practices. |
| `pages.terms.sections[body].body[27].text` | 9. Limitation of liability |
| `pages.terms.sections[body].body[28].text` | To the extent permitted by law, {legalName} is not liable for any loss arising from use of this website or reliance on its content. Nothing in these terms limits rights you have under The Consumer Protection and Business Practices Act (Saskatchewan) or other laws that cannot be excluded. |
| `pages.terms.sections[body].body[29].text` | Lawyer to confirm this section. |
| `pages.terms.sections[body].body[30].text` | 10. Governing law |
| `pages.terms.sections[body].body[31].text` | These terms are governed by the laws of Saskatchewan and the federal laws of Canada that apply there. Disputes are subject to the courts of Saskatchewan. |
| `pages.terms.sections[body].body[32].text` | Lawyer to confirm this section. |
| `pages.terms.sections[body].body[33].text` | 11. Changes |
| `pages.terms.sections[body].body[34].text` | We may change these terms. The effective date shows the current version. Continued use of the site after a change means you accept the new terms. |
| `pages.terms.sections[body].body[35].text` | 12. Contact |
| `pages.terms.sections[body].body[36].text` | {businessName}, {address}. Email: [email]. Phone: 639-480-4400, 306-999-2245, 306-942-7200. Consumer questions about vehicle dealers may also be directed to the Financial and Consumer Affairs Authority of Saskatchewan, Consumer Protection Division. |
| `pages.terms.sections[body].body[37].text` | Owner: Owner to supply. |

### Page: not-found (`/<any unknown path>`)

| Field | String |
|---|---|
| `pages.not-found.seo.title` | Page Not Found |
| `pages.not-found.seo.description` | That page is not here. Head back to Mr Best Cars or call 639-480-4400. |
| `pages.not-found.breadcrumbLabel` | Not found |
| `pages.not-found.sections[not-found].heading` | That page took a wrong turn |
| `pages.not-found.sections[not-found].body` | The address may have changed, or the link was mistyped. The rest of the site is right here. |
| `pages.not-found.sections[not-found].ctas[0].label` | Back to home |
| `pages.not-found.sections[not-found].ctas[0].href` | `/` |
| `pages.not-found.sections[not-found].ctas[1].label` | Contact us |
| `pages.not-found.sections[not-found].ctas[1].href` | `/contact` |
| `pages.not-found.sections[not-found].ctas[2].label` | Call 639-480-4400 |
| `pages.not-found.sections[not-found].ctas[2].href` | `tel:+16394804400` |

## 2. Global elements

### Site settings

| Field | String |
|---|---|
| `site.businessName` | Mr Best Cars |
| `site.legalName` | [PLACEHOLDER: Registered legal name of the business] (default: Mr Best Cars) |
| `site.tagline` | Buy · Sell · Drive Better |
| `site.logo.light.src` | `/brand/mr-best-cars-logo.svg` |
| `site.logo.light.alt` | Mr Best Cars. Buy, sell, drive better. |
| `site.logo.dark.src` | `/brand/mr-best-cars-logo-on-dark.svg` |
| `site.logo.dark.alt` | Mr Best Cars. Buy, sell, drive better. |
| `site.logo.icon.src` | `/brand/apple-touch-icon.png` |
| `site.logo.icon.alt` | Mr Best Cars app icon |
| `site.logo.mark.src` | `/brand/mr-best-cars-sedan-mark.svg` |
| `site.logo.mark.alt` | (empty) |
| `site.address.mapUrl` | `https://www.google.com/maps/search/?api=1&query=909%208th%20Ave%2C%20Regina%2C%20SK%20S4N%206S3` |
| `site.address.display` | 909 8th Ave, Regina, SK  S4N 6S3 |
| `site.geo.lat` | [PLACEHOLDER: Latitude of 909 8th Ave] |
| `site.geo.lng` | [PLACEHOLDER: Longitude of 909 8th Ave] |
| `site.phones[0].label` | Main |
| `site.phones[1].label` | Sales |
| `site.phones[2].label` | Sales |
| `site.email` | [PLACEHOLDER: Public email address (hidden until supplied)] |
| `site.whatsapp` | [PLACEHOLDER: WhatsApp number in E.164 form, if WhatsApp is staffed (hidden until supplied)] |
| `site.hours.holidayNote` | (empty) |
| `site.privacyOfficer.name` | [PLACEHOLDER: Name or role of the privacy officer] |
| `site.privacyOfficer.email` | [PLACEHOLDER: Email published in the privacy policy] (default: [PLACEHOLDER: privacy contact email]) |
| `site.privacyOfficer.phone` | [PLACEHOLDER: Owner to confirm which number handles privacy requests] (default: 639-480-4400) |
| `site.dealerLicence` | [PLACEHOLDER: Saskatchewan dealer licence number (shown as DL #)] |
| `site.foundedYear` | [PLACEHOLDER: Year the business opened] |
| `site.mobileBar.slots[0].label` | Call |
| `site.mobileBar.slots[0].href` | `tel:+16394804400` |
| `site.mobileBar.slots[0].ariaLabel` | Call Mr Best Cars at 639-480-4400 |
| `site.mobileBar.slots[1].label` | Text |
| `site.mobileBar.slots[1].href` | `sms:+16394804400` |
| `site.mobileBar.slots[1].ariaLabel` | Text Mr Best Cars at 639-480-4400 |
| `site.mobileBar.slots[2].label` | Contact |
| `site.mobileBar.slots[2].href` | `/contact` |

### Navigation

| Field | String |
|---|---|
| `navigation.header.links[0].label` | Home |
| `navigation.header.links[0].href` | `/` |
| `navigation.header.links[1].label` | About |
| `navigation.header.links[1].href` | `/about` |
| `navigation.header.links[2].label` | FAQ |
| `navigation.header.links[2].href` | `/faq` |
| `navigation.header.links[3].label` | Contact |
| `navigation.header.links[3].href` | `/contact` |
| `navigation.header.ctas[0].label` | Call 639-480-4400 |
| `navigation.header.ctas[0].href` | `tel:+16394804400` |
| `navigation.header.ctas[1].label` | Text us |
| `navigation.header.ctas[1].href` | `sms:+16394804400` |
| `navigation.header.skipLinkLabel` | Skip to main content |
| `navigation.footer.columns[0].heading` | Pages |
| `navigation.footer.columns[0].links[0].label` | About us |
| `navigation.footer.columns[0].links[0].href` | `/about` |
| `navigation.footer.columns[0].links[1].label` | FAQ |
| `navigation.footer.columns[0].links[1].href` | `/faq` |
| `navigation.footer.columns[0].links[2].label` | Contact us |
| `navigation.footer.columns[0].links[2].href` | `/contact` |
| `navigation.footer.columns[1].heading` | Legal |
| `navigation.footer.columns[1].links[0].label` | Privacy policy |
| `navigation.footer.columns[1].links[0].href` | `/privacy` |
| `navigation.footer.columns[1].links[1].label` | Terms and conditions |
| `navigation.footer.columns[1].links[1].href` | `/terms` |
| `navigation.footer.legalLine` | © {year} Mr Best Cars. All rights reserved. |
| `navigation.footer.licenceLabel` | DL # |
| `navigation.footer.cookieSettingsLabel` | Cookie settings |
| `navigation.mobileMenu.links[0].label` | Home |
| `navigation.mobileMenu.links[0].href` | `/` |
| `navigation.mobileMenu.links[1].label` | About us |
| `navigation.mobileMenu.links[1].href` | `/about` |
| `navigation.mobileMenu.links[2].label` | FAQ |
| `navigation.mobileMenu.links[2].href` | `/faq` |
| `navigation.mobileMenu.links[3].label` | Contact us |
| `navigation.mobileMenu.links[3].href` | `/contact` |
| `navigation.mobileMenu.links[4].label` | Privacy policy |
| `navigation.mobileMenu.links[4].href` | `/privacy` |
| `navigation.mobileMenu.links[5].label` | Terms and conditions |
| `navigation.mobileMenu.links[5].href` | `/terms` |

### Announcement bar

| Field | String |
|---|---|
| `announcement.text` | [PLACEHOLDER: short announcement, for example holiday hours or a new arrival] |
| `announcement.dismissLabel` | Dismiss announcement |

### Cookie banner

| Field | String |
|---|---|
| `cookieBanner.title` | Cookies on this site |
| `cookieBanner.body` | We use cookies that the site needs to work. With your permission, we would also use cookies to understand how the site is used and to show a map. You can change your choice at any time. |
| `cookieBanner.acceptLabel` | Accept all |
| `cookieBanner.rejectLabel` | Necessary only |
| `cookieBanner.settingsLabel` | Choose |
| `cookieBanner.saveLabel` | Save my choice |
| `cookieBanner.categories[necessary].label` | Necessary |
| `cookieBanner.categories[necessary].description` | Needed for the site to work, such as remembering this choice. |
| `cookieBanner.categories[analytics].label` | Analytics |
| `cookieBanner.categories[analytics].description` | Helps us see which pages are used, with no personal details. |
| `cookieBanner.categories[marketing].label` | Maps and media |
| `cookieBanner.categories[marketing].description` | Loads the Google map on the Contact page. |
| `cookieBanner.policyLink.label` | Privacy policy |
| `cookieBanner.policyLink.href` | `/privacy` |

### SEO defaults

| Field | String |
|---|---|
| `seo.defaultTitle` | Used Cars Regina, SK |
| `seo.defaultDescription` | Mr Best Cars is a pre-owned car dealership at 909 8th Ave, Regina. Buy, sell or trade. Call 639-480-4400. |
| `seo.ogImage.src` | `/brand/og-image.png` |
| `seo.ogImage.alt` | Mr Best Cars logo. Buy, sell, drive better. |

## 3. Microcopy

### Public microcopy

| Field | String |
|---|---|
| `microcopy.nav.skipLink` | Skip to main content |
| `microcopy.nav.openMenu` | Open menu |
| `microcopy.nav.closeMenu` | Close menu |
| `microcopy.nav.menuTitle` | Menu |
| `microcopy.nav.call` | Call |
| `microcopy.nav.text` | Text |
| `microcopy.nav.home` | Mr Best Cars home |
| `microcopy.nav.currentPage` | Current page |
| `microcopy.buttons.learnMore` | Learn more |
| `microcopy.buttons.readMore` | Read more |
| `microcopy.buttons.backHome` | Back to home |
| `microcopy.buttons.submit` | Send message |
| `microcopy.buttons.sending` | Sending |
| `microcopy.buttons.tryAgain` | Try again |
| `microcopy.buttons.close` | Close |
| `microcopy.buttons.dismiss` | Dismiss |
| `microcopy.forms.required` | Please fill in this field. |
| `microcopy.forms.invalidEmail` | Please enter a valid email address. |
| `microcopy.forms.invalidPhone` | Please enter a valid phone number, for example 306-555-0100. |
| `microcopy.forms.tooLong` | This is too long. Please shorten it. |
| `microcopy.forms.consentRequired` | Please tick the box so we can reply to you. |
| `microcopy.forms.genericError` | Something went wrong. Please try again, or call us. |
| `microcopy.forms.optional` | optional |
| `microcopy.forms.selectPrompt` | Choose one |
| `microcopy.states.loading` | Loading |
| `microcopy.states.empty` | Nothing here yet. |
| `microcopy.states.offline` | You appear to be offline. Call us at 639-480-4400. |
| `microcopy.faq.expand` | Show answer |
| `microcopy.faq.collapse` | Hide answer |
| `microcopy.faq.noResults` | No questions in this group yet. |
| `microcopy.placeholderBadge.label` | Placeholder |
| `microcopy.placeholderBadge.tooltip` | This is a placeholder. The owner will supply the real value before launch. |
| `microcopy.reviews.ratingOutOf` | out of 5 |
| `microcopy.reviews.basedOn` | based on {count} reviews |
| `microcopy.reviews.placeholderRating` | Rating to come |
| `microcopy.hours.heading` | Hours |
| `microcopy.hours.closed` | Closed |
| `microcopy.hours.today` | Today |
| `microcopy.hours.placeholder` | Hours to be confirmed |
| `microcopy.hours.dayNames.mon` | Monday |
| `microcopy.hours.dayNames.tue` | Tuesday |
| `microcopy.hours.dayNames.wed` | Wednesday |
| `microcopy.hours.dayNames.thu` | Thursday |
| `microcopy.hours.dayNames.fri` | Friday |
| `microcopy.hours.dayNames.sat` | Saturday |
| `microcopy.hours.dayNames.sun` | Sunday |

## 4. Admin portal labels

### Admin microcopy

| Field | String |
|---|---|
| `microcopy.admin.appName` | Mr Best Cars admin |
| `microcopy.admin.nothingSaved` | Demo only. Nothing you change here is saved. Reloading the page resets everything. |
| `microcopy.admin.dashboard` | Dashboard |
| `microcopy.admin.pages` | Pages |
| `microcopy.admin.global` | Global elements |
| `microcopy.admin.draft` | Draft |
| `microcopy.admin.published` | Published |
| `microcopy.admin.dirty` | Unsaved changes |
| `microcopy.admin.saveDraft` | Save draft |
| `microcopy.admin.publish` | Publish |
| `microcopy.admin.discard` | Discard changes |
| `microcopy.admin.preview` | Preview |
| `microcopy.admin.exitPreview` | Exit preview |
| `microcopy.admin.previewBanner` | Preview: you are viewing draft content. |
| `microcopy.admin.addItem` | Add |
| `microcopy.admin.remove` | Remove |
| `microcopy.admin.moveUp` | Move up |
| `microcopy.admin.moveDown` | Move down |
| `microcopy.admin.enabled` | Shown on the site |
| `microcopy.admin.sections` | Sections |
| `microcopy.admin.fields` | Fields |
| `microcopy.admin.seo` | Search and sharing |
| `microcopy.admin.seoPreview` | How it may look in search results |
| `microcopy.admin.characters` | {count} of {max} characters |
| `microcopy.admin.requiredField` | Required |
| `microcopy.admin.tooLongField` | Over the limit |
| `microcopy.admin.publishBlocked` | Fix the highlighted fields before publishing. |
| `microcopy.admin.saved` | Draft saved (in this session only) |
| `microcopy.admin.lastUpdated` | Last updated |
| `microcopy.admin.openEditor` | Edit |
| `microcopy.admin.backToDashboard` | Back to dashboard |
| `microcopy.admin.viewSite` | View site |
| `microcopy.admin.login.title` | Sign in |
| `microcopy.admin.login.email` | Email |
| `microcopy.admin.login.password` | Password |
| `microcopy.admin.login.signIn` | Sign in |
| `microcopy.admin.login.note` | Demo only. Sign-in is not connected. Any details will open the dashboard. |
| `microcopy.admin.uploadDisabled` | Image upload arrives with the live portal. For now, paste an image address. |
| `microcopy.admin.imageUrl` | Image address |
| `microcopy.admin.altText` | Alt text (what the image shows) |
| `microcopy.admin.reorderHint` | Use the arrows to change the order. |
| `microcopy.admin.logout` | Sign out |
| `microcopy.admin.unsavedWarning` | You have unsaved changes. They will be lost if you leave. |

## 5. SEO and Open Graph per page

| Page | Title (+ " | Mr Best Cars") | Chars | Description | Chars | OG title | OG description |
|---|---|---|---|---|---|---|
| home | Used Cars Regina, SK | 35 | Pre-owned cars, SUVs and trucks at 909 8th Ave, Regina. Drive-away prices. Buy, sell or trade. Call or text 639-480-4400. | 121 | Mr Best Cars \| Used Cars in Regina, SK | Pre-owned cars at 909 8th Ave, Regina. The price you see is the drive-away price. Buy, sell or trade. |
| about | About Us, Used Car Dealer in Regina | 50 | Who we are, how we check our cars and how we price them. Mr Best Cars, a licensed used car dealer at 909 8th Ave, Regina. | 121 | (uses title) | (uses description) |
| contact | Contact and Directions, 909 8th Ave Regina | 57 | Call or text 639-480-4400, or visit our used car dealership at 909 8th Ave, Regina, SK. Hours, map and directions. | 114 | (uses title) | (uses description) |
| faq | Used Car Buying FAQ, Saskatchewan | 48 | Plain answers on drive-away prices, fees, deposits, financing, trade-ins and buying a car in Saskatchewan as a newcomer. | 120 | (uses title) | (uses description) |
| privacy | Privacy Policy | 29 | How Mr Best Cars collects, uses and protects personal information, and how to ask questions or make a request. | 110 | (uses title) | (uses description) |
| terms | Terms and Conditions | 35 | The terms for using the Mr Best Cars website, including how we show drive-away prices and how enquiries work. | 109 | (uses title) | (uses description) |
| not-found | Page Not Found | 29 | That page is not here. Head back to Mr Best Cars or call 639-480-4400. | 70 | (uses title) | (uses description) |

## 6. Alt text for every image

| Field | Image | Alt text |
|---|---|---|
| `site.logo.light` | `/brand/mr-best-cars-logo.svg` | Mr Best Cars. Buy, sell, drive better. |
| `site.logo.dark` | `/brand/mr-best-cars-logo-on-dark.svg` | Mr Best Cars. Buy, sell, drive better. |
| `site.logo.icon` | `/brand/apple-touch-icon.png` | Mr Best Cars app icon |
| `site.logo.mark` | `/brand/mr-best-cars-sedan-mark.svg` | (decorative, empty alt) |
| `seo.ogImage` | `/brand/og-image.png` | Mr Best Cars logo. Buy, sell, drive better. |
| `pages.home.sections[0].slides[0].media.image` | `/brand/placeholder-hero-1.jpg` | Pre-owned cars on the Mr Best Cars lot at 909 8th Ave, Regina |
| `pages.home.sections[0].slides[1].media.image` | `/brand/placeholder-hero-2.jpg` | A customer handing over car keys at the Mr Best Cars desk |
| `pages.home.sections[4].image` | `/brand/placeholder-sell.jpg` | A car being appraised outside the Mr Best Cars office |
| `pages.about.sections[0].image` | `/brand/placeholder-about.jpg` | The Mr Best Cars lot and office on 8th Ave, Regina |


## 7. Social bios and link previews

| Use | Limit | Chars | Text |
|---|---|---|---|
| Google Business Profile description | 750 | 505 | Mr Best Cars is a pre-owned car dealership at 909 8th Ave, Regina, Saskatchewan. We sell used cars, buy cars, and take trade-ins. The price you see on any car we advertise is the drive-away price: it includes every fee we charge, and only GST and PST are added. Every advertised price comes with its stock number. Call or text 639-480-4400, or call 306-999-2245 or 306-942-7200. Come by to look a car over, and bring whoever helps you decide. Saskatchewan dealer licence DL #[PLACEHOLDER: licence number]. |
| Instagram bio | 150 | 130 | Pre-owned cars on 8th Ave, Regina. Buy · Sell · Drive Better. Drive-away prices, plus GST and PST only. Call or text 639-480-4400. |
| Facebook page short description | 255 | 170 | Pre-owned car dealership at 909 8th Ave, Regina, SK. Buy, sell or trade. The price you see is the drive-away price; only GST and PST are added. Call or text 639-480-4400. |
| Link preview (Open Graph, home) | n/a | 138 | Mr Best Cars | Used Cars Regina, SK. Pre-owned cars at 909 8th Ave, Regina. The price you see is the drive-away price. Buy, sell or trade. |

Notes: the Google Business Profile category should be "Used car dealer" (research brief, local listing checklist). Do not add review counts, ratings or years to any bio until they are real.

## 8. Placeholder register (strings in this deck)

46 distinct `[PLACEHOLDER: ...]` strings, plus 19 owner notes and 21 lawyer notes in the legal pages:

- Email published in the privacy policy
- Google Business Profile URL
- Google Business Profile rating
- Google rating
- Latitude of 909 8th Ave
- Live vehicle count (Phase 2 feed)
- Longitude of 909 8th Ave
- Name or role of the privacy officer
- Owner to confirm which number handles privacy requests
- Public email address (hidden until supplied)
- Registered legal name of the business
- Review count
- SK dealer licence number
- Saskatchewan dealer licence number (shown as DL #)
- Warranty terms. Saskatchewan sets a minimum for used vehicles; lawyer to confirm wording
- What the pre-sale inspection covers, point by point
- WhatsApp number in E.164 form, if WhatsApp is staffed (hidden until supplied)
- Whether a vehicle history report is provided and from whom
- Year the business opened
- Years since founding
- directions from Ring Road and the main routes into Regina
- email
- first name
- founding year
- licence number
- offer terms and payout time
- opening hours.
- owner to confirm current process and what we help with on the day.
- owner to confirm test-drive policy, for example insurance and accompanied drives
- owner to confirm valuation method and tools.
- owner to confirm whether a soft check is offered before a full application.
- owner to confirm whether any fee applies in the cases the rules allow, for example when a trade-in is involved or when we arrange financing.
- owner to confirm whether off-site or on-site inspections by your mechanic are allowed, and how to arrange one.
- owner to confirm which lenders or programmes you work with.
- owner to confirm which numbers take texts, and whether WhatsApp is available.
- owner to describe what is inspected before sale.
- owner to explain how payout is handled and what you need to bring.
- owner to list documents, for example driver's licence, proof of income and proof of address.
- owner to list the documents you accept, for example passport, permit and driver's licence.
- owner to say yes or no, and the terms if yes.
- owner to state deposit policy and refund terms.
- owner to state how long an offer holds and how and when payment is made.
- owner to state warranty terms.
- privacy contact email
- real Google review, quoted with permission
- short announcement, for example holiday hours or a new arrival

## Added by QA (2026-11-17)

| Field | String |
|---|---|
| `microcopy.forms.selectPrompt` | Choose one |
| `microcopy.admin.optionLabels.*` | Human labels for admin select options (e.g. `kind.image` → Image, `variant.primary` → Main (red), `type.textarea` → Long text); full list in `demo/src/content/ui/microcopy.ts` |
