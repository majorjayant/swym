'use client';

import { createContext, useContext, useMemo } from 'react';
import type { ContentTree, Locale, LocalizedString } from '@/content/schema';
import { fmt, t as translate } from './i18n';

type ContentContextValue = {
  content: ContentTree;
  locale: Locale;
  /** true when rendering admin draft content in preview */
  preview: boolean;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({
  content,
  locale = 'en',
  preview = false,
  children,
}: {
  content: ContentTree;
  locale?: Locale;
  preview?: boolean;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ content, locale, preview }), [content, locale, preview]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}

/** Returns a translator bound to the current locale, plus a token formatter. */
export function useT() {
  const { locale } = useContent();
  return useMemo(() => {
    const tr = (v: LocalizedString | undefined | null, vars?: Record<string, string | number>) => {
      const s = translate(v, locale);
      return vars ? fmt(s, vars) : s;
    };
    return tr;
  }, [locale]);
}
