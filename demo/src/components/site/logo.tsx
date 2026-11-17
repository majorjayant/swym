'use client';

import NextLink from 'next/link';
import { useContent, useT } from '@/lib/content-context';
import { cn } from '../ui/cn';
import { asset } from '@/lib/base-path';

/** Brand logo, unmodified file. Full colour on light only; the on-dark file on ink (Guidelines p. 4). */
export function Logo({ tone = 'light', className, priority }: { tone?: 'light' | 'dark'; className?: string; priority?: boolean }) {
  const { content } = useContent();
  const t = useT();
  const img = tone === 'dark' ? content.site.logo.dark : content.site.logo.light;
  return (
    <NextLink href="/" className={cn('inline-block shrink-0', className)} aria-label={t(content.microcopy.nav.home)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(img.src)}
        alt={t(img.alt)}
        width={img.width}
        height={img.height}
        fetchPriority={priority ? 'high' : undefined}
        className="h-auto w-full"
      />
    </NextLink>
  );
}
