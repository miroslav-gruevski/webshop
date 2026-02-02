import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ECS Systems Shop - Electronic Access Control Solutions',
    short_name: 'ECS Shop',
    description:
      'THE FIRE & SECURITY SPECIALISTS. Official SALTO partner providing premium electronic locks and access control systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e3a5f',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      // PNG icons for broad compatibility
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      // Maskable icon for Android adaptive icons
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      // SVG for modern browsers (scalable)
      {
        src: '/icons/icon-512x512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    categories: ['business', 'shopping', 'security'],
    screenshots: [],
    shortcuts: [
      {
        name: 'Browse Products',
        short_name: 'Products',
        url: '/products',
        icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' }],
      },
      {
        name: 'View Cart',
        short_name: 'Cart',
        url: '/cart',
        icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' }],
      },
      {
        name: 'My Account',
        short_name: 'Account',
        url: '/account',
        icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' }],
      },
    ],
  };
}
