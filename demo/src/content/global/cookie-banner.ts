import type { CookieBanner } from '../schema';

export const cookieBanner = {
  meta: { id: 'cookie-banner', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 },
  enabled: true,
  title: { en: 'Cookies on this site' },
  body: {
    en: 'We use cookies that the site needs to work. With your permission, we would also use cookies to understand how the site is used and to show a map. You can change your choice at any time.',
  },
  acceptLabel: { en: 'Accept all' },
  rejectLabel: { en: 'Necessary only' },
  settingsLabel: { en: 'Choose' },
  saveLabel: { en: 'Save my choice' },
  categories: [
    { key: 'necessary', label: { en: 'Necessary' }, description: { en: 'Needed for the site to work, such as remembering this choice.' }, required: true },
    { key: 'analytics', label: { en: 'Analytics' }, description: { en: 'Helps us see which pages are used, with no personal details.' }, required: false },
    { key: 'marketing', label: { en: 'Maps and media' }, description: { en: 'Loads the Google map on the Contact page.' }, required: false },
  ],
  policyLink: { label: { en: 'Privacy policy' }, href: '/privacy', kind: 'internal' },
} satisfies CookieBanner;
