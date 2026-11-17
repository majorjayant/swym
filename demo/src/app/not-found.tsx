import type { Metadata } from 'next';
import { publishedContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { SiteChrome } from '@/components/site/site-chrome';
import { PageView } from '@/components/pages/page-view';

export const metadata: Metadata = buildMetadata({ ...publishedContent.pages['not-found'], seo: { ...publishedContent.pages['not-found'].seo, noindex: true } }, publishedContent.seo);

export default function NotFoundPage() {
  return (
    <SiteChrome>
      <PageView pageKey="not-found" />
    </SiteChrome>
  );
}
