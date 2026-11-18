/**
 * Owner console calculations. Pure functions over the day-1 data shapes
 * (docs/console/decisions.md lists who owns each number).
 */
import {
  AS_OF, LAUNCH, OBSERVE_DAYS, LEAD_SOURCES, VEHICLE_PAGE_LEAD_SHARE,
  addDays, daysBetween, siteDays, ownerLeads, vehicleWeights, stockCosts, expenses, ratings, gsc,
  type DayRow, type LeadSource, type Sale, type Targets,
} from '@/content/business/sample';

export type Range = { from: string; to: string };
export const inRange = (d: string, r: Range) => d >= r.from && d <= r.to;

/** Last n days ending today, and the n days before that. */
export function windows(n: number, today = AS_OF): { cur: Range; prev: Range } {
  const cur = { from: addDays(today, -(n - 1)), to: today };
  const prev = { from: addDays(today, -(2 * n - 1)), to: addDays(today, -n) };
  return { cur, prev };
}
export const sinceLaunch = (today = AS_OF): Range => ({ from: LAUNCH, to: today });
export const monthToDate = (today = AS_OF): Range => ({ from: `${today.slice(0, 8)}01`, to: today });

/** Percent change; null when there is no previous value to compare with. */
export function change(cur: number, prev: number): number | null {
  if (!prev) return null;
  return (cur - prev) / prev;
}

// ---- observation period ----
export function observation(today = AS_OF) {
  const day = Math.min(daysBetween(LAUNCH, today) + 1, OBSERVE_DAYS);
  return { day, total: OBSERVE_DAYS, done: daysBetween(LAUNCH, today) + 1 >= OBSERVE_DAYS, endsOn: addDays(LAUNCH, OBSERVE_DAYS - 1) };
}

// ---- Analytics: site events ----
const days = (r: Range, rows: DayRow[] = siteDays) => rows.filter((d) => inRange(d.date, r));
export const siteLeads = (d: DayRow) => d.calls + d.texts + d.forms;
export function traffic(r: Range) {
  const rows = days(r);
  const visits = rows.reduce((s, d) => s + d.visits, 0);
  const vehicleViews = rows.reduce((s, d) => s + d.vehicleViews, 0);
  const leadActions = rows.reduce((s, d) => s + siteLeads(d), 0);
  return { visits, vehicleViews, leadActions, leadRate: visits ? leadActions / visits : 0 };
}

/** Split a total across weights with largest-remainder rounding, so parts add up to the total. */
export function apportion(total: number, weights: number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  if (!sum) return weights.map(() => 0);
  const raw = weights.map((w) => (total * w) / sum);
  const out = raw.map(Math.floor);
  let left = total - out.reduce((a, b) => a + b, 0);
  raw.map((v, i) => [v - Math.floor(v), i] as const).sort((a, b) => b[0] - a[0]).forEach(([, i]) => {
    if (left > 0) { out[i] += 1; left -= 1; }
  });
  return out;
}

export type VehicleStat = { stock: string; views: number; leads: number; leadRate: number; noLeads: boolean };
/** Per-vehicle views and leads over the last 14 days, consistent with the daily totals. */
export function vehicleStats(today = AS_OF): VehicleStat[] {
  const { cur } = windows(14, today);
  const t = traffic(cur);
  const stocks = Object.keys(vehicleWeights);
  const views = apportion(t.vehicleViews, stocks.map((s) => vehicleWeights[s].views));
  const leads = apportion(Math.round(t.leadActions * VEHICLE_PAGE_LEAD_SHARE), stocks.map((s) => vehicleWeights[s].leads));
  return stocks
    .map((stock, i) => ({ stock, views: views[i], leads: leads[i], leadRate: views[i] ? leads[i] / views[i] : 0, noLeads: views[i] >= 40 && leads[i] === 0 }))
    .sort((a, b) => b.views - a.views);
}

// ---- Marketing: leads (site lead actions + owner-entered walk-ins and referrals) ----
export function leadsBySource(r: Range): Record<LeadSource, number> {
  const out = Object.fromEntries(LEAD_SOURCES.map((s) => [s, 0])) as Record<LeadSource, number>;
  for (const d of days(r)) for (const [s, n] of Object.entries(d.leadsBySource)) out[s as LeadSource] = (out[s as LeadSource] ?? 0) + (n ?? 0);
  for (const l of ownerLeads) if (inRange(l.date, r)) out[l.source] += 1;
  return out;
}
export const totalLeads = (r: Range) => Object.values(leadsBySource(r)).reduce((a, b) => a + b, 0);

export function searchSummary() {
  const clicks = gsc.reduce((s, q) => s + q.clicks, 0);
  const impressions = gsc.reduce((s, q) => s + q.impressions, 0);
  const rows = gsc
    .map((q) => ({ ...q, ctr: q.impressions ? q.clicks / q.impressions : 0, opportunity: q.position >= 5 && q.position <= 20 && q.impressions >= 100 }))
    .sort((a, b) => b.impressions - a.impressions);
  return { clicks, impressions, rows, opportunities: rows.filter((r) => r.opportunity).length };
}

// ---- Finance ----
export const gross = (s: Pick<Sale, 'price' | 'cost' | 'recon'>) => s.price - s.cost - s.recon;
export function salesIn(all: Sale[], r: Range) {
  const list = all.filter((s) => inRange(s.date, r));
  const total = list.reduce((a, s) => a + gross(s), 0);
  return { list, units: list.length, revenue: list.reduce((a, s) => a + s.price, 0), gross: total, grossPerCar: list.length ? total / list.length : 0 };
}
export function monthExpenses(month: string) {
  const e = expenses.find((x) => x.month === month);
  return e ? e.rent + e.payroll + e.utilities + e.insurance + e.marketing + e.other : 0;
}
export function monthFinance(all: Sale[], today = AS_OF) {
  const s = salesIn(all, monthToDate(today));
  const exp = monthExpenses(today.slice(0, 7));
  const breakEven = s.grossPerCar ? Math.ceil(exp / s.grossPerCar) : 0;
  return { ...s, expenses: exp, net: s.gross - exp, breakEven };
}

export type StockAge = { stock: string; days: number; cost: number; recon: number; level: 'ok' | 'aged' | 'old' };
/** Unsold cars by days in stock. Aged = over 60 days, old = over 90. */
export function stockAges(soldStocks: string[], today = AS_OF): StockAge[] {
  return stockCosts
    .filter((c) => !soldStocks.includes(c.stock))
    .map((c) => {
      const d = daysBetween(c.acquired, today);
      return { stock: c.stock, days: d, cost: c.cost, recon: c.recon, level: (d > 90 ? 'old' : d > 60 ? 'aged' : 'ok') as StockAge['level'] };
    })
    .sort((a, b) => b.days - a.days);
}

/** Gross per week for the last n weeks (weeks end today). */
export function weeklyGross(all: Sale[], n = 7, today = AS_OF) {
  return Array.from({ length: n }, (_, i) => {
    const to = addDays(today, -7 * (n - 1 - i));
    const r = { from: addDays(to, -6), to };
    return { range: r, ...salesIn(all, r) };
  });
}

// ---- Growth ----
export function reviewsNow() {
  const last = ratings[ratings.length - 1];
  return last;
}
export function reviewsThisMonth(today = AS_OF) {
  const start = `${today.slice(0, 8)}01`;
  const before = [...ratings].filter((r) => r.date < start).pop() ?? ratings[0];
  return reviewsNow().count - before.count;
}
/** Pace: actual ÷ (target × share of the month gone). Behind pace below 85%. */
export function pace(actual: number, target: number, today = AS_OF) {
  const d = new Date(`${today}T12:00:00Z`);
  const daysInMonth = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  const elapsed = d.getUTCDate();
  const expected = (target * elapsed) / daysInMonth;
  const ratio = expected ? actual / expected : 0;
  return { expected, ratio, behind: ratio < 0.85 };
}
export function growth(all: Sale[], targets: Targets, today = AS_OF) {
  const mtd = monthToDate(today);
  const units = salesIn(all, mtd).units;
  const leads = totalLeads(mtd);
  const reviews = reviewsThisMonth(today);
  return {
    units: { actual: units, target: targets.units, ...pace(units, targets.units, today) },
    leads: { actual: leads, target: targets.leads, ...pace(leads, targets.leads, today) },
    reviews: { actual: reviews, target: targets.reviews, ...pace(reviews, targets.reviews, today) },
  };
}

// ---- Overview ----
/** Lead-to-sale since launch: units sold ÷ leads (owner: Analytics). */
export function leadToSale(all: Sale[], today = AS_OF) {
  const r = sinceLaunch(today);
  const leads = totalLeads(r);
  const units = salesIn(all, r).units;
  return { leads, units, rate: leads ? units / leads : 0 };
}

export type Attention =
  | { kind: 'old' | 'aged'; stock: string; days: number }
  | { kind: 'noLeads'; stock: string; views: number }
  | { kind: 'behind'; metric: 'units' | 'leads' | 'reviews'; actual: number; expected: number };

/** At most 3 items, most urgent first: 90+ days, views but no leads, behind pace, 60+ days. */
export function attention(all: Sale[], targets: Targets, today = AS_OF): Attention[] {
  const sold = all.map((s) => s.stock);
  const ages = stockAges(sold, today);
  const items: Attention[] = [];
  ages.filter((a) => a.level === 'old').forEach((a) => items.push({ kind: 'old', stock: a.stock, days: a.days }));
  vehicleStats(today).filter((v) => v.noLeads && !sold.includes(v.stock)).forEach((v) => items.push({ kind: 'noLeads', stock: v.stock, views: v.views }));
  const g = growth(all, targets, today);
  (['units', 'leads', 'reviews'] as const).forEach((m) => {
    if (g[m].behind) items.push({ kind: 'behind', metric: m, actual: g[m].actual, expected: Math.round(g[m].expected) });
  });
  ages.filter((a) => a.level === 'aged').forEach((a) => items.push({ kind: 'aged', stock: a.stock, days: a.days }));
  return items.slice(0, 3);
}
