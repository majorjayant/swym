'use client';

import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/** true after hydration, false during server render and the first client render. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}

/** Read a value computed on the client only (time, locale, storage); `server` is used for prerender. */
export function useClientValue<T>(get: () => T, server: T): T {
  return useSyncExternalStore(noop, get, () => server);
}

type Area = 'local' | 'session';
const EVENT = 'mbc-storage';

function area(a: Area): Storage | null {
  try {
    return a === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener('storage', cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener('storage', cb);
    window.removeEventListener(EVENT, cb);
  };
}

/** Subscribe to one storage key. Returns the raw string (stable for snapshot comparison), or null. */
export function useStoredString(key: string, where: Area = 'local'): string | null {
  return useSyncExternalStore(
    subscribe,
    () => area(where)?.getItem(key) ?? null,
    () => null,
  );
}

export function writeStored(key: string, value: string, where: Area = 'local') {
  try {
    area(where)?.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new Event(EVENT));
}
