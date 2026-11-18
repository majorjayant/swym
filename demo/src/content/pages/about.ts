import type { Page } from '../schema';
import { PHOTOS } from '../global/photos.generated';

const lot = PHOTOS['lot']?.[1] ?? PHOTOS['lot']?.[0] ?? PHOTOS['hyundai-santa-fe']?.[0];

export const about = {
  meta: { id: 'page-about', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 },
  slug: 'about',
  seo: {
    title: { en: 'About Us, Used Car Dealer in Regina' },
    description: {
      en: 'Who we are, how we check our cars and how we price them. Mr Best Cars, a licensed used car dealer at 909 8th Ave, Regina.',
    },
    noindex: true,
  },
  breadcrumbLabel: { en: 'About' },
  sections: [
    {
      id: 'header',
      type: 'pageHeader',
      enabled: true,
      theme: 'dark',
      eyebrow: { en: 'About us' },
      heading: { en: 'A used car dealer in Regina that talks straight' },
      intro: { en: 'We sell pre-owned cars, buy cars, and take trade-ins, from one lot on 8th Ave.' },
      image: { src: lot?.src ?? '/brand/placeholder-about.jpg', width: lot?.width ?? 1600, height: lot?.height ?? 900, credit: lot?.credit, alt: { en: 'Pre-owned vehicles parked on a dealer lot' } },
    },
    {
      id: 'story',
      type: 'richText',
      enabled: true,
      theme: 'light',
      heading: { en: 'Our story' },
      body: [
        { type: 'paragraph', text: { en: 'Mr Best Cars is a local business. We opened in 2018 with one idea: buying a used car should not feel like a contest.' } },
        { type: 'paragraph', text: { en: 'So we keep it plain. Every car has one price, and it is the drive-away price. We tell you what we know about each car. If we do not know something, we say so.' } },
        { type: 'paragraph', text: { en: 'Whether you are buying your first car, replacing the family vehicle, or have just moved to Saskatchewan, you will get the same answers and the same price.' } },
      ],
    },
    {
      id: 'standards',
      type: 'standards',
      enabled: true,
      theme: 'light',
      heading: { en: 'What we check and what we stand behind' },
      intro: { en: 'These are the facts behind every car on our lot, written down so you can hold us to them.' },
      items: [
        { title: { en: 'Inspection' }, body: { value: 'Every vehicle gets a pre-sale safety inspection: brakes, tires, steering and suspension, lights, fluids, battery and charging system, and a road test. Ask to see the report.', isPlaceholder: false }, icon: 'check' },
        { title: { en: 'Warranty' }, body: { value: 'A 30-day or 1,000 km powertrain warranty on vehicles under 200,000 km, as Saskatchewan requires. Extended coverage is available.', isPlaceholder: false }, icon: 'shield' },
        { title: { en: 'History report' }, body: { value: 'A CARFAX Canada report for every vehicle, shown before you buy.', isPlaceholder: false }, icon: 'file' },
        { title: { en: '3-day exchange' }, body: { value: 'Change your mind within 3 days or 300 km and exchange for a vehicle of equal or greater value.', isPlaceholder: false }, icon: 'key' },
        { title: { en: 'Pricing' }, body: { value: 'The price you see is the drive-away price. Only GST and PST are added. Every advertised price comes with its stock number.', isPlaceholder: false, note: 'Compliance reviewer to confirm wording against FCAA drive-away pricing rules' }, icon: 'handshake' },
      ],
    },
    {
      id: 'team',
      type: 'team',
      enabled: false,
      theme: 'light',
      heading: { en: 'The people you will meet' },
      members: [],
    },
    {
      id: 'licence',
      type: 'richText',
      enabled: true,
      theme: 'light',
      anchor: 'licence',
      heading: { en: 'Licensed in Saskatchewan' },
      body: [
        { type: 'paragraph', text: { en: 'Mr Best Cars is a licensed vehicle dealer in Saskatchewan. Our dealer licence number is DL #498760. You can look up any dealer licence with the Financial and Consumer Affairs Authority of Saskatchewan.' } },
        { type: 'link', link: { label: { en: 'Check a dealer licence with the FCAA' }, href: 'https://fcaa.gov.sk.ca/', kind: 'external', newTab: true } },
      ],
    },
    {
      id: 'visit',
      type: 'visitUs',
      enabled: true,
      theme: 'dark',
      heading: { en: 'Come and see for yourself' },
      body: { en: '909 8th Ave, Regina. Bring your questions and anyone who helps you decide. We speak English, Punjabi and Hindi.' },
      showMap: false,
      mapConsentNotice: { en: 'The map loads from Google once you allow maps and media in cookie settings.' },
      mapLoadLabel: { en: 'Load the map' },
      showHours: true,
      hoursHeading: { en: 'Hours' },
      ctas: [
        { label: { en: 'Call 639-480-4400' }, href: 'tel:+16394804400', kind: 'tel', variant: 'primary', icon: 'phone' },
        { label: { en: 'Contact us' }, href: '/contact', kind: 'internal', variant: 'secondary', icon: 'arrow-right' },
      ],
    },
  ],
} satisfies Page;
