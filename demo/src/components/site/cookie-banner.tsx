'use client';

import NextLink from 'next/link';
import { useEffect, useId, useState } from 'react';
import { useContent, useT } from '@/lib/content-context';
import { useConsent } from '@/lib/consent';
import { resolveHref } from '@/lib/links';
import { Button } from '../ui/button';
import { cn } from '../ui/cn';

/** Non-modal consent dialog. Necessary cookies are locked on; analytics and marketing are opt-in. */
export function CookieBanner() {
  const { content } = useContent();
  const t = useT();
  const cb = content.cookieBanner;
  const { consent, ready, settingsOpen, acceptAll, rejectAll, save, openSettings, closeSettings } = useConsent();
  const [choices, setChoices] = useState({ analytics: consent.analytics, marketing: consent.marketing });
  const titleId = useId();
  const bodyId = useId();
  useEffect(() => setChoices({ analytics: consent.analytics, marketing: consent.marketing }), [consent, settingsOpen]);

  if (!cb.enabled || !ready || (consent.decided && !settingsOpen)) return null;
  const policy = resolveHref(cb.policyLink);

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-xl rounded-[var(--radius-card)] border border-line bg-white p-5 text-ink shadow-[var(--shadow-card)] page-enter md:inset-x-auto md:right-6 md:bottom-6 md:p-6 lg:bottom-6"
    >
      <h2 id={titleId} className="text-lg font-bold">
        {t(cb.title)}
      </h2>
      <p id={bodyId} className="mt-2 text-sm text-slate">
        {t(cb.body)}{' '}
        {policy ? (
          <NextLink href={policy} className="link-underline font-bold text-ink">
            {t(cb.policyLink.label)}
          </NextLink>
        ) : null}
      </p>
      {settingsOpen ? (
        <fieldset className="mt-4 space-y-3 border-t border-line pt-4">
          <legend className="sr-only">{t(cb.settingsLabel)}</legend>
          {cb.categories.map((c) => {
            const checked = c.required ? true : choices[c.key as 'analytics' | 'marketing'];
            return (
              <label key={c.key} className={cn('flex items-start gap-3 text-sm', c.required && 'opacity-80')}>
                <input
                  type="checkbox"
                  className="mt-0.5 size-5 shrink-0 accent-[var(--color-red)]"
                  checked={checked}
                  disabled={c.required}
                  onChange={(e) => setChoices((s) => ({ ...s, [c.key]: e.target.checked }))}
                />
                <span>
                  <span className="block font-bold">{t(c.label)}</span>
                  <span className="block text-slate">{t(c.description)}</span>
                </span>
              </label>
            );
          })}
        </fieldset>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-2">
        {settingsOpen ? (
          <>
            <Button size="sm" onClick={() => save(choices)}>
              {t(cb.saveLabel)}
            </Button>
            <Button size="sm" variant="secondary" onClick={acceptAll}>
              {t(cb.acceptLabel)}
            </Button>
            {consent.decided ? (
              <Button size="sm" variant="text" onClick={closeSettings} className="ml-auto">
                {t(content.microcopy.buttons.close)}
              </Button>
            ) : null}
          </>
        ) : (
          <>
            <Button size="sm" onClick={acceptAll}>
              {t(cb.acceptLabel)}
            </Button>
            <Button size="sm" variant="secondary" onClick={rejectAll}>
              {t(cb.rejectLabel)}
            </Button>
            <Button size="sm" variant="text" onClick={openSettings} className="ml-auto">
              {t(cb.settingsLabel)}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
