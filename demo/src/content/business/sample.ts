/**
 * SAMPLE DATA for the owner console demo (Phase 0). Every number here is an example.
 * Shapes follow the day-1 sources in docs/console/*.md:
 *  - site events (first-party beacon): daily counts
 *  - owner entries: sales, stock costs, expenses, walk-ins/referrals, Google rating
 *  - Google Search Console (read-only): query rows, 28 days
 * Ads (Google, Meta) exist as switched-off slots with no data.
 */

export type LeadSource = 'google' | 'gbp' | 'facebook' | 'walkIn' | 'referral' | 'direct' | 'googleAds' | 'metaAds';
export const LEAD_SOURCES: LeadSource[] = ['google', 'gbp', 'facebook', 'walkIn', 'referral', 'direct'];
export const PAID_SOURCES: LeadSource[] = ['googleAds', 'metaAds'];

export type DayRow = {
  date: string; // YYYY-MM-DD
  visits: number;
  vehicleViews: number;
  calls: number;
  texts: number;
  forms: number;
  /** site lead actions (calls + texts + forms) split by source */
  leadsBySource: Partial<Record<LeadSource, number>>;
};

export type OwnerLead = { date: string; source: 'walkIn' | 'referral' };

export type Sale = {
  stock: string;
  vehicle: string;
  date: string;
  price: number; // before GST/PST
  cost: number;
  recon: number;
  source: LeadSource;
  tradeIn: boolean;
  repeat?: boolean;
};

export type StockCost = { stock: string; acquired: string; cost: number; recon: number };
export type Expenses = { month: string; rent: number; payroll: number; utilities: number; insurance: number; marketing: number; other: number };
export type GscRow = { query: string; clicks: number; impressions: number; position: number };
export type RatingEntry = { date: string; rating: number; count: number };
export type Targets = { month: string; units: number; leads: number; reviews: number };
export type AdsChannel = { key: 'googleAds' | 'metaAds'; running: boolean; spend: number; clicks: number };

/** The demo's "today". Fixed so every visitor sees the same numbers. */
export const AS_OF = '2026-11-18';
/** Website launch: the 30-day observation period starts here. */
export const LAUNCH = '2026-10-28';
export const OBSERVE_DAYS = 30;

// ---- site events (deterministic) ----
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export const addDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
export const daysBetween = (a: string, b: string) => Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 86400000);

function buildDays(): DayRow[] {
  const r = rng(498760);
  const rows: DayRow[] = [];
  const n = daysBetween(LAUNCH, AS_OF) + 1;
  for (let i = 0; i < n; i++) {
    const date = addDays(LAUNCH, i);
    const dow = new Date(`${date}T12:00:00Z`).getUTCDay();
    const weekend = dow === 0 || dow === 6 ? 1.25 : 1;
    const ramp = 38 + i * 1.3; // traffic grows as Google indexes the site
    const visits = Math.round(ramp * weekend * (0.85 + r() * 0.3));
    const vehicleViews = Math.round(visits * (0.8 + r() * 0.2));
    const leads = Math.max(0, Math.round(visits * (0.04 + r() * 0.025)));
    const calls = Math.round(leads * 0.5);
    const texts = Math.round((leads - calls) * 0.6);
    const forms = leads - calls - texts;
    const split: Partial<Record<LeadSource, number>> = {};
    for (let k = 0; k < leads; k++) {
      const x = r();
      const s: LeadSource = x < 0.4 ? 'google' : x < 0.6 ? 'gbp' : x < 0.85 ? 'facebook' : 'direct';
      split[s] = (split[s] ?? 0) + 1;
    }
    rows.push({ date, visits, vehicleViews, calls, texts, forms, leadsBySource: split });
  }
  return rows;
}

export const siteDays: DayRow[] = buildDays();

/** Owner-entered leads that never touch the site. */
export const ownerLeads: OwnerLead[] = [
  { date: '2026-10-29', source: 'walkIn' }, { date: '2026-10-31', source: 'referral' }, { date: '2026-11-02', source: 'walkIn' },
  { date: '2026-11-05', source: 'walkIn' }, { date: '2026-11-07', source: 'referral' }, { date: '2026-11-09', source: 'walkIn' },
  { date: '2026-11-12', source: 'walkIn' }, { date: '2026-11-14', source: 'referral' }, { date: '2026-11-16', source: 'walkIn' },
  { date: '2026-11-17', source: 'walkIn' },
];

/** Share of vehicle-page views and leads per stock number (last 14 days). MB1009 gets views but no leads. */
export const vehicleWeights: Record<string, { views: number; leads: number }> = {
  MB1001: { views: 16, leads: 18 }, MB1002: { views: 14, leads: 16 }, MB1003: { views: 12, leads: 14 },
  MB1004: { views: 9, leads: 9 }, MB1005: { views: 6, leads: 4 }, MB1006: { views: 11, leads: 12 },
  MB1007: { views: 7, leads: 5 }, MB1008: { views: 8, leads: 10 }, MB1009: { views: 9, leads: 0 },
  MB1010: { views: 8, leads: 12 },
};
/** Share of site lead actions that happen on vehicle pages (the rest: home, contact, header). */
export const VEHICLE_PAGE_LEAD_SHARE = 0.7;

// ---- owner entries ----
export const sales: Sale[] = [
  { stock: 'MB0981', vehicle: '2017 Ford Escape SE 4WD', date: '2026-10-03', price: 15995, cost: 12100, recon: 850, source: 'referral', tradeIn: false },
  { stock: 'MB0982', vehicle: '2016 Toyota Corolla LE', date: '2026-10-07', price: 13495, cost: 10200, recon: 600, source: 'walkIn', tradeIn: true },
  { stock: 'MB0983', vehicle: '2018 Chevrolet Silverado 1500 LT', date: '2026-10-11', price: 32995, cost: 27500, recon: 1200, source: 'facebook', tradeIn: true },
  { stock: 'MB0984', vehicle: '2015 Honda CR-V EX AWD', date: '2026-10-15', price: 16995, cost: 13300, recon: 900, source: 'walkIn', tradeIn: false },
  { stock: 'MB0985', vehicle: '2019 Hyundai Kona Preferred', date: '2026-10-19', price: 19995, cost: 16100, recon: 700, source: 'google', tradeIn: false },
  { stock: 'MB0986', vehicle: '2014 Dodge Journey SXT', date: '2026-10-22', price: 9995, cost: 7300, recon: 650, source: 'facebook', tradeIn: false },
  { stock: 'MB0987', vehicle: '2017 Nissan Altima 2.5 SV', date: '2026-10-25', price: 15495, cost: 12200, recon: 550, source: 'referral', tradeIn: false, repeat: true },
  { stock: 'MB0988', vehicle: '2018 Kia Soul EX', date: '2026-10-30', price: 14995, cost: 11600, recon: 600, source: 'google', tradeIn: false },
  { stock: 'MB0989', vehicle: '2016 GMC Sierra 1500 SLE 4x4', date: '2026-10-31', price: 28995, cost: 24300, recon: 1300, source: 'gbp', tradeIn: true },
  { stock: 'MB0990', vehicle: '2019 Toyota Corolla LE', date: '2026-11-02', price: 18995, cost: 15300, recon: 500, source: 'google', tradeIn: false },
  { stock: 'MB0991', vehicle: '2017 Mazda3 GS', date: '2026-11-04', price: 14495, cost: 11300, recon: 700, source: 'facebook', tradeIn: false },
  { stock: 'MB0992', vehicle: '2018 Ford Escape SE 4WD', date: '2026-11-06', price: 19495, cost: 15900, recon: 900, source: 'gbp', tradeIn: true },
  { stock: 'MB0993', vehicle: '2015 Jeep Cherokee North 4x4', date: '2026-11-09', price: 15995, cost: 12700, recon: 1100, source: 'walkIn', tradeIn: false },
  { stock: 'MB0994', vehicle: '2020 Hyundai Elantra Preferred', date: '2026-11-13', price: 18495, cost: 15000, recon: 450, source: 'google', tradeIn: false },
  { stock: 'MB0995', vehicle: '2017 Ram 1500 Express 4x4', date: '2026-11-15', price: 27995, cost: 23600, recon: 1400, source: 'facebook', tradeIn: true },
  { stock: 'MB0996', vehicle: '2018 Honda Civic LX', date: '2026-11-17', price: 18995, cost: 15400, recon: 600, source: 'referral', tradeIn: false, repeat: true },
];

/** Date acquired, purchase cost and reconditioning for cars on the lot (owner entries). */
export const stockCosts: StockCost[] = [
  { stock: 'MB1001', acquired: '2026-10-20', cost: 37200, recon: 1100 },
  { stock: 'MB1002', acquired: '2026-10-02', cost: 27600, recon: 800 },
  { stock: 'MB1003', acquired: '2026-10-24', cost: 16400, recon: 700 },
  { stock: 'MB1004', acquired: '2026-09-28', cost: 22300, recon: 900 },
  { stock: 'MB1005', acquired: '2026-09-15', cost: 19200, recon: 1200 },
  { stock: 'MB1006', acquired: '2026-11-03', cost: 27100, recon: 600 },
  { stock: 'MB1007', acquired: '2026-08-11', cost: 21000, recon: 1500 },
  { stock: 'MB1008', acquired: '2026-10-09', cost: 22100, recon: 700 },
  { stock: 'MB1009', acquired: '2026-10-14', cost: 20300, recon: 900 },
  { stock: 'MB1010', acquired: '2026-11-08', cost: 17600, recon: 500 },
];

export const expenses: Expenses[] = [
  { month: '2026-10', rent: 6500, payroll: 14200, utilities: 850, insurance: 1150, marketing: 0, other: 1100 },
  { month: '2026-11', rent: 6500, payroll: 14200, utilities: 850, insurance: 1150, marketing: 0, other: 1100 },
];

export const ratings: RatingEntry[] = [
  { date: '2026-10-28', rating: 4.7, count: 120 },
  { date: '2026-11-04', rating: 4.7, count: 121 },
  { date: '2026-11-11', rating: 4.8, count: 123 },
  { date: '2026-11-18', rating: 4.8, count: 126 },
];

export const defaultTargets: Targets = { month: '2026-11', units: 12, leads: 90, reviews: 8 };

// ---- Google Search Console (last 28 days) ----
export const gsc: GscRow[] = [
  { query: 'mr best cars', clicks: 118, impressions: 260, position: 1.2 },
  { query: 'used cars regina', clicks: 41, impressions: 1890, position: 8.4 },
  { query: 'used trucks regina', clicks: 22, impressions: 840, position: 9.7 },
  { query: 'car dealership regina', clicks: 18, impressions: 1320, position: 12.6 },
  { query: 'used suv regina', clicks: 15, impressions: 610, position: 7.9 },
  { query: 'car financing regina bad credit', clicks: 9, impressions: 480, position: 14.2 },
  { query: '8th ave regina car dealer', clicks: 12, impressions: 95, position: 2.1 },
  { query: 'used cars moose jaw', clicks: 4, impressions: 410, position: 18.8 },
  { query: 'sell my car regina', clicks: 6, impressions: 350, position: 16.3 },
  { query: 'used ford f-150 saskatchewan', clicks: 3, impressions: 220, position: 22.5 },
];

// ---- ads (switched off for the first 30 days) ----
export const ads: AdsChannel[] = [
  { key: 'googleAds', running: false, spend: 0, clicks: 0 },
  { key: 'metaAds', running: false, spend: 0, clicks: 0 },
];
