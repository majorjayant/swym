'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { ContentTree, Locale } from '@/content/schema';
import { ContentProvider } from '@/lib/content-context';
import { ConsentProvider } from '@/lib/consent';

/** Flags JS on <html> and reveals [data-reveal] elements as they scroll into view. */
function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.classList.add('js');
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed="true"])'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => (el.dataset.revealed = 'true'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.revealed = 'true';
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

export function Providers({
  content,
  locale = 'en',
  preview = false,
  children,
}: {
  content: ContentTree;
  locale?: Locale;
  preview?: boolean;
  children: React.ReactNode;
}) {
  return (
    <ContentProvider content={content} locale={locale} preview={preview}>
      <ConsentProvider>
        <RevealObserver />
        {children}
      </ConsentProvider>
    </ContentProvider>
  );
}
