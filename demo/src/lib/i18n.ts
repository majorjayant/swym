import type { Locale, LocalizedString } from '@/content/schema';

/** Resolve a LocalizedString for a locale, falling back to English. */
export function t(value: LocalizedString | undefined | null, locale: Locale = 'en'): string {
  if (!value) return '';
  return value[locale] ?? value.en ?? '';
}

/** Replace {tokens} in a string. Unknown tokens are left as they are. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

export type InlinePart = { text: string; kind: 'text' | 'placeholder' | 'lawyer' | 'owner' };

/** Split a string on [PLACEHOLDER: ...], [LAWYER TO CONFIRM ...] and [OWNER: ...] markers so they render as visible chips. */
export function splitPlaceholders(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const re = /\[(PLACEHOLDER|LAWYER TO CONFIRM|OWNER)(?::?\s*([^\]]*))?\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), kind: 'text' });
    const kind = m[1] === 'PLACEHOLDER' ? 'placeholder' : m[1] === 'OWNER' ? 'owner' : 'lawyer';
    parts.push({ text: (m[2] ?? '').trim(), kind });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), kind: 'text' });
  return parts;
}
