'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Search, HelpCircle } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { JsonLd } from '@/components/seo';

const faqCategories = [
  {
    name: 'Products',
    faqs: [
      {
        question: 'What types of electronic locks do you offer?',
        answer: 'We offer a comprehensive range of SALTO electronic locks including the XS4 series for doors, Neo cylinders for retrofitting, locker locks, padlocks, and wall readers. Each product is designed for specific applications from office doors to gym lockers.',
      },
      {
        question: 'Are your products compatible with existing doors?',
        answer: 'Yes, many of our products are designed for retrofit installation. The SALTO Neo cylinder range, for example, can replace existing mechanical cylinders without door modifications. Our team can assess your doors and recommend the best solution.',
      },
      {
        question: 'What credential types are supported?',
        answer: 'Our systems support multiple credential types including RFID cards, key fobs, wristbands, and mobile keys via Bluetooth. This flexibility allows you to choose the most convenient access method for your users.',
      },
    ],
  },
  {
    name: 'Installation',
    faqs: [
      {
        question: 'Do you provide installation services?',
        answer: 'Yes, we offer professional installation services carried out by our team of certified engineers. We handle everything from single door installations to large multi-site deployments.',
      },
      {
        question: 'How long does installation take?',
        answer: 'Installation time varies depending on the scope of the project. A single door typically takes 1-2 hours, while larger projects are scheduled to minimise disruption to your operations. We will provide a detailed timeline during the planning phase.',
      },
      {
        question: 'Do I need to modify my doors for installation?',
        answer: 'In many cases, no modifications are needed. Our range includes retrofit solutions that work with existing door preparations. During our site survey, we will assess your doors and recommend the most suitable products.',
      },
    ],
  },
  {
    name: 'Support & Maintenance',
    faqs: [
      {
        question: 'What support do you offer after installation?',
        answer: 'We provide comprehensive aftercare including 24/7 emergency response, scheduled maintenance, system health checks, and remote support. Our maintenance contracts ensure your systems remain in optimal condition.',
      },
      {
        question: 'How often do batteries need replacing?',
        answer: 'SALTO locks typically operate for 40,000-60,000 openings on a single set of batteries, usually lasting 2-3 years under normal use. The locks provide advance warning when batteries are running low.',
      },
      {
        question: 'Can you provide training for our staff?',
        answer: 'Yes, we offer training sessions for system administrators and end users. This includes software training, credential management, and basic troubleshooting. Training can be conducted on-site or remotely.',
      },
    ],
  },
  {
    name: 'Pricing & Orders',
    faqs: [
      {
        question: 'How can I get a quote?',
        answer: 'You can request a quote through our website contact form, by calling us on 0208 300 9996, or by emailing sales@ecssystems.co.uk. For accurate pricing, we may need to conduct a site survey to assess your requirements.',
      },
      {
        question: 'Do you offer trade discounts?',
        answer: 'Yes, we offer competitive trade pricing for installers, locksmiths, and volume buyers. Please contact our sales team to discuss trade account options and pricing.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept bank transfers, credit/debit cards, and can arrange credit terms for established business customers. Payment terms are discussed during the quotation process.',
      },
    ],
  },
];

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.faqs.length > 0);

  // Flatten all FAQs for structured data
  const allFaqs = useMemo(() => 
    faqCategories.flatMap((category) => 
      category.faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      }))
    ),
    []
  );

  return (
    <div className="animate-fade-in">
      {/* Structured Data */}
      <JsonLd type="faq" faqs={allFaqs} />

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
            Frequently Asked Questions
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl">
            Find answers to common questions about our products, services, and support.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length > 0 ? (
            <div className="space-y-12">
              {filteredCategories.map((category) => (
                <div key={category.name}>
                  <h2 className="text-xl font-bold text-primary mb-6">{category.name}</h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq, index) => {
                      const id = `${category.name}-${index}`;
                      const isOpen = openItems.includes(id);
                      return (
                        <div
                          key={id}
                          className="bg-white rounded-xl border border-border overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(id)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-background-secondary transition-colors"
                            aria-expanded={isOpen}
                          >
                            <span className="font-medium text-primary pr-4">{faq.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 text-foreground-muted flex-shrink-0 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 text-foreground-muted animate-fade-in">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-foreground-light mx-auto mb-4" />
              <p className="text-foreground-muted">No FAQs match your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Still Have Questions?
          </h2>
          <p className="text-foreground-muted mb-8">
            Our team is here to help. Get in touch and we will be happy to assist.
          </p>
          <Link href="/contact">
            <Button size="lg">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
