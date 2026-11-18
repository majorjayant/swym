'use client';

import NextLink from 'next/link';
import { useCallback, useRef, useState } from 'react';
import type { Vehicle } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { buttonClass } from '../ui/button';
import { Icon } from '../ui/icon';
import { Container, Heading, SectionShell } from '../ui/layout';
import { MediaImage } from '../ui/media';
import { Reveal } from '../ui/reveal';
import { cn } from '../ui/cn';
import { VehicleCard, formatKm, formatPrice, vehicleName } from '../sections/inventory';
import { PageSections } from '../sections';

function Gallery({ v }: { v: Vehicle }) {
  const { content } = useContent();
  const t = useT();
  const g = content.microcopy.vehicle.gallery;
  const mc = content.microcopy.vehicle;
  const [i, setI] = useState(0);
  const n = v.photos.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);
  const touch = useRef<number | null>(null);
  const photo = v.photos[i];
  return (
    <div>
      <div
        className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-surface"
        role="group"
        aria-roledescription="carousel"
        aria-label={vehicleName(v)}
        tabIndex={n > 1 ? 0 : -1}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
          if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
        }}
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <MediaImage key={photo.src} image={photo} fill tone="light" priority={i === 0} sizes="(min-width: 1024px) 60vw, 100vw" className="animate-[fade-in_250ms_ease-out]" />
        {n > 1 ? (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={t(g.previous)} className="absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white" data-testid="gallery-prev">
              <Icon name="chevron-left" size={20} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t(g.next)} className="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white" data-testid="gallery-next">
              <Icon name="chevron-right" size={20} />
            </button>
            <p className="absolute bottom-3 right-3 rounded-[4px] bg-ink/80 px-2 py-1 text-xs font-bold text-white" aria-live="polite" data-testid="gallery-count">
              {t(g.photoOf, { n: i + 1, total: n })}
            </p>
          </>
        ) : null}
      </div>
      {n > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6" aria-label={t(g.thumbnails)}>
          {v.photos.map((p, j) => (
            <li key={p.src}>
              <button
                type="button"
                onClick={() => setI(j)}
                aria-label={t(g.photoOf, { n: j + 1, total: n })}
                aria-current={j === i}
                className={cn('relative block aspect-[3/2] w-full overflow-hidden rounded-[4px] border-2', j === i ? 'border-red' : 'border-transparent opacity-80 hover:opacity-100')}
              >
                <MediaImage image={{ ...p, decorative: true }} fill tone="light" showBadge={false} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {photo.credit ? (
        <p className="mt-3 text-xs text-slate">
          {t(mc.photoCredit, { author: photo.credit.author })} ·{' '}
          <a href={photo.credit.licenceUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-6 items-center">{photo.credit.licence}</a> ·{' '}
          <a href={photo.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-6 items-center">{t(mc.photoSource)}</a>
        </p>
      ) : null}
    </div>
  );
}

/** Vehicle detail page: gallery, price block, CTAs, key facts, trust strip, features, description, similar vehicles. */
export function VehicleDetail({ slug }: { slug: string }) {
  const { content } = useContent();
  const t = useT();
  const mc = content.microcopy.vehicle;
  const v = content.inventory.vehicles.find((x) => x.slug === slug);
  if (!v) return null;
  const phone = content.site.phones.find((p) => p.primary) ?? content.site.phones[0];
  const textPhone = content.site.phones.find((p) => p.primary && p.sms) ?? content.site.phones.find((p) => p.sms) ?? phone;
  const smsBody = t(mc.textBody, { stock: v.stockNumber, year: v.year, make: v.make, model: v.model });
  const others = content.inventory.vehicles.filter((x) => x.id !== v.id);
  const similar = [...others.filter((x) => x.body === v.body), ...others.filter((x) => x.body !== v.body)].slice(0, 3);
  const f = mc.factLabels;
  const facts: [string, string][] = [
    [t(f.year), String(v.year)],
    [t(f.make), v.make],
    [t(f.model), v.model],
    [t(f.trim), v.trim],
    [t(f.body), t(mc.bodyNames[v.body])],
    [t(f.km), formatKm(v.km)],
    [t(f.drivetrain), v.drivetrain],
    [t(f.transmission), t(v.transmission)],
    [t(f.engine), t(v.engine)],
    [t(f.fuel), t(v.fuel)],
    [t(f.fuelEconomy), t(mc.fuelEconomyValue, { city: v.fuelEconomy.city, highway: v.fuelEconomy.highway })],
    [t(f.exteriorColour), t(v.exteriorColour)],
    [t(f.interiorColour), t(v.interiorColour)],
    [t(f.seats), String(v.seats)],
    [t(f.doors), String(v.doors)],
    [t(f.vin), v.vin],
    [t(f.stockNumber), v.stockNumber],
  ];
  const pending = v.status === 'salePending';
  const visit = content.pages.inventory.sections.filter((s) => s.type === 'visitUs');
  return (
    <>
      <SectionShell theme="light" padding="sm">
        <Container>
          <nav aria-label={t(mc.breadcrumbInventory)} className="mb-6 text-sm text-slate">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><NextLink href="/" className="link-underline inline-flex min-h-6 items-center">{t(content.site.businessName)}</NextLink></li>
              <li aria-hidden="true"><Icon name="chevron-right" size={14} /></li>
              <li><NextLink href="/inventory" className="link-underline inline-flex min-h-6 items-center">{t(mc.breadcrumbInventory)}</NextLink></li>
              <li aria-hidden="true"><Icon name="chevron-right" size={14} /></li>
              <li aria-current="page" className="font-bold text-ink">{vehicleName(v)}</li>
            </ol>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
            <Gallery v={v} />
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className={cn('label inline-block rounded-[4px] px-2 py-1', pending ? 'bg-ink text-white' : 'bg-surface text-ink')}>{t(mc.statusLabels[v.status])}</span>
              <Heading level={1} size="headline" className="mt-4">{vehicleName(v)}</Heading>
              <p className="mt-1 text-lead text-slate">{v.trim}</p>
              <p className="mt-4 text-sm text-slate">
                {t(mc.kmUnit, { km: formatKm(v.km) })} · {v.drivetrain} · {t(v.exteriorColour)} · {t(mc.stockLabel, { stock: v.stockNumber })}
              </p>
              <div className="mt-6 border-y border-line py-5">
                <p className="text-display-fluid font-bold tabular-nums leading-none">{formatPrice(v.price)}</p>
                <p className="mt-2 text-sm text-slate">{t(mc.priceNote)}</p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a href={`tel:${phone.number}`} className={buttonClass({ variant: 'primary', size: 'lg', className: 'sm:col-span-2' })}>
                  <Icon name="phone" size={18} />
                  <span>{t(mc.callCta)}</span>
                </a>
                <a href={`sms:${textPhone.number}?body=${encodeURIComponent(smsBody)}`} className={buttonClass({ variant: 'secondary', size: 'lg' })}>
                  <Icon name="message" size={18} />
                  <span>{t(mc.textCta)}</span>
                </a>
                <NextLink href={mc.testDriveHref} className={buttonClass({ variant: 'secondary', size: 'lg' })}>
                  <Icon name="key" size={18} />
                  <span>{t(mc.testDriveCta)}</span>
                </NextLink>
              </div>
            </div>
          </div>
        </Container>
      </SectionShell>

      <SectionShell theme="light" tone="grey" padding="md">
        <Container>
          <Heading size="title">{t(mc.trustHeading)}</Heading>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mc.trustItems.map((it, i) => (
              <Reveal as="li" key={i} delay={i * 60} className="rounded-[var(--radius-card)] bg-white p-5">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-ink text-white"><Icon name={it.icon} size={18} /></span>
                <h3 className="mt-4 font-bold">{t(it.title)}</h3>
                <p className="mt-1 text-sm text-slate">{t(it.body)}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </SectionShell>

      <SectionShell theme="light" padding="md">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Heading size="title">{t(mc.descriptionHeading)}</Heading>
            <p className="mt-4 text-lead text-slate">{t(v.description)}</p>
            <Heading size="title" className="mt-10">{t(mc.featuresHeading)}</Heading>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {v.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Icon name="check" size={18} className="mt-0.5 shrink-0 text-red" />
                  <span>{t(feat)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading size="title">{t(mc.keyFactsHeading)}</Heading>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {facts.map(([k, val]) => (
                <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 py-2.5 text-sm">
                  <dt className="text-slate">{k}</dt>
                  <dd className="break-words font-bold">{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </SectionShell>

      {similar.length ? (
        <SectionShell theme="light" tone="grey" padding="md">
          <Container>
            <Heading>{t(mc.similarHeading)}</Heading>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => (
                <li key={s.id}>
                  <VehicleCard v={s} />
                </li>
              ))}
            </ul>
          </Container>
        </SectionShell>
      ) : null}

      <PageSections page={{ ...content.pages.inventory, sections: visit }} />
    </>
  );
}
