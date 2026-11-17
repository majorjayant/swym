'use client';

import { useId, useRef, useState } from 'react';
import type { ContactCardsSection, ContactFormSection, FormField } from '@/content/schema';
import { useContent, useT } from '@/lib/content-context';
import { Button } from '../ui/button';
import { Container, Heading, SectionShell } from '../ui/layout';
import { Icon, type UiIcon } from '../ui/icon';
import { RichInline } from '../ui/placeholder';
import { cn } from '../ui/cn';

export function ContactCards({ section }: { section: ContactCardsSection }) {
  const { content } = useContent();
  const t = useT();
  const { site } = content;
  const sms = site.phones.find((p) => p.sms);
  type Card = { icon: UiIcon; label: string; value: string; href: string; sub?: string; ext?: boolean };
  const cards: Card[] = [
    ...site.phones.map((p) => ({ icon: 'phone' as const, label: t(section.callLabel), value: p.display, sub: t(p.label), href: `tel:${p.number}` })),
    ...(sms ? [{ icon: 'message' as const, label: t(section.textLabel), value: sms.display, href: `sms:${sms.number}` }] : []),
    ...(!site.email.isPlaceholder && site.email.value ? [{ icon: 'mail' as const, label: t(section.emailLabel), value: site.email.value, href: `mailto:${site.email.value}` }] : []),
    ...(!site.whatsapp.isPlaceholder && site.whatsapp.value
      ? [{ icon: 'whatsapp' as const, label: t(section.whatsappLabel), value: site.whatsapp.value, href: `https://wa.me/${site.whatsapp.value.replace(/\D/g, '')}`, ext: true }]
      : []),
    { icon: 'map-pin', label: t(section.directionsLabel), value: t(site.address.display), href: site.address.mapUrl, ext: true },
  ];
  const id = `${section.id}-title`;
  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={section.heading ? id : undefined}>
      <Container>
        {section.heading ? <Heading id={id} className="mb-8">{t(section.heading)}</Heading> : null}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <li key={i}>
              <a
                href={c.href}
                {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full items-start gap-4 rounded-[var(--radius-card)] border border-line bg-white p-5 transition-[border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:border-ink"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-red">
                  <Icon name={c.icon} size={20} />
                </span>
                <span className="min-w-0">
                  <span className="label block text-slate">
                    {c.label}
                    {c.sub ? ` · ${c.sub}` : ''}
                  </span>
                  <span className="link-underline mt-1 block break-words text-lg font-bold">{c.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </SectionShell>
  );
}

type Values = Record<string, string | boolean>;

function validate(f: FormField, v: string | boolean | undefined, msg: { required: string; tooLong: string }): string | null {
  // '' means: use the field's own errorMessage
  if (f.type === 'checkbox') return f.required && !v ? '' : null;
  const s = typeof v === 'string' ? v.trim() : '';
  if (!s) return f.required ? '' : null;
  if (f.validation.maxLength && s.length > f.validation.maxLength) return msg.tooLong;
  if (f.validation.minLength && s.length < f.validation.minLength) return '';
  if (f.validation.pattern && !new RegExp(f.validation.pattern).test(s)) return '';
  return null;
}

/** Client-side validated contact form. Demo: submit is mocked; nothing is sent (disabledNotice). */
export function ContactForm({ section }: { section: ContactFormSection }) {
  const { content } = useContent();
  const t = useT();
  const mc = content.microcopy;
  const uid = useId();
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const summary = useRef<HTMLDivElement>(null);
  const id = `${section.id}-title`;

  const check = (f: FormField, v: string | boolean | undefined) => {
    const r = validate(f, v, { required: t(mc.forms.required), tooLong: t(mc.forms.tooLong) });
    if (r === null) return null;
    return r || t(f.validation.errorMessage) || t(mc.forms.required);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    for (const f of section.fields) {
      const err = check(f, values[f.name]);
      if (err) next[f.name] = err;
    }
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setStatus('submitting');
    window.setTimeout(() => setStatus('success'), 900);
  };

  const field = (f: FormField) => {
    const fid = `${uid}-${f.name}`;
    const err = errors[f.name];
    const describedBy = err ? `${fid}-err` : undefined;
    const common = {
      id: fid,
      name: f.name,
      required: f.required,
      'aria-invalid': err ? true : undefined,
      'aria-describedby': describedBy,
      autoComplete: f.autocomplete,
      onBlur: () => {
        if (errors[f.name] !== undefined) setErrors((s) => {
          const e2 = { ...s };
          const r = check(f, values[f.name]);
          if (r) e2[f.name] = r;
          else delete e2[f.name];
          return e2;
        });
      },
    };
    const inputCls = cn(
      'mt-2 block w-full rounded-[var(--radius-control)] border-2 bg-white px-4 text-base text-ink placeholder:text-slate/70 transition-colors',
      'focus:border-ink focus:outline-none',
      err ? 'border-red' : 'border-grey hover:border-slate',
    );
    if (f.type === 'checkbox') {
      return (
        <div key={f.name} className="sm:col-span-2">
          <label htmlFor={fid} className="flex items-start gap-3 text-sm">
            <input
              {...common}
              type="checkbox"
              checked={!!values[f.name]}
              onChange={(e) => setValues((s) => ({ ...s, [f.name]: e.target.checked }))}
              className="mt-0 size-6 shrink-0 accent-[var(--color-red)]"
            />
            <span>
              <RichInline text={t(f.label)} />
            </span>
          </label>
          {err ? <p id={`${fid}-err`} className="mt-2 flex items-center gap-1.5 text-sm font-bold text-red"><Icon name="alert" size={14} />{err}</p> : null}
        </div>
      );
    }
    const label = (
      <label htmlFor={fid} className="block text-sm font-bold">
        {t(f.label)}
        {!f.required ? <span className="font-normal text-slate"> ({t(mc.forms.optional)})</span> : null}
      </label>
    );
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValues((s) => ({ ...s, [f.name]: e.target.value }));
    const value = (values[f.name] as string) ?? '';
    return (
      <div key={f.name} className={cn(f.type === 'textarea' && 'sm:col-span-2')}>
        {label}
        {f.type === 'textarea' ? (
          <textarea {...common} value={value} onChange={onChange} rows={5} maxLength={f.validation.maxLength} className={cn(inputCls, 'py-3')} placeholder={f.placeholder ? t(f.placeholder) : undefined} />
        ) : f.type === 'select' ? (
          <select {...common} value={value} onChange={onChange} className={cn(inputCls, 'h-12 appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat')} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23111315' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m5 9 7 7 7-7'/%3E%3C/svg%3E\")" }}>
            <option value="" disabled>
              {f.placeholder ? t(f.placeholder) : t(mc.forms.selectPrompt)}
            </option>
            {f.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {t(o.label)}
              </option>
            ))}
          </select>
        ) : (
          <input {...common} type={f.type} value={value} onChange={onChange} className={cn(inputCls, 'h-12')} placeholder={f.placeholder ? t(f.placeholder) : undefined} inputMode={f.type === 'tel' ? 'tel' : undefined} />
        )}
        {err ? <p id={`${fid}-err`} className="mt-2 flex items-center gap-1.5 text-sm font-bold text-red"><Icon name="alert" size={14} />{err}</p> : null}
      </div>
    );
  };

  const errorList = section.fields.filter((f) => errors[f.name]);

  return (
    <SectionShell theme={section.theme} anchor={section.anchor} labelledBy={id} tone="grey">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Heading id={id}>{t(section.heading)}</Heading>
          {section.intro ? <p className="mt-4 max-w-md text-lead text-slate">{t(section.intro)}</p> : null}
          <p className="mt-6 flex max-w-md items-start gap-2 rounded-[var(--radius-control)] border-l-4 border-red bg-white px-4 py-3 text-sm">
            <Icon name="alert" size={16} className="mt-0.5 shrink-0 text-red" />
            {t(section.disabledNotice)}
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] bg-white p-6 md:p-8">
          {status === 'success' ? (
            <div role="status" className="py-6">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-ink text-white">
                <Icon name="check" size={24} />
              </span>
              <h3 className="mt-5 text-title-fluid font-bold">{t(section.successTitle)}</h3>
              <p className="mt-3 text-slate">{t(section.successBody)}</p>
              <p className="mt-4 text-sm font-bold">{t(section.disabledNotice)}</p>
              <Button variant="secondary" size="sm" className="mt-6" onClick={() => { setStatus('idle'); setValues({}); }}>
                {t(mc.buttons.tryAgain)}
              </Button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} aria-labelledby={id}>
              <div ref={summary} tabIndex={-1} aria-live="assertive" className="outline-none">
                {errorList.length ? (
                  <div className="mb-6 rounded-[var(--radius-control)] border-2 border-red p-4">
                    <p className="font-bold">{t(section.errorSummaryTitle)}</p>
                    <ul className="mt-2 list-disc pl-5 text-sm">
                      {errorList.map((f) => (
                        <li key={f.name}>
                          <a href={`#${uid}-${f.name}`} className="link-underline">{errors[f.name]}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {section.fields.map(field)}
                {section.marketingConsentText ? (
                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 text-sm">
                      <input type="checkbox" name="marketing" className="mt-0 size-6 shrink-0 accent-[var(--color-red)]" checked={!!values.marketing} onChange={(e) => setValues((s) => ({ ...s, marketing: e.target.checked }))} />
                      <span><RichInline text={t(section.marketingConsentText)} /></span>
                    </label>
                  </div>
                ) : null}
              </div>
              <p className="mt-6 text-xs text-slate">
                <RichInline text={t(section.consentText)} />
              </p>
              <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" loading={status === 'submitting'} loadingLabel={t(section.submittingLabel)}>
                {t(section.submitLabel)}
                <Icon name="arrow-right" size={18} />
              </Button>
            </form>
          )}
        </div>
      </Container>
    </SectionShell>
  );
}
