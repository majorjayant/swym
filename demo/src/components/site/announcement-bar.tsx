'use client';

import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { useContent, useT } from '@/lib/content-context';
import { isInternal, resolveHref } from '@/lib/links';
import { Icon } from '../ui/icon';
import { cn } from '../ui/cn';

function hash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return String(h);
}

/** Thin bar above the header. Dismissal lasts for the session and resets when the text changes. */
export function AnnouncementBar() {
  const { content, preview } = useContent();
  const t = useT();
  const a = content.announcement;
  const text = t(a.text);
  const key = `mbc-announce-${hash(text)}`;
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem(key) === '1');
    } catch {
      /* ignore */
    }
  }, [key]);
  const now = Date.now();
  const inWindow = (!a.startAt || Date.parse(a.startAt) <= now) && (!a.endAt || Date.parse(a.endAt) >= now);
  if (!a.enabled || !text || (!inWindow && !preview) || dismissed) return null;
  const href = a.link ? resolveHref(a.link) : null;
  return (
    <div data-theme="dark" className={cn('relative text-sm text-white', a.theme === 'accent' ? 'bg-red' : 'bg-ink')}>
      <div className="container-page flex min-h-11 items-center justify-center gap-3 py-2 pr-12 text-center">
        <p>
          {text}
          {a.link && href ? (
            <>
              {' '}
              {isInternal(href) ? (
                <NextLink href={href} className="link-underline font-bold decoration-white">
                  {t(a.link.label)}
                </NextLink>
              ) : (
                <a href={href} className="link-underline font-bold decoration-white">
                  {t(a.link.label)}
                </a>
              )}
            </>
          ) : null}
        </p>
        {a.dismissible ? (
          <button
            type="button"
            onClick={() => {
              setDismissed(true);
              try {
                window.sessionStorage.setItem(key, '1');
              } catch {
                /* ignore */
              }
            }}
            className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center"
            aria-label={t(a.dismissLabel)}
          >
            <Icon name="close" size={18} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
