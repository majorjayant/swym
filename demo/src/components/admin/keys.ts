/** Document keys shared by server routes (static params) and the client store. */
export const PAGE_KEYS = ['home', 'about', 'contact', 'faq', 'privacy', 'terms', 'not-found'] as const;
export const GLOBAL_KEYS = ['site', 'navigation', 'announcement', 'cookieBanner', 'seo', 'microcopy'] as const;
export type PageKey = (typeof PAGE_KEYS)[number];
export type GlobalKey = (typeof GLOBAL_KEYS)[number];
