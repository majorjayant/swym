import type { Page } from '../schema';

export const notFound = {
  meta: { id: 'page-not-found', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 },
  slug: '404',
  seo: {
    title: { en: 'Page Not Found' },
    description: { en: 'That page is not here. Head back to Mr Best Cars or call 639-480-4400.' },
    noindex: true,
  },
  breadcrumbLabel: { en: 'Not found' },
  sections: [
    {
      id: 'not-found',
      type: 'notFound',
      enabled: true,
      theme: 'light',
      heading: { en: 'That page took a wrong turn' },
      body: { en: 'The address may have changed, or the link was mistyped. The rest of the site is right here.' },
      ctas: [
        { label: { en: 'Back to home' }, href: '/', kind: 'internal', variant: 'primary', icon: 'arrow-right' },
        { label: { en: 'Contact us' }, href: '/contact', kind: 'internal', variant: 'secondary' },
        { label: { en: 'Call 639-480-4400' }, href: 'tel:+16394804400', kind: 'tel', variant: 'text', icon: 'phone' },
      ],
    },
  ],
} satisfies Page;
