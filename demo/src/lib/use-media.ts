'use client';

import { useSyncExternalStore } from 'react';

function subscribe(query: string) {
  return (cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
  };
}

/** true when the user asks for reduced motion. Server render assumes reduced (no autoplay until hydrated). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe('(prefers-reduced-motion: reduce)'),
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => true,
  );
}
