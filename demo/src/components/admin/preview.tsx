'use client';

import { ContentProvider, useContent, useT } from '@/lib/content-context';
import { SiteChrome } from '../site/site-chrome';
import { PageView } from '../pages/page-view';
import { PreviewBar } from './editor';
import { useAdminStore, type PageKey } from './store';

/** Renders the public page with the DRAFT tree, inside the public chrome, under a preview bar. */
export function PreviewView({ pageKey }: { pageKey: PageKey }) {
  const { draft } = useAdminStore();
  const { content } = useContent();
  const t = useT();
  return (
    <div style={{ ['--sticky-offset' as string]: '3.25rem' }}>
      <PreviewBar editHref={`/admin/pages/${pageKey}`} docName={t(content.microcopy.admin.pageNames[pageKey])} />
      <ContentProvider content={draft} preview>
        <SiteChrome>
          <PageView pageKey={pageKey} />
        </SiteChrome>
      </ContentProvider>
    </div>
  );
}
