'use client';

import { useT } from '@/lib/content-context';
import * as m from '@/lib/metrics';
import { ads, LEAD_SOURCES } from '@/content/business/sample';
import { BarList, DataTable, Flag, PageHead, Panel, SourceNote, Tile, num, pct, useCopy } from './ui';

export function MarketingPage() {
  const c = useCopy();
  const t = useT();
  const mc = c.marketing;
  const w = m.windows(7);
  const lc = m.totalLeads(w.cur), lp = m.totalLeads(w.prev);
  const by = m.leadsBySource(m.sinceLaunch());
  const total = Object.values(by).reduce((a, b) => a + b, 0);
  const sorted = [...LEAD_SOURCES].sort((a, b) => by[b] - by[a]);
  const s = m.searchSummary();
  return (
    <div className="space-y-6">
      <PageHead title={t(mc.title)} intro={t(mc.intro)} />
      <ul className="grid gap-3 sm:grid-cols-3">
        <li><Tile label={t(mc.tiles.leads)} period={t(c.periods.last7)} value={num(lc)} delta={m.change(lc, lp)} /></li>
        <li><Tile label={t(mc.tiles.topSource)} period={t(c.periods.since)} value={t(c.sources[sorted[0]])} note={t(mc.topSourceNote, { share: pct(by[sorted[0]] / total) })} /></li>
        <li><Tile label={t(mc.tiles.searchClicks)} period={t(c.periods.last28)} value={num(s.clicks)} note={`${num(s.impressions)} ${t(mc.cols.impressions).toLowerCase()}`} /></li>
      </ul>
      <p className="-mt-3 text-xs text-slate">{t(c.periods.compare7)}</p>
      <div className="grid gap-6 lg:grid-cols-5">
        <Panel id="mk-chart" title={t(mc.chart)} className="lg:col-span-2">
          <BarList label={t(mc.chart)} items={sorted.map((k) => ({ key: k, label: t(c.sources[k]), value: by[k], display: `${num(by[k])} · ${pct(by[k] / total)}` }))} />
        </Panel>
        <Panel id="mk-table" title={t(mc.table)} className="lg:col-span-3">
          <DataTable
            caption={t(mc.table)}
            rows={s.rows}
            rowKey={(r) => r.query}
            cols={[
              { key: 'q', label: t(mc.cols.query), render: (r) => <span className="font-normal">{r.query}</span> },
              { key: 'c', label: t(mc.cols.clicks), align: 'right', render: (r) => num(r.clicks) },
              { key: 'i', label: t(mc.cols.impressions), align: 'right', render: (r) => num(r.impressions) },
              { key: 'r', label: t(mc.cols.ctr), align: 'right', render: (r) => pct(r.ctr, 1) },
              { key: 'p', label: t(mc.cols.position), align: 'right', render: (r) => r.position.toFixed(1) },
              { key: 'f', label: t(mc.cols.flag), render: (r) => (r.opportunity ? <Flag tone="slate">{t(mc.opportunity)}</Flag> : null) },
            ]}
          />
          <p className="mt-3 text-xs text-slate">{t(mc.opportunityNote)}</p>
        </Panel>
      </div>
      <Panel id="mk-ads" title={t(mc.adsTitle)}>
        <p className="mb-4 max-w-2xl text-sm text-slate">{t(mc.adsIntro)}</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {ads.map((a) => (
            <li key={a.key} className="rounded-[var(--radius-card)] border border-dashed border-slate/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold">{t(c.sources[a.key])}</p>
                <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-bold text-slate">{t(mc.notRunning)}</span>
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
                {(['spend', 'leads', 'cpl'] as const).map((k) => (
                  <div key={k}><dt className="text-xs text-slate">{t(mc.adsCols[k])}</dt><dd className="font-bold text-slate">–</dd></div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-slate">{t(mc.utm)}</p>
      </Panel>
      <SourceNote text={t(mc.source)} />
    </div>
  );
}
