import type { Metadata } from 'next';
import type { Locale, Page, SEODefaults, SiteSettings, Vehicle } from '@/content/schema';
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
  const sameAs = [...new Set([...defaults.jsonLd.sameAs, ...site.socialLinks.map((s) => s.url)])].filter((u) => u && !u.includes('PLACEHOLDER'));
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

/** Car JSON-LD for a vehicle detail page, with its drive-away Offer and a breadcrumb trail. */
export function vehicleJsonLd(v: Vehicle, site: SiteSettings, defaults: SEODefaults, inventoryLabel: string, locale: Locale = 'en') {
  const url = `${defaults.siteUrl}/inventory/${v.slug}`;
  const name = `${v.year} ${v.make} ${v.model} ${v.trim}`;
  const car = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name,
    brand: { '@type': 'Brand', name: v.make },
    model: v.model,
    vehicleModelDate: String(v.year),
    bodyType: v.body,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: v.km, unitCode: 'KMT' },
    vehicleIdentificationNumber: v.vin,
    fuelType: t(v.fuel, locale),
    vehicleTransmission: t(v.transmission, locale),
    driveWheelConfiguration: v.drivetrain,
    color: t(v.exteriorColour, locale),
    numberOfDoors: v.doors,
    seatingCapacity: v.seats,
    sku: v.stockNumber,
    url,
    image: v.photos.map((p) => `${defaults.siteUrl}${asset(p.src)}`),
    offers: {
      '@type': 'Offer',
      price: v.price,
      priceCurrency: 'CAD',
      availability: v.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
      url,
      seller: { '@type': 'AutoDealer', name: t(site.businessName, locale) },
    },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t(site.businessName, locale), item: `${defaults.siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: inventoryLabel, item: `${defaults.siteUrl}/inventory` },
      { '@type': 'ListItem', position: 3, name, item: url },
    ],
  };
  return [car, breadcrumb];
}
