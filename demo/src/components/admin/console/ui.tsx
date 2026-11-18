'use client';

import NextLink from 'next/link';
import { useContent, useT } from '@/lib/content-context';
import { Icon } from '../../ui/icon';
import { cn } from '../../ui/cn';

export const money = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
export const num = (n: number) => new Intl.NumberFormat('en-CA').format(n);
export const pct = (n: number, digits = 0) => new Intl.NumberFormat('en-CA', { style: 'percent', maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n);
export const shortDate = (iso: string) => new Intl.DateTimeFormat('en-CA', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`));

export function useCopy() {
  const { content } = useContent();
  return content.microcopy.admin.console;
}

/** "2019 Toyota RAV4" for a stock number on the lot; sold cars carry their own name. */
export function useVehicleName() {
  const { content } = useContent();
  return (stock: string, fallback?: string) => {
    const v = content.inventory.vehicles.find((x) => x.stockNumber === stock);
    return v ? `${v.year} ${v.make} ${v.model}` : fallback ?? stock;
  };
}

export function PageHead({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  const c = useCopy();
  const t = useT();
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h1 className="text-headline-fluid font-bold">{title}</h1>
        {intro ? <p className="mt-2 text-slate">{intro}</p> : null}
        <p className="mt-2 text-xs text-slate">{t(c.sampleNote)}</p>
      </div>
      {children}
    </header>
  );
}

export function Delta({ value }: { value: number | null | undefined }) {
  const c = useCopy();
  const t = useT();
  if (value === undefined) return null;
  if (value === null) return <span className="text-xs text-slate">{t(c.change.none)}</span>;
  const flat = Math.abs(value) < 0.005;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-ink">
      {flat ? null : <Icon name={value > 0 ? 'arrow-up' : 'arrow-down'} size={12} />}
      {flat ? t(c.change.flat) : t(value > 0 ? c.change.up : c.change.down, { pct: pct(Math.abs(value)) })}
    </span>
  );
}

export function Tile({ label, value, period, note, delta, alert }: { label: string; value: string; period?: string; note?: string; delta?: number | null; alert?: boolean }) {
  return (
    <div className={cn('flex flex-col rounded-[var(--radius-card)] border bg-white p-4 md:p-5', alert ? 'border-red' : 'border-line')}>
      <p className="text-sm font-bold">{label}</p>
      {period ? <p className="text-xs text-slate">{period}</p> : null}
      <p className={cn('mt-3 text-3xl font-bold tabular-nums tracking-tight', alert && 'text-red')}>{value}</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
        <Delta value={delta} />
        {note ? <span className="text-xs text-slate">{note}</span> : null}
      </div>
    </div>
  );
}

export function Panel({ title, children, className, id }: { title: string; children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section aria-labelledby={id} className={cn('min-w-0 rounded-[var(--radius-card)] border border-line bg-white p-4 md:p-6', className)}>
      <h2 id={id} className="mb-4 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

export function SourceNote({ text }: { text: string }) {
  return <p className="flex items-start gap-2 text-xs text-slate"><Icon name="file" size={14} className="mt-px shrink-0" />{text}</p>;
}

export function Flag({ children, tone = 'red' }: { children: React.ReactNode; tone?: 'red' | 'slate' }) {
  return <span className={cn('inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-bold', tone === 'red' ? 'bg-red text-white' : 'bg-slate text-white')}>{children}</span>;
}

export type Col<R> = { key: string; label: string; align?: 'left' | 'right'; render: (r: R) => React.ReactNode };
export function DataTable<R>({ caption, cols, rows, rowKey, minWidth = 'min-w-[34rem]' }: { caption: string; cols: Col<R>[]; rows: R[]; rowKey: (r: R) => string; minWidth?: string }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
      <table className={cn('w-full text-sm', minWidth)}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line text-left text-xs text-slate">
            {cols.map((c) => (
              <th key={c.key} scope="col" className={cn('py-2 pr-3 font-bold', c.align === 'right' && 'text-right')}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} className="border-b border-line last:border-0">
              {cols.map((c, i) => {
                const Cell = i === 0 ? 'th' : 'td';
                return <Cell key={c.key} scope={i === 0 ? 'row' : undefined} className={cn('py-2.5 pr-3 align-top', i === 0 ? 'text-left font-bold' : '', c.align === 'right' && 'text-right tabular-nums')}>{c.render(r)}</Cell>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Horizontal bars (HTML, so long labels wrap on phones). */
export function BarList({ items, label }: { items: { key: string; label: string; value: number; display: string }[]; label: string }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <ul aria-label={label} className="space-y-3">
      {items.map((i) => (
        <li key={i.key}>
          <div className="mb-1 flex justify-between gap-3 text-sm"><span>{i.label}</span><span className="font-bold tabular-nums">{i.display}</span></div>
          <div className="h-2.5 rounded-full bg-surface" aria-hidden="true"><div className="h-2.5 rounded-full bg-ink" style={{ width: `${(i.value / max) * 100}%` }} /></div>
        </li>
      ))}
    </ul>
  );
}

/** Columns with optional line overlay. SVG with a screen-reader table. */
export function ColumnChart({ points, label, barLabel, lineLabel, fmtBar = num, fmtLine = num }: {
  points: { x: string; bar: number; line?: number }[]; label: string; barLabel: string; lineLabel?: string; fmtBar?: (n: number) => string; fmtLine?: (n: number) => string;
}) {
  const W = 640, H = 220, P = { l: 8, r: 8, t: 16, b: 28 };
  const iw = W - P.l - P.r, ih = H - P.t - P.b;
  const bw = iw / points.length;
  const maxB = Math.max(1, ...points.map((p) => p.bar));
  const hasLine = points.some((p) => p.line !== undefined);
  const maxL = Math.max(1, ...points.map((p) => p.line ?? 0));
  const ly = (v: number) => P.t + ih - (v / maxL) * ih;
  const by = (v: number) => (v / maxB) * ih * (hasLine ? 0.55 : 1);
  const every = Math.ceil(points.length / 7);
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${(P.l + bw * i + bw / 2).toFixed(1)},${ly(p.line ?? 0).toFixed(1)}`).join(' ');
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true" data-chart>
        <line x1={P.l} x2={W - P.r} y1={P.t + ih} y2={P.t + ih} stroke="var(--color-line)" />
        {points.map((p, i) => (
          <rect key={p.x} x={P.l + bw * i + bw * 0.18} width={bw * 0.64} y={P.t + ih - by(p.bar)} height={by(p.bar)} rx="2" fill={hasLine ? 'var(--color-red)' : 'var(--color-ink)'} />
        ))}
        {hasLine ? <path d={path} fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" /> : null}
        {points.map((p, i) => (i % every === 0 || (i === points.length - 1 && i % every >= every / 2) ? <text key={p.x} x={P.l + bw * i + bw / 2} y={H - 8} textAnchor="middle" fontSize="12" fill="var(--color-slate)">{p.x}</text> : null))}
        {!hasLine ? points.map((p, i) => <text key={`v${p.x}`} x={P.l + bw * i + bw / 2} y={P.t + ih - by(p.bar) - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-ink)">{fmtBar(p.bar)}</text>) : null}
      </svg>
      {hasLine && lineLabel ? (
        <figcaption className="mt-2 flex flex-wrap gap-4 text-xs text-slate" aria-hidden="true">
          <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 bg-ink" />{lineLabel}</span>
          <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-red" />{barLabel}</span>
        </figcaption>
      ) : null}
      <table className="sr-only">
        <caption>{label}</caption>
        <thead><tr><th scope="col">{label}</th>{lineLabel ? <th scope="col">{lineLabel}</th> : null}<th scope="col">{barLabel}</th></tr></thead>
        <tbody>{points.map((p) => <tr key={p.x}><th scope="row">{p.x}</th>{lineLabel ? <td>{fmtLine(p.line ?? 0)}</td> : null}<td>{fmtBar(p.bar)}</td></tr>)}</tbody>
      </table>
    </figure>
  );
}

export function SectionCard({ href, title, lines }: { href: string; title: string; lines: { label: string; value: string }[] }) {
  const c = useCopy();
  const t = useT();
  return (
    <li>
      <NextLink href={href} className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-5 transition-[border-color,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-ink">
        <h3 className="text-base font-bold">{title}</h3>
        <dl className="mt-3 space-y-1.5 text-sm">
          {lines.map((l) => (
            <div key={l.label} className="flex justify-between gap-3"><dt className="text-slate">{l.label}</dt><dd className="font-bold tabular-nums">{l.value}</dd></div>
          ))}
        </dl>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold"><span className="link-underline">{t(c.overview.open)}</span><Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-0.5" /></span>
      </NextLink>
    </li>
  );
}
