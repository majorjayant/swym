'use client';

import NextLink from 'next/link';
import { useMemo, useState } from 'react';
import type { BodyType, ContentTree, FeaturedVehiclesSection, Image, InventoryListSection, PhotoCreditsSection, Vehicle } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { ButtonLink } from '../ui/button';
import { Icon } from '../ui/icon';
import { Container, Heading, SectionShell } from '../ui/layout';
import { MediaImage } from '../ui/media';
import { Reveal } from '../ui/reveal';
import { cn } from '../ui/cn';

export const formatPrice = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
export const formatKm = (n: number) => new Intl.NumberFormat('en-CA').format(n);
export const vehicleHref = (v: Vehicle) => `/inventory/${v.slug}`;
export const vehicleName = (v: Vehicle) => `${v.year} ${v.make} ${v.model}`;

/** Listing card: photo, name and trim, km, drive-away price, stock #, status. */
export function VehicleCard({ v, headingLevel = 3, priority }: { v: Vehicle; headingLevel?: 2 | 3; priority?: boolean }) {
  const { content } = useContent();
  const t = useT();
  const mc = content.microcopy.vehicle;
  const H = `h${headingLevel}` as 'h2' | 'h3';
  const pending = v.status === 'salePending';
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-[transform,border-color] duration-[var(--duration-base)] ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:border-ink">
      <div className="relative aspect-[3/2] overflow-hidden bg-surface">
        <MediaImage image={v.photos[0]} fill tone="light" priority={priority} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[var(--duration-slow)] ease-[var(--ease-brand)] group-hover:scale-[1.03]" />
        <span className={cn('label absolute left-3 top-3 rounded-[4px] px-2 py-1', pending ? 'bg-ink text-white' : 'bg-white text-ink')}>
          {t(mc.statusLabels[v.status])}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <H className="text-lg font-bold leading-snug">
          <NextLink href={vehicleHref(v)} className="after:absolute after:inset-0 focus-visible:outline-none [&:focus-visible]:after:outline-2 [&:focus-visible]:after:outline-offset-[-4px] [&:focus-visible]:after:outline-red [&:focus-visible]:after:rounded-[var(--radius-card)]">
            {vehicleName(v)}
            <span className="block text-sm font-normal text-slate">{v.trim}</span>
          </NextLink>
        </H>
        <p className="text-sm text-slate">
          {t(mc.kmUnit, { km: formatKm(v.km) })} · {v.drivetrain} · {t(mc.stockLabel, { stock: v.stockNumber })}
        </p>
        <p className="mt-auto flex items-baseline gap-2 border-t border-line pt-3">
          <span className="text-title-fluid font-bold tabular-nums">{formatPrice(v.price)}</span>
          <span className="text-sm text-slate">{t(mc.priceSuffix)}</span>
        </p>
      </div>
    </article>
  );
}

export function FeaturedVehicles({ section }: { section: FeaturedVehiclesSection }) {
  const { content } = useContent();
  const t = useT();
  const id = `${section.id}-title`;
  const list = content.inventory.vehicles.filter((v) => v.featured).slice(0, section.limit);
  if (!list.length) return null;
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id}>
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Heading id={id}>{t(section.heading)}</Heading>
            {section.intro ? <p className="mt-4 text-lead text-slate">{t(section.intro)}</p> : null}
          </div>
          <ButtonLink link={section.moreLink} variant="text" iconAfter="arrow-right" />
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v, i) => (
            <Reveal as="li" key={v.id} delay={(i % 3) * 60}>
              <VehicleCard v={v} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </SectionShell>
  );
}

type Sort = InventoryListSection['sortOptions'][number]['value'];

function sortVehicles(list: Vehicle[], sort: Sort): Vehicle[] {
  const out = [...list];
  if (sort === 'priceAsc') out.sort((a, b) => a.price - b.price);
  else if (sort === 'priceDesc') out.sort((a, b) => b.price - a.price);
  else if (sort === 'kmAsc') out.sort((a, b) => a.km - b.km);
  else out.sort((a, b) => b.year - a.year || a.km - b.km);
  return out;
}

export function InventoryList({ section }: { section: InventoryListSection }) {
  const { content } = useContent();
  const t = useT();
  const mc = content.microcopy.vehicle;
  const all = content.inventory.vehicles;
  const bodies = useMemo(() => (['sedan', 'suv', 'truck', 'van'] as BodyType[]).filter((b) => all.some((v) => v.body === b)), [all]);
  const [body, setBody] = useState<BodyType | 'all'>('all');
  const [sort, setSort] = useState<Sort>(section.sortOptions[0]?.value ?? 'newest');
  const list = useMemo(() => sortVehicles(body === 'all' ? all : all.filter((v) => v.body === body), sort), [all, body, sort]);
  const id = `${section.id}-title`;
  const chip = (active: boolean) =>
    cn(
      'inline-flex min-h-11 items-center rounded-full border-2 px-4 text-sm font-bold transition-colors duration-[var(--duration-fast)]',
      active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink',
    );
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={section.heading ? id : undefined} padding="md">
      <Container>
        {section.heading ? <Heading id={id} className="mb-8">{t(section.heading)}</Heading> : null}
        <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
          <fieldset>
            <legend className="label mb-3 text-slate">{t(section.filterLabel)}</legend>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={chip(body === 'all')} aria-pressed={body === 'all'} onClick={() => setBody('all')}>
                {t(section.allLabel)}
              </button>
              {bodies.map((b) => (
                <button key={b} type="button" className={chip(body === b)} aria-pressed={body === b} onClick={() => setBody(b)}>
                  {t(mc.bodyLabels[b])}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-wrap items-end gap-4">
            <p className="text-sm text-slate" role="status" aria-live="polite">{t(section.resultCount, { count: list.length })}</p>
            <label className="flex flex-col gap-2 text-sm font-bold">
              <span className="label text-slate">{t(section.sortLabel)}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="min-h-11 rounded-[var(--radius-control)] border-2 border-line bg-white px-3 pr-8 text-sm font-bold text-ink hover:border-ink"
              >
                {section.sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{t(o.label)}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        {list.length ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="inventory-grid">
            {list.map((v, i) => (
              <li key={v.id}>
                <VehicleCard v={v} headingLevel={section.heading ? 3 : 2} priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-[var(--radius-card)] bg-surface p-8 text-center">
            <h2 className="text-title-fluid font-bold">{t(section.emptyTitle)}</h2>
            <p className="mx-auto mt-3 max-w-md text-slate">{t(section.emptyBody)}</p>
            <div className="mt-6">
              <ButtonLink link={section.emptyCta} />
            </div>
          </div>
        )}
      </Container>
    </SectionShell>
  );
}

/** Every credited image in the tree (inventory photos first), de-duplicated by file. */
export function collectCredits(content: ContentTree): Image[] {
  const seen = new Set<string>();
  const out: Image[] = [];
  const add = (img?: Image) => {
    if (!img?.credit || seen.has(img.src)) return;
    seen.add(img.src);
    out.push(img);
  };
  content.inventory.vehicles.forEach((v) => v.photos.forEach(add));
  const walk = (v: unknown) => {
    if (!v || typeof v !== 'object') return;
    if (Array.isArray(v)) return v.forEach(walk);
    const o = v as Record<string, unknown>;
    if (typeof o.src === 'string' && o.credit) add(o as unknown as Image);
    Object.values(o).forEach(walk);
  };
  walk(content.pages);
  return out;
}

export function PhotoCredits({ section }: { section: PhotoCreditsSection }) {
  const { content } = useContent();
  const t = useT();
  const mc = content.microcopy.vehicle;
  const credits = collectCredits(content);
  if (!credits.length) return null;
  const id = `${section.id}-title`;
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id} padding="sm" className="border-t border-line">
      <Container className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <div />
        <div className="min-w-0">
          <Heading id={id} size="title">{t(section.heading)}</Heading>
          {section.intro ? <p className="mt-3 max-w-2xl text-slate">{t(section.intro)}</p> : null}
          <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            {credits.map((img) => (
              <li key={img.src} className="flex min-w-0 flex-wrap items-center gap-x-1.5">
                <span className="truncate font-bold">{t(img.alt)}</span>
                <span className="text-slate">
                  {t(mc.photoCredit, { author: img.credit!.author })}
                </span>
                <a href={img.credit!.licenceUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-6 items-center">
                  {img.credit!.licence}
                </a>
                <a href={img.credit!.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-6 items-center gap-1">
                  {t(mc.photoSource)}
                  <Icon name="external" size={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </SectionShell>
  );
}
