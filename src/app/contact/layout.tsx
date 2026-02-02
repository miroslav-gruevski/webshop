import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - ECS Systems',
  description: 'Get in touch with ECS Systems. Call 0208 300 9996, email sales@ecssystems.co.uk, or visit us at 75 Station Rd, Sidcup DA15 7DN. Mon-Fri 8am-6pm.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact ECS Systems - Fire & Security Specialists',
    description: 'Contact us for electronic locks, access control systems, and security solutions. Free quotes and expert advice.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
