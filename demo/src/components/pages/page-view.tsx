'use client';

import type { ContentTree } from '@/content/schema';
import { useContent } from '@/lib/content-context';
import { PageSections } from '../sections';

export type PageKey = keyof ContentTree['pages'];

/** Renders a page from whichever tree is in context: published on the site, draft in admin preview. */
export function PageView({ pageKey }: { pageKey: PageKey }) {
  const { content } = useContent();
  return <PageSections page={content.pages[pageKey]} />;
}
