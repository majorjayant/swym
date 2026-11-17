import type { Metadata } from 'next';
import { publishedContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { PageView } from '@/components/pages/page-view';

export const metadata: Metadata = buildMetadata(publishedContent.pages.home, publishedContent.seo);

export default function HomePage() {
  return <PageView pageKey="home" />;
}
