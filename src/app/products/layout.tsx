import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products - Electronic Locks & Access Control | ECS Systems',
  description: 'Browse our range of SALTO electronic locks, wall readers, cylinders, locker locks, padlocks and credentials. Free shipping on orders over £500.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Electronic Locks & Access Control Products - ECS Systems',
    description: 'Premium SALTO access control products. Electronic locks, wall readers, cylinders and more.',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
