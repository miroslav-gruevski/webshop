'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { JsonLd } from '@/components/seo';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '0208 300 9996',
    href: 'tel:02083009996',
    description: 'Mon-Fri 8am-6pm',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'sales@ecssystems.co.uk',
    href: 'mailto:sales@ecssystems.co.uk',
    description: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '75 Station Rd, Sidcup DA15 7DN',
    href: 'https://maps.google.com/?q=ECS+Systems+Limited+75+Station+Rd+Sidcup+DA15+7DN',
    description: 'ECS Systems Limited',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon - Fri: 8am - 6pm',
    href: null,
    description: '24/7 emergency support',
  },
];

const reasons = [
  'Official SALTO Systems Partner',
  'Free site surveys & consultations',
  'Expert installation team',
  '24/7 technical support',
  'Competitive pricing',
  'Full warranty on all products',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Structured Data */}
      <JsonLd type="localBusiness" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-4 font-medium">
              Contact Us
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
              Get in Touch
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Have a question or need a quote? Our team is here to help.
              Contact us today for expert advice on access control solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="bg-background-secondary rounded-xl p-6 border border-border hover:border-accent/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-bg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-medium text-foreground-muted mb-1">{item.label}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-lg font-semibold text-primary hover:text-accent transition-colors block mb-1"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-lg font-semibold text-primary mb-1">{item.value}</p>
                )}
                <p className="text-sm text-foreground-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent-bg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-primary">Send us a Message</h2>
                  <p className="text-sm text-foreground-muted">We&apos;ll get back to you within 24 hours</p>
                </div>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-success-bg mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Message Sent!</h3>
                  <p className="text-foreground-muted mb-6">
                    Thank you for contacting us. We&apos;ll be in touch shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitStatus('idle')}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-error-bg border border-error-border rounded-lg text-error text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="020 1234 5678"
                    />
                    <Input
                      label="Company (Optional)"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1.5">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 pr-10 min-h-[44px] sm:min-h-[42px] bg-white border border-border rounded-lg text-primary text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235a6a7a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat"
                    >
                      <option value="">Select a subject</option>
                      <option value="quote">Request a Quote</option>
                      <option value="product">Product Enquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="installation">Installation Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-primary text-base sm:text-sm placeholder-foreground-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Why Choose Us */}
            <div>
              <div className="mb-8">
                <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">
                  Why Choose Us
                </p>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Your Trusted Security Partner
                </h2>
                <p className="text-foreground-muted">
                  With over 15 years of experience in access control systems, we provide
                  comprehensive solutions tailored to your needs.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {reasons.map((reason) => (
                  <div key={reason} className="flex items-center gap-3 bg-white rounded-lg p-4 border border-border">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-primary">{reason}</span>
                  </div>
                ))}
              </div>

              {/* Quick Contact Card */}
              <div className="bg-accent-bg rounded-xl p-6 border border-accent/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-primary font-semibold mb-1">
                      Need Urgent Assistance?
                    </h3>
                    <p className="text-sm text-foreground-muted mb-4">
                      Our team is available 24/7 for emergency support and urgent enquiries.
                    </p>
                    <a href="tel:02083009996">
                      <Button variant="primary" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call 0208 300 9996
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-background-tertiary relative">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=0.0900%2C51.4300%2C0.1100%2C51.4400&layer=mapnik&marker=51.4337%2C0.1003"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="ECS Systems Location - 75 Station Rd, Sidcup DA15 7DN"
          className="absolute inset-0"
        />
        {/* Map Overlay with Address Info */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white rounded-xl shadow-lg p-4 z-10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-primary font-semibold">ECS Systems Limited</p>
              <p className="text-sm text-foreground-muted mt-0.5">75 Station Rd, Sidcup DA15 7DN</p>
              <a 
                href="https://maps.google.com/?q=ECS+Systems+Limited+75+Station+Rd+Sidcup+DA15+7DN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline mt-2 inline-flex items-center gap-1"
              >
                Get Directions
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Prefer to Browse First?
          </h2>
          <p className="text-foreground-muted mb-6">
            Explore our full range of SALTO access control products and find the perfect solution for your needs.
          </p>
          <Link href="/products">
            <Button variant="secondary" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
