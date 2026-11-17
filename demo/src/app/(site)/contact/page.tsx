import type { Metadata } from 'next';
import { publishedContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { PageView } from '@/components/pages/page-view';

export const metadata: Metadata = buildMetadata(publishedContent.pages['contact'], publishedContent.seo);

export default function ContactPage() {
  return <PageView pageKey="contact" />;
}
