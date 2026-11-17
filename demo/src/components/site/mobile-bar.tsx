'use client';

import NextLink from 'next/link';
import { useEffect } from 'react';
import { useContent, useT } from '@/lib/content-context';
import { isInternal, resolveHref } from '@/lib/links';
import { Icon } from '../ui/icon';
import { cn } from '../ui/cn';

/** Fixed bottom bar below 1024px: three slots from SiteSettings.mobileBar (Call · Text · Contact by default). */
export function MobileBar() {
  const { content } = useContent();
  const t = useT();
  const slots = content.site.mobileBar.slots.slice(0, 3);
  useEffect(() => {
    document.body.dataset.mobileBar = 'true';
    return () => {
      delete document.body.dataset.mobileBar;
    };
  }, []);
  return (
    <nav
      aria-label={t(content.microcopy.nav.quickActions)}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-3">
        {slots.map((s, i) => {
          const href = resolveHref(s) ?? '#';
          const cls = cn(
            'flex min-h-[4.25rem] flex-col items-center justify-center gap-1 text-[0.8125rem] font-bold transition-colors',
            i === 0 ? 'bg-red text-white active:bg-[#c00510]' : 'text-ink active:bg-surface',
            i > 0 && 'border-l border-line',
          );
          const inner = (
            <>
              {s.icon ? <Icon name={s.icon} size={22} /> : null}
              <span>{t(s.label)}</span>
            </>
          );
          return (
            <li key={s.href + i}>
              {isInternal(href) ? (
                <NextLink href={href} className={cls} aria-label={s.ariaLabel ? t(s.ariaLabel) : undefined}>
                  {inner}
                </NextLink>
              ) : (
                <a href={href} className={cls} aria-label={s.ariaLabel ? t(s.ariaLabel) : undefined}>
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
