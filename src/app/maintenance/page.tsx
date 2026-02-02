import Link from 'next/link';
import { ArrowLeft, Shield, Clock, Wrench, CheckCircle2, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = {
  title: 'Maintenance & Aftercare',
  description: 'Professional maintenance and aftercare services for your electronic access control systems. Keep your security infrastructure running smoothly.',
};

const services = [
  {
    icon: Shield,
    title: 'Preventive Maintenance',
    description: 'Regular inspections and servicing to prevent issues before they occur, ensuring maximum uptime for your access control systems.',
  },
  {
    icon: Wrench,
    title: 'Repairs & Replacements',
    description: 'Fast, professional repairs and component replacements by certified technicians with genuine SALTO parts.',
  },
  {
    icon: Clock,
    title: 'System Health Checks',
    description: 'Comprehensive system audits to identify potential vulnerabilities and optimize performance.',
  },
  {
    icon: Calendar,
    title: 'Scheduled Servicing',
    description: 'Flexible maintenance schedules tailored to your operational needs, minimizing disruption to your business.',
  },
];

const benefits = [
  'Extended equipment lifespan',
  'Reduced unexpected downtime',
  'Priority emergency response',
  'Discounted parts and labour',
  'Regular system health reports',
  'Firmware updates included',
];

export default function MaintenancePage() {
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
            Maintenance & Aftercare
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl">
            Keep your access control systems performing at their best with our comprehensive 
            maintenance and aftercare services.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-12 text-center">
            Our Maintenance Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-6 border border-border hover:border-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-bg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{service.title}</h3>
                <p className="text-foreground-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
                Maintenance Contract Benefits
              </h2>
              <p className="text-foreground-muted mb-8">
                Our maintenance contracts provide peace of mind and ensure your security 
                infrastructure remains reliable and effective year after year.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Get a Maintenance Quote
              </h3>
              <p className="text-foreground-muted mb-6">
                Contact us to discuss your maintenance requirements and receive a tailored quote.
              </p>
              <div className="flex flex-col gap-4">
                <Link href="/contact" className="block">
                  <Button fullWidth size="lg">
                    Request a Quote
                  </Button>
                </Link>
                <a href="tel:+442083009996" className="block">
                  <Button variant="outline" fullWidth size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    0208 300 9996
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
