import type { Metadata, Viewport } from 'next';
import { publishedContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Providers } from '@/components/providers';
import './globals.css';
import { asset } from '@/lib/base-path';

export const metadata: Metadata = {
  ...buildMetadata(publishedContent.pages.home, publishedContent.seo),
  icons: {
    icon: [{ url: asset('/brand/favicon-32.png'), sizes: '32x32', type: 'image/png' }],
    apple: asset('/brand/apple-touch-icon.png'),
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body>
        <Providers content={publishedContent}>{children}</Providers>
      </body>
    </html>
  );
}
