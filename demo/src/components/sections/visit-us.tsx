'use client';

import { useState } from 'react';
import type { VisitUsSection } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { useConsent } from '@/lib/consent';
import { ButtonLink, Button } from '../ui/button';
import { Container, Heading, SectionShell, ShortRule } from '../ui/layout';
import { Icon } from '../ui/icon';
import { RichInline } from '../ui/placeholder';
import { HoursTable } from '../site/hours';
import { cn } from '../ui/cn';

/** Address, hours and contact buttons, with a Google map that loads only after marketing consent (or a click). */
export function VisitUs({ section }: { section: VisitUsSection }) {
  const { content } = useContent();
  const t = useT();
  const { consent, openSettings } = useConsent();
  const [loadMap, setLoadMap] = useState(false);
  const dark = section.theme === 'dark';
  const id = `${section.id}-title`;
  const showEmbed = section.showMap && section.mapEmbedUrl && (consent.marketing || loadMap);
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id}>
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <ShortRule className="mb-6" />
          <Heading id={id}>{t(section.heading)}</Heading>
          {section.body ? (
            <p className={cn('mt-4 max-w-lg text-lead', dark ? 'text-grey' : 'text-slate')}>
              <RichInline text={t(section.body)} />
            </p>
          ) : null}
          <p className="mt-6 flex items-start gap-3 font-bold">
            <Icon name="map-pin" size={20} className="mt-0.5 shrink-0" />
            <a href={content.site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
              {t(content.site.address.display)}
            </a>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {section.ctas.map((c, i) => (
              <ButtonLink key={i} link={c} tone={dark ? 'dark' : 'light'} />
            ))}
          </div>
          {section.showHours ? (
            <div className="mt-10 max-w-sm">
              <h3 className="label mb-3">{t(section.hoursHeading)}</h3>
              <HoursTable tone={dark ? 'dark' : 'light'} className={dark ? 'text-grey [&_th]:text-white' : ''} />
            </div>
          ) : null}
        </div>
        {section.showMap ? (
          <div className={cn('relative min-h-[20rem] overflow-hidden rounded-[var(--radius-card)] lg:min-h-full', dark ? 'bg-slate' : 'bg-surface')}>
            {showEmbed ? (
              <iframe
                src={section.mapEmbedUrl}
                title={t(section.heading)}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 p-6 md:p-8">
                {content.site.logo.mark ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={(dark ? content.site.logo.markOnDark ?? content.site.logo.mark : content.site.logo.mark).src} alt="" aria-hidden="true" className={cn('pointer-events-none absolute left-1/2 top-[40%] w-[80%] -translate-x-1/2 -translate-y-1/2', 'opacity-[0.08]')} />
                ) : null}
                <p className={cn('relative max-w-sm text-sm', dark ? 'text-white' : 'text-ink')}>{t(section.mapConsentNotice)}</p>
                <div className="relative flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" tone={dark ? 'dark' : 'light'} onClick={() => setLoadMap(true)}>
                    {t(section.mapLoadLabel)}
                  </Button>
                  <Button size="sm" variant="text" tone={dark ? 'dark' : 'light'} onClick={openSettings}>
                    {t(content.cookieBanner.settingsLabel)}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </Container>
    </SectionShell>
  );
}
