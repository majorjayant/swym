import type { Metadata } from 'next';
import { publishedContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { PageView } from '@/components/pages/page-view';
import { FaqJsonLd } from '@/components/pages/json-ld';

export const metadata: Metadata = buildMetadata(publishedContent.pages['faq'], publishedContent.seo);

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd content={publishedContent} />
      <PageView pageKey="faq" />
    </>
  );
}
