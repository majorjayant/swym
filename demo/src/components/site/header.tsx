'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useContent, useT } from '@/lib/content-context';
import { resolveHref } from '@/lib/links';
import { ButtonLink } from '../ui/button';
import { Icon } from '../ui/icon';
import { cn } from '../ui/cn';
import { Logo } from './logo';
import { MobileMenu } from './mobile-menu';

export function isCurrent(pathname: string, href: string | null): boolean {
  if (!href) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const { content } = useContent();
  const t = useT();
  const pathname = usePathname();
  const { header } = content.navigation;
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-[border-color] duration-[var(--duration-base)]',
        compact ? 'border-line' : 'border-transparent',
      )}
    >
      <div className={cn('container-page flex items-center justify-between gap-6 transition-[height] duration-[var(--duration-base)] ease-[var(--ease-brand)]', compact ? 'h-16' : 'h-20 lg:h-24')}>
        <Logo priority className={cn('transition-[width] duration-[var(--duration-base)] ease-[var(--ease-brand)]', compact ? 'w-[150px] lg:w-[170px]' : 'w-[150px] lg:w-[200px]')} />
        <nav aria-label={t(content.microcopy.nav.menuTitle)} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {header.links.map((l) => {
              const href = resolveHref(l);
              const current = isCurrent(pathname, href);
              return (
                <li key={l.href}>
                  <NextLink
                    href={href ?? '#'}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-bold text-ink',
                      'after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:bg-red after:transition-transform after:duration-[var(--duration-base)] after:ease-[var(--ease-brand)]',
                      current ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                    )}
                  >
                    {t(l.label)}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            {header.ctas.map((c) => (
              <ButtonLink key={c.href + c.variant} link={c} size="sm" />
            ))}
          </div>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] text-ink hover:bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? content.microcopy.nav.closeMenu : content.microcopy.nav.openMenu)}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>
      <MobileMenu
        open={open}
        onClose={() => {
          setOpen(false);
          menuButton.current?.focus();
        }}
      />
    </header>
  );
}
