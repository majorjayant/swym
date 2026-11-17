import type { SiteSettings } from '../schema';

const META = { id: 'site', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 } as const;

export const site = {
  meta: META,
  businessName: { en: 'Mr Best Cars' },
  legalName: { value: 'Mr Best Cars', isPlaceholder: true, note: 'Registered legal name of the business' },
  tagline: { en: 'Buy · Sell · Drive Better' },
  logo: {
    light: { src: '/brand/mr-best-cars-logo.svg', alt: { en: 'Mr Best Cars. Buy, sell, drive better.' }, width: 1144, height: 315 },
    dark: { src: '/brand/mr-best-cars-logo-on-dark.svg', alt: { en: 'Mr Best Cars. Buy, sell, drive better.' }, width: 1144, height: 315 },
    icon: { src: '/brand/apple-touch-icon.png', alt: { en: 'Mr Best Cars app icon' }, width: 180, height: 180 },
    mark: { src: '/brand/mr-best-cars-sedan-mark.svg', alt: { en: '' }, width: 1138, height: 172, decorative: true },
    // Derived for ink backgrounds: black swapped for white only, red unchanged (Brand Guidelines p. 4 rule). Needs owner approval.
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
    lat: { value: '', isPlaceholder: true, note: 'Latitude of 909 8th Ave' },
    lng: { value: '', isPlaceholder: true, note: 'Longitude of 909 8th Ave' },
  },
  phones: [
    { label: { en: 'Main' }, number: '+16394804400', display: '639-480-4400', primary: true, sms: true },
    { label: { en: 'Sales' }, number: '+13069992245', display: '306-999-2245', primary: false, sms: false },
    { label: { en: 'Sales' }, number: '+13069427200', display: '306-942-7200', primary: false, sms: false },
  ],
  // Owner to confirm which number accepts text messages; the primary is marked sms: true as a working assumption.
  email: { value: '', isPlaceholder: true, note: 'Public email address (hidden until supplied)' },
  whatsapp: { value: '', isPlaceholder: true, note: 'WhatsApp number in E.164 form, if WhatsApp is staffed (hidden until supplied)' },
  hours: {
    days: (['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const).map((day) => ({
      day,
      open: null,
      close: null,
      closed: false,
      isPlaceholder: true,
    })),
    holidayNote: { en: '' },
    timezone: 'America/Regina',
  },
  privacyOfficer: {
    name: { value: '', isPlaceholder: true, note: 'Name or role of the privacy officer' },
    email: { value: '[PLACEHOLDER: privacy contact email]', isPlaceholder: true, note: 'Email published in the privacy policy' },
    phone: { value: '639-480-4400', isPlaceholder: true, note: 'Owner to confirm which number handles privacy requests' },
  },
  dealerLicence: { value: '', isPlaceholder: true, note: 'Saskatchewan dealer licence number (shown as DL #)' },
  foundedYear: { value: '', isPlaceholder: true, note: 'Year the business opened' },
  socialLinks: [],
  enabledLocales: ['en'],
  mobileBar: {
    slots: [
      { label: { en: 'Call' }, href: 'tel:+16394804400', kind: 'tel', variant: 'primary', icon: 'phone', ariaLabel: { en: 'Call Mr Best Cars at 639-480-4400' } },
      { label: { en: 'Text' }, href: 'sms:+16394804400', kind: 'sms', variant: 'secondary', icon: 'message', ariaLabel: { en: 'Text Mr Best Cars at 639-480-4400' } },
      { label: { en: 'Contact' }, href: '/contact', kind: 'internal', variant: 'secondary', icon: 'map-pin' },
    ],
  },
  theme: 'brandV1',
} satisfies SiteSettings;
