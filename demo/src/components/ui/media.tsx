'use client';

import type { Image } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { PlaceholderBadge } from './placeholder';
import { cn } from './cn';
import { asset } from '@/lib/base-path';

/** A file path counts as a placeholder when it is not supplied yet (no stock photos are used). */
export function isPlaceholderImage(img?: Image | null): boolean {
  return !img || !img.src || img.src.includes('placeholder') || img.src.includes('[PLACEHOLDER');
}

/**
 * Content image. Owner photos render as <img>; missing photos render as an ink (or grey) block
 * carrying the brand's sedan mark at low opacity and a visible placeholder chip.
 */
export function MediaImage({
  image,
  className,
  priority,
  tone = 'dark',
  sizes,
  fill,
  showBadge = true,
}: {
  image?: Image | null;
  className?: string;
  priority?: boolean;
  tone?: 'dark' | 'light';
  sizes?: string;
  fill?: boolean;
  showBadge?: boolean;
}) {
  const { content } = useContent();
  const t = useT();
  if (isPlaceholderImage(image)) {
    const mark = tone === 'dark' ? (content.site.logo.markOnDark ?? content.site.logo.mark) : content.site.logo.mark;
    return (
      <div
        className={cn('media-placeholder', fill && 'absolute inset-0', className)}
        data-tone={tone}
        role={image && !image.decorative ? 'img' : undefined}
        aria-label={image && !image.decorative ? t(image.alt) : undefined}
      >
        {mark ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(mark.src)}
            alt=""
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute left-1/2 top-1/2 w-[85%] max-w-[56rem] -translate-x-1/2 -translate-y-1/2 select-none',
              tone === 'dark' ? 'opacity-[0.08]' : 'opacity-[0.08]',
            )}
          />
        ) : null}
        {showBadge ? (
          <span className={cn('absolute right-3 top-3', tone === 'dark' ? 'text-white' : 'text-ink')}>
            <PlaceholderBadge note={image ? t(image.alt) : undefined} />
          </span>
        ) : null}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(image!.src)}
      alt={image!.decorative ? '' : t(image!.alt)}
      width={image!.width}
      height={image!.height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn('object-cover', fill && 'absolute inset-0 h-full w-full', className)}
      style={image!.focalPoint ? { objectPosition: `${image!.focalPoint.x * 100}% ${image!.focalPoint.y * 100}%` } : undefined}
    />
  );
}
