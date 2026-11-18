import type { SiteSettings } from '../schema';

const META = { id: 'site', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 } as const;

export const site = {
  meta: META,
  businessName: { en: 'Mr Best Cars' },
  legalName: { value: 'Mr Best Cars Ltd.', isPlaceholder: false, note: 'Sample value for the demo; owner to replace' },
  tagline: { en: 'Buy · Sell · Drive Better' },
  logo: {
    light: { src: '/brand/mr-best-cars-logo.svg', alt: { en: 'Mr Best Cars. Buy, sell, drive better.' }, width: 1144, height: 315 },
    dark: { src: '/brand/mr-best-cars-logo-on-dark.svg', alt: { en: 'Mr Best Cars. Buy, sell, drive better.' }, width: 1144, height: 315 },
    icon: { src: '/brand/apple-touch-icon.png', alt: { en: 'Mr Best Cars app icon' }, width: 180, height: 180 },
    mark: { src: '/brand/mr-best-cars-sedan-mark.svg', alt: { en: '' }, width: 1138, height: 172, decorative: true },
    // Derived for ink backgrounds: black swapped for white only, red unchanged (Brand Guidelines p. 4 rule). Approved at Gate 2.
    markOnDark: { src: '/brand/mr-best-cars-sedan-mark-on-dark.svg', alt: { en: '' }, width: 1138, height: 172, decorative: true },
  },
  address: {
    street: '909 8th Ave',
    city: 'Regina',
    region: 'SK',
    postalCode: 'S4N 6S3',
    country: 'CA',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=909%208th%20Ave%2C%20Regina%2C%20SK%20S4N%206S3',
    display: { en: '909 8th Ave, Regina, SK  S4N 6S3' },
  },
  geo: {
    lat: { value: '50.4566', isPlaceholder: false, note: 'Sample coordinates; confirm on Google Maps' },
    lng: { value: '-104.6105', isPlaceholder: false, note: 'Sample coordinates; confirm on Google Maps' },
  },
  phones: [
    { label: { en: 'Main' }, number: '+16394804400', display: '639-480-4400', primary: true, sms: true },
    { label: { en: 'Sales' }, number: '+13069992245', display: '306-999-2245', primary: false, sms: true },
    { label: { en: 'Sales' }, number: '+13069427200', display: '306-942-7200', primary: false, sms: true },
  ],
  // SAMPLE DATA: all three numbers accept texts in the demo.
  email: { value: 'hello@mrbestcars.ca', isPlaceholder: false, note: 'Sample value for the demo' },
  whatsapp: { value: '+16394804400', isPlaceholder: false, note: 'Sample value for the demo' },
  hours: {
    // SAMPLE DATA: hours for the demo.
    days: [
      { day: 'mon', open: '09:00', close: '19:00', closed: false },
      { day: 'tue', open: '09:00', close: '19:00', closed: false },
      { day: 'wed', open: '09:00', close: '19:00', closed: false },
      { day: 'thu', open: '09:00', close: '19:00', closed: false },
      { day: 'fri', open: '09:00', close: '19:00', closed: false },
      { day: 'sat', open: '10:00', close: '17:00', closed: false },
      { day: 'sun', open: null, close: null, closed: true },
    ],
    holidayNote: { en: 'Holiday hours are posted here and on our Google profile.' },
    timezone: 'America/Regina',
  },
  privacyOfficer: {
    name: { value: 'Privacy Officer', isPlaceholder: false, note: 'Sample value for the demo' },
    email: { value: 'privacy@mrbestcars.ca', isPlaceholder: false, note: 'Sample value for the demo' },
    phone: { value: '639-480-4400', isPlaceholder: false },
  },
  dealerLicence: { value: '498760', isPlaceholder: false, note: 'Sample licence number for the demo; owner to replace' },
  foundedYear: { value: '2018', isPlaceholder: false, note: 'Sample value for the demo' },
  socialLinks: [
    { platform: 'google', url: 'https://www.google.com/search?q=Mr+Best+Cars+Regina', label: { en: 'Mr Best Cars on Google' } },
    { platform: 'facebook', url: 'https://www.facebook.com/search/top?q=Mr%20Best%20Cars%20Regina', label: { en: 'Mr Best Cars on Facebook' } },
    { platform: 'instagram', url: 'https://www.instagram.com/explore/search/keyword/?q=mrbestcars', label: { en: 'Mr Best Cars on Instagram' } },
  ],
  enabledLocales: ['en'],
  mobileBar: {
    slots: [
      { label: { en: 'Call' }, href: 'tel:+16394804400', kind: 'tel', variant: 'primary', icon: 'phone', ariaLabel: { en: 'Call Mr Best Cars at 639-480-4400' } },
      { label: { en: 'Text' }, href: 'sms:+16394804400', kind: 'sms', variant: 'secondary', icon: 'message', ariaLabel: { en: 'Text Mr Best Cars at 639-480-4400' } },
      { label: { en: 'Inventory' }, href: '/inventory', kind: 'internal', variant: 'secondary', icon: 'car' },
    ],
  },
  theme: 'brandV1',
} satisfies SiteSettings;
