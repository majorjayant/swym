import type { Link } from '@/content/schema';

/** Resolve an href for a Link, normalising schemes by kind. Returns null when the target is a placeholder. */
export function resolveHref(link: Pick<Link, 'href' | 'kind'>): string | null {
  const href = (link.href || '').trim();
  if (!href || href.includes('[PLACEHOLDER')) return null;
  switch (link.kind) {
    case 'tel':
      return href.startsWith('tel:') ? href : `tel:${href.replace(/[^\d+]/g, '')}`;
    case 'sms':
      return href.startsWith('sms:') ? href : `sms:${href.replace(/[^\d+]/g, '')}`;
    case 'mailto':
      return href.startsWith('mailto:') ? href : `mailto:${href}`;
    case 'whatsapp':
      return href.startsWith('https://') ? href : `https://wa.me/${href.replace(/[^\d]/g, '')}`;
    default:
      return href;
  }
}

export function isExternal(link: Pick<Link, 'kind' | 'newTab'>): boolean {
  return link.kind === 'external' || link.kind === 'map' || link.kind === 'whatsapp' || !!link.newTab;
}

export function isInternal(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}
