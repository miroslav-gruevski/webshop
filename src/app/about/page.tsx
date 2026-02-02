import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Award,
  Users,
  Clock,
  CheckCircle,
  Building2,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About Us - ECS Systems',
  description: 'Learn about ECS Systems - THE FIRE & SECURITY SPECIALISTS with 15+ years experience. Official SALTO partner providing premium access control solutions across the UK.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About ECS Systems - Fire & Security Specialists',
    description: '15+ years of experience providing premium security solutions. 5,000+ installations and 500+ business clients.',
  },
};

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '5,000+', label: 'Installations' },
  { value: '500+', label: 'Business Clients' },
  { value: '24/7', label: 'Support Available' },
];

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description:
      'We believe in providing the highest level of security for every property, regardless of size or budget.',
  },
  {
    icon: Award,
    title: 'Quality Products',
    description:
      'We only supply products from trusted manufacturers like SALTO Systems, ensuring reliability and longevity.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description:
      'Our customers are at the heart of everything we do. We listen, advise, and deliver tailored solutions.',
  },
  {
    icon: Clock,
    title: 'Responsive Service',
    description:
      'From initial enquiry to aftercare, we pride ourselves on quick response times and efficient service.',
  },
];

const certifications = [
  'Official SALTO Systems Partner',
  'ISO 9001 Quality Management',
  'NSI Gold Approved',
  'Safe Contractor Approved',
  'Constructionline Certified',
];

const team = [
  {
    name: 'Matt Evans',
    role: 'Managing Director',
    bio: 'Leading ECS with a passion for providing excellent security solutions and service.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Matt-Evans-1024x683.jpg',
  },
  {
    name: 'Dan Cope',
    role: 'Director',
    bio: 'Driving innovation and quality across all ECS operations and services.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Dan-Cope--1024x683.jpg',
  },
  {
    name: 'Karen Evans',
    role: 'HR Manager',
    bio: 'Building and nurturing our talented team of security professionals.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Karen-Evans-1024x683.jpg',
  },
  {
    name: 'Darren Ross',
    role: 'Project Manager',
    bio: 'Ensuring smooth project delivery from consultation to completion.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Darren-Ross-1024x683.jpg',
  },
  {
    name: 'Barry Whittick',
    role: 'Installation Manager',
    bio: 'Overseeing our expert installation team with precision and care.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Barry-Whittick-1024x683.jpg',
  },
  {
    name: 'Matt Barlow',
    role: 'Service Manager',
    bio: 'Managing 24/7 maintenance and aftercare support for all clients.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Matt-Barlow-1024x683.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-4 font-medium">
              About ECS Systems
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
              The Fire & Security Specialists
            </h1>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.9)' }}>
              ECS is one of the leading – and fastest-growing – security and fire specialists in London and the South East.
              We design, install and maintain modern, integrated systems for hundreds of clients annually,
              including those in the residential, education and commercial sectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline-white" size="lg">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-sm text-foreground-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">
                Our Story
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                Building Trust Through Excellence
              </h2>
              <div className="space-y-4 text-foreground-muted">
                <p>
                  With a wealth of experience behind our directors, and with our clients&apos; support,
                  ECS has been able to grow quickly. Our work is always focused on providing the
                  highest quality solutions and best workmanship that fully meet our clients&apos; needs.
                </p>
                <p>
                  Our engineers are handpicked and many of the most talented in the industry come
                  to work for us. We are completely customer focused and strive to answer every
                  call within moments, while providing quotes quickly – often within minutes or hours.
                </p>
                <p>
                  Although an industry leader with a focus on innovation and quality, our products
                  and services are competitively priced. Our maintenance and repair service is fast,
                  efficient and good value.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
                <Image
                  src="https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-one-list-ok.png?itok=27oXgqyn"
                  alt="SALTO Access Control System"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-8"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-white rounded-xl p-4 shadow-lg">
                <p className="text-2xl font-bold">15+</p>
                <p className="text-sm opacity-90">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">
              Our Values
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              What Drives Us
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Our core values guide everything we do, from product selection to customer service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-bg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-foreground-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">
                Certifications
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                Trusted & Accredited
              </h2>
              <p className="text-foreground-muted mb-8">
                We maintain the highest industry standards and certifications to ensure
                quality and professionalism in every project we undertake.
              </p>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-primary">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border border-border text-center">
                <Building2 className="w-10 h-10 text-accent mx-auto mb-3" />
                <p className="text-sm font-medium text-primary">Official SALTO Partner</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-border text-center">
                <Award className="w-10 h-10 text-accent mx-auto mb-3" />
                <p className="text-sm font-medium text-primary">NSI Gold Approved</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-border text-center">
                <Shield className="w-10 h-10 text-accent mx-auto mb-3" />
                <p className="text-sm font-medium text-primary">ISO 9001 Certified</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-border text-center">
                <Headphones className="w-10 h-10 text-accent mx-auto mb-3" />
                <p className="text-sm font-medium text-primary">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">
              Our Team
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Meet the Experts
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Our experienced team brings together decades of expertise in security systems and access control.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-6 border border-border text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover scale-[1.8] object-top translate-y-[15%]"
                  />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1">{member.name}</h3>
                <p className="text-sm text-accent font-medium mb-2">{member.role}</p>
                <p className="text-sm text-foreground-muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-dark via-primary to-primary-light relative overflow-hidden">
        {/* Background product images - anchored to bottom */}
        <div className="absolute -left-8 lg:left-12 bottom-0 w-[180px] h-[260px] sm:w-[240px] sm:h-[340px] lg:w-[320px] lg:h-[450px] hidden md:block opacity-30 lg:opacity-50 z-0">
          <Image
            src="https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-one-list-ok.png?itok=27oXgqyn"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 1024px) 240px, 320px"
            loading="lazy"
          />
        </div>
        <div className="absolute -right-8 lg:right-12 bottom-0 w-[180px] h-[260px] sm:w-[240px] sm:h-[340px] lg:w-[320px] lg:h-[450px] hidden md:block opacity-30 lg:opacity-50 z-0">
          <Image
            src="https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-locker-list-ok.png?itok=uNThdvMJ"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 1024px) 240px, 320px"
            loading="lazy"
          />
        </div>
        
        {/* Content - ensure it's above images */}
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#ffffff' }}>
            Ready to Upgrade Your Access Control?
          </h2>
          <p className="text-base mb-6 max-w-lg mx-auto font-normal" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Contact us for a free consultation and quote. Our experts will help you find the perfect solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="shadow-xl min-w-[180px]">
                Get a Quote
                <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline-white" size="lg" className="min-w-[180px]">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
