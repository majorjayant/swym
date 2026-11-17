import { publishedContent } from '@/lib/content';
import { SiteChrome } from '@/components/site/site-chrome';
import { SiteJsonLd } from '@/components/pages/json-ld';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteJsonLd content={publishedContent} />
      <SiteChrome>{children}</SiteChrome>
    </>
  );
}
