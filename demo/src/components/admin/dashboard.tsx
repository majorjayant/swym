'use client';

import NextLink from 'next/link';
import { useContent, useT } from '@/lib/content-context';
import { Icon } from '../ui/icon';
import { GLOBAL_KEYS, PAGE_KEYS, docId, getDoc, useAdminStore, type DocKey } from './store';
import { StateBadge } from './shell';

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-CA', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function DocCard({ d, title, description, href }: { d: DocKey; title: string; description?: string; href: string }) {
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  const store = useAdminStore();
  const doc = getDoc(store.draft, d) as { meta?: { updatedAt: string; updatedBy: string } };
  const changed = store.hasChanges(d);
  return (
    <li>
      <NextLink href={href} className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-5 transition-[border-color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-ink">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold">{title}</h3>
          <StateBadge state={changed ? 'draft' : 'published'} unsaved={!!store.dirty[docId(d)]} />
        </div>
        {description ? <p className="mt-2 text-sm text-slate">{description}</p> : null}
        <p className="mt-4 text-xs text-slate">
          {t(a.lastUpdated)}: {doc?.meta ? t(a.lastUpdatedBy, { date: formatWhen(doc.meta.updatedAt), who: doc.meta.updatedBy }) : t(a.neverSaved)}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
          <span className="link-underline">{t(a.openEditor)}</span>
          <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </NextLink>
    </li>
  );
}

export function Dashboard() {
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  return (
    <div className="space-y-10">
      <h1 className="text-headline-fluid font-bold">{t(a.dashboard)}</h1>
      <section aria-labelledby="pages-h">
        <h2 id="pages-h" className="label mb-4 text-slate">{t(a.pages)}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PAGE_KEYS.map((k) => (
            <DocCard key={k} d={{ kind: 'page', key: k }} title={t(a.pageNames[k])} href={`/admin/pages/${k}`} />
          ))}
        </ul>
      </section>
      <section aria-labelledby="global-h">
        <h2 id="global-h" className="label mb-4 text-slate">{t(a.global)}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GLOBAL_KEYS.map((k) => (
            <DocCard key={k} d={{ kind: 'global', key: k }} title={t(a.globalNames[k])} description={t(a.globalDescriptions[k])} href={`/admin/global/${k}`} />
          ))}
        </ul>
      </section>
    </div>
  );
}
