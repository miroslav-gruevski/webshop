import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - ECS Systems',
  description: 'Find answers to common questions about electronic locks, installation, support, ordering and returns. Expert advice from ECS Systems.',
  alternates: {
    canonical: '/faqs',
  },
  openGraph: {
    title: 'FAQs - Electronic Locks & Access Control',
    description: 'Answers to frequently asked questions about SALTO products, installation, and support.',
  },
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
