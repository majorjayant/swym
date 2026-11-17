'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useHydrated } from '@/lib/client-store';
import { useContent, useT } from '@/lib/content-context';
import { resolveHref } from '@/lib/links';
import { ButtonLink } from '../ui/button';
import { Icon } from '../ui/icon';
import { cn } from '../ui/cn';
import { isCurrent } from './header';
import { HoursSummary } from './hours';

/** Full-height drawer below 1024px. Focus is trapped while open; Escape closes; body scroll is locked. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { content } = useContent();
  const t = useT();
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = panel.current?.querySelector<HTMLElement>('a,button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panel.current) {
        // The close button lives in the header, so it is part of the trap too.
        const toggle = document.querySelector<HTMLElement>('[aria-controls="mobile-menu"]');
        const items = [...(toggle ? [toggle] : []), ...Array.from(panel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'))];
        if (!items.length) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const phones = content.site.phones;
  // Portalled to <body>: the sticky header uses backdrop-filter, which would trap a fixed child inside it.
  if (!hydrated) return null;
  return createPortal(
    <div
      id="mobile-menu"
      ref={panel}
      role="dialog"
      aria-modal="false"
      aria-label={t(content.microcopy.nav.menuTitle)}
      hidden={!open}
      className={cn('fixed inset-0 z-30 overflow-y-auto bg-white pb-28 pt-20 lg:hidden', open && 'page-enter')}
    >
      <div className="container-page flex min-h-full flex-col gap-8 py-6">
        <nav aria-label={t(content.microcopy.nav.menuTitle)}>
          <ul className="divide-y divide-line border-y border-line">
            {content.navigation.mobileMenu.links.map((l) => {
              const href = resolveHref(l);
              const current = isCurrent(pathname, href);
              return (
                <li key={l.href}>
                  <NextLink
                    href={href ?? '#'}
                    onClick={onClose}
                    aria-current={current ? 'page' : undefined}
                    className="flex min-h-14 items-center justify-between text-lg font-bold"
                  >
                    <span className={cn(current && 'link-underline')}>{t(l.label)}</span>
                    <Icon name="chevron-right" size={20} className="text-slate" />
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="grid gap-3">
          {content.navigation.header.ctas.map((c) => (
            <ButtonLink key={c.href + c.variant} link={c} size="lg" className="w-full" />
          ))}
        </div>
        <div className="grid gap-1 text-sm">
          {phones.map((p) => (
            <a key={p.number} href={`tel:${p.number}`} className="inline-flex min-h-11 items-center gap-3 font-bold">
              <span className="w-16 text-slate font-normal">{t(p.label)}</span>
              <span className="link-underline">{p.display}</span>
            </a>
          ))}
        </div>
        <HoursSummary />
      </div>
    </div>,
    document.body,
  );
}
