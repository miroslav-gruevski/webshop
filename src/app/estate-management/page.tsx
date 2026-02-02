import Link from 'next/link';
import { ArrowLeft, Building2, Users, Key, BarChart3, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = {
  title: 'Estate Management',
  description: 'Comprehensive estate management solutions for multi-site access control. Manage all your properties from a single platform.',
};

const features = [
  {
    icon: Building2,
    title: 'Multi-Site Management',
    description: 'Control access across multiple buildings and locations from a single centralised platform.',
  },
  {
    icon: Users,
    title: 'User Administration',
    description: 'Easily manage user credentials, access levels, and permissions across your entire estate.',
  },
  {
    icon: Key,
    title: 'Credential Management',
    description: 'Issue, revoke, and manage credentials remotely without physical access to each site.',
  },
  {
    icon: BarChart3,
    title: 'Reporting & Analytics',
    description: 'Comprehensive reporting on access patterns, security events, and system health.',
  },
  {
    icon: Shield,
    title: 'Security Monitoring',
    description: 'Real-time alerts and notifications for security events across all properties.',
  },
  {
    icon: Clock,
    title: 'Time-Based Access',
    description: 'Set up schedules and time-based access rules that apply across your entire portfolio.',
  },
];

export default function EstateManagementPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-primary text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6">
            Estate Management
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl">
            Streamline access control across your entire property portfolio with our 
            comprehensive estate management solutions.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
              Complete Control Over Your Estate
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Whether you manage offices, residential buildings, or mixed-use developments, 
              our estate management platform gives you the tools you need.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border border-border hover:border-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-bg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-foreground-muted text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            Ready to Simplify Your Estate Management?
          </h2>
          <p className="text-foreground-muted mb-8">
            Contact us to learn how our estate management solutions can help you 
            manage access control more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Get in Touch</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg">View Products</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
