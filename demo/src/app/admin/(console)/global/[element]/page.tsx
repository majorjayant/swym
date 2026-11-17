import { notFound } from 'next/navigation';
import { GlobalEditor } from '@/components/admin/editor';
import { GLOBAL_KEYS, type GlobalKey } from '@/components/admin/keys';

export function generateStaticParams() {
  return GLOBAL_KEYS.map((element) => ({ element }));
}
export const dynamicParams = false;

export default async function AdminGlobalEditor({ params }: { params: Promise<{ element: string }> }) {
  const { element } = await params;
  if (!(GLOBAL_KEYS as readonly string[]).includes(element)) notFound();
  return <GlobalEditor globalKey={element as GlobalKey} />;
}
