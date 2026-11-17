import type { SectionTheme } from '@/content/schema';
import { cn } from './cn';

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('container-page', className)}>{children}</div>;
}

const pad = { none: '', sm: 'py-10 md:py-14', md: 'py-14 md:py-20 lg:py-24', lg: 'py-16 md:py-24 lg:py-32' } as const;

/** Section wrapper: light or dark band, padding scale, optional anchor. */
export function SectionShell({
  theme = 'light',
  padding = 'md',
  anchor,
  className,
  labelledBy,
  children,
  tone,
}: {
  theme?: SectionTheme;
  padding?: keyof typeof pad;
  anchor?: string;
  className?: string;
  labelledBy?: string;
  /** light theme only: 'white' (default) or 'grey' surface */
  tone?: 'white' | 'grey';
  children: React.ReactNode;
}) {
  return (
    <section
      id={anchor}
      aria-labelledby={labelledBy}
      data-theme={theme}
      className={cn(
        pad[padding],
        theme === 'dark' ? 'bg-ink text-white' : tone === 'grey' ? 'bg-surface text-ink' : 'bg-white text-ink',
        'relative',
        className,
      )}
    >
      {children}
    </section>
  );
}

type Level = 1 | 2 | 3 | 4;
const scale = {
  display: 'text-display-fluid font-extrabold',
  headline: 'text-headline-fluid font-bold',
  title: 'text-title-fluid font-bold',
  small: 'text-lg font-bold leading-snug',
} as const;

export function Heading({
  level = 2,
  size = 'headline',
  id,
  className,
  children,
}: {
  level?: Level;
  size?: keyof typeof scale;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  return (
    <Tag id={id} className={cn(scale[size], className)}>
      {children}
    </Tag>
  );
}

export function ShortRule({ className }: { className?: string }) {
  return <hr className={cn('short-rule', className)} aria-hidden="true" />;
}

export function Eyebrow({ children, tone = 'light', className }: { children: React.ReactNode; tone?: 'light' | 'dark'; className?: string }) {
  // Red labels on ink fail body contrast (p. 12/13): use light grey on dark, red on light.
  return <p className={cn('label', tone === 'dark' ? 'text-grey' : 'text-red', className)}>{children}</p>;
}

export function Card({ className, children, wedge, as: Tag = 'div' }: { className?: string; children: React.ReactNode; wedge?: boolean; as?: 'div' | 'article' | 'li' }) {
  return (
    <Tag
      className={cn(
        'rounded-[var(--radius-card)] border border-line bg-white p-6 md:p-7 transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-brand)]',
        wedge && 'wedge wedge-sm',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
