import Link from 'next/link';
import { ArrowLeft, Clock, Phone, Shield, Zap, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = {
  title: '24/7 Response',
  description: 'Round-the-clock emergency response for your access control systems. We are here when you need us most.',
};

const responseFeatures = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Our emergency response team is available around the clock, 365 days a year.',
  },
  {
    icon: Zap,
    title: 'Rapid Response',
    description: 'Average response time under 4 hours for emergency callouts in our coverage area.',
  },
  {
    icon: Users,
    title: 'Expert Technicians',
    description: 'Fully trained and certified engineers with extensive SALTO system experience.',
  },
  {
    icon: Shield,
    title: 'Priority Support',
    description: 'Maintenance contract holders receive priority treatment for all emergency calls.',
  },
];

const emergencyServices = [
  'Lock-out assistance',
  'System failures',
  'Power issues',
  'Credential problems',
  'Door mechanism faults',
  'Controller malfunctions',
  'Network connectivity issues',
  'Battery replacements',
];

export default function ResponsePage() {
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
            24/7 Emergency Response
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl mb-8">
            When security matters most, we are here for you. Our dedicated team provides 
            round-the-clock support for all your access control emergencies.
          </p>
          <a href="tel:+442083009996">
            <Button variant="secondary" size="lg">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: 0208 300 9996
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {responseFeatures.map((feature) => (
              <div
                key={feature.title}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent-bg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-foreground-muted text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
                Emergency Services We Provide
              </h2>
              <p className="text-foreground-muted mb-8">
                Our emergency response team is equipped to handle a wide range of 
                access control issues quickly and professionally.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {emergencyServices.map((service) => (
                  <div key={service} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground-muted">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Need Emergency Support?
              </h3>
              <p className="text-foreground-muted mb-6">
                Our team is standing by to help. Call us now or submit a request online.
              </p>
              <div className="space-y-4">
                <a href="tel:+442083009996" className="block">
                  <Button fullWidth size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    0208 300 9996
                  </Button>
                </a>
                <Link href="/contact" className="block">
                  <Button variant="outline" fullWidth size="lg">
                    Submit Request Online
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
