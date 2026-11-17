'use client';

import type { Placeholder } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { splitPlaceholders } from '@/lib/i18n';
import { cn } from './cn';

/** Visible chip marking a fact the owner has not supplied yet. */
export function PlaceholderBadge({ note, className }: { note?: string; className?: string }) {
  const { content } = useContent();
  const t = useT();
  const label = t(content.microcopy.placeholderBadge.label);
  const tip = note ? `${t(content.microcopy.placeholderBadge.tooltip)} ${note}` : t(content.microcopy.placeholderBadge.tooltip);
  return (
    <span
      title={tip}
      className={cn(
        'inline-flex items-center gap-1 rounded-[4px] border border-dashed border-current px-1.5 py-0.5 align-middle font-sans text-[0.6875rem] font-bold uppercase tracking-[0.12em] leading-none opacity-80',
        className,
      )}
    >
      <span aria-hidden="true">[</span>
      {label}
      {note ? <span className="sr-only">: {note}</span> : null}
      <span aria-hidden="true">]</span>
    </span>
  );
}

/** Renders a Placeholder value, or a badge when the owner has not supplied it. */
export function PlaceholderValue({ value, className }: { value: Placeholder; className?: string }) {
  if (value.isPlaceholder || !value.value) return <PlaceholderBadge note={value.note} className={className} />;
  return <span className={className}>{value.value}</span>;
}

/** Chip for a legal marker: "[LAWYER TO CONFIRM]" or "[OWNER: ...]" inside legal and consent text. */
export function MarkerChip({ kind, note }: { kind: 'lawyer' | 'owner'; note?: string }) {
  return (
    <mark className="mx-0.5 rounded-[4px] bg-[#fdecec] px-1.5 py-0.5 text-[0.8125em] font-bold text-ink [box-decoration-break:clone]">
      [{kind === 'lawyer' ? 'LAWYER TO CONFIRM' : 'OWNER'}
      {note ? `: ${note}` : ''}]
    </mark>
  );
}

/** Renders text that may contain inline markers, turning each into a visible chip. */
export function RichInline({ text }: { text: string }) {
  const parts = splitPlaceholders(text);
  if (parts.length === 1 && parts[0].kind === 'text') return <>{text}</>;
  return (
    <>
      {parts.map((p, i) =>
        p.kind === 'text' ? (
          <span key={i}>{p.text}</span>
        ) : p.kind === 'placeholder' ? (
          <PlaceholderBadge key={i} note={p.text} />
        ) : (
          <MarkerChip key={i} kind={p.kind} note={p.text} />
        ),
      )}
    </>
  );
}
