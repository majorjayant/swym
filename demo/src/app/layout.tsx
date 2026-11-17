import type { Metadata, Viewport } from 'next';
import { publishedContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Providers } from '@/components/providers';
import './globals.css';

export const metadata: Metadata = {
  ...buildMetadata(publishedContent.pages.home, publishedContent.seo),
  icons: {
    icon: [{ url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: '/brand/apple-touch-icon.png',
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
      <head>
        <link rel="preload" href="/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <Providers content={publishedContent}>{children}</Providers>
      </body>
    </html>
  );
}
