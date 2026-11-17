'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ContentTree } from '@/content/schema';
import { publishedContent } from '@/content/index';

/**
 * Admin store: in memory only. Nothing is written to disk, storage or a server (Phase 0).
 * Reloading the page resets it to the published content files.
 */

import type { GlobalKey, PageKey } from './keys';
export { PAGE_KEYS, GLOBAL_KEYS, type PageKey, type GlobalKey } from './keys';
export type DocKey = { kind: 'page'; key: PageKey } | { kind: 'global'; key: GlobalKey };

const clone = <T,>(v: T): T => structuredClone(v);

export function getDoc(tree: ContentTree, d: DocKey): unknown {
  return d.kind === 'page' ? tree.pages[d.key] : tree[d.key];
}

function setDoc(tree: ContentTree, d: DocKey, value: unknown): ContentTree {
  if (d.kind === 'page') return { ...tree, pages: { ...tree.pages, [d.key]: value } } as ContentTree;
  return { ...tree, [d.key]: value } as ContentTree;
}

export const docId = (d: DocKey) => `${d.kind}:${d.key}`;

type Meta = { updatedAt: string; updatedBy: string; state: 'draft' | 'published'; version: number };

function withMeta(doc: unknown, patch: Partial<Meta>): unknown {
  const d = doc as { meta?: Meta };
  if (!d || !d.meta) return doc;
  return { ...d, meta: { ...d.meta, ...patch } };
}

type AdminStore = {
  published: ContentTree;
  draft: ContentTree;
  /** documents edited since their last "Save draft" */
  dirty: Record<string, boolean>;
  previewMode: boolean;
  update: (d: DocKey, next: unknown) => void;
  saveDraft: (d: DocKey, who: string) => void;
  publish: (d: DocKey, who: string) => void;
  discard: (d: DocKey) => void;
  setPreviewMode: (on: boolean) => void;
  /** true when the draft differs from the published copy (unpublished changes) */
  hasChanges: (d: DocKey) => boolean;
};

const Ctx = createContext<AdminStore | null>(null);

export function AdminStoreProvider({ children }: { children: React.ReactNode }) {
  const [published, setPublished] = useState<ContentTree>(() => clone(publishedContent));
  const [draft, setDraft] = useState<ContentTree>(() => clone(publishedContent));
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [previewMode, setPreviewMode] = useState(false);

  const update = useCallback((d: DocKey, next: unknown) => {
    setDraft((t) => setDoc(t, d, withMeta(next, { state: 'draft' })));
    setDirty((x) => ({ ...x, [docId(d)]: true }));
  }, []);

  const saveDraft = useCallback((d: DocKey, who: string) => {
    setDraft((t) => setDoc(t, d, withMeta(getDoc(t, d), { updatedAt: new Date().toISOString(), updatedBy: who, state: 'draft' })));
    setDirty((x) => ({ ...x, [docId(d)]: false }));
  }, []);

  const publish = useCallback(
    (d: DocKey, who: string) => {
      const prev = getDoc(published, d) as { meta?: Meta };
      const next = withMeta(getDoc(draft, d), {
        updatedAt: new Date().toISOString(),
        updatedBy: who,
        state: 'published',
        version: (prev?.meta?.version ?? 0) + 1,
      });
      setPublished((t) => setDoc(t, d, clone(next)));
      setDraft((t) => setDoc(t, d, clone(next)));
      setDirty((x) => ({ ...x, [docId(d)]: false }));
    },
    [draft, published],
  );

  const discard = useCallback(
    (d: DocKey) => {
      setDraft((t) => setDoc(t, d, clone(getDoc(published, d))));
      setDirty((x) => ({ ...x, [docId(d)]: false }));
    },
    [published],
  );

  const hasChanges = useCallback(
    (d: DocKey) => {
      const strip = (v: unknown) => JSON.stringify({ ...(v as object), meta: undefined });
      return strip(getDoc(draft, d)) !== strip(getDoc(published, d));
    },
    [draft, published],
  );

  const value = useMemo(
    () => ({ published, draft, dirty, previewMode, update, saveDraft, publish, discard, setPreviewMode, hasChanges }),
    [published, draft, dirty, previewMode, update, saveDraft, publish, discard, hasChanges],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdminStore(): AdminStore {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAdminStore must be used inside <AdminStoreProvider>');
  return v;
}
