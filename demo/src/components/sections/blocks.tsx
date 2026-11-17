'use client';

import NextLink from 'next/link';
import type {
  AreasServedSection,
  NotFoundSection,
  PageHeaderSection,
  ProofBarSection,
  ReviewsSection,
  SplitCtaSection,
  StandardsSection,
  StepsSection,
  TeamSection,
} from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { isInternal, resolveHref } from '@/lib/links';
import { ButtonLink } from '../ui/button';
import { Icon } from '../ui/icon';
import { Container, Eyebrow, Heading, SectionShell, ShortRule } from '../ui/layout';
import { MediaImage } from '../ui/media';
import { PlaceholderBadge, PlaceholderValue, RichInline } from '../ui/placeholder';
import { Reveal } from '../ui/reveal';
import { cn } from '../ui/cn';

const tone = (theme: 'light' | 'dark') => (theme === 'dark' ? 'dark' : 'light');

export function PageHeader({ section }: { section: PageHeaderSection }) {
  const t = useT();
  const dark = section.theme === 'dark';
  return (
    <SectionShell theme={section.theme} padding="md" anchor={section.anchor} className={cn(dark && 'wedge wedge-sm')}>
      <Container className={cn('grid items-end gap-10', section.image && 'lg:grid-cols-[1.1fr_0.9fr]')}>
        <div className="max-w-3xl">
          {section.eyebrow ? <Eyebrow tone={tone(section.theme)} className="mb-4">{t(section.eyebrow)}</Eyebrow> : null}
          <Heading level={1} size="display" className="max-w-[18ch]">
            {t(section.heading)}
          </Heading>
          {section.intro ? (
            <p className={cn('mt-5 max-w-2xl text-lead', dark ? 'text-grey' : 'text-slate')}>
              <RichInline text={t(section.intro)} />
            </p>
          ) : null}
        </div>
        {section.image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <MediaImage image={section.image} fill tone={dark ? 'dark' : 'light'} />
          </div>
        ) : null}
      </Container>
    </SectionShell>
  );
}

export function ProofBar({ section }: { section: ProofBarSection }) {
  const t = useT();
  return (
    <SectionShell theme={section.theme} padding="none" anchor={section.anchor} className="border-b border-line">
      <Container>
        <dl className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
          {section.items.map((item, i) => {
            const href = item.link ? resolveHref(item.link) : null;
            return (
              <Reveal key={i} delay={i * 60} className={cn('flex flex-col-reverse gap-1 px-1 py-6 lg:px-8 lg:py-8', i % 2 === 1 && 'pl-5 lg:pl-8', i >= 2 && 'border-t border-line lg:border-t-0', i === 0 && 'lg:pl-0')}>
                <dt className="text-sm text-slate">
                  {href && item.link ? (
                    isInternal(href) ? (
                      <NextLink href={href} className="link-underline inline-flex min-h-6 items-center">{t(item.label)}</NextLink>
                    ) : (
                      <a href={href} className="link-underline inline-flex min-h-6 items-center">{t(item.label)}</a>
                    )
                  ) : (
                    t(item.label)
                  )}
                </dt>
                <dd className="flex min-h-9 flex-wrap items-baseline gap-2 text-title-fluid font-bold">
                  <PlaceholderValue value={item.value} />
                  {item.suffix && !item.value.isPlaceholder ? <span className="text-sm font-normal text-slate">{t(item.suffix)}</span> : null}
                </dd>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </SectionShell>
  );
}

export function Steps({ section }: { section: StepsSection }) {
  const t = useT();
  const id = `${section.id}-title`;
  const dark = section.theme === 'dark';
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id}>
      <Container>
        <div className="max-w-2xl">
          <Heading id={id}>{t(section.heading)}</Heading>
          {section.intro ? <p className={cn('mt-4 text-lead', dark ? 'text-grey' : 'text-slate')}>{t(section.intro)}</p> : null}
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {section.steps.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 80} className="group relative border-t-2 border-ink pt-6">
              <span className="absolute -top-px left-0 h-0.5 w-0 bg-red transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-brand)] group-hover:w-full" aria-hidden="true" />
              <div className="flex items-center gap-4">
                <span className="label text-red tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <Icon name={s.icon} size={24} className="text-ink" />
              </div>
              <h3 className="mt-5 text-title-fluid font-bold">{t(s.title)}</h3>
              <p className={cn('mt-3', dark ? 'text-grey' : 'text-slate')}>{t(s.body)}</p>
            </Reveal>
          ))}
        </ol>
        {section.cta ? (
          <div className="mt-10">
            <ButtonLink link={section.cta} tone={tone(section.theme)} />
          </div>
        ) : null}
      </Container>
    </SectionShell>
  );
}

export function SplitCta({ section }: { section: SplitCtaSection }) {
  const t = useT();
  const id = `${section.id}-title`;
  const dark = section.theme === 'dark';
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id} padding="lg" className="wedge overflow-hidden">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ShortRule className="mb-6" />
          <Heading id={id}>{t(section.heading)}</Heading>
          <p className={cn('mt-5 max-w-xl text-lead', dark ? 'text-grey' : 'text-slate')}>
            <RichInline text={t(section.body)} />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink link={section.primary} size="lg" tone={tone(section.theme)} />
            {section.secondary ? <ButtonLink link={section.secondary} size="lg" tone={tone(section.theme)} /> : null}
          </div>
        </Reveal>
        {section.image ? (
          <Reveal kind="fade" delay={120} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <MediaImage image={section.image} fill tone={dark ? 'light' : 'dark'} />
          </Reveal>
        ) : null}
      </Container>
    </SectionShell>
  );
}

export function Reviews({ section }: { section: ReviewsSection }) {
  const { content } = useContent();
  const t = useT();
  const mc = content.microcopy.reviews;
  const id = `${section.id}-title`;
  const ratingKnown = !section.rating.isPlaceholder && !!section.rating.value;
  const profile = section.profileLink ? resolveHref(section.profileLink) : null;
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id} tone="grey">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Heading id={id}>{t(section.heading)}</Heading>
            {section.intro ? <p className="mt-4 text-lead text-slate">{t(section.intro)}</p> : null}
          </div>
          <div className="flex flex-col items-start gap-1 md:items-end">
            {ratingKnown ? (
              <p className="flex items-center gap-2 text-title-fluid font-bold">
                <Icon name="star" size={22} className="fill-red text-red" />
                {section.rating.value}
                <span className="text-sm font-normal text-slate">{t(mc.ratingOutOf)}</span>
              </p>
            ) : (
              <p className="flex items-center gap-2 text-sm text-slate">
                {t(mc.placeholderRating)} <PlaceholderBadge note={section.rating.note} />
              </p>
            )}
            {!section.count.isPlaceholder && section.count.value ? (
              <p className="text-sm text-slate">{t(mc.basedOn, { count: section.count.value })}</p>
            ) : null}
          </div>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {section.items.map((r, i) => (
            <Reveal as="li" key={i} delay={i * 80}>
              <figure className={cn('flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 md:p-7', r.isPlaceholder && 'border border-dashed border-slate/40')}>
                {r.isPlaceholder ? <PlaceholderBadge className="mb-4 self-start text-slate" note={t(section.sourceLabel)} /> : null}
                <blockquote className="flex-1 text-[1.0625rem] leading-relaxed">
                  <RichInline text={t(r.quote)} />
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4 text-sm">
                  <span className="short-rule w-5" aria-hidden="true" />
                  <span className="font-bold"><RichInline text={t(r.author)} /></span>
                  <span className="text-slate">{t(section.sourceLabel)}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        {section.profileLink ? (
          <div className="mt-8">
            {profile ? (
              <ButtonLink link={section.profileLink} variant="text" iconAfter="external" />
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-slate">
                {t(section.profileLink.label)} <PlaceholderBadge note={section.profileLink.href} />
              </span>
            )}
          </div>
        ) : null}
      </Container>
    </SectionShell>
  );
}

export function AreasServed({ section }: { section: AreasServedSection }) {
  const t = useT();
  const id = `${section.id}-title`;
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id}>
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Heading id={id}>{t(section.heading)}</Heading>
          {section.intro ? <p className="mt-4 max-w-md text-lead text-slate">{t(section.intro)}</p> : null}
        </div>
        <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
          {section.areas.map((a, i) => (
            <Reveal as="li" key={i} delay={i * 40} className="flex min-h-12 items-center gap-3 border-b border-line text-[1.0625rem] font-bold">
              <Icon name="map-pin" size={16} className={i === 0 ? 'text-red' : 'text-slate'} />
              {a.href ? (
                <NextLink href={a.href} className="link-underline">{t(a.name)}</NextLink>
              ) : (
                t(a.name)
              )}
            </Reveal>
          ))}
        </ul>
      </Container>
    </SectionShell>
  );
}

export function Team({ section }: { section: TeamSection }) {
  const t = useT();
  if (!section.members.length) return null;
  const id = `${section.id}-title`;
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id}>
      <Container>
        <Heading id={id}>{t(section.heading)}</Heading>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {section.members.map((m, i) => (
            <li key={i}>
              <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
                <MediaImage image={m.photo ?? null} fill tone="light" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{t(m.name)}</h3>
              <p className="text-sm text-slate">{t(m.role)}</p>
              {m.bio ? <p className="mt-2 text-sm">{t(m.bio)}</p> : null}
            </li>
          ))}
        </ul>
      </Container>
    </SectionShell>
  );
}

export function Standards({ section }: { section: StandardsSection }) {
  const t = useT();
  const id = `${section.id}-title`;
  const dark = section.theme === 'dark';
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id} tone="grey">
      <Container>
        <div className="max-w-2xl">
          <Heading id={id}>{t(section.heading)}</Heading>
          {section.intro ? <p className={cn('mt-4 text-lead', dark ? 'text-grey' : 'text-slate')}><RichInline text={t(section.intro)} /></p> : null}
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((it, i) => (
            <Reveal as="li" key={i} delay={i * 60} className="rounded-[var(--radius-card)] bg-white p-6 md:p-7">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-white">
                <Icon name={it.icon} size={20} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{t(it.title)}</h3>
              <p className="mt-2 text-slate">
                {it.body.isPlaceholder ? <PlaceholderBadge note={it.body.note} /> : <RichInline text={it.body.value} />}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </SectionShell>
  );
}

export function NotFound({ section }: { section: NotFoundSection }) {
  const t = useT();
  return (
    <SectionShell theme={section.theme} padding="lg" anchor={section.anchor} className="wedge">
      <Container className="max-w-3xl">
        <ShortRule className="mb-6" />
        <Heading level={1} size="display">{t(section.heading)}</Heading>
        <p className={cn('mt-5 text-lead', section.theme === 'dark' ? 'text-grey' : 'text-slate')}>{t(section.body)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {section.ctas.map((c, i) => (
            <ButtonLink key={i} link={c} size="lg" tone={tone(section.theme)} />
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
