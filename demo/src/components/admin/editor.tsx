'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { Page, SEODefaults, Section } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { cn } from '../ui/cn';
import { EditorProvider, IconButton, ObjectEditor, useAdminLabels, ValueEditor } from './fields';
import { StateBadge } from './shell';
import { docId, getDoc, useAdminStore, type DocKey, type GlobalKey, type PageKey } from './store';
import { pathId, validateDoc, type FieldError, type Path } from './validate';

/* ---------- Action bar, status and error summary (shared by page and global editors) ---------- */

function useEditorActions(d: DocKey, title: string) {
  const store = useAdminStore();
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  const who = t(a.demoUser);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldError[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);

  const doc = getDoc(store.draft, d);
  const base: Path = useMemo(() => (d.kind === 'page' ? ['pages', d.key] : [d.key]), [d]);

  const runValidation = useCallback(() => (d.kind === 'global' && d.key === 'microcopy' ? [] : validateDoc(doc, base)), [d, doc, base]);

  const actions = {
    save: () => {
      store.saveDraft(d, who);
      setMessage(t(a.savedMessage, { doc: title }));
    },
    publish: () => {
      const errs = runValidation();
      setErrors(errs);
      if (errs.length) {
        setMessage(t(a.publishBlocked));
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      if (!store.hasChanges(d)) {
        setMessage(t(a.nothingToPublish));
        return;
      }
      store.publish(d, who);
      setMessage(t(a.publishedMessage, { doc: title }));
    },
    discard: () => {
      store.discard(d);
      setErrors([]);
      setMessage(t(a.discardedMessage, { doc: title }));
    },
  };
  return { store, actions, message, setMessage, errors, setErrors, summaryRef, base, doc };
}

function errorLabel(path: Path, base: Path, label: (k: string | number) => string, sectionName?: (i: number) => string) {
  const rel = path.slice(base.length);
  const parts: string[] = [];
  for (let i = 0; i < rel.length; i++) {
    if (rel[i] === 'sections' && typeof rel[i + 1] === 'number' && sectionName) {
      parts.push(sectionName(rel[i + 1] as number));
      i++;
      continue;
    }
    parts.push(label(rel[i]));
  }
  return parts.join(' › ');
}

function EditorHeader({
  d,
  title,
  actions,
  message,
  previewHref,
}: {
  d: DocKey;
  title: string;
  actions: { save: () => void; publish: () => void; discard: () => void };
  message: string;
  previewHref: string;
}) {
  const store = useAdminStore();
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  const changed = store.hasChanges(d);
  return (
    <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <NextLink href="/admin" className="inline-flex min-h-8 items-center gap-1 text-sm text-slate hover:text-ink">
            <Icon name="chevron-left" size={14} />
            {t(a.backToDashboard)}
          </NextLink>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-title-fluid font-bold">{title}</h1>
            <StateBadge state={changed ? 'draft' : 'published'} unsaved={!!store.dirty[docId(d)]} />
          </div>
        </div>
        <div role="toolbar" aria-label={t(a.editorActions)} className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="secondary" onClick={actions.discard} disabled={!changed}>
            {t(a.discard)}
          </Button>
          <NextLink href={previewHref} className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border-2 border-ink px-3.5 text-sm font-bold hover:bg-ink hover:text-white">
            <Icon name="eye" size={16} />
            {t(a.preview)}
          </NextLink>
          <Button size="sm" variant="secondary" onClick={actions.save}>
            {t(a.saveDraft)}
          </Button>
          <Button size="sm" onClick={actions.publish}>
            {t(a.publish)}
          </Button>
        </div>
      </div>
      <p role="status" aria-live="polite" aria-label={t(a.statusRegion)} className={cn('mt-2 min-h-5 text-sm font-bold', message ? 'text-ink' : 'text-transparent')}>
        {message}
      </p>
    </div>
  );
}

function ErrorSummary({ errors, base, refEl, sectionName }: { errors: FieldError[]; base: Path; refEl: React.RefObject<HTMLDivElement | null>; sectionName?: (i: number) => string }) {
  const { a, t, label } = useAdminLabels();
  return (
    <div ref={refEl} tabIndex={-1} className="outline-none">
      {errors.length ? (
        <div role="alert" className="mb-6 rounded-[var(--radius-card)] border-2 border-red bg-white p-4">
          <p className="flex items-center gap-2 font-bold">
            <Icon name="alert" size={18} className="text-red" />
            {t(a.errorsTitle, { count: errors.length })}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
            {errors.map((e) => (
              <li key={pathId(e.path)}>
                <a href={`#${pathId(e.path)}`} className="link-underline">
                  {errorLabel(e.path, base, label, sectionName)}: {e.kind === 'required' ? t(a.requiredField) : `${t(a.tooLongField)} (${e.limit})`}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- SEO panel with search preview ---------- */

function SeoPanel({ page, onChange, base, defaults }: { page: Page; onChange: (p: Page) => void; base: Path; defaults: SEODefaults }) {
  const { a, t } = useAdminLabels();
  const title = defaults.titleTemplate.replace('%s', t(page.seo.title));
  const url = `${defaults.siteUrl.replace(/^https?:\/\//, '')}${page.slug && page.slug !== '404' ? ` › ${page.slug}` : ''}`;
  const desc = t(page.seo.description);
  return (
    <div className="grid gap-6">
      <ValueEditor value={page.seo} onChange={(seo) => onChange({ ...page, seo: seo as Page['seo'] })} path={[...base, 'seo']} />
      <figure className="rounded-[var(--radius-card)] border border-line bg-white p-5">
        <figcaption className="label mb-3 text-slate">{t(a.seoPreview)}</figcaption>
        <div className="max-w-[600px] font-[Arial,sans-serif]">
          <p className="truncate text-[14px] text-[#202124]">{url}</p>
          <p className="mt-1 line-clamp-1 text-[20px] leading-snug text-[#1a0dab]">{title}</p>
          <p className="mt-1 line-clamp-2 text-[14px] leading-[1.58] text-[#4d5156]">{desc}</p>
        </div>
        <p className="mt-4 text-xs text-slate">{t(a.searchPreviewNote)}</p>
        <p className="mt-1 text-xs text-slate">{t(a.noIndexNote)}</p>
      </figure>
    </div>
  );
}

/* ---------- Page editor ---------- */

type Pane = { kind: 'section'; index: number } | { kind: 'seo' } | { kind: 'settings' };

export function PageEditor({ pageKey }: { pageKey: PageKey }) {
  const d: DocKey = useMemo(() => ({ kind: 'page', key: pageKey }), [pageKey]);
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  const title = t(a.pageNames[pageKey]);
  const { store, actions, message, setMessage, errors, summaryRef, base, doc } = useEditorActions(d, title);
  const page = doc as Page;
  const [pane, setPane] = useState<Pane>({ kind: 'section', index: 0 });
  const [focusId, setFocusId] = useState<string | null>(null);
  const errMap = useMemo(() => Object.fromEntries(errors.map((e) => [pathId(e.path), e])), [errors]);
  const setPage = (p: Page) => store.update(d, p);
  const setSections = (sections: Section[]) => setPage({ ...page, sections });
  const moveSection = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= page.sections.length) return;
    const next = [...page.sections];
    [next[i], next[j]] = [next[j], next[i]];
    setSections(next);
    if (pane.kind === 'section' && pane.index === i) setPane({ kind: 'section', index: j });
    setFocusId(`sec-${j}-${dir < 0 ? 'up' : 'down'}`);
  };
  const sectionErrors = (i: number) => errors.filter((e) => e.path[base.length] === 'sections' && e.path[base.length + 1] === i).length;
  const seoErrors = errors.filter((e) => e.path[base.length] === 'seo').length;
  const selected = pane.kind === 'section' ? page.sections[pane.index] : null;

  return (
    <EditorProvider value={{ errors: errMap, focusId, setFocusId, announce: setMessage }}>
      <EditorHeader d={d} title={title} actions={actions} message={message} previewHref={`/admin/preview/${pageKey}`} />
      <ErrorSummary errors={errors} base={base} refEl={summaryRef} sectionName={(i) => t(a.sectionTypes[page.sections[i]?.type] ?? { en: String(i) })} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[17rem_minmax(0,1fr)] lg:grid-cols-[20rem_minmax(0,1fr)]">
        <nav aria-label={t(a.sections)} className="md:sticky md:top-40 md:self-start">
          <h2 className="label mb-3 text-slate">{t(a.sections)}</h2>
          <ol className="grid grid-cols-1 gap-1.5">
            {page.sections.map((s, i) => {
              const active = pane.kind === 'section' && pane.index === i;
              const n = sectionErrors(i);
              return (
                <li key={s.id} className={cn('flex items-center gap-1 rounded-[var(--radius-control)] border bg-white pl-2', active ? 'border-ink' : 'border-line')}>
                  <input
                    type="checkbox"
                    checked={s.enabled}
                    onChange={(e) => setSections(page.sections.map((x, k) => (k === i ? ({ ...x, enabled: e.target.checked } as Section) : x)))}
                    aria-label={`${t(a.enabled)}: ${t(a.sectionTypes[s.type] ?? { en: s.type })}`}
                    className="size-5 shrink-0 accent-[var(--color-red)]"
                  />
                  <button type="button" onClick={() => setPane({ kind: 'section', index: i })} aria-current={active ? 'true' : undefined} className="flex min-h-11 min-w-0 flex-1 items-center gap-2 px-1 text-left text-sm font-bold">
                    <span className={cn('truncate', !s.enabled && 'text-slate line-through')}>{t(a.sectionTypes[s.type] ?? { en: s.type })}</span>
                    {!s.enabled ? <span className="text-xs font-normal text-slate">{t(a.sectionHidden)}</span> : null}
                    {n ? <span className="ml-auto inline-flex size-5 items-center justify-center rounded-full bg-red text-[0.6875rem] text-white">{n}</span> : null}
                  </button>
                  <IconButton id={`sec-${i}-up`} label={t(a.moveUp)} icon="arrow-up" disabled={i === 0} onClick={() => moveSection(i, -1)} />
                  <IconButton id={`sec-${i}-down`} label={t(a.moveDown)} icon="arrow-down" disabled={i === page.sections.length - 1} onClick={() => moveSection(i, 1)} />
                </li>
              );
            })}
          </ol>
          <div className="mt-4 grid gap-1.5 border-t border-line pt-4">
            {(
              [
                { kind: 'seo', label: t(a.seo), n: seoErrors },
                { kind: 'settings', label: t(a.pageSettings), n: 0 },
              ] as const
            ).map((p) => (
              <button
                key={p.kind}
                type="button"
                onClick={() => setPane({ kind: p.kind })}
                aria-current={pane.kind === p.kind ? 'true' : undefined}
                className={cn('flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border bg-white px-3 text-left text-sm font-bold', pane.kind === p.kind ? 'border-ink' : 'border-line')}
              >
                <Icon name={p.kind === 'seo' ? 'search' : 'edit'} size={16} />
                {p.label}
                {p.n ? <span className="ml-auto inline-flex size-5 items-center justify-center rounded-full bg-red text-[0.6875rem] text-white">{p.n}</span> : null}
              </button>
            ))}
          </div>
        </nav>
        <section aria-label={t(a.fields)} className="min-w-0 rounded-[var(--radius-card)] bg-white p-4 md:p-6">
          {pane.kind === 'section' && selected ? (
            <>
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold">
                {t(a.sectionTypes[selected.type] ?? { en: selected.type })}
                <span className="text-xs font-normal text-slate">#{selected.id}</span>
              </h2>
              <ObjectEditor
                key={`${pageKey}-${selected.id}`}
                value={selected as unknown as Record<string, unknown>}
                onChange={(v) => setSections(page.sections.map((x, k) => (k === (pane as { index: number }).index ? (v as unknown as Section) : x)))}
                path={[...base, 'sections', pane.index]}
                skip={['id', 'type', 'enabled']}
              />
            </>
          ) : null}
          {pane.kind === 'section' && !selected ? <p className="text-slate">{t(a.selectSection)}</p> : null}
          {pane.kind === 'seo' ? (
            <>
              <h2 className="mb-5 text-lg font-bold">{t(a.seo)}</h2>
              <SeoPanel page={page} onChange={setPage} base={base} defaults={store.draft.seo} />
            </>
          ) : null}
          {pane.kind === 'settings' ? (
            <>
              <h2 className="mb-5 text-lg font-bold">{t(a.pageSettings)}</h2>
              <ObjectEditor value={page as unknown as Record<string, unknown>} onChange={(v) => setPage(v as unknown as Page)} path={base} skip={['sections', 'seo']} />
            </>
          ) : null}
        </section>
      </div>
    </EditorProvider>
  );
}

/* ---------- Global editor ---------- */

export function GlobalEditor({ globalKey }: { globalKey: GlobalKey }) {
  const d: DocKey = useMemo(() => ({ kind: 'global', key: globalKey }), [globalKey]);
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  const title = t(a.globalNames[globalKey]);
  const { store, actions, message, setMessage, errors, summaryRef, base, doc } = useEditorActions(d, title);
  const [focusId, setFocusId] = useState<string | null>(null);
  const errMap = useMemo(() => Object.fromEntries(errors.map((e) => [pathId(e.path), e])), [errors]);
  return (
    <EditorProvider value={{ errors: errMap, focusId, setFocusId, announce: setMessage }}>
      <EditorHeader d={d} title={title} actions={actions} message={message} previewHref="/admin/preview/home" />
      <ErrorSummary errors={errors} base={base} refEl={summaryRef} />
      <p className="mb-5 max-w-3xl text-slate">{t(a.globalDescriptions[globalKey])}</p>
      <section aria-label={t(a.fields)} className="rounded-[var(--radius-card)] bg-white p-4 md:p-6">
        <ObjectEditor value={doc as Record<string, unknown>} onChange={(v) => store.update(d, v)} path={base} />
      </section>
    </EditorProvider>
  );
}

/* ---------- Preview bar ---------- */

export function PreviewBar({ editHref, docName }: { editHref: string; docName: string }) {
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  const router = useRouter();
  return (
    <div data-theme="dark" className="sticky top-0 z-[60] h-[var(--sticky-offset)] bg-red text-white">
      <div className="mx-auto flex h-full max-w-[90rem] items-center justify-between gap-2 px-4 md:px-6">
        <p className="flex min-w-0 items-center gap-2 truncate text-sm font-bold">
          <Icon name="eye" size={16} />
          <span className="truncate">{t(a.previewOf, { doc: docName })}</span>
        </p>
        <button type="button" onClick={() => router.push(editHref)} className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-[var(--radius-control)] border-2 border-white px-3 text-sm font-bold hover:bg-white hover:text-ink">
          <Icon name="chevron-left" size={14} />
          {t(a.exitPreview)}
        </button>
      </div>
    </div>
  );
}
