'use client';

import NextLink from 'next/link';
import { useId, useState } from 'react';
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
  const titleId = useId();
  const bodyId = useId();

  if (!cb.enabled || !ready || (consent.decided && !settingsOpen)) return null;
  const policy = resolveHref(cb.policyLink);

  return (
    <Panel key={settingsOpen ? 'settings' : 'banner'} initial={{ analytics: consent.analytics, marketing: consent.marketing }}>
      {(choices, setChoices) => (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      className={cn(
        // Mobile: compact bottom sheet above the mobile bar, max 40% of the viewport. Desktop: card bottom-right (hero text and CTAs sit on the left).
        'fixed inset-x-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-50 max-h-[40svh] overflow-y-auto border-t border-line bg-white px-4 pb-3 pt-3 text-ink shadow-[var(--shadow-card)] page-enter',
        'md:inset-x-auto md:right-6 md:bottom-6 md:max-h-[min(70svh,36rem)] md:w-[26rem] md:rounded-[var(--radius-card)] md:border md:p-6 lg:bottom-6',
        settingsOpen && 'max-h-[70svh]',
      )}
    >
      <h2 id={titleId} className="text-base font-bold md:text-lg">
        {t(cb.title)}
      </h2>
      <p id={bodyId} className={cn('mt-1 text-sm leading-snug text-slate md:mt-2', !settingsOpen && 'line-clamp-3 md:line-clamp-none')}>
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
      <div className="mt-2.5 flex flex-nowrap items-center gap-2 md:mt-5 md:flex-wrap">
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
      )}
    </Panel>
  );
}

type Choices = { analytics: boolean; marketing: boolean };

/** Holds the in-progress category choices; remounted (via key) each time settings open, so it starts from saved consent. */
function Panel({ initial, children }: { initial: Choices; children: (c: Choices, set: React.Dispatch<React.SetStateAction<Choices>>) => React.ReactNode }) {
  const [choices, setChoices] = useState<Choices>(initial);
  return <>{children(choices, setChoices)}</>;
}
