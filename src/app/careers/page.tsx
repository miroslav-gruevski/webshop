import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = {
  title: 'Careers - Work for Us',
  description: 'Join the ECS Systems team. Explore career opportunities in fire safety and electronic access control.',
};

const benefits = [
  'Competitive salary packages',
  'Company vehicle (for field roles)',
  'Ongoing training and certifications',
  'Pension scheme',
  'Health and wellness benefits',
  '25 days holiday plus bank holidays',
  'Career progression opportunities',
  'Supportive team environment',
];

const openPositions = [
  {
    title: 'Field Service Engineer',
    location: 'London & South East',
    type: 'Full-time',
    description: 'Install, maintain, and repair electronic access control systems for our diverse client base.',
  },
  {
    title: 'Technical Support Specialist',
    location: 'Sidcup, Kent',
    type: 'Full-time',
    description: 'Provide technical support to clients via phone and remote access, troubleshooting system issues.',
  },
  {
    title: 'Sales Executive',
    location: 'Hybrid',
    type: 'Full-time',
    description: 'Develop new business opportunities and maintain relationships with existing clients.',
  },
];

export default function CareersPage() {
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
            Join Our Team
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl">
            Build your career with a company that values expertise, integrity, and 
            exceptional customer service.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
                Why Work at ECS Systems?
              </h2>
              <p className="text-foreground-muted mb-8">
                We are a growing company with a strong reputation in the fire safety and 
                access control industry. We invest in our people and provide the tools 
                and training needed to succeed.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground-muted text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-accent-bg rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Our Culture
              </h3>
              <p className="text-foreground-muted mb-4">
                At ECS Systems, we believe in fostering a collaborative environment where 
                every team member can grow and contribute. We value innovation, take pride 
                in our work, and celebrate success together.
              </p>
              <p className="text-foreground-muted">
                Whether you are an experienced professional or just starting your career, 
                we provide the support and opportunities you need to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-12 text-center">
            Open Positions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {openPositions.map((position) => (
              <div
                key={position.title}
                className="bg-white rounded-xl p-6 border border-border hover:border-accent/50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-primary mb-2">{position.title}</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <MapPin className="w-4 h-4" />
                    {position.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Clock className="w-4 h-4" />
                    {position.type}
                  </div>
                </div>
                <p className="text-foreground-muted mb-4">{position.description}</p>
                <a href={`mailto:careers@ecssystems.co.uk?subject=Application: ${position.title}`}>
                  <Button size="sm">
                    Apply Now
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Briefcase className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            Do not See a Suitable Role?
          </h2>
          <p className="text-foreground-muted mb-8">
            We are always interested in hearing from talented individuals. Send us your 
            CV and we will keep you in mind for future opportunities.
          </p>
          <a href="mailto:careers@ecssystems.co.uk?subject=General Application">
            <Button size="lg">
              Send Your CV
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
