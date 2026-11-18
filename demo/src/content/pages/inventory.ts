import type { Page } from '../schema';

export const inventoryPage = {
  meta: { id: 'page-inventory', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 },
  slug: 'inventory',
  seo: {
    title: { en: 'Pre-Owned Cars for Sale in Regina' },
    description: {
      en: 'Every vehicle with its drive-away price, kilometres and stock number. Inspected, with a CARFAX Canada report. 909 8th Ave, Regina.',
    },
    noindex: true,
  },
  breadcrumbLabel: { en: 'Inventory' },
  sections: [
    {
      id: 'header',
      type: 'pageHeader',
      enabled: true,
      theme: 'dark',
      eyebrow: { en: 'Inventory' },
      heading: { en: 'Pre-owned cars, SUVs and trucks in Regina' },
      intro: { en: 'Every price is the drive-away price. Only GST and PST are added. Every vehicle is inspected and comes with its CARFAX Canada report.' },
    },
    {
      id: 'list',
      type: 'inventoryList',
      enabled: true,
      theme: 'light',
      filterLabel: { en: 'Body type' },
      allLabel: { en: 'All' },
      sortLabel: { en: 'Sort by' },
      sortOptions: [
        { value: 'newest', label: { en: 'Newest first' } },
        { value: 'priceAsc', label: { en: 'Price, low to high' } },
        { value: 'priceDesc', label: { en: 'Price, high to low' } },
        { value: 'kmAsc', label: { en: 'Kilometres, low to high' } },
      ],
      resultCount: { en: '{count} vehicles' },
      emptyTitle: { en: 'Nothing in that category right now' },
      emptyBody: { en: 'Tell us what you are looking for and we will call or text when something comes in.' },
      emptyCta: { label: { en: 'Tell us what you need' }, href: '/contact', kind: 'internal', variant: 'primary', icon: 'arrow-right' },
    },
    {
      id: 'visit',
      type: 'visitUs',
      enabled: true,
      theme: 'dark',
      heading: { en: 'See them in person' },
      body: { en: "We're on 8th Ave in Regina with customer parking on site. Call or text if you'd like us to have a car ready." },
      showMap: false,
      mapConsentNotice: { en: 'The map loads from Google once you allow maps and media in cookie settings.' },
      mapLoadLabel: { en: 'Load the map' },
      showHours: true,
      hoursHeading: { en: 'Hours' },
      ctas: [
        { label: { en: 'Call 639-480-4400' }, href: 'tel:+16394804400', kind: 'tel', variant: 'primary', icon: 'phone' },
        { label: { en: 'Text us' }, href: 'sms:+16394804400', kind: 'sms', variant: 'secondary', icon: 'message' },
      ],
    },
  ],
} satisfies Page;
