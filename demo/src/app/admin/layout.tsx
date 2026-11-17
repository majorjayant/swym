import type { Metadata } from 'next';
import { AdminStoreProvider } from '@/components/admin/store';
import { publishedContent } from '@/lib/content';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: t(publishedContent.microcopy.admin.appName),
  robots: { index: false, follow: false },
};

/** Admin portal (Phase 0 mock): no public chrome, in-memory store shared by every admin route. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminStoreProvider>{children}</AdminStoreProvider>;
}
