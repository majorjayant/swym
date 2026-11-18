'use client';

import { useT } from '@/lib/content-context';
import { WebsiteContent } from '../dashboard';
import { useCopy } from './ui';

export function WebsitePage() {
  const c = useCopy();
  const t = useT();
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-headline-fluid font-bold">{t(c.overview.website)}</h1>
        <p className="mt-2 text-slate">{t(c.overview.websiteIntro)}</p>
      </header>
      <WebsiteContent />
    </div>
  );
}
