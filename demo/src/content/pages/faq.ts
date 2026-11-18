import type { FAQItem, Page, RichText } from '../schema';

const p = (en: string): RichText[number] => ({ type: 'paragraph', text: { en } });

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
              p('It means the price you see is the price you pay, plus GST and PST. It includes every fee we charge, such as documentation, freight and anything already installed on the car.'),
              p('In Saskatchewan, any price a dealer advertises for a vehicle must be the drive-away price, shown with the stock number. We think that is how it should be.'),
            ], { home: true }),
            q('test-drive', 'Can I take a test drive?', [
              p("Yes. Bring a valid driver's licence. Test drives are accompanied by one of our team. Walk in during opening hours, or call or text 639-480-4400 and we will have the car ready."),
            ]),
            q('inspection', 'Do you inspect your cars before you sell them?', [
              p('Yes. Every vehicle gets a pre-sale safety inspection before it goes on the lot:'),
              { type: 'list', items: [{ en: 'Brakes and tires' }, { en: 'Steering and suspension' }, { en: 'Lights' }, { en: 'Fluids' }, { en: 'Battery and charging system' }, { en: 'A road test' }] },
              p('The inspection report for the car you are looking at is yours to read. Just ask.'),
            ]),
            q('warranty', 'Is there a warranty?', [
              p('Yes. Vehicles under 200,000 km come with a powertrain warranty of 30 days or 1,000 km, as Saskatchewan requires. Extended coverage is available, and we explain what it covers before you decide.'),
              p('You also have 3 days or 300 km to exchange the vehicle for one of equal or greater value.'),
            ]),
            q('own-mechanic', 'Can I have my own mechanic check the car?', [
              p('Yes. Call or text us to book a time, and we will take the car to a shop of your choice in Regina.'),
            ]),
          ],
        },
        {
          id: 'pricing-and-fees',
          title: { en: 'Pricing and fees' },
          items: [
            q('doc-fees', 'Are there documentation or admin fees on top of the price?', [
              p('No. The drive-away price includes everything we charge. The only additions are GST and PST.'),
            ], { home: true }),
            q('deposit', 'Do I need a deposit to hold a car? Is it refundable?', [
              p('A refundable deposit holds a car for you while you decide. Before a contract is signed it is never more than 2% of the price, which is the Saskatchewan limit.'),
            ]),
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
              p('Ask us. We work with several Canadian banks and lenders, including options for people with new credit, people rebuilding their credit and newcomers. If you are looking for car financing in Regina, we will tell you plainly what is possible.'),
              p('Approval and rate depend on the lender, so we never promise either.'),
            ], { home: true }),
            q('credit-score', 'Will asking about financing affect my credit score?', [
              p('No. The first step is a soft check that does not affect your score. A full credit application only happens later, with your written consent.'),
            ]),
            q('lenders-look-at', 'What do lenders look at?', [
              p('Usually your income and how steady it is, your existing payments, your credit history if you have one, and the car and down payment. Each lender weighs these differently.'),
            ]),
            q('finance-documents', 'What documents do I need for financing?', [
              { type: 'list', items: [{ en: "Your driver's licence" }, { en: 'Two recent pay stubs or other proof of income' }, { en: 'Proof of address' }, { en: 'A void cheque' }] },
            ]),
          ],
        },
        {
          id: 'selling-and-trade-in',
          title: { en: 'Selling and trade-in' },
          items: [
            q('value', 'How do you value my car?', [
              p('We check market data for your year, make, model and kilometres, then inspect the car with you. We explain how we got to our number. Whether you sell it outright or use it as a car trade-in in Regina, the approach is the same.'),
            ]),
            q('offer-timing', 'How long is your offer good for, and how fast am I paid?', [
              p('Our offer is in writing and good for 7 days. Once ownership is confirmed, you are paid the same day by bank draft or e-transfer.'),
            ]),
            q('lien', 'I still owe money on my car. Can I sell or trade it?', [
              p('Yes. We pay your lender directly and you get the difference. Bring your loan details, your registration and your ID.'),
            ]),
            q('consignment', 'Do you sell cars on consignment?', [
              p('Not at this time. We buy cars outright or take them in trade.'),
            ]),
          ],
        },
        {
          id: 'newcomers-and-documents',
          title: { en: 'Newcomers and documents' },
          items: [
            q('new-to-canada', 'I am new to Canada. Can I buy a car here?', [
              p('Yes. Many people buy their first car soon after they arrive. Bring these and we will go through the steps with you:'),
              { type: 'list', items: [{ en: 'Your passport' }, { en: 'Your work or study permit' }, { en: "Your driver's licence (Saskatchewan or international)" }, { en: 'Proof of income' }] },
              p('If you are paying with financing, lenders decide; we will tell you plainly what is possible before you commit.'),
            ], { home: true }),
            q('register-insure', 'How do I register and insure a car in Saskatchewan?', [
              p("In Saskatchewan, registration and basic insurance go through SGI Canada, through an insurance broker. You need a valid driver's licence and the bill of sale. We help you arrange it on the day you pick up the car."),
            ]),
            q('bring-someone', 'Can I bring a family member or friend to help?', [
              p('Yes, please do. We speak English, Punjabi and Hindi, and you are welcome to bring whoever helps you decide. Take as long as you need.'),
            ]),
          ],
        },
        {
          id: 'visiting-us',
          title: { en: 'Visiting us' },
          items: [
            q('where-when', 'Where are you and when are you open?', [
              p("We are at 909 8th Ave, Regina, SK  S4N 6S3, with customer parking on site. We're open Monday to Friday 9 am to 7 pm and Saturday 10 am to 5 pm. Closed Sunday."),
            ]),
            q('text-whatsapp', 'Can I reach you by text or WhatsApp?', [
              p('Yes. All three of our numbers take texts: 639-480-4400, 306-999-2245 and 306-942-7200. You can also reach us on WhatsApp at 639-480-4400.'),
            ]),
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
