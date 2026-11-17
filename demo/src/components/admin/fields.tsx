'use client';

import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import type { LocalizedString, RichTextBlock } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { Icon } from '../ui/icon';
import { cn } from '../ui/cn';
import { isLocalized, isRequired, limitFor, pathId, type FieldError, type Path } from './validate';

/* ------------------------------------------------------------------ */
/* Editor context: errors by field id, and pending focus after add.    */
/* ------------------------------------------------------------------ */

type EditorCtx = { errors: Record<string, FieldError>; focusId: string | null; setFocusId: (id: string | null) => void; announce: (msg: string) => void };
const EditorContext = createContext<EditorCtx>({ errors: {}, focusId: null, setFocusId: () => {}, announce: () => {} });
export const EditorProvider = EditorContext.Provider;

/* ------------------------------------------------------------------ */
/* Labels and enums                                                    */
/* ------------------------------------------------------------------ */

/** System fields managed by the editor itself (ids, order) are not shown. */
const HIDDEN = new Set(['meta', 'id', 'order']);
const READONLY = new Set(['id', 'type', 'key', 'day', 'slug', 'theme:brandV1']);

const ENUMS: Record<string, string[][]> = {
  kind: [
    ['internal', 'external', 'tel', 'sms', 'mailto', 'map', 'whatsapp'],
    ['image', 'video'],
    ['gradient', 'solid'],
    ['lawyer', 'owner'],
  ],
  variant: [['primary', 'secondary', 'text']],
  icon: [['', 'phone', 'message', 'map-pin', 'clock', 'search', 'check', 'shield', 'car', 'key', 'handshake', 'file', 'star', 'arrow-right', 'mail', 'whatsapp']],
  theme: [['light', 'dark'], ['ink', 'accent']],
  align: [['left', 'centre']],
  direction: [['left', 'bottom', 'centre']],
  source: [['google', 'facebook', 'other']],
  platform: [['facebook', 'instagram', 'google', 'youtube', 'tiktok', 'x']],
  twitterCard: [['summary_large_image', 'summary']],
  level: [['2', '3', '4']],
};
const FORM_FIELD_TYPES = ['text', 'email', 'tel', 'textarea', 'select', 'checkbox'];

const LONG_KEYS = new Set(['body', 'intro', 'subhead', 'consentText', 'marketingConsentText', 'disclaimer', 'quote', 'bio', 'successBody', 'disabledNotice', 'description', 'defaultDescription', 'mapConsentNotice', 'ogDescription', 'nothingSaved']);
const DATE_KEYS = new Set(['effectiveDate', 'lastReviewed', 'startAt', 'endAt', 'date']);
const TIME_KEYS = new Set(['open', 'close']);

/** Max/min list sizes from the content model. */
const MAX: Record<string, number> = { slides: 5, steps: 4, areas: 12, ctas: 3, members: 8, phones: 5, links: 8, columns: 4, groups: 10, socialLinks: 6, sameAs: 6, options: 8, blocks: 80 };
const MIN: Record<string, number> = { slides: 1, steps: 3, phones: 1 };
const FIXED = new Set(['slots', 'days', 'categories', 'enabledLocales']);

function maxFor(key: string, parentType?: unknown): number {
  if (key === 'items') return parentType === 'proofBar' ? 5 : parentType === 'reviews' ? 6 : parentType === 'standards' ? 6 : 12;
  return MAX[key] ?? 20;
}

function humanize(key: string) {
  return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase());
}

export function useAdminLabels() {
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  const label = (key: string | number) => (typeof key === 'number' ? t(a.item, { n: key + 1 }) : a.fieldLabels[key] ? t(a.fieldLabels[key]) : humanize(key));
  return { a, t, label };
}

/* ------------------------------------------------------------------ */
/* Primitive inputs                                                    */
/* ------------------------------------------------------------------ */

const inputCls = (err?: boolean) =>
  cn(
    'mt-1 block w-full rounded-[var(--radius-control)] border-2 bg-white px-3 text-sm text-ink transition-colors focus:border-ink focus:outline-none',
    err ? 'border-red' : 'border-grey hover:border-slate',
  );

function FieldShell({ id, label, error, counter, help, required, children }: { id: string; label: string; error?: string; counter?: React.ReactNode; help?: React.ReactNode; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.8125rem] font-bold">
          {label}
          {required ? <span aria-hidden="true" className="text-red"> *</span> : null}
        </label>
        {counter}
      </div>
      {children}
      {help ? <p className="mt-1 text-xs text-slate">{help}</p> : null}
      {error ? (
        <p id={`${id}-err`} className="mt-1 flex items-center gap-1 text-xs font-bold text-red">
          <Icon name="alert" size={12} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function LocalizedInput({ value, onChange, path, parent }: { value: LocalizedString; onChange: (v: LocalizedString) => void; path: Path; parent?: Record<string, unknown> }) {
  const { a, t, label } = useAdminLabels();
  const { errors } = useContext(EditorContext);
  const id = pathId(path);
  const key = String(path[path.length - 1]);
  const limit = limitFor(path, parent);
  const required = isRequired(path, parent);
  const err = errors[id];
  const text = value.en ?? '';
  const over = limit ? text.length > limit : false;
  const long = LONG_KEYS.has(key) || (limit ?? 0) > 140 || text.length > 90 || (parent && (parent.type === 'paragraph' || parent.type === 'marker'));
  const errMsg = err ? (err.kind === 'required' ? t(a.requiredField) : `${t(a.tooLongField)} (${err.limit})`) : undefined;
  const counter = limit ? (
    <span id={`${id}-count`} className={cn('text-xs tabular-nums', over ? 'font-bold text-red' : 'text-slate')}>
      {t(a.characters, { count: text.length, max: limit })}
    </span>
  ) : null;
  const describedBy = [limit ? `${id}-count` : '', errMsg ? `${id}-err` : ''].filter(Boolean).join(' ') || undefined;
  const common = {
    id,
    value: text,
    'aria-invalid': !!errMsg || over || undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...value, en: e.target.value }),
  };
  return (
    <FieldShell id={id} label={label(typeof path[path.length - 1] === 'number' ? (path[path.length - 1] as number) : key)} error={errMsg} counter={counter} required={required}>
      {long ? <textarea {...common} rows={Math.min(8, Math.max(3, Math.ceil(text.length / 70)))} className={cn(inputCls(!!errMsg || over), 'py-2 leading-relaxed')} /> : <input {...common} type="text" className={cn(inputCls(!!errMsg || over), 'h-10')} />}
    </FieldShell>
  );
}

function StringInput({ value, onChange, path, readOnly }: { value: string | null; onChange: (v: string | null) => void; path: Path; readOnly?: boolean }) {
  const { label } = useAdminLabels();
  const id = pathId(path);
  const key = String(path[path.length - 1]);
  const type = DATE_KEYS.has(key) ? 'date' : TIME_KEYS.has(key) ? 'time' : 'text';
  const v = value ?? '';
  return (
    <FieldShell id={id} label={label(key)}>
      <input
        id={id}
        type={type}
        value={type === 'date' ? v.slice(0, 10) : v}
        readOnly={readOnly}
        onChange={(e) => onChange(TIME_KEYS.has(key) && !e.target.value ? null : e.target.value)}
        className={cn(inputCls(), 'h-10', readOnly && 'bg-surface text-slate')}
      />
    </FieldShell>
  );
}

function SelectInput({ value, options, onChange, path, labelFor }: { value: string; options: string[]; onChange: (v: string) => void; path: Path; labelFor?: (o: string) => string }) {
  const { label, a, t } = useAdminLabels();
  const field = String(path[path.length - 1]);
  const optionLabel = (o: string) => {
    const hit = a.optionLabels[`${field}.${o}`] ?? a.optionLabels[o];
    return hit ? t(hit) : o;
  };
  const id = pathId(path);
  return (
    <FieldShell id={id} label={label(String(path[path.length - 1]))}>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={cn(inputCls(), 'h-10')}>
        {options.map((o) => (
          <option key={o} value={o}>
            {labelFor ? labelFor(o) : optionLabel(o)}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function BoolInput({ value, onChange, path, labelText }: { value: boolean; onChange: (v: boolean) => void; path: Path; labelText?: string }) {
  const { label } = useAdminLabels();
  const id = pathId(path);
  return (
    <label htmlFor={id} className="flex min-h-10 cursor-pointer items-center gap-3 text-sm font-bold">
      <input id={id} type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="size-5 shrink-0 accent-[var(--color-red)]" />
      {labelText ?? label(String(path[path.length - 1]))}
    </label>
  );
}

function NumberInput({ value, onChange, path }: { value: number; onChange: (v: number) => void; path: Path }) {
  const { label } = useAdminLabels();
  const id = pathId(path);
  const key = String(path[path.length - 1]);
  if (key === 'opacity') {
    return (
      <FieldShell id={id} label={label(key)} counter={<span className="text-xs tabular-nums text-slate">{Math.round(value * 100)}%</span>}>
        <input id={id} type="range" min={0} max={0.9} step={0.05} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full accent-[var(--color-red)]" />
      </FieldShell>
    );
  }
  return (
    <FieldShell id={id} label={label(key)}>
      <input id={id} type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className={cn(inputCls(), 'h-10')} />
    </FieldShell>
  );
}

/* ------------------------------------------------------------------ */
/* Composite editors                                                   */
/* ------------------------------------------------------------------ */

type Placeholder = { value: string; isPlaceholder: boolean; note?: string };
const isPlaceholder = (v: unknown): v is Placeholder => !!v && typeof v === 'object' && 'isPlaceholder' in (v as object) && 'value' in (v as object);
const isImage = (v: unknown): v is { src: string; alt: LocalizedString; decorative?: boolean } => !!v && typeof v === 'object' && 'src' in (v as object) && 'alt' in (v as object);
const isRichText = (v: unknown): v is RichTextBlock[] =>
  Array.isArray(v) && v.length > 0 && v.every((b) => b && typeof b === 'object' && ['paragraph', 'heading', 'list', 'link', 'marker'].includes((b as { type?: string }).type ?? ''));

function PlaceholderEditor({ value, onChange, path }: { value: Placeholder; onChange: (v: Placeholder) => void; path: Path }) {
  const { a, t, label } = useAdminLabels();
  const id = pathId(path);
  return (
    <fieldset className="rounded-[var(--radius-control)] border border-dashed border-slate/50 p-3">
      <legend className="px-1 text-[0.8125rem] font-bold">{label(String(path[path.length - 1]))}</legend>
      <div className="grid grid-cols-1 gap-3">
        <FieldShell id={`${id}-v`} label={t(a.placeholderValue)}>
          <input id={`${id}-v`} type="text" value={value.value} onChange={(e) => onChange({ ...value, value: e.target.value })} className={cn(inputCls(), 'h-10')} />
        </FieldShell>
        <BoolInput value={value.isPlaceholder} onChange={(b) => onChange({ ...value, isPlaceholder: b })} path={[...path, 'isPlaceholder']} labelText={t(a.placeholderToggle)} />
        <FieldShell id={`${id}-n`} label={t(a.placeholderNote)}>
          <input id={`${id}-n`} type="text" value={value.note ?? ''} onChange={(e) => onChange({ ...value, note: e.target.value })} className={cn(inputCls(), 'h-10')} />
        </FieldShell>
      </div>
    </fieldset>
  );
}

function ImageEditor({ value, onChange, path }: { value: { src: string; alt: LocalizedString; decorative?: boolean } & Record<string, unknown>; onChange: (v: unknown) => void; path: Path }) {
  const { a, t, label } = useAdminLabels();
  const id = pathId(path);
  const missing = !value.src || value.src.includes('placeholder');
  return (
    <fieldset className="rounded-[var(--radius-control)] border border-line p-3">
      <legend className="px-1 text-[0.8125rem] font-bold">{label(String(path[path.length - 1]))}</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_8rem]">
        <div className="grid grid-cols-1 gap-3">
          <FieldShell id={`${id}-src`} label={t(a.imageUrl)} help={t(a.uploadDisabled)}>
            <input id={`${id}-src`} type="url" inputMode="url" value={value.src} onChange={(e) => onChange({ ...value, src: e.target.value })} className={cn(inputCls(), 'h-10')} />
          </FieldShell>
          {!value.decorative ? <LocalizedInput value={value.alt} onChange={(alt) => onChange({ ...value, alt })} path={[...path, 'alt']} parent={value} /> : null}
          {'decorative' in value ? <BoolInput value={!!value.decorative} onChange={(b) => onChange({ ...value, decorative: b })} path={[...path, 'decorative']} /> : null}
        </div>
        <figure className="self-start">
          <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-control)] bg-surface">
            {missing ? (
              <span className="p-2 text-center text-[0.6875rem] text-slate">{t(a.noImage)}</span>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value.src} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <figcaption className="mt-1 text-[0.6875rem] text-slate">{t(a.imagePreview)}</figcaption>
        </figure>
      </div>
    </fieldset>
  );
}

function newId(prefix = 'item') {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Copy an item for "Add": new ids, empty text, so required checks prompt the editor to fill it in. */
function blankFrom<T>(item: T): T {
  const walk = (v: unknown, key?: string): unknown => {
    if (isLocalized(v)) return { en: '' };
    if (Array.isArray(v)) return isRichText(v) ? [{ type: 'paragraph', text: { en: '' } }] : v.map((x) => walk(x));
    if (v && typeof v === 'object') {
      const o: Record<string, unknown> = {};
      for (const [k, x] of Object.entries(v)) {
        if (k === 'id') o[k] = newId(String(x).split('-')[0] || 'item');
        else if (k === 'isPlaceholder' || k === 'needsOwnerInput') o[k] = k === 'isPlaceholder' ? true : false;
        else if (k === 'showOnHome' || k === 'primary') o[k] = false;
        else o[k] = walk(x, k);
      }
      return o;
    }
    if (key === 'value') return '';
    return v;
  };
  return walk(item) as T;
}

/** Templates for lists that may start empty. */
const TEMPLATES: Record<string, unknown> = {
  members: { name: { en: '' }, role: { en: '' } },
  socialLinks: { platform: 'facebook', url: '', label: { en: '' } },
  sameAs: '',
  groups: { id: 'group', title: { en: '' }, items: [] },
  items: { id: 'faq', question: { en: '' }, answer: [{ type: 'paragraph', text: { en: '' } }], order: 1, needsOwnerInput: false, showOnHome: false },
};

function itemSummary(v: unknown, t: (s: LocalizedString) => string): string {
  if (typeof v === 'string') return v;
  if (!v || typeof v !== 'object') return '';
  const o = v as Record<string, unknown>;
  for (const k of ['headline', 'question', 'title', 'label', 'name', 'heading', 'quote', 'text']) {
    if (isLocalized(o[k])) return t(o[k] as LocalizedString);
  }
  if (typeof o.display === 'string') return o.display;
  if (typeof o.day === 'string') return o.day;
  if (typeof o.platform === 'string') return o.platform;
  return '';
}

function ArrayEditor({ value, onChange, path, parent }: { value: unknown[]; onChange: (v: unknown[]) => void; path: Path; parent?: Record<string, unknown> }) {
  const { a, t, label } = useAdminLabels();
  const { focusId, setFocusId, announce } = useContext(EditorContext);
  const key = String(path[path.length - 1]);
  const fixed = FIXED.has(key);
  const max = maxFor(key, parent?.type);
  const min = MIN[key] ?? 0;
  const addRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const listId = pathId(path);

  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    if (key === 'items' && next.every((x) => x && typeof x === 'object' && 'order' in (x as object))) next.forEach((x, k) => ((x as { order: number }).order = k + 1));
    onChange(next);
    setFocusId(`${listId}-${j}-${d < 0 ? 'up' : 'down'}`);
  };
  const add = () => {
    if (value.length >= max) return;
    const base = value.length ? blankFrom(value[value.length - 1]) : structuredClone(TEMPLATES[key] ?? { en: '' });
    if (base && typeof base === 'object' && 'order' in (base as object)) (base as { order: number }).order = value.length + 1;
    if (base && typeof base === 'object' && 'id' in (base as object)) (base as { id: string }).id = newId(key === 'groups' ? 'group' : key === 'slides' ? 'slide' : 'item');
    onChange([...value, base]);
    setOpen((o) => ({ ...o, [value.length]: true }));
    setFocusId(`${listId}-${value.length}-body`);
  };
  const remove = (i: number) => {
    onChange(value.filter((_, k) => k !== i));
    announce(t(a.removeConfirmNote));
    requestAnimationFrame(() => addRef.current?.focus());
  };

  return (
    <fieldset className="min-w-0 rounded-[var(--radius-control)] border border-line p-3">
      <legend className="px-1 text-[0.8125rem] font-bold">
        {label(key)} <span className="font-normal text-slate">({value.length})</span>
      </legend>
      {fixed ? <p className="mb-2 text-xs text-slate">{t(a.fixedList)}</p> : <p className="mb-2 text-xs text-slate">{t(a.reorderHint)}</p>}
      {value.length === 0 ? <p className="text-sm text-slate">{t(a.emptyList)}</p> : null}
      <ol className="grid grid-cols-1 gap-2">
        {value.map((item, i) => {
          const itemPath = [...path, i];
          const isPrimitive = typeof item === 'string';
          const expanded = open[i] ?? (value.length <= 3 || fixed);
          const summary = itemSummary(item, t);
          return (
            <li key={i} className="rounded-[var(--radius-control)] border border-line bg-white">
              <div className="flex items-center gap-1 px-2 py-1">
                {isPrimitive ? null : (
                  <button type="button" onClick={() => setOpen((o) => ({ ...o, [i]: !expanded }))} aria-expanded={expanded} aria-controls={`${listId}-${i}-body`} className="inline-flex min-h-10 min-w-0 flex-1 items-center gap-2 text-left text-sm font-bold">
                    <Icon name="chevron-down" size={14} className={cn('shrink-0 transition-transform', !expanded && '-rotate-90')} />
                    <span className="shrink-0 text-slate">{label(i)}</span>
                    <span className="truncate">{summary}</span>
                  </button>
                )}
                {isPrimitive ? (
                  <input aria-label={label(i)} type="text" value={item as string} onChange={(e) => onChange(value.map((x, k) => (k === i ? e.target.value : x)))} className={cn(inputCls(), 'mt-0 h-10 flex-1')} />
                ) : null}
                {!fixed ? (
                  <span className="flex shrink-0 items-center">
                    <IconButton id={`${listId}-${i}-up`} label={t(a.moveUp)} icon="arrow-up" disabled={i === 0} onClick={() => move(i, -1)} />
                    <IconButton id={`${listId}-${i}-down`} label={t(a.moveDown)} icon="arrow-down" disabled={i === value.length - 1} onClick={() => move(i, 1)} />
                    <IconButton label={t(a.remove)} icon="trash" disabled={value.length <= min} onClick={() => remove(i)} danger />
                  </span>
                ) : null}
              </div>
              {!isPrimitive && expanded ? (
                <FocusOnMount id={`${listId}-${i}-body`} active={focusId === `${listId}-${i}-body`} onDone={() => setFocusId(null)}>
                  <div className="border-t border-line p-3">
                    <ValueEditor value={item} onChange={(v) => onChange(value.map((x, k) => (k === i ? v : x)))} path={itemPath} parent={parent} />
                  </div>
                </FocusOnMount>
              ) : null}
            </li>
          );
        })}
      </ol>
      {!fixed ? (
        <div className="mt-3 flex items-center gap-3">
          <button ref={addRef} type="button" onClick={add} disabled={value.length >= max} className="inline-flex min-h-10 items-center gap-1.5 rounded-[var(--radius-control)] border-2 border-ink px-3 text-sm font-bold hover:bg-ink hover:text-white disabled:opacity-40">
            <Icon name="plus" size={14} />
            {t(a.addItem)}
          </button>
          {value.length >= max ? <span className="text-xs text-slate">{t(a.maxItems, { max })}</span> : null}
        </div>
      ) : null}
    </fieldset>
  );
}

function FocusOnMount({ id, active, onDone, children }: { id: string; active: boolean; onDone: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active) return;
    ref.current?.querySelector<HTMLElement>('input:not([readonly]):not([type=checkbox]),textarea,select')?.focus();
    onDone();
  }, [active, onDone]);
  return (
    <div id={id} ref={ref}>
      {children}
    </div>
  );
}

export function IconButton({ id, label, icon, onClick, disabled, danger }: { id?: string; label: string; icon: Parameters<typeof Icon>[0]['name']; onClick: () => void; disabled?: boolean; danger?: boolean }) {
  const { focusId, setFocusId } = useContext(EditorContext);
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (id && focusId === id) {
      ref.current?.focus();
      setFocusId(null);
    }
  }, [focusId, id, setFocusId]);
  return (
    <button ref={ref} id={id} type="button" onClick={onClick} disabled={disabled} aria-label={label} title={label} className={cn('inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] disabled:opacity-30', danger ? 'hover:bg-[#fdecec] hover:text-red' : 'hover:bg-surface')}>
      <Icon name={icon} size={16} />
    </button>
  );
}

function RichTextEditor({ value, onChange, path }: { value: RichTextBlock[]; onChange: (v: RichTextBlock[]) => void; path: Path }) {
  const { a, t, label } = useAdminLabels();
  const { setFocusId } = useContext(EditorContext);
  const [newType, setNewType] = useState<RichTextBlock['type']>('paragraph');
  const listId = pathId(path);
  const setAt = (i: number, b: RichTextBlock) => onChange(value.map((x, k) => (k === i ? b : x)));
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setFocusId(`${listId}-${j}-${d < 0 ? 'up' : 'down'}`);
  };
  const add = () => {
    const blank: Record<RichTextBlock['type'], RichTextBlock> = {
      paragraph: { type: 'paragraph', text: { en: '' } },
      heading: { type: 'heading', level: 2, text: { en: '' } },
      list: { type: 'list', items: [{ en: '' }] },
      link: { type: 'link', link: { label: { en: '' }, href: '', kind: 'internal' } },
      marker: { type: 'marker', kind: 'lawyer', text: { en: '' } },
    };
    onChange([...value, blank[newType]]);
    setFocusId(`${listId}-${value.length}-body`);
  };
  const { focusId } = useContext(EditorContext);
  return (
    <fieldset className="min-w-0 rounded-[var(--radius-control)] border border-line p-3">
      <legend className="px-1 text-[0.8125rem] font-bold">{label(String(path[path.length - 1]))}</legend>
      <ol className="grid grid-cols-1 gap-2">
        {value.map((b, i) => (
          <li key={i} className={cn('rounded-[var(--radius-control)] border bg-white', b.type === 'marker' ? 'border-red/50' : 'border-line')}>
            <div className="flex items-center justify-between gap-2 border-b border-line px-2 py-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate">{t(a.blockTypes[b.type])}</span>
              <span className="flex items-center">
                <IconButton id={`${listId}-${i}-up`} label={t(a.moveUp)} icon="arrow-up" disabled={i === 0} onClick={() => move(i, -1)} />
                <IconButton id={`${listId}-${i}-down`} label={t(a.moveDown)} icon="arrow-down" disabled={i === value.length - 1} onClick={() => move(i, 1)} />
                <IconButton label={t(a.remove)} icon="trash" onClick={() => onChange(value.filter((_, k) => k !== i))} danger />
              </span>
            </div>
            <FocusOnMount id={`${listId}-${i}-body`} active={focusId === `${listId}-${i}-body`} onDone={() => setFocusId(null)}>
              <div className="grid grid-cols-1 gap-3 p-3">
                {b.type === 'paragraph' ? <LocalizedInput value={b.text} onChange={(text) => setAt(i, { ...b, text })} path={[...path, i, 'text']} parent={b} /> : null}
                {b.type === 'heading' ? (
                  <>
                    <SelectInput value={String(b.level)} options={['2', '3', '4']} onChange={(l) => setAt(i, { ...b, level: Number(l) as 2 | 3 | 4 })} path={[...path, i, 'level']} />
                    <LocalizedInput value={b.text} onChange={(text) => setAt(i, { ...b, text })} path={[...path, i, 'text']} parent={b} />
                  </>
                ) : null}
                {b.type === 'marker' ? (
                  <>
                    <SelectInput value={b.kind} options={['lawyer', 'owner']} onChange={(k) => setAt(i, { ...b, kind: k as 'lawyer' | 'owner' })} path={[...path, i, 'kind']} labelFor={(o) => t(a.markerKinds[o as 'lawyer' | 'owner'])} />
                    <LocalizedInput value={b.text} onChange={(text) => setAt(i, { ...b, text })} path={[...path, i, 'text']} parent={b} />
                  </>
                ) : null}
                {b.type === 'list' ? (
                  <>
                    <BoolInput value={!!b.ordered} onChange={(o) => setAt(i, { ...b, ordered: o })} path={[...path, i, 'ordered']} />
                    {b.items.map((it, j) => (
                      <div key={j} className="flex items-end gap-1">
                        <div className="min-w-0 flex-1">
                          <LocalizedInput value={it} onChange={(nv) => setAt(i, { ...b, items: b.items.map((x, k) => (k === j ? nv : x)) })} path={[...path, i, 'items', j]} parent={b} />
                        </div>
                        <IconButton label={t(a.remove)} icon="trash" onClick={() => setAt(i, { ...b, items: b.items.filter((_, k) => k !== j) })} danger />
                      </div>
                    ))}
                    <button type="button" onClick={() => setAt(i, { ...b, items: [...b.items, { en: '' }] })} className="inline-flex min-h-10 items-center gap-1.5 self-start text-sm font-bold underline decoration-red decoration-2 underline-offset-4">
                      <Icon name="plus" size={14} />
                      {t(a.addListItem)}
                    </button>
                  </>
                ) : null}
                {b.type === 'link' ? <ObjectEditor value={b.link as unknown as Record<string, unknown>} onChange={(link) => setAt(i, { ...b, link: link as unknown as typeof b.link })} path={[...path, i, 'link']} /> : null}
              </div>
            </FocusOnMount>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap items-end gap-2">
        <div className="w-48">
          <SelectInput value={newType} options={['paragraph', 'heading', 'list', 'link', 'marker']} onChange={(v) => setNewType(v as RichTextBlock['type'])} path={[...path, 'newBlockType']} labelFor={(o) => t(a.blockTypes[o as RichTextBlock['type']])} />
        </div>
        <button type="button" onClick={add} className="inline-flex min-h-10 items-center gap-1.5 rounded-[var(--radius-control)] border-2 border-ink px-3 text-sm font-bold hover:bg-ink hover:text-white">
          <Icon name="plus" size={14} />
          {t(a.addBlock)}
        </button>
      </div>
    </fieldset>
  );
}

/** Object fields in a responsive grid; booleans and short inputs side by side, long and nested items full width. */
export function ObjectEditor({ value, onChange, path, skip = [] }: { value: Record<string, unknown>; onChange: (v: Record<string, unknown>) => void; path: Path; skip?: string[] }) {
  const entries = Object.entries(value).filter(([k]) => !HIDDEN.has(k) && !skip.includes(k));
  const isWide = (v: unknown, k: string) => typeof v === 'object' && v !== null && !isLocalized(v) ? true : isLocalized(v) && (LONG_KEYS.has(k) || (v.en?.length ?? 0) > 60);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {entries.map(([k, v]) => (
        <div key={k} className={cn('min-w-0', isWide(v, k) && 'sm:col-span-2')}>
          <ValueEditor value={v} onChange={(nv) => onChange({ ...value, [k]: nv })} path={[...path, k]} parent={value} />
        </div>
      ))}
    </div>
  );
}

/** Chooses an input by the value's shape and key (schema-driven, no per-page code). */
export function ValueEditor({ value, onChange, path, parent }: { value: unknown; onChange: (v: unknown) => void; path: Path; parent?: Record<string, unknown> }) {
  const { label } = useAdminLabels();
  const key = String(path[path.length - 1]);
  if (value === undefined) return null;
  if (isLocalized(value)) return <LocalizedInput value={value} onChange={onChange} path={path} parent={parent} />;
  if (isPlaceholder(value)) return <PlaceholderEditor value={value} onChange={onChange} path={path} />;
  if (isImage(value)) return <ImageEditor value={value as never} onChange={onChange} path={path} />;
  if (isRichText(value) || (Array.isArray(value) && (key === 'body' || key === 'answer'))) return <RichTextEditor value={value as RichTextBlock[]} onChange={onChange as (v: RichTextBlock[]) => void} path={path} />;
  if (Array.isArray(value)) return <ArrayEditor value={value} onChange={onChange as (v: unknown[]) => void} path={path} parent={parent} />;
  if (typeof value === 'boolean') return <BoolInput value={value} onChange={onChange} path={path} />;
  if (typeof value === 'number') {
    if (key === 'level') return <SelectInput value={String(value)} options={['2', '3', '4']} onChange={(v) => onChange(Number(v))} path={path} />;
    return <NumberInput value={value} onChange={onChange} path={path} />;
  }
  if (typeof value === 'string' || value === null) {
    const readonly = READONLY.has(key) || READONLY.has(`${key}:${value}`) || (key === 'type' && parent && !('validation' in parent));
    if (key === 'type' && parent && 'validation' in parent) return <SelectInput value={value as string} options={FORM_FIELD_TYPES} onChange={onChange} path={path} />;
    const lists = ENUMS[key];
    const options = lists?.find((l) => l.includes((value as string) ?? ''));
    if (options && !readonly) return <SelectInput value={(value as string) ?? ''} options={options} onChange={onChange} path={path} />;
    return <StringInput value={value as string | null} onChange={onChange} path={path} readOnly={!!readonly} />;
  }
  if (value && typeof value === 'object') {
    // List items already have a header row, so they render their fields without another frame.
    if (typeof path[path.length - 1] === 'number') return <ObjectEditor value={value as Record<string, unknown>} onChange={onChange} path={path} />;
    return (
      <fieldset className="min-w-0 rounded-[var(--radius-control)] border border-line p-3">
        <legend className="px-1 text-[0.8125rem] font-bold">{label(key)}</legend>
        <ObjectEditor value={value as Record<string, unknown>} onChange={onChange} path={path} />
      </fieldset>
    );
  }
  return null;
}

export function useStatusAnnouncer() {
  const [msg, setMsg] = useState('');
  const id = useId();
  const region = (
    <p id={id} role="status" aria-live="polite" className="sr-only">
      {msg}
    </p>
  );
  return { msg, setMsg, region };
}
