'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { defaultTargets, sales as sampleSales, type Sale, type Targets } from '@/content/business/sample';

/** Owner entries for the console, in memory only (reload resets, like the rest of the admin). */
type ConsoleStore = { sales: Sale[]; targets: Targets; addSale: (s: Sale) => void; setTargets: (t: Targets) => void };
const Ctx = createContext<ConsoleStore | null>(null);

export function ConsoleProvider({ children }: { children: React.ReactNode }) {
  const [sales, setSales] = useState<Sale[]>(sampleSales);
  const [targets, setTargets] = useState<Targets>(defaultTargets);
  const value = useMemo(() => ({ sales, targets, setTargets, addSale: (s: Sale) => setSales((x) => [...x, s].sort((a, b) => a.date.localeCompare(b.date))) }), [sales, targets]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConsole() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useConsole must be used inside <ConsoleProvider>');
  return v;
}
