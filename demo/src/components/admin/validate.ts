import { FIELD_LIMITS } from '@/content/schema';

export type Path = (string | number)[];
export type FieldError = { path: Path; kind: 'required' | 'tooLong'; limit?: number };

export const isLocalized = (v: unknown): v is { en: string } =>
  !!v && typeof v === 'object' && !Array.isArray(v) && typeof (v as { en?: unknown }).en === 'string' && Object.keys(v as object).every((k) => ['en', 'pa', 'hi', 'fr'].includes(k));

/** Character limit for a LocalizedString at this path (content-model.md), or undefined. */
export function limitFor(path: Path, parent?: Record<string, unknown>): number | undefined {
  const key = String(path[path.length - 1]);
  const inSeo = path.includes('seo');
  const under = (k: string) => path.includes(k);
  if (inSeo && key === 'title') return FIELD_LIMITS.seoTitle;
  if (inSeo && key === 'description') return FIELD_LIMITS.seoDescription;
  if (key === 'ogTitle') return FIELD_LIMITS.ogTitle;
  if (key === 'ogDescription') return FIELD_LIMITS.ogDescription;
  if (key === 'defaultTitle') return FIELD_LIMITS.seoTitle;
  if (key === 'defaultDescription') return FIELD_LIMITS.seoDescription;
  if (key === 'headline') return FIELD_LIMITS.heroHeadline;
  if (key === 'subhead') return FIELD_LIMITS.heroSubhead;
  if (key === 'eyebrow') return FIELD_LIMITS.heroEyebrow;
  if (key === 'question') return FIELD_LIMITS.faqQuestion;
  if (key === 'quote') return FIELD_LIMITS.reviewQuote;
  if (key === 'alt') return FIELD_LIMITS.imageAlt;
  if (key === 'consentText' || key === 'marketingConsentText') return FIELD_LIMITS.consentText;
  if (under('announcement') && key === 'text') return FIELD_LIMITS.announcement;
  if (under('cookieBanner') && key === 'body' && path.length === 2) return FIELD_LIMITS.cookieBody;
  if (key === 'label') {
    // Form-field labels for checkboxes carry consent wording, so they share the consent limit.
    if (parent && parent.type === 'checkbox') return FIELD_LIMITS.consentText;
    if (parent && 'href' in parent) return FIELD_LIMITS.linkLabel;
    return undefined;
  }
  if (key === 'heading') return parent && parent.type === 'pageHeader' ? FIELD_LIMITS.pageHeading : parent && 'type' in parent ? FIELD_LIMITS.heading : undefined;
  if (key === 'intro') return FIELD_LIMITS.intro;
  return undefined;
}

/** Required LocalizedString fields: an empty value blocks publishing. */
const REQUIRED = new Set(['headline', 'question', 'title', 'heading', 'label', 'name', 'defaultTitle', 'defaultDescription', 'businessName']);

export function isRequired(path: Path, parent?: Record<string, unknown>): boolean {
  const key = String(path[path.length - 1]);
  if (path.includes('seo') && (key === 'title' || key === 'description')) return true;
  if (key === 'heading' && parent && (parent.type === 'richText' || parent.type === 'contactCards')) return false;
  if (key === 'label' && path.includes('fieldLabels')) return false;
  return REQUIRED.has(key);
}

/** Walk a document and collect required/limit errors. Admin UI strings are excluded (microcopy). */
export function validateDoc(doc: unknown, base: Path = []): FieldError[] {
  const out: FieldError[] = [];
  const walk = (v: unknown, path: Path, parent?: Record<string, unknown>) => {
    if (isLocalized(v)) {
      const text = v.en ?? '';
      if (isRequired(path, parent) && !text.trim()) out.push({ path, kind: 'required' });
      const lim = limitFor(path, parent);
      if (lim && text.length > lim) out.push({ path, kind: 'tooLong', limit: lim });
      return;
    }
    if (Array.isArray(v)) v.forEach((x, i) => walk(x, [...path, i], parent));
    else if (v && typeof v === 'object') {
      if (path[path.length - 1] === 'meta') return;
      for (const [k, x] of Object.entries(v as Record<string, unknown>)) walk(x, [...path, k], v as Record<string, unknown>);
    }
  };
  walk(doc, base);
  return out;
}

export const pathId = (p: Path) => 'f-' + p.join('-').replace(/[^a-zA-Z0-9-]/g, '_');
