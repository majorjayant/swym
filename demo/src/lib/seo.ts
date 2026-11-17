import type { Metadata } from 'next';
import type { Locale, Page, SEODefaults, SiteSettings } from '@/content/schema';
import { t } from './i18n';
import { asset } from '@/lib/base-path';

/** Build Next metadata for a page from its SEO fields and the site defaults. */
export function buildMetadata(page: Pick<Page, 'seo' | 'slug'>, defaults: SEODefaults, locale: Locale = 'en'): Metadata {
  const { seo } = page;
  const title = t(seo.title, locale) || t(defaults.defaultTitle, locale);
  const description = t(seo.description, locale) || t(defaults.defaultDescription, locale);
  const path = page.slug ? `/${page.slug}` : '/';
  const canonical = seo.canonical || `${defaults.siteUrl}${path}`;
  const og = seo.ogImage ?? defaults.ogImage;
  const index = defaults.robots.index && !seo.noindex;
  return {
    metadataBase: new URL(defaults.siteUrl),
    title: defaults.titleTemplate.replace('%s', title),
    description,
    alternates: { canonical },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: 'website',
      locale: 'en_CA',
      url: canonical,
      title: t(seo.ogTitle, locale) || title,
      description: t(seo.ogDescription, locale) || description,
      images: [{ url: asset(og.src), width: og.width, height: og.height, alt: t(og.alt, locale) }],
    },
    twitter: { card: defaults.twitterCard },
  };
}

/** AutoDealer JSON-LD from SiteSettings. Placeholders are omitted, never published as facts. */
export function autoDealerJsonLd(site: SiteSettings, defaults: SEODefaults, locale: Locale = 'en') {
  const sameAs = [...defaults.jsonLd.sameAs, ...site.socialLinks.map((s) => s.url)].filter((u) => u && !u.includes('PLACEHOLDER'));
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': defaults.jsonLd.type,
    name: t(site.businessName, locale),
    url: defaults.siteUrl,
    image: `${defaults.siteUrl}${asset(defaults.ogImage.src)}`,
    logo: `${defaults.siteUrl}${asset(site.logo.light.src)}`,
    telephone: site.phones.map((p) => p.number),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  };
  if (site.geo && !site.geo.lat.isPlaceholder && !site.geo.lng.isPlaceholder) {
    data.geo = { '@type': 'GeoCoordinates', latitude: Number(site.geo.lat.value), longitude: Number(site.geo.lng.value) };
  }
  if (!site.email.isPlaceholder && site.email.value) data.email = site.email.value;
  const hours = site.hours.days.filter((d) => !d.isPlaceholder && !d.closed && d.open && d.close);
  if (hours.length) {
    const map: Record<string, string> = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };
    data.openingHoursSpecification = hours.map((d) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: map[d.day], opens: d.open, closes: d.close }));
  }
  if (sameAs.length) data.sameAs = sameAs;
  const r = defaults.jsonLd.aggregateRating;
  if (r.enabled && r.value && r.count) data.aggregateRating = { '@type': 'AggregateRating', ratingValue: r.value, reviewCount: r.count };
  return data;
}
