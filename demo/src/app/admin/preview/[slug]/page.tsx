import { notFound } from 'next/navigation';
import { PreviewView } from '@/components/admin/preview';
import { PAGE_KEYS, type PageKey } from '@/components/admin/keys';

export function generateStaticParams() {
  return PAGE_KEYS.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export default async function AdminPreview({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(PAGE_KEYS as readonly string[]).includes(slug)) notFound();
  return <PreviewView pageKey={slug as PageKey} />;
}
