'use client';

import { useT } from '@/lib/content-context';
import * as m from '@/lib/metrics';
import { siteDays, VEHICLE_PAGE_LEAD_SHARE } from '@/content/business/sample';
import { useConsole } from './store';
import { ColumnChart, DataTable, Flag, PageHead, Panel, SourceNote, Tile, num, pct, shortDate, useCopy, useVehicleName } from './ui';

export function AnalyticsPage() {
  const c = useCopy();
  const t = useT();
  const ac = c.analytics;
  const { sales } = useConsole();
  const name = useVehicleName();
  const w = m.windows(7);
  const cur = m.traffic(w.cur), prev = m.traffic(w.prev);
  const w14 = m.windows(14).cur;
  const vs = m.vehicleStats();
  const t14 = m.traffic(w14);
  const funnel = [
    { k: 'views', label: t(ac.funnelSteps.views), v: t14.vehicleViews },
    { k: 'leads', label: t(ac.funnelSteps.leads), v: Math.round(t14.leadActions * VEHICLE_PAGE_LEAD_SHARE) },
    { k: 'sales', label: t(ac.funnelSteps.sales), v: m.salesIn(sales, w14).units },
  ];
  const period = t(c.periods.last7);
  return (
    <div className="space-y-6">
      <PageHead title={t(ac.title)} intro={t(ac.intro)} />
      <ul className="grid gap-3 sm:grid-cols-3">
        <li><Tile label={t(ac.tiles.visits)} period={period} value={num(cur.visits)} delta={m.change(cur.visits, prev.visits)} /></li>
        <li><Tile label={t(ac.tiles.leadActions)} period={period} value={num(cur.leadActions)} delta={m.change(cur.leadActions, prev.leadActions)} /></li>
        <li><Tile label={t(ac.tiles.leadRate)} period={period} value={pct(cur.leadRate, 1)} delta={m.change(cur.leadRate, prev.leadRate)} note={t(ac.leadRateNote)} /></li>
      </ul>
      <p className="-mt-3 text-xs text-slate">{t(c.periods.compare7)}</p>
      <div className="grid gap-6 lg:grid-cols-5">
        <Panel id="an-chart" title={t(ac.chart)} className="lg:col-span-3">
          <ColumnChart label={t(ac.chart)} lineLabel={t(ac.legendVisits)} barLabel={t(ac.legendLeads)} points={siteDays.map((d) => ({ x: shortDate(d.date), line: d.visits, bar: m.siteLeads(d) }))} />
        </Panel>
        <Panel id="an-funnel" title={t(ac.funnel)} className="lg:col-span-2">
          <ol className="space-y-3">
            {funnel.map((f, i) => (
              <li key={f.k}>
                <div className="mb-1 flex justify-between gap-3 text-sm"><span>{f.label}</span><span className="font-bold tabular-nums">{num(f.v)}{i ? <span className="ml-2 font-normal text-slate">{pct(f.v / funnel[i - 1].v, 1)}</span> : null}</span></div>
                <div className="h-3 rounded-full bg-surface" aria-hidden="true"><div className={i === 2 ? 'h-3 rounded-full bg-red' : 'h-3 rounded-full bg-ink'} style={{ width: `${Math.max(2, (f.v / funnel[0].v) * 100)}%` }} /></div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
      <Panel id="an-table" title={t(ac.table)}>
        <DataTable
          caption={t(ac.table)}
          rows={vs}
          rowKey={(r) => r.stock}
          cols={[
            { key: 'v', label: t(ac.cols.vehicle), render: (r) => <>{name(r.stock)} <span className="font-normal text-slate">#{r.stock}</span></> },
            { key: 'w', label: t(ac.cols.views), align: 'right', render: (r) => num(r.views) },
            { key: 'l', label: t(ac.cols.leads), align: 'right', render: (r) => num(r.leads) },
            { key: 'r', label: t(ac.cols.rate), align: 'right', render: (r) => pct(r.leadRate, 1) },
            { key: 'f', label: t(ac.cols.flag), render: (r) => (r.noLeads ? <Flag>{t(ac.noLeads)}</Flag> : null) },
          ]}
        />
      </Panel>
      <SourceNote text={t(ac.source)} />
    </div>
  );
}
