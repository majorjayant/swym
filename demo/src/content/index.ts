import type { ContentTree, Locale, LocalizedString, PublishState } from './schema';
import { site } from './global/site';
import { navigation } from './global/navigation';
import { announcement } from './global/announcement';
import { cookieBanner } from './global/cookie-banner';
import { seo } from './global/seo';
import { microcopy } from './ui/microcopy';
import { home } from './pages/home';
import { about } from './pages/about';
import { contact } from './pages/contact';
import { faq } from './pages/faq';
import { privacy } from './pages/privacy';
import { terms } from './pages/terms';
import { notFound } from './pages/not-found';

/**
 * The published content tree. In Phase 1 this is replaced by a CMS/API call
 * with the same shape; components do not change.
 */
export const publishedContent: ContentTree = {
  site,
  navigation,
  announcement,
  cookieBanner,
  seo,
  microcopy,
  pages: {
    home,
    about,
    contact,
    faq,
    privacy,
    terms,
    'not-found': notFound,
  },
};

/** Resolve a localized field, falling back to English. */
export function t(field: LocalizedString | undefined, locale: Locale = 'en'): string {
  if (!field) return '';
  return field[locale] ?? field.en;
}

/**
 * Phase 0 stub: there is one locale and no stored drafts, so both states return
 * the published tree. The admin portal keeps its own draft copy in memory.
 */
export function getContent(_locale: Locale = 'en', _state: PublishState = 'published'): ContentTree {
  return publishedContent;
}

/** Replace {token} placeholders, e.g. {year}, {count}, {legalName}. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m));
}
