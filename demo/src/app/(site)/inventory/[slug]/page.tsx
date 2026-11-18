import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { publishedContent } from '@/lib/content';
import { buildMetadata, vehicleJsonLd } from '@/lib/seo';
import { t, fmt } from '@/lib/i18n';
import { VehicleDetail } from '@/components/pages/vehicle-detail';
import { JsonLdScript } from '@/components/pages/json-ld';

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedContent.inventory.vehicles.map((v) => ({ slug: v.slug }));
}

const find = (slug: string) => publishedContent.inventory.vehicles.find((v) => v.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = find(slug);
  if (!v) return {};
  const mc = publishedContent.microcopy.vehicle;
  const vars = {
    year: v.year,
    make: v.make,
    model: v.model,
    trim: v.trim,
    km: new Intl.NumberFormat('en-CA').format(v.km),
    price: new Intl.NumberFormat('en-CA').format(v.price),
    stock: v.stockNumber,
  };
  const meta = buildMetadata(
    {
      slug: `inventory/${v.slug}`,
      seo: {
        title: { en: fmt(t(mc.seoTitle), vars) },
        description: { en: fmt(t(mc.seoDescription), vars) },
        ogImage: v.photos[0],
        noindex: true,
      },
    },
    publishedContent.seo,
  );
  return meta;
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = find(slug);
  if (!v) notFound();
  const c = publishedContent;
  return (
    <>
      <JsonLdScript data={vehicleJsonLd(v, c.site, c.seo, t(c.microcopy.vehicle.breadcrumbInventory))} />
      <VehicleDetail slug={slug} />
    </>
  );
}
