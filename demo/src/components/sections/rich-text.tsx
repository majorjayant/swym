'use client';

import NextLink from 'next/link';
import type { LegalBodySection, RichText, RichTextSection, SiteSettings } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { isExternal, isInternal, resolveHref } from '@/lib/links';
import { Container, Heading, SectionShell } from '../ui/layout';
import { Icon } from '../ui/icon';
import { RichInline } from '../ui/placeholder';
import { cn } from '../ui/cn';

/** Resolve legal merge tokens from SiteSettings. Unsupplied values become [PLACEHOLDER] chips. */
export function mergeTokens(text: string, site: SiteSettings, businessName: string, address: string): string {
  const ph = (note: string) => `[PLACEHOLDER: ${note}]`;
  const legal = site.legalName.isPlaceholder || !site.legalName.value ? ph(site.legalName.note ?? 'legal name') : site.legalName.value;
  const email = site.privacyOfficer?.email;
  const privacyEmail = !email || email.isPlaceholder || !email.value ? ph(email?.note ?? 'privacy email') : email.value;
  return text
    .replaceAll('{legalName}', legal)
    .replaceAll('{businessName}', businessName)
    .replaceAll('{privacyEmail}', privacyEmail)
    .replaceAll('{address}', address);
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function RichTextBody({ body, showMarkers = true, className }: { body: RichText; showMarkers?: boolean; className?: string }) {
  const { content } = useContent();
  const t = useT();
  const business = t(content.site.businessName);
  const address = t(content.site.address.display);
  const tx = (v: Parameters<typeof t>[0]) => mergeTokens(t(v), content.site, business, address);
  return (
    <div className={cn('prose-legal', className)}>
      {body.map((b, i) => {
        switch (b.type) {
          case 'paragraph':
            return (
              <p key={i}>
                <RichInline text={tx(b.text)} />
              </p>
            );
          case 'heading': {
            const H = `h${b.level}` as 'h2' | 'h3' | 'h4';
            return (
              <H key={i} id={b.anchor ?? slug(t(b.text))} className="font-bold scroll-mt-28">
                {tx(b.text)}
              </H>
            );
          }
          case 'list': {
            const L = b.ordered ? 'ol' : 'ul';
            return (
              <L key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <RichInline text={tx(it)} />
                  </li>
                ))}
              </L>
            );
          }
          case 'link': {
            const href = resolveHref(b.link);
            if (!href) return null;
            return (
              <p key={i}>
                {isInternal(href) ? (
                  <NextLink href={href} className="link-underline font-bold">{t(b.link.label)}</NextLink>
                ) : (
                  <a href={href} className="link-underline inline-flex items-center gap-1 font-bold" {...(isExternal(b.link) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {t(b.link.label)}
                    <Icon name="external" size={14} />
                  </a>
                )}
              </p>
            );
          }
          case 'marker':
            if (!showMarkers) return null;
            return (
              <p key={i} className={cn('!text-ink my-4 flex items-start gap-2 rounded-[var(--radius-control)] border-l-4 px-4 py-3 text-sm font-bold', b.kind === 'lawyer' ? 'border-red bg-[#fdecec]' : 'border-slate bg-surface')}>
                <Icon name="alert" size={16} className="mt-0.5 shrink-0" />
                <span>{tx(b.text)}</span>
              </p>
            );
        }
      })}
    </div>
  );
}

export function RichTextBlock({ section }: { section: RichTextSection }) {
  const t = useT();
  const id = `${section.id}-title`;
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={section.heading ? id : undefined}>
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {section.heading ? <Heading id={id}>{t(section.heading)}</Heading> : <div />}
        <RichTextBody body={section.body} className="text-lead [&_p]:text-[1.0625rem]" />
      </Container>
    </SectionShell>
  );
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/** Legal page body: dates, disclaimer, sticky table of contents (>= 1024px), marker callouts while lawyerMarkers. */
export function LegalBody({ section }: { section: LegalBodySection }) {
  const t = useT();
  const toc = section.body.filter((b): b is Extract<RichText[number], { type: 'heading' }> => b.type === 'heading' && b.level === 2);
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} padding="md">
      <Container className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <dl className="space-y-1 text-sm text-slate">
            <div className="flex gap-2"><dt className="font-bold text-ink">{t(section.effectiveLabel)}</dt><dd>{formatDate(section.effectiveDate)}</dd></div>
            <div className="flex gap-2"><dt className="font-bold text-ink">{t(section.reviewedLabel)}</dt><dd>{formatDate(section.lastReviewed)}</dd></div>
          </dl>
          {toc.length ? (
            <nav aria-label={t(section.tocHeading)} className="mt-8 hidden lg:block">
              <p className="label mb-3 text-slate">{t(section.tocHeading)}</p>
              <ol className="space-y-1 border-l border-line text-sm">
                {toc.map((h, i) => (
                  <li key={i}>
                    <a href={`#${h.anchor ?? slug(t(h.text))}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 hover:border-red">
                      {t(h.text)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </aside>
        <div className="min-w-0">
          <p className="mb-8 flex items-start gap-2 rounded-[var(--radius-control)] bg-surface px-4 py-3 text-sm font-bold">
            <Icon name="alert" size={16} className="mt-0.5 shrink-0 text-red" />
            {t(section.disclaimer)}
          </p>
          <RichTextBody body={section.body} showMarkers={section.lawyerMarkers} />
        </div>
      </Container>
    </SectionShell>
  );
}
