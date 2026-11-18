'use client';

import { useState } from 'react';
import { useContent, useT } from '@/lib/content-context';
import * as m from '@/lib/metrics';
import { AS_OF, LEAD_SOURCES, expenses, type LeadSource } from '@/content/business/sample';
import { buttonClass } from '../../ui/button';
import { cn } from '../../ui/cn';
import { inputCls } from '../fields';
import { useConsole } from './store';
import { ColumnChart, DataTable, Flag, PageHead, Panel, SourceNote, Tile, money, num, shortDate, useCopy, useVehicleName } from './ui';

function RecordSale() {
  const c = useCopy();
  const t = useT();
  const rc = c.finance.record;
  const { content } = useContent();
  const { sales, addSale } = useConsole();
  const name = useVehicleName();
  const sold = new Set(sales.map((s) => s.stock));
  const unsold = content.inventory.vehicles.filter((v) => !sold.has(v.stockNumber));
  const costs = Object.fromEntries(m.stockAges([]).map((a) => [a.stock, a]));
  const [stock, setStock] = useState(unsold[0]?.stockNumber ?? '');
  const v = unsold.find((x) => x.stockNumber === stock) ?? unsold[0];
  const [date, setDate] = useState(AS_OF);
  const [price, setPrice] = useState<string>('');
  const [source, setSource] = useState<LeadSource>('google');
  const [tradeIn, setTradeIn] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [msg, setMsg] = useState('');
  if (!v) return <p className="text-sm text-slate">{t(rc.none)}</p>;
  const cost = costs[v.stockNumber];
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = Number(price || v.price);
    addSale({ stock: v.stockNumber, vehicle: name(v.stockNumber), date, price: p, cost: cost?.cost ?? 0, recon: cost?.recon ?? 0, source, tradeIn, repeat });
    setMsg(t(rc.saved, { vehicle: name(v.stockNumber) }));
    setPrice('');
    const next = unsold.find((x) => x.stockNumber !== v.stockNumber);
    if (next) setStock(next.stockNumber);
  };
  const L = 'block text-sm font-bold';
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <label className={L}>{t(rc.stock)}
        <select value={v.stockNumber} onChange={(e) => setStock(e.target.value)} className={cn(inputCls(), 'h-10')}>
          {unsold.map((x) => <option key={x.stockNumber} value={x.stockNumber}>{x.stockNumber} · {name(x.stockNumber)}</option>)}
        </select>
      </label>
      <label className={L}>{t(rc.date)}<input type="date" value={date} max={AS_OF} onChange={(e) => setDate(e.target.value)} className={cn(inputCls(), 'h-10')} required /></label>
      <label className={L}>{t(rc.price)}<input type="number" inputMode="numeric" min={0} step={1} placeholder={String(v.price)} value={price} onChange={(e) => setPrice(e.target.value)} className={cn(inputCls(), 'h-10')} /></label>
      <label className={L}>{t(rc.source)}
        <select value={source} onChange={(e) => setSource(e.target.value as LeadSource)} className={cn(inputCls(), 'h-10')}>
          {LEAD_SOURCES.map((s) => <option key={s} value={s}>{t(c.sources[s])}</option>)}
        </select>
      </label>
      <p className="text-sm sm:col-span-2"><span className="text-slate">{t(rc.cost)}:</span> <strong>{money(cost?.cost ?? 0)}</strong> · <span className="text-slate">{t(rc.recon)}:</span> <strong>{money(cost?.recon ?? 0)}</strong></p>
      <div className="flex flex-wrap gap-6 sm:col-span-2">
        <label className="inline-flex min-h-11 items-center gap-2 text-sm font-bold"><input type="checkbox" checked={tradeIn} onChange={(e) => setTradeIn(e.target.checked)} className="size-5 accent-[var(--color-red)]" />{t(rc.tradeIn)}</label>
        <label className="inline-flex min-h-11 items-center gap-2 text-sm font-bold"><input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} className="size-5 accent-[var(--color-red)]" />{t(rc.repeat)}</label>
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className={buttonClass({ variant: 'primary' })}>{t(rc.save)}</button>
        <p role="status" className="text-sm font-bold">{msg}</p>
      </div>
    </form>
  );
}

export function FinancePage() {
  const c = useCopy();
  const t = useT();
  const fc = c.finance;
  const { content } = useContent();
  const { sales } = useConsole();
  const name = useVehicleName();
  const mf = m.monthFinance(sales);
  const prevMonth = m.salesIn(sales, { from: '2026-10-01', to: '2026-10-18' });
  const weeks = m.weeklyGross(sales, 7);
  const ages = m.stockAges(sales.map((s) => s.stock));
  const price = (s: string) => content.inventory.vehicles.find((v) => v.stockNumber === s)?.price ?? 0;
  const e = expenses.find((x) => x.month === AS_OF.slice(0, 7))!;
  const expenseKeys = ['rent', 'payroll', 'utilities', 'insurance', 'marketing', 'other'] as const;
  const period = t(c.periods.month);
  return (
    <div className="space-y-6">
      <PageHead title={t(fc.title)} intro={t(fc.intro)} />
      <ul className="grid gap-3 sm:grid-cols-3">
        <li><Tile label={t(fc.tiles.units)} period={period} value={num(mf.units)} delta={m.change(mf.units, prevMonth.units)} /></li>
        <li><Tile label={t(fc.tiles.gross)} period={period} value={money(mf.gross)} delta={m.change(mf.gross, prevMonth.gross)} note={t(fc.grossNote, { avg: money(mf.grossPerCar) })} /></li>
        <li><Tile label={t(fc.tiles.net)} period={period} value={money(mf.net)} alert={mf.net < 0} note={t(fc.netNote, { units: mf.breakEven })} /></li>
      </ul>
      <p className="-mt-3 text-xs text-slate">{t(c.periods.compareMonth)}</p>
      <div className="grid gap-6 lg:grid-cols-5">
        <Panel id="fi-chart" title={t(fc.chart)} className="lg:col-span-3">
          <ColumnChart label={t(fc.chart)} barLabel={t(fc.tiles.gross)} fmtBar={(n) => (n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : money(n))} points={weeks.map((w) => ({ x: shortDate(w.range.to), bar: w.gross }))} />
        </Panel>
        <Panel id="fi-exp" title={t(fc.expenses)} className="lg:col-span-2">
          <dl className="divide-y divide-line text-sm">
            {expenseKeys.map((k) => <div key={k} className="flex justify-between gap-3 py-2"><dt>{t(fc.expenseNames[k])}</dt><dd className="tabular-nums">{money(e[k])}</dd></div>)}
            <div className="flex justify-between gap-3 py-2 font-bold"><dt>{t(fc.total)}</dt><dd className="tabular-nums">{money(mf.expenses)}</dd></div>
          </dl>
        </Panel>
      </div>
      <Panel id="fi-table" title={t(fc.table)}>
        <DataTable
          caption={t(fc.table)}
          rows={ages}
          rowKey={(r) => r.stock}
          cols={[
            { key: 'v', label: t(fc.cols.vehicle), render: (r) => <>{name(r.stock)} <span className="font-normal text-slate">#{r.stock}</span></> },
            { key: 'p', label: t(fc.cols.price), align: 'right', render: (r) => money(price(r.stock)) },
            { key: 'c', label: t(fc.cols.costs), align: 'right', render: (r) => money(r.cost + r.recon) },
            { key: 'd', label: t(fc.cols.days), align: 'right', render: (r) => num(r.days) },
            { key: 'f', label: t(fc.cols.flag), render: (r) => (r.level === 'old' ? <Flag>{t(fc.old)}</Flag> : r.level === 'aged' ? <Flag tone="slate">{t(fc.aged)}</Flag> : null) },
          ]}
        />
      </Panel>
      <div className="grid gap-6 lg:grid-cols-5">
        <Panel id="fi-rec" title={t(fc.record.title)} className="lg:col-span-3">
          <p className="mb-4 text-sm text-slate">{t(fc.record.intro)}</p>
          <RecordSale />
        </Panel>
        <Panel id="fi-recent" title={t(fc.recent)} className="lg:col-span-2">
          <ul className="divide-y divide-line text-sm">
            {[...sales].reverse().slice(0, 5).map((s) => (
              <li key={s.stock + s.date} className="flex justify-between gap-3 py-2">
                <span><strong>{s.vehicle}</strong><span className="block text-xs text-slate">{shortDate(s.date)} · {t(c.sources[s.source])}</span></span>
                <span className="text-right tabular-nums"><strong>{money(m.gross(s))}</strong><span className="block text-xs text-slate">{money(s.price)}</span></span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <SourceNote text={t(fc.source)} />
    </div>
  );
}
