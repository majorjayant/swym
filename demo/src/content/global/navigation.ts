import type { Navigation } from '../schema';

export const navigation = {
  meta: { id: 'navigation', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 },
  header: {
    links: [
      { label: { en: 'Inventory' }, href: '/inventory', kind: 'internal' },
      { label: { en: 'About' }, href: '/about', kind: 'internal' },
      { label: { en: 'FAQ' }, href: '/faq', kind: 'internal' },
      { label: { en: 'Contact' }, href: '/contact', kind: 'internal' },
    ],
    ctas: [
      { label: { en: 'Call 639-480-4400' }, href: 'tel:+16394804400', kind: 'tel', variant: 'primary', icon: 'phone' },
      { label: { en: 'Text us' }, href: 'sms:+16394804400', kind: 'sms', variant: 'secondary', icon: 'message' },
    ],
    skipLinkLabel: { en: 'Skip to main content' },
  },
  footer: {
    columns: [
      {
        heading: { en: 'Pages' },
        links: [
          { label: { en: 'Inventory' }, href: '/inventory', kind: 'internal' },
          { label: { en: 'About us' }, href: '/about', kind: 'internal' },
          { label: { en: 'FAQ' }, href: '/faq', kind: 'internal' },
          { label: { en: 'Contact us' }, href: '/contact', kind: 'internal' },
        ],
      },
      {
        heading: { en: 'Legal' },
        links: [
          { label: { en: 'Privacy policy' }, href: '/privacy', kind: 'internal' },
          { label: { en: 'Terms and conditions' }, href: '/terms', kind: 'internal' },
        ],
      },
    ],
    legalLine: { en: '© {year} Mr Best Cars Ltd. All rights reserved.' },
    showLicence: true,
    licenceLabel: { en: 'DL #' },
    cookieSettingsLabel: { en: 'Cookie settings' },
  },
  mobileMenu: {
    links: [
      { label: { en: 'Home' }, href: '/', kind: 'internal' },
      { label: { en: 'Inventory' }, href: '/inventory', kind: 'internal' },
      { label: { en: 'About us' }, href: '/about', kind: 'internal' },
      { label: { en: 'FAQ' }, href: '/faq', kind: 'internal' },
      { label: { en: 'Contact us' }, href: '/contact', kind: 'internal' },
      { label: { en: 'Privacy policy' }, href: '/privacy', kind: 'internal' },
      { label: { en: 'Terms and conditions' }, href: '/terms', kind: 'internal' },
    ],
  },
} satisfies Navigation;
