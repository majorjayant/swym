'use client';

import NextLink from 'next/link';
import { useT } from '@/lib/content-context';
import { Icon } from '../../ui/icon';
import { useConsole } from './store';
import { PageHead, SectionCard, Tile, money, num, pct, shortDate, useCopy, useVehicleName } from './ui';
import * as m from '@/lib/metrics';
import { LEAD_SOURCES } from '@/content/business/sample';


export function ObservationBanner() {
  const c = useCopy();
  const t = useT();
  const o = m.observation();
  return (
    <div role="status" className="flex flex-wrap items-start gap-3 rounded-[var(--radius-card)] bg-ink p-4 text-white md:items-center md:p-5">
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold"><span className="size-1.5 rounded-full bg-red" aria-hidden="true" />{t(c.observe.adsOff)}</span>
      <div className="min-w-0 flex-1">
        <p className="font-bold">{o.done ? t(c.observe.doneTitle) : t(c.observe.title, { day: o.day, total: o.total })}</p>
        <p className="mt-0.5 text-sm text-grey">{o.done ? t(c.observe.doneBody) : t(c.observe.body, { date: shortDate(o.endsOn) })}</p>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/15 md:w-48" aria-hidden="true"><div className="h-2 rounded-full bg-red" style={{ width: `${(o.day / o.total) * 100}%` }} /></div>
    </div>
  );
}

export function Overview() {
  const c = useCopy();
  const t = useT();
  const { sales, targets } = useConsole();
  const name = useVehicleName();
  const w = m.windows(7);
  const sc = m.salesIn(sales, w.cur), sp = m.salesIn(sales, w.prev);
  const lc = m.totalLeads(w.cur), lp = m.totalLeads(w.prev);
  const lts = m.leadToSale(sales);
  const ages = m.stockAges(sales.map((s) => s.stock));
  const aged = ages.filter((a) => a.level !== 'ok');
  const att = m.attention(sales, targets);
  const mf = m.monthFinance(sales);
  const tr = m.traffic(w.cur);
  const g = m.growth(sales, targets);
  const by = m.leadsBySource(m.sinceLaunch());
  const top = [...LEAD_SOURCES].sort((a, b) => by[b] - by[a])[0];
  const search = m.searchSummary();
  const p7 = t(c.periods.last7);
  const metricName = { units: t(c.growth.metrics.units), leads: t(c.growth.metrics.leads), reviews: t(c.growth.metrics.reviews) };

  return (
    <div className="space-y-8">
      <PageHead title={t(c.overview.title)} />
      <ObservationBanner />

      <section aria-label={t(c.overview.title)}>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          <li><Tile label={t(c.overview.kpis.units)} period={p7} value={num(sc.units)} delta={m.change(sc.units, sp.units)} /></li>
          <li><Tile label={t(c.overview.kpis.gross)} period={p7} value={money(sc.gross)} delta={m.change(sc.gross, sp.gross)} /></li>
          <li><Tile label={t(c.overview.kpis.leads)} period={p7} value={num(lc)} delta={m.change(lc, lp)} /></li>
          <li><Tile label={t(c.overview.kpis.leadToSale)} period={t(c.periods.since)} value={pct(lts.rate, 1)} note={t(c.overview.leadToSaleNote, { units: lts.units, leads: lts.leads })} /></li>
          <li className="col-span-2 md:col-span-1"><Tile label={t(c.overview.kpis.aged)} period={t(c.periods.today)} value={num(aged.length)} alert={aged.length > 0} note={t(c.overview.agedNote, { old: ages.filter((a) => a.level === 'old').length })} /></li>
        </ul>
        <p className="mt-2 text-xs text-slate">{t(c.periods.compare7)}</p>
      </section>

      <section aria-labelledby="att-h" className="rounded-[var(--radius-card)] border border-line bg-white p-4 md:p-6">
        <h2 id="att-h" className="mb-3 flex items-center gap-2 text-lg font-bold"><Icon name="alert" size={18} className="text-red" />{t(c.overview.attention)}</h2>
        {att.length ? (
          <ol className="divide-y divide-line">
            {att.map((a, i) => {
              const text =
                a.kind === 'behind'
                  ? t(c.overview.att.behind, { metric: metricName[a.metric], actual: a.actual, expected: a.expected })
                  : a.kind === 'noLeads'
                    ? t(c.overview.att.noLeads, { vehicle: name(a.stock), views: a.views })
                    : t(a.kind === 'old' ? c.overview.att.old : c.overview.att.aged, { vehicle: name(a.stock), days: a.days });
              const href = a.kind === 'noLeads' ? '/admin/analytics' : a.kind === 'behind' ? '/admin/growth' : '/admin/finance';
              return (
                <li key={i} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <p className="text-sm"><span className="mr-2 font-bold text-red">{i + 1}.</span>{text}</p>
                  <NextLink href={href} className="link-underline shrink-0 text-sm font-bold">{t(c.overview.open)}</NextLink>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="text-sm text-slate">{t(c.overview.attentionNone)}</p>
        )}
      </section>

      <section aria-labelledby="areas-h">
        <h2 id="areas-h" className="label mb-4 text-slate">{t(c.overview.sections)}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SectionCard href="/admin/marketing" title={t(c.nav.marketing)} lines={[
            { label: t(c.marketing.tiles.topSource), value: t(c.sources[top]) },
            { label: t(c.marketing.tiles.searchClicks), value: num(search.clicks) },
          ]} />
          <SectionCard href="/admin/analytics" title={t(c.nav.analytics)} lines={[
            { label: `${t(c.analytics.tiles.visits)} (${p7.toLowerCase()})`, value: num(tr.visits) },
            { label: t(c.analytics.tiles.leadRate), value: pct(tr.leadRate, 1) },
          ]} />
          <SectionCard href="/admin/finance" title={t(c.nav.finance)} lines={[
            { label: `${t(c.finance.tiles.gross)} (${t(c.periods.month).toLowerCase()})`, value: money(mf.gross) },
            { label: t(c.finance.tiles.net), value: money(mf.net) },
          ]} />
          <SectionCard href="/admin/growth" title={t(c.nav.growth)} lines={[
            { label: t(c.growth.metrics.units), value: t(c.growth.ofTarget, { actual: g.units.actual, target: g.units.target }) },
            { label: t(c.growth.metrics.leads), value: t(c.growth.ofTarget, { actual: g.leads.actual, target: g.leads.target }) },
          ]} />
        </ul>
      </section>

    </div>
  );
}
