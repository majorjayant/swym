import { cn } from './cn';

/** Scroll-reveal wrapper. The observer in <Providers> flips data-revealed; CSS handles motion and reduced motion. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  kind = 'rise',
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: 'div' | 'li' | 'article';
  kind?: 'rise' | 'fade';
  className?: string;
}) {
  return (
    <Tag data-reveal={kind} style={{ ['--reveal-delay' as string]: `${delay}ms` }} className={cn(className)}>
      {children}
    </Tag>
  );
}
