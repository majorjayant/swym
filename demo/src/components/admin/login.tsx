'use client';

import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { useContent, useT } from '@/lib/content-context';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { NothingSavedBanner } from './shell';

/** Non-functional sign-in: any input continues to the dashboard. Real auth arrives in Phase 1. */
export function LoginScreen() {
  const { content } = useContent();
  const t = useT();
  const a = content.microcopy.admin;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const id = useId();
  return (
    <div className="min-h-svh bg-surface">
      <NothingSavedBanner />
      <main className="page-enter mx-auto flex max-w-md flex-col px-4 py-12 md:py-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={content.site.logo.light.src} alt={t(content.site.logo.light.alt)} width={1144} height={315} className="mx-auto h-auto w-56" />
        <div className="wedge wedge-sm mt-10 rounded-[var(--radius-card)] bg-white p-6 md:p-8">
          <h1 className="text-title-fluid font-bold">{t(a.login.title)}</h1>
          <p className="label mt-1 text-slate">{t(a.appName)}</p>
          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              window.setTimeout(() => router.push('/admin'), 400);
            }}
          >
            <div>
              <label htmlFor={`${id}-e`} className="text-sm font-bold">{t(a.login.email)}</label>
              <input id={`${id}-e`} type="email" autoComplete="username" className="mt-1 block h-12 w-full rounded-[var(--radius-control)] border-2 border-grey px-3 focus:border-ink focus:outline-none" />
            </div>
            <div>
              <label htmlFor={`${id}-p`} className="text-sm font-bold">{t(a.login.password)}</label>
              <input id={`${id}-p`} type="password" autoComplete="current-password" className="mt-1 block h-12 w-full rounded-[var(--radius-control)] border-2 border-grey px-3 focus:border-ink focus:outline-none" />
            </div>
            <Button type="submit" size="lg" loading={loading} loadingLabel={t(a.login.signIn)} className="w-full">
              {t(a.login.signIn)}
              <Icon name="arrow-right" size={18} />
            </Button>
          </form>
          <p className="mt-5 flex items-start gap-2 text-sm text-slate">
            <Icon name="alert" size={16} className="mt-0.5 shrink-0 text-red" />
            {t(a.login.note)}
          </p>
        </div>
      </main>
    </div>
  );
}
