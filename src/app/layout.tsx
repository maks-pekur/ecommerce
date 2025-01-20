import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { app } from '@/config/app';
import { Providers } from '@/providers';
import '@/styles/globals.css';
import { cn } from '@/utils';

import type { Metadata, Viewport } from 'next';

const fontSans = GeistSans;
const fontMono = GeistMono;

export const metadata: Metadata = {
  title: {
    default: app.name,
    template: `%s - ${app.name}`,
  },
  metadataBase: new URL(app.url),
  description: app.description,
  keywords: app.keywords,
  authors: [
    {
      name: 'Maks Pekur',
      url: 'https://agency.bleverse.com',
    },
  ],
  creator: 'Maks Pekur',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: app.url,
    title: app.name,
    description: app.description,
    siteName: app.name,
    images: [
      {
        url: app.ogImage,
        width: 1200,
        height: 630,
        alt: app.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: app.name,
    description: app.description,
    images: [app.ogImage],
    creator: '@max_pekur',
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background text-foreground font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
