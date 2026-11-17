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

/** Split a string on [PLACEHOLDER: ...] markers so they can be rendered as badges. */
export function splitPlaceholders(text: string): { text: string; placeholder: boolean }[] {
  const parts: { text: string; placeholder: boolean }[] = [];
  const re = /\[PLACEHOLDER(?::\s*([^\]]*))?\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), placeholder: false });
    parts.push({ text: m[1] ?? '', placeholder: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), placeholder: false });
  return parts;
}
