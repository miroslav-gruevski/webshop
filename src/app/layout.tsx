import type { Metadata, Viewport } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { Header, Footer, MobileNav } from '@/components/layout';
import { JsonLd } from '@/components/seo';
import ClientProviders from '@/components/providers/ClientProviders';

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
});

const APP_NAME = 'ECS Systems Shop';
const APP_DESCRIPTION =
  'THE FIRE & SECURITY SPECIALISTS. Official SALTO partner providing premium electronic locks and access control systems for businesses, education, and homes.';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecssystems.co.uk/shop';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: APP_NAME,
  title: {
    default: `${APP_NAME} - Electronic Access Control Solutions`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    'ECS Systems',
    'SALTO',
    'electronic locks',
    'access control',
    'smart locks',
    'security',
    'fire safety',
  ],
  authors: [{ name: 'ECS Systems', url: 'https://ecssystems.co.uk' }],
  creator: 'ECS Systems',
  publisher: 'ECS Systems',
  category: 'Security',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BASE_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} - Electronic Access Control Solutions`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: '/icons/icon-512x512.svg',
        width: 512,
        height: 512,
        alt: 'ECS Systems Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} - Electronic Access Control Solutions`,
    description: APP_DESCRIPTION,
    images: ['/icons/icon-512x512.svg'],
    creator: '@ecssystems',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icons/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <JsonLd type="organization" />
      </head>
      <body className={`${lato.className} antialiased bg-white`}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:font-medium focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <ClientProviders>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-1 pb-20 lg:pb-0" tabIndex={-1}>{children}</main>
            <Footer />
            <MobileNav />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
