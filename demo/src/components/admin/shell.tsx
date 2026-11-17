'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useContent, useT } from '@/lib/content-context';
import { Icon } from '../ui/icon';
import { cn } from '../ui/cn';

/** Persistent notice on every admin screen: nothing is saved; reload resets. */
export function NothingSavedBanner() {
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  return (
    <div role="note" className="border-b border-red/30 bg-[#fdecec] text-ink">
      <p className="mx-auto flex max-w-[90rem] flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2 text-sm md:px-6">
        <Icon name="alert" size={16} className="shrink-0 text-red" />
        <strong>{t(a.nothingSaved)}</strong>
      </p>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  const pathname = usePathname();
  const nav = [
    { href: '/admin', label: t(a.dashboard), icon: 'layout' as const, current: pathname === '/admin' },
    { href: '/', label: t(a.viewSite), icon: 'globe' as const, current: false, external: true },
    { href: '/admin/login', label: t(a.logout), icon: 'arrow-right' as const, current: false },
  ];
  return (
    <div className="min-h-svh bg-surface text-ink">
      <a href="#admin-main" className="skip-link">
        {t(content.microcopy.nav.skipLink)}
      </a>
      <header data-theme="dark" className="bg-ink text-white">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-3 md:px-6">
          <NextLink href="/admin" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content.site.logo.dark.src} alt={t(content.site.logo.dark.alt)} width={1144} height={315} className="h-auto w-28 md:w-32" />
            <span className="label hidden text-grey sm:inline">{t(a.appName)}</span>
          </NextLink>
          <nav aria-label={t(a.adminNav)}>
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <NextLink
                    href={n.href}
                    aria-current={n.current ? 'page' : undefined}
                    target={n.external ? '_blank' : undefined}
                    className={cn('inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] px-3 text-sm font-bold hover:bg-white/10', n.current && 'bg-white/10')}
                  >
                    <Icon name={n.icon} size={16} />
                    <span className="hidden sm:inline">{n.label}</span>
                    <span className="sr-only sm:hidden">{n.label}</span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <NothingSavedBanner />
      <main id="admin-main" tabIndex={-1} className="page-enter mx-auto max-w-[90rem] px-4 py-6 outline-none md:px-6 md:py-8">
        {children}
      </main>
    </div>
  );
}

export function StateBadge({ state, unsaved }: { state: 'draft' | 'published'; unsaved?: boolean }) {
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
          state === 'published' ? 'bg-ink text-white' : 'border-2 border-dashed border-red text-ink',
        )}
        data-state={state}
      >
        <span className={cn('size-1.5 rounded-full', state === 'published' ? 'bg-white' : 'bg-red')} aria-hidden="true" />
        {t(state === 'published' ? a.published : a.draft)}
      </span>
      {unsaved ? <span className="rounded-full bg-grey px-2.5 py-1 text-xs font-bold">{t(a.unsavedBadge)}</span> : null}
    </span>
  );
}
