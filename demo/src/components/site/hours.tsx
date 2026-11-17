'use client';

import { useEffect, useState } from 'react';
import type { DayKey } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { PlaceholderBadge } from '../ui/placeholder';
import { cn } from '../ui/cn';

const ORDER: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function todayKey(tz: string): DayKey | null {
  try {
    const name = new Intl.DateTimeFormat('en-CA', { weekday: 'short', timeZone: tz }).format(new Date()).toLowerCase().slice(0, 3);
    return (ORDER as string[]).includes(name) ? (name as DayKey) : null;
  } catch {
    return null;
  }
}

function fmtTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return new Intl.DateTimeFormat('en-CA', { hour: 'numeric', minute: '2-digit' }).format(d);
}

/** Opening hours table. Rows the owner has not supplied show a placeholder chip. Today is highlighted after hydration. */
export function HoursTable({ tone = 'light', className, headingLevel }: { tone?: 'light' | 'dark'; className?: string; headingLevel?: 2 | 3 }) {
  const { content } = useContent();
  const t = useT();
  const { hours } = content.site;
  const mc = content.microcopy.hours;
  const [today, setToday] = useState<DayKey | null>(null);
  useEffect(() => setToday(todayKey(hours.timezone)), [hours.timezone]);
  const allPlaceholder = hours.days.every((d) => d.isPlaceholder);
  const H = headingLevel ? (`h${headingLevel}` as 'h2' | 'h3') : null;
  return (
    <div className={className}>
      {H ? <H className="label mb-3 text-current opacity-80">{t(mc.heading)}</H> : null}
      {allPlaceholder ? (
        <p className="mb-2 text-sm">
          <span className={cn(tone === 'dark' ? 'text-grey' : 'text-slate')}>{t(mc.placeholder)}</span>{' '}
          <PlaceholderBadge note={t(mc.placeholder)} />
        </p>
      ) : null}
      <table className="w-full text-sm">
        <caption className="sr-only">{t(mc.heading)}</caption>
        <tbody>
          {ORDER.map((key) => {
            const d = hours.days.find((x) => x.day === key);
            if (!d) return null;
            const isToday = today === key;
            return (
              <tr key={key} className={cn('border-b', tone === 'dark' ? 'border-line-dark' : 'border-line', isToday && 'font-bold')}>
                <th scope="row" className="py-2 pr-4 text-left font-[inherit]">
                  {t(mc.dayNames[key])}
                  {isToday ? <span className="sr-only"> ({t(mc.today)})</span> : null}
                </th>
                <td className="py-2 text-right tabular-nums">
                  {d.isPlaceholder ? (
                    <span aria-hidden="true">–</span>
                  ) : d.closed || !d.open || !d.close ? (
                    t(mc.closed)
                  ) : (
                    `${fmtTime(d.open)} – ${fmtTime(d.close)}`
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {hours.holidayNote && t(hours.holidayNote) ? <p className="mt-3 text-sm">{t(hours.holidayNote)}</p> : null}
    </div>
  );
}

/** One-line hours summary for the mobile menu. */
export function HoursSummary() {
  const { content } = useContent();
  const t = useT();
  const mc = content.microcopy.hours;
  const placeholder = content.site.hours.days.every((d) => d.isPlaceholder);
  return (
    <div className="flex items-center gap-2 text-sm text-slate">
      <span className="label">{t(mc.heading)}</span>
      {placeholder ? <PlaceholderBadge note={t(mc.placeholder)} /> : null}
    </div>
  );
}
