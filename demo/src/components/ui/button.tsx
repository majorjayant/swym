'use client';

import NextLink from 'next/link';
import type { CTA, CTAVariant, Link } from '@/content/schema';
import { useT } from '@/lib/content-context';
import { isExternal, isInternal, resolveHref } from '@/lib/links';
import { Icon, type UiIcon } from './icon';
import { cn } from './cn';

type Size = 'sm' | 'md' | 'lg';
type Tone = 'light' | 'dark';

const base =
  'group/btn inline-flex items-center justify-center gap-2 font-bold whitespace-nowrap select-none rounded-[var(--radius-control)] ' +
  'transition-[transform,background-color,color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-brand)] ' +
  'active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50';

const sizes: Record<Size, string> = {
  sm: 'min-h-11 px-3.5 text-sm',
  md: 'min-h-12 px-5 text-[0.9375rem]',
  lg: 'min-h-14 px-6 text-base',
};

function variantClass(variant: CTAVariant, tone: Tone): string {
  if (variant === 'primary') return 'bg-red text-white hover:bg-[#c00510] border-2 border-red hover:border-[#c00510]';
  if (variant === 'secondary')
    return tone === 'dark'
      ? 'border-2 border-white text-white hover:bg-white hover:text-ink'
      : 'border-2 border-ink text-ink hover:bg-ink hover:text-white';
  return cn('px-0 min-h-11 link-underline', tone === 'dark' ? 'text-white' : 'text-ink');
}

export function buttonClass({ variant = 'primary', size = 'md', tone = 'light', className }: { variant?: CTAVariant; size?: Size; tone?: Tone; className?: string }) {
  return cn(base, variant === 'text' ? '' : sizes[size], variantClass(variant, tone), className);
}

/** Renders a CTA or Link from content. Placeholder hrefs render as a disabled button so nothing links to "[PLACEHOLDER]". */
export function ButtonLink({
  link,
  variant,
  size = 'md',
  tone = 'light',
  icon,
  className,
  iconAfter,
  onClick,
}: {
  link: CTA | Link;
  variant?: CTAVariant;
  size?: Size;
  tone?: Tone;
  icon?: UiIcon;
  iconAfter?: UiIcon;
  className?: string;
  onClick?: () => void;
}) {
  const t = useT();
  const v = variant ?? ('variant' in link ? link.variant : 'text');
  const ic = icon ?? ('icon' in link ? link.icon : undefined);
  const href = resolveHref(link);
  const label = t(link.label);
  const aria = link.ariaLabel ? t(link.ariaLabel) : undefined;
  const cls = buttonClass({ variant: v, size, tone, className });
  const inner = (
    <>
      {ic ? <Icon name={ic} size={size === 'sm' ? 16 : 18} /> : null}
      <span>{label}</span>
      {iconAfter ? <Icon name={iconAfter} size={16} className="transition-transform duration-[var(--duration-fast)] group-hover/btn:translate-x-0.5" /> : null}
    </>
  );
  if (!href) {
    return (
      <span className={cls} aria-disabled="true" role="link" aria-label={aria}>
        {inner}
      </span>
    );
  }
  if (isInternal(href) && !link.newTab) {
    return (
      <NextLink href={href} className={cls} aria-label={aria} onClick={onClick}>
        {inner}
      </NextLink>
    );
  }
  const ext = isExternal(link);
  return (
    <a href={href} className={cls} aria-label={aria} onClick={onClick} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  tone = 'light',
  loading,
  loadingLabel,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: CTAVariant; size?: Size; tone?: Tone; loading?: boolean; loadingLabel?: string }) {
  return (
    <button
      {...rest}
      className={buttonClass({ variant, size, tone, className })}
      disabled={rest.disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? <span className="spinner" aria-hidden="true" /> : null}
      {loading && loadingLabel ? <span>{loadingLabel}</span> : children}
    </button>
  );
}
