import type { FAQItem, Page, RichText } from '../schema';

const p = (en: string): RichText[number] => ({ type: 'paragraph', text: { en } });
const lawyer = (en: string): RichText[number] => ({ type: 'marker', kind: 'lawyer', text: { en } });

let order = 0;
const q = (id: string, question: string, answer: RichText, opts: { owner?: boolean; home?: boolean } = {}): FAQItem => ({
  id,
  question: { en: question },
  answer,
  order: ++order,
  needsOwnerInput: !!opts.owner,
  showOnHome: !!opts.home,
});

export const faq = {
  meta: { id: 'page-faq', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 },
  slug: 'faq',
  seo: {
    title: { en: 'Used Car Buying FAQ, Saskatchewan' },
    description: {
      en: 'Plain answers on drive-away prices, fees, deposits, financing, trade-ins and buying a car in Saskatchewan as a newcomer.',
    },
    noindex: true,
  },
  breadcrumbLabel: { en: 'FAQ' },
  sections: [
    {
      id: 'header',
      type: 'pageHeader',
      enabled: true,
      theme: 'dark',
      eyebrow: { en: 'Questions and answers' },
      heading: { en: 'Straight answers before you call' },
      intro: {
        en: 'Our used car buying FAQ for Saskatchewan: prices, fees, financing, selling and paperwork. If your question is not here, call or text 639-480-4400.',
      },
    },
    {
      id: 'faq',
      type: 'faqList',
      enabled: true,
      theme: 'light',
      heading: { en: 'Frequently asked questions' },
      allowMultipleOpen: true,
      jumpLinksLabel: { en: 'Jump to a topic' },
      groups: [
        {
          id: 'buying',
          title: { en: 'Buying' },
          items: [
            q('drive-away-price', 'What does "drive-away price" mean?', [
              p('It means the price you see is the price you pay, plus GST and PST. It includes every fee we charge, such as documentation fees, freight and anything already installed on the car.'),
              p('In Saskatchewan, any price a dealer advertises for a vehicle must be the drive-away price, shown with the stock number. We think that is how it should be.'),
              lawyer('Compliance to confirm wording against FCAA drive-away pricing rules.'),
            ], { home: true }),
            q('test-drive', 'Can I take a test drive?', [
              p('Yes. Bring a valid driver\'s licence. Call or text ahead and we will have the car ready. [PLACEHOLDER: owner to confirm test-drive policy, for example insurance and accompanied drives]'),
            ], { owner: true }),
            q('inspection', 'Do you inspect your cars before you sell them?', [
              p('[PLACEHOLDER: owner to describe what is inspected before sale.] We will tell you what we checked on the car you are looking at, and what we found.'),
            ], { owner: true }),
            q('warranty', 'Is there a warranty?', [
              p('[PLACEHOLDER: owner to state warranty terms.] Saskatchewan law sets a minimum powertrain warranty for many used vehicles sold by dealers. We will explain exactly what applies to the car you choose, in writing.'),
              lawyer('Lawyer to confirm how to describe the Saskatchewan minimum warranty.'),
            ], { owner: true }),
            q('own-mechanic', 'Can I have my own mechanic check the car?', [
              p('[PLACEHOLDER: owner to confirm whether off-site or on-site inspections by your mechanic are allowed, and how to arrange one.]'),
            ], { owner: true }),
          ],
        },
        {
          id: 'pricing-and-fees',
          title: { en: 'Pricing and fees' },
          items: [
            q('doc-fees', 'Are there documentation or admin fees on top of the price?', [
              p('No. When we show a price for a car, it already includes every fee we charge. The only additions are GST and PST.'),
              p('[PLACEHOLDER: owner to confirm whether any fee applies in the cases the rules allow, for example when a trade-in is involved or when we arrange financing.]'),
              lawyer('Lawyer to confirm fee wording.'),
            ], { owner: true, home: true }),
            q('deposit', 'Do I need a deposit to hold a car? Is it refundable?', [
              p('[PLACEHOLDER: owner to state deposit policy and refund terms.] Saskatchewan limits how much a dealer can take as a deposit before a contract is signed.'),
              lawyer('Lawyer to confirm the deposit limit wording (FCAA bulletin, 2% of list price).'),
            ], { owner: true }),
            q('taxes', 'Which taxes apply when I buy a car in Saskatchewan?', [
              p('GST and PST. They are the only amounts added to our drive-away price. We show them separately on your bill of sale so you can see the total.'),
            ]),
          ],
        },
        {
          id: 'financing-and-credit',
          title: { en: 'Financing and credit' },
          items: [
            q('no-credit', 'Can I get financing with bad credit or no credit history?', [
              p('Ask us. People in all kinds of credit situations look for car financing in Regina, and we will tell you plainly what is possible. Lenders make the final decision, so we never promise approval.'),
              p('[PLACEHOLDER: owner to confirm which lenders or programmes you work with.]'),
            ], { owner: true, home: true }),
            q('credit-score', 'Will asking about financing affect my credit score?', [
              p('Talking to us does not. A credit check only happens with your written consent. [PLACEHOLDER: owner to confirm whether a soft check is offered before a full application.]'),
            ], { owner: true }),
            q('lenders-look-at', 'What do lenders look at?', [
              p('Usually your income and how steady it is, your existing payments, your credit history if you have one, and the car and down payment. Each lender weighs these differently.'),
            ]),
            q('finance-documents', 'What documents do I need for financing?', [
              p('[PLACEHOLDER: owner to list documents, for example driver\'s licence, proof of income and proof of address.]'),
            ], { owner: true }),
          ],
        },
        {
          id: 'selling-and-trade-in',
          title: { en: 'Selling and trade-in' },
          items: [
            q('value', 'How do you value my car?', [
              p('We look at the car itself, its history, its kilometres and what similar cars sell for. We explain how we got to our number. Whether you sell it outright or use it as a car trade-in in Regina, the approach is the same. [PLACEHOLDER: owner to confirm valuation method and tools.]'),
            ], { owner: true }),
            q('offer-timing', 'How long is your offer good for, and how fast am I paid?', [
              p('[PLACEHOLDER: owner to state how long an offer holds and how and when payment is made.]'),
            ], { owner: true }),
            q('lien', 'I still owe money on my car. Can I sell or trade it?', [
              p('Usually, yes. The loan has to be paid out as part of the sale or trade. [PLACEHOLDER: owner to explain how payout is handled and what you need to bring.]'),
            ], { owner: true }),
            q('consignment', 'Do you sell cars on consignment?', [
              p('[PLACEHOLDER: owner to say yes or no, and the terms if yes.]'),
            ], { owner: true }),
          ],
        },
        {
          id: 'newcomers-and-documents',
          title: { en: 'Newcomers and documents' },
          items: [
            q('new-to-canada', 'I am new to Canada. Can I buy a car here?', [
              p('Yes. Many people buy their first car soon after they arrive. Bring your documents and we will go through the steps with you. [PLACEHOLDER: owner to list the documents you accept, for example passport, permit and driver\'s licence.]'),
              p('If you are paying with financing, lenders decide; we will tell you plainly what is possible before you commit.'),
            ], { owner: true }),
            q('register-insure', 'How do I register and insure a car in Saskatchewan?', [
              p('In Saskatchewan, registration and basic insurance go through SGI, usually at a motor licence issuer. You need a valid driver\'s licence and the bill of sale. [PLACEHOLDER: owner to confirm current process and what we help with on the day.]'),
            ], { owner: true }),
            q('bring-someone', 'Can I bring a family member or friend to help?', [
              p('Yes, please do. Bring whoever helps you decide, including someone to translate if that is easier for you. Take as long as you need.'),
            ]),
          ],
        },
        {
          id: 'visiting-us',
          title: { en: 'Visiting us' },
          items: [
            q('where-when', 'Where are you and when are you open?', [
              p('We are at 909 8th Ave, Regina, SK  S4N 6S3. [PLACEHOLDER: opening hours.]'),
            ], { owner: true }),
            q('text-whatsapp', 'Can I reach you by text or WhatsApp?', [
              p('You can text 639-480-4400. [PLACEHOLDER: owner to confirm which numbers take texts, and whether WhatsApp is available.]'),
            ], { owner: true }),
          ],
        },
      ],
    },
    {
      id: 'visit',
      type: 'visitUs',
      enabled: true,
      theme: 'dark',
      heading: { en: 'Still have a question?' },
      body: { en: 'Call or text us. If it is easier to talk in person, come by 909 8th Ave.' },
      showMap: false,
      mapConsentNotice: { en: 'The map loads from Google once you allow maps and media in cookie settings.' },
      mapLoadLabel: { en: 'Load the map' },
      showHours: false,
      hoursHeading: { en: 'Hours' },
      ctas: [
        { label: { en: 'Call 639-480-4400' }, href: 'tel:+16394804400', kind: 'tel', variant: 'primary', icon: 'phone' },
        { label: { en: 'Text us' }, href: 'sms:+16394804400', kind: 'sms', variant: 'secondary', icon: 'message' },
      ],
    },
  ],
} satisfies Page;
