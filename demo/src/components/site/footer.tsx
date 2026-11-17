'use client';

import NextLink from 'next/link';
import { useContent, useT } from '@/lib/content-context';
import { useConsent } from '@/lib/consent';
import { isExternal, isInternal, resolveHref } from '@/lib/links';
import { Icon } from '../ui/icon';
import { PlaceholderValue } from '../ui/placeholder';
import { HoursTable } from './hours';
import { Logo } from './logo';

export function Footer() {
  const { content } = useContent();
  const t = useT();
  const { openSettings } = useConsent();
  const { site, navigation } = content;
  const f = navigation.footer;
  const year = new Date().getFullYear();
  const phones = site.phones.slice(0, 3);
  const social = site.socialLinks.filter((s) => s.url && !s.url.includes('PLACEHOLDER'));

  return (
    <footer data-theme="dark" className="wedge bg-ink text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-20">
        <div className="space-y-6">
          <Logo tone="dark" className="w-[200px]" />
          <address className="not-italic text-sm leading-relaxed">
            <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-11 items-center font-bold">
              {t(site.address.display)}
            </a>
            <ul className="mt-2 space-y-1">
              {phones.map((p) => (
                <li key={p.number}>
                  <a href={`tel:${p.number}`} className="inline-flex min-h-11 items-center gap-3">
                    <span className="w-14 text-grey">{t(p.label)}</span>
                    <span className="link-underline font-bold">{p.display}</span>
                  </a>
                </li>
              ))}
              {!site.email.isPlaceholder && site.email.value ? (
                <li>
                  <a href={`mailto:${site.email.value}`} className="link-underline inline-flex min-h-11 items-center font-bold">
                    {site.email.value}
                  </a>
                </li>
              ) : null}
            </ul>
          </address>
          {f.showLicence ? (
            <p className="flex items-center gap-2 text-sm">
              <span className="font-bold">{t(f.licenceLabel)}</span>
              <PlaceholderValue value={site.dealerLicence} />
            </p>
          ) : null}
        </div>
        <HoursTable tone="dark" headingLevel={2} className="max-w-xs text-grey [&_th]:text-white" />
        {f.columns.map((col) => (
          <nav key={t(col.heading)} aria-label={t(col.heading)}>
            <h2 className="label mb-3 text-grey">{t(col.heading)}</h2>
            <ul className="space-y-1">
              {col.links.map((l) => {
                const href = resolveHref(l);
                if (!href) return null;
                const cls = 'inline-flex min-h-11 items-center gap-1.5 text-sm hover:underline decoration-red decoration-2 underline-offset-4';
                return (
                  <li key={l.href}>
                    {isInternal(href) ? (
                      <NextLink href={href} className={cls}>
                        {t(l.label)}
                      </NextLink>
                    ) : (
                      <a href={href} className={cls} {...(isExternal(l) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        {t(l.label)}
                        {isExternal(l) ? <Icon name="external" size={14} /> : null}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line-dark">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-grey md:flex-row md:items-center md:justify-between">
          <p>{t(f.legalLine, { year })}</p>
          <div className="flex flex-wrap items-center gap-4">
            {social.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-white">
                {t(s.label)}
              </a>
            ))}
            {f.cookieSettingsLabel ? (
              <button type="button" onClick={openSettings} className="inline-flex min-h-11 items-center hover:text-white underline-offset-4 hover:underline">
                {t(f.cookieSettingsLabel)}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
