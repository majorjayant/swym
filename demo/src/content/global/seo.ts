import type { SEODefaults } from '../schema';

export const seo = {
  meta: { id: 'seo', updatedAt: '2026-11-17T00:00:00Z', updatedBy: 'copywriter', state: 'published', version: 1 },
  siteUrl: 'https://mrbestcars.ca',
  titleTemplate: '%s | Mr Best Cars',
  defaultTitle: { en: 'Used Cars Regina, SK' },
  defaultDescription: {
    en: 'Mr Best Cars is a pre-owned car dealership at 909 8th Ave, Regina. Buy, sell or trade. Call 639-480-4400.',
  },
  ogImage: { src: '/brand/og-image.png', alt: { en: 'Mr Best Cars logo. Buy, sell, drive better.' }, width: 1200, height: 630 },
  twitterCard: 'summary_large_image',
  jsonLd: {
    type: 'AutoDealer',
    aggregateRating: { enabled: false },
    sameAs: [],
  },
  robots: { index: false },
} satisfies SEODefaults;
