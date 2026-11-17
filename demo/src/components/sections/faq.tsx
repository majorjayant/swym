'use client';

import NextLink from 'next/link';
import { useId, useState } from 'react';
import type { FAQItem, FAQListSection, FAQTeaserSection, Section } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { resolveHref } from '@/lib/links';
import { ButtonLink } from '../ui/button';
import { Container, Heading, SectionShell } from '../ui/layout';
import { Icon } from '../ui/icon';
import { PlaceholderBadge } from '../ui/placeholder';
import { cn } from '../ui/cn';
import { RichTextBody } from './rich-text';

function AccordionItem({ item, open, onToggle, headingLevel = 3 }: { item: FAQItem; open: boolean; onToggle: () => void; headingLevel?: 2 | 3 }) {
  const { content } = useContent();
  const t = useT();
  const uid = useId();
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <li className="border-b border-line">
      <H className="m-0">
        <button
          type="button"
          id={`${uid}-btn`}
          aria-expanded={open}
          aria-controls={`${uid}-panel`}
          onClick={onToggle}
          className="group flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-[1.0625rem] font-bold"
        >
          <span className="flex flex-wrap items-center gap-2">
            {t(item.question)}
            {item.needsOwnerInput ? <PlaceholderBadge className="text-slate" /> : null}
          </span>
          <span
            className={cn(
              'inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-[transform,background-color,border-color,color] duration-[var(--duration-base)] ease-[var(--ease-brand)]',
              open ? 'rotate-45 border-red bg-red text-white' : 'border-ink group-hover:bg-ink group-hover:text-white',
            )}
            aria-hidden="true"
          >
            <Icon name="plus" size={16} />
          </span>
          <span className="sr-only">{t(open ? content.microcopy.faq.collapse : content.microcopy.faq.expand)}</span>
        </button>
      </H>
      <div id={`${uid}-panel`} role="region" aria-labelledby={`${uid}-btn`} className="accordion-panel" data-open={open} inert={!open}>
        <div>
          <RichTextBody body={item.answer} className="pb-6 pr-12 [&_p]:max-w-[64ch] [&_p:last-child]:mb-0" />
        </div>
      </div>
    </li>
  );
}

function Accordion({ items, allowMultiple, headingLevel }: { items: FAQItem[]; allowMultiple: boolean; headingLevel?: 2 | 3 }) {
  const [open, setOpen] = useState<string[]>([]);
  return (
    <ul className="border-t border-line">
      {items.map((it) => (
        <AccordionItem
          key={it.id}
          item={it}
          headingLevel={headingLevel}
          open={open.includes(it.id)}
          onToggle={() =>
            setOpen((s) => (s.includes(it.id) ? s.filter((x) => x !== it.id) : allowMultiple ? [...s, it.id] : [it.id]))
          }
        />
      ))}
    </ul>
  );
}

export function FAQList({ section }: { section: FAQListSection }) {
  const { content } = useContent();
  const t = useT();
  const id = `${section.id}-title`;
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id}>
      <Container className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <nav aria-label={t(section.jumpLinksLabel)} className="lg:sticky lg:top-28 lg:self-start">
          <p className="label mb-3 text-slate">{t(section.jumpLinksLabel)}</p>
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-l lg:border-line">
            {section.groups.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-bold hover:border-ink lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:border-transparent lg:hover:border-red"
                >
                  {t(g.title)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0">
          <Heading id={id} className="sr-only">{t(section.heading)}</Heading>
          {section.intro ? <p className="mb-8 max-w-2xl text-lead text-slate">{t(section.intro)}</p> : null}
          <div className="space-y-14">
            {section.groups.map((g) => {
              const items = [...g.items].sort((a, b) => a.order - b.order);
              return (
                <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28">
                  <h2 id={`${g.id}-title`} className="mb-4 text-title-fluid font-bold">{t(g.title)}</h2>
                  {items.length ? (
                    <Accordion items={items} allowMultiple={section.allowMultipleOpen} headingLevel={3} />
                  ) : (
                    <p className="text-slate">{t(content.microcopy.faq.noResults)}</p>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}

export function FAQTeaser({ section }: { section: FAQTeaserSection }) {
  const { content } = useContent();
  const t = useT();
  const id = `${section.id}-title`;
  const list = content.pages.faq.sections.find((s): s is Extract<Section, { type: 'faqList' }> => s.type === 'faqList');
  const items = (list?.groups.flatMap((g) => g.items) ?? []).filter((i) => i.showOnHome).sort((a, b) => a.order - b.order).slice(0, section.limit);
  const more = resolveHref(section.moreLink);
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id} tone="grey">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Heading id={id}>{t(section.heading)}</Heading>
          {section.intro ? <p className="mt-4 max-w-md text-lead text-slate">{t(section.intro)}</p> : null}
          {more ? (
            <div className="mt-8 hidden lg:block">
              <ButtonLink link={section.moreLink} variant="secondary" iconAfter="arrow-right" />
            </div>
          ) : null}
        </div>
        <div>
          {items.length ? <Accordion items={items} allowMultiple={false} /> : <p className="text-slate">{t(content.microcopy.faq.noResults)}</p>}
          {more ? (
            <NextLink href={more} className="link-underline mt-6 inline-flex min-h-11 items-center gap-2 font-bold lg:hidden">
              {t(section.moreLink.label)}
              <Icon name="arrow-right" size={16} />
            </NextLink>
          ) : null}
        </div>
      </Container>
    </SectionShell>
  );
}
