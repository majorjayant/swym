'use client';

import { usePathname } from 'next/navigation';
import { AnnouncementBar } from './announcement-bar';
import { CookieBanner } from './cookie-banner';
import { Footer } from './footer';
import { Header } from './header';
import { MobileBar } from './mobile-bar';
import { useContent, useT } from '@/lib/content-context';

/** Public layout: skip link, announcement, header, page, footer, mobile bar, cookie banner. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const { content } = useContent();
  const t = useT();
  const pathname = usePathname();
  return (
    <>
      <a href="#main" className="skip-link">
        {t(content.navigation.header.skipLinkLabel)}
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" tabIndex={-1} key={pathname} className="page-enter outline-none">
        {children}
      </main>
      <Footer />
      <MobileBar />
      <CookieBanner />
    </>
  );
}
