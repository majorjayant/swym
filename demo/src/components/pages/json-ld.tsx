import type { ContentTree, RichText } from '@/content/schema';
import { autoDealerJsonLd } from '@/lib/seo';
import { t } from '@/lib/i18n';

export function JsonLdScript({ data }: { data: unknown }) {
  return <JsonLd data={data} />;
}

function JsonLd({ data }: { data: unknown }) {
  // JSON-LD must be raw JSON in a script tag; "<" is escaped so content cannot close the tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function SiteJsonLd({ content }: { content: ContentTree }) {
  return <JsonLd data={autoDealerJsonLd(content.site, content.seo)} />;
}

function plain(body: RichText): string {
  return body
    .map((b) => (b.type === 'paragraph' ? t(b.text) : b.type === 'list' ? b.items.map((i) => t(i)).join('; ') : ''))
    .filter(Boolean)
    .join(' ');
}

/** FAQPage JSON-LD only for answers the owner has confirmed (needsOwnerInput false) and without placeholders. */
export function FaqJsonLd({ content }: { content: ContentTree }) {
  const list = content.pages.faq.sections.find((s) => s.type === 'faqList');
  if (!list || list.type !== 'faqList' || !list.enabled) return null;
  const items = list.groups
    .flatMap((g) => g.items)
    .filter((i) => !i.needsOwnerInput)
    .map((i) => ({ q: t(i.question), a: plain(i.answer) }))
    .filter((i) => i.a && !/\[(PLACEHOLDER|LAWYER|OWNER)/.test(i.a));
  if (!items.length) return null;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
      }}
    />
  );
}
