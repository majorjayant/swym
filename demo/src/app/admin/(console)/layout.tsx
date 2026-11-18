import { AdminShell } from '@/components/admin/shell';
import { ConsoleProvider } from '@/components/admin/console/store';

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsoleProvider>
      <AdminShell>{children}</AdminShell>
    </ConsoleProvider>
  );
}
