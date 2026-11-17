'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useHydrated, useStoredString, writeStored } from './client-store';
import type { ConsentCategoryKey } from '@/content/schema';

export type ConsentState = Record<ConsentCategoryKey, boolean> & { decided: boolean };

const KEY = 'mbc-consent';
const DEFAULT: ConsentState = { necessary: true, analytics: false, marketing: false, decided: false };

type ConsentContextValue = {
  consent: ConsentState;
  ready: boolean;
  settingsOpen: boolean;
  save: (c: Omit<ConsentState, 'decided' | 'necessary'>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function parse(raw: string | null): ConsentState {
  if (!raw) return DEFAULT;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return { ...DEFAULT, ...parsed, necessary: true };
  } catch {
    return DEFAULT;
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const raw = useStoredString(KEY);
  const ready = useHydrated();
  const consent = useMemo(() => parse(raw), [raw]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const persist = useCallback((c: ConsentState) => {
    writeStored(KEY, JSON.stringify({ ...c, decidedAt: new Date().toISOString() }));
    // Phase 0 stub: no analytics or marketing scripts exist. Phase 1 loads them here only when allowed.
    if (process.env.NODE_ENV !== 'production') console.info('[consent]', c);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      ready,
      settingsOpen,
      save: (c) => {
        persist({ necessary: true, analytics: c.analytics, marketing: c.marketing, decided: true });
        setSettingsOpen(false);
      },
      acceptAll: () => {
        persist({ necessary: true, analytics: true, marketing: true, decided: true });
        setSettingsOpen(false);
      },
      rejectAll: () => {
        persist({ necessary: true, analytics: false, marketing: false, decided: true });
        setSettingsOpen(false);
      },
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [consent, ready, settingsOpen, persist],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider>');
  return ctx;
}
