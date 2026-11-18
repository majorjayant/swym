'use client';

import { useT } from '@/lib/content-context';
import * as m from '@/lib/metrics';
import { cn } from '../../ui/cn';
import { useConsole } from './store';
import { DataTable, Flag, PageHead, Panel, SourceNote, Tile, money, num, pct, useCopy } from './ui';

type Key = 'units' | 'leads' | 'reviews';

export function GrowthPage() {
  const c = useCopy();
  const t = useT();
  const gc = c.growth;
  const { sales, targets, setTargets } = useConsole();
  const g = m.growth(sales, targets);
  const rv = m.reviewsNow();
  const lts = m.leadToSale(sales);
  const mf = m.monthFinance(sales);
  const keys: Key[] = ['units', 'leads', 'reviews'];
  const paceText = (k: Key) => (g[k].behind ? t(gc.paceBehind) : t(gc.paceOk));
  const period = t(c.periods.month);
  const weeks = Math.max(1, (m.observation().day) / 7);
  const baseline = [
    { k: 'leads', label: t(gc.baselineItems.leads), value: num(Math.round(lts.leads / weeks)) },
    { k: 'lts', label: t(gc.baselineItems.leadToSale), value: pct(lts.rate, 1) },
    { k: 'units', label: t(gc.baselineItems.units), value: num(lts.units) },
    { k: 'gpc', label: t(gc.baselineItems.grossPerCar), value: money(mf.grossPerCar) },
    { k: 'rev', label: t(gc.baselineItems.reviews), value: `${g.reviews.actual} · ${rv.rating.toFixed(1)}` },
  ];
  return (
    <div className="space-y-6">
      <PageHead title={t(gc.title)} intro={t(gc.intro)} />
      <ul className="grid gap-3 sm:grid-cols-3">
        <li><Tile label={t(gc.tiles.units)} period={period} value={t(gc.ofTarget, { actual: g.units.actual, target: g.units.target })} note={paceText('units')} alert={g.units.behind} /></li>
        <li><Tile label={t(gc.tiles.leads)} period={period} value={t(gc.ofTarget, { actual: g.leads.actual, target: g.leads.target })} note={paceText('leads')} alert={g.leads.behind} /></li>
        <li><Tile label={t(gc.tiles.rating)} period={t(c.periods.today)} value={rv.rating.toFixed(1)} note={t(gc.ratingNote, { count: rv.count, added: g.reviews.actual })} /></li>
      </ul>
      <div className="grid gap-6 lg:grid-cols-5">
        <Panel id="gr-chart" title={t(gc.chart)} className="lg:col-span-2">
          <ul className="space-y-4" aria-label={t(gc.chart)}>
            {keys.map((k) => {
              const max = Math.max(g[k].target, g[k].actual, 1);
              return (
                <li key={k}>
                  <div className="mb-1 flex justify-between gap-3 text-sm"><span>{t(gc.metrics[k])}</span><span className="font-bold tabular-nums">{t(gc.ofTarget, { actual: g[k].actual, target: g[k].target })}</span></div>
                  <div className="relative h-3 rounded-full bg-surface" aria-hidden="true">
                    <div className={cn('h-3 rounded-full', g[k].behind ? 'bg-red' : 'bg-ink')} style={{ width: `${Math.min(100, (g[k].actual / max) * 100)}%` }} />
                    <div className="absolute -top-1 h-5 w-0.5 bg-red" style={{ left: `${Math.min(100, (g[k].expected / max) * 100)}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-slate"><span className="h-3 w-0.5 bg-red" aria-hidden="true" />{t(gc.expected)}</p>
        </Panel>
        <Panel id="gr-table" title={t(gc.table)} className="lg:col-span-3">
          <DataTable
            caption={t(gc.table)}
            rows={keys}
            rowKey={(k) => k}
            minWidth="min-w-0"
            cols={[
              { key: 'm', label: t(gc.cols.metric), render: (k) => t(gc.metrics[k]) },
              {
                key: 't', label: t(gc.cols.target), align: 'right', render: (k) => (
                  <input aria-label={`${t(gc.cols.target)}: ${t(gc.metrics[k])}`} type="number" min={0} step={1} value={targets[k]} onChange={(e) => setTargets({ ...targets, [k]: Math.max(0, Number(e.target.value) || 0) })} className="ml-auto block h-10 w-24 rounded-[var(--radius-control)] border-2 border-grey bg-white px-3 text-right text-sm text-ink transition-colors hover:border-slate focus:border-ink focus:outline-none" />
                ),
              },
              { key: 'a', label: t(gc.cols.actual), align: 'right', render: (k) => num(g[k].actual) },
              { key: 'p', label: t(gc.cols.pace), render: (k) => (g[k].behind ? <Flag>{t(gc.paceBehind)}</Flag> : <span className="text-sm">{pct(g[k].ratio)}<span className="hidden sm:inline"> · {t(gc.paceOk)}</span></span>) },
            ]}
          />
          <p className="mt-3 text-xs text-slate">{t(gc.edit)}</p>
        </Panel>
      </div>
      <Panel id="gr-base" title={t(gc.baseline)}>
        <p className="mb-4 max-w-2xl text-sm text-slate">{t(gc.baselineIntro)}</p>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {baseline.map((b) => <div key={b.k} className="rounded-[var(--radius-card)] bg-surface p-3"><dt className="text-xs text-slate">{b.label}</dt><dd className="mt-1 text-xl font-bold tabular-nums">{b.value}</dd></div>)}
        </dl>
      </Panel>
      <SourceNote text={t(gc.source)} />
    </div>
  );
}
