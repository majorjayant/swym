// Sanity checks for src/lib/metrics.ts against hand-worked numbers (run: npx tsx scripts/check-metrics.ts).
import assert from 'node:assert/strict';
import * as m from '../src/lib/metrics';
import { sales, defaultTargets, siteDays } from '../src/content/business/sample';

const w7 = m.windows(7);
assert.deepEqual(w7.cur, { from: '2026-11-12', to: '2026-11-18' });
assert.deepEqual(w7.prev, { from: '2026-11-05', to: '2026-11-11' });
assert.equal(m.observation().day, 22);

const cur = m.salesIn(sales, w7.cur), prev = m.salesIn(sales, w7.prev);
assert.equal(cur.units, 3); assert.equal(prev.units, 2);
assert.equal(cur.gross, 3045 + 2995 + 2995); assert.equal(prev.gross, 2695 + 2195);

const mf = m.monthFinance(sales);
assert.equal(mf.units, 7); assert.equal(mf.gross, 19615); assert.equal(mf.expenses, 23800);
assert.equal(mf.net, 19615 - 23800); assert.equal(mf.breakEven, Math.ceil(23800 / (19615 / 7)));

const ages = m.stockAges(sales.map((s) => s.stock));
assert.equal(ages[0].stock, 'MB1007'); assert.equal(ages[0].days, 99); assert.equal(ages[0].level, 'old');
assert.equal(ages.filter((a) => a.level !== 'ok').length, 2);

const vs = m.vehicleStats();
const t14 = m.traffic(m.windows(14).cur);
assert.equal(vs.reduce((s, v) => s + v.views, 0), t14.vehicleViews);
assert.ok(vs.find((v) => v.stock === 'MB1009')!.noLeads);

assert.equal(m.apportion(10, [1, 1, 1]).reduce((a, b) => a + b, 0), 10);
assert.equal(m.change(3, 2), 0.5); assert.equal(m.change(3, 0), null);
assert.equal(m.reviewsThisMonth(), 6);
const att = m.attention(sales, defaultTargets);
assert.equal(att.length, 3); assert.equal(att[0].kind, 'old');

const g = m.growth(sales, defaultTargets);
const lts = m.leadToSale(sales);
console.log({ days: siteDays.length, traffic7: m.traffic(w7.cur), leads7: m.totalLeads(w7.cur), leadsPrev7: m.totalLeads(w7.prev), lts, growth: g, att, search: m.searchSummary().opportunities, mf });
console.log('ALL METRIC CHECKS PASS');
