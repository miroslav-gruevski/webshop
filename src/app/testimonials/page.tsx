import Link from 'next/link';
import { ArrowLeft, Star, Quote, Building2 } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = {
  title: 'Testimonials & Ratings',
  description: 'See what our customers say about ECS Systems. Real reviews from businesses who trust us with their security.',
};

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Facilities Manager',
    company: 'Meridian Business Park',
    content: 'ECS Systems transformed our access control across 12 buildings. The installation was seamless, and their ongoing support has been exceptional. We have had zero security incidents since upgrading.',
    rating: 5,
  },
  {
    name: 'James Harrison',
    role: 'Operations Director',
    company: 'Crown Hotels Group',
    content: 'The SALTO system has revolutionised how we manage guest access. Mobile keys have been a hit with our guests, and the back-office management is incredibly intuitive.',
    rating: 5,
  },
  {
    name: 'Dr. Amanda Foster',
    role: 'Principal',
    company: 'Westbrook Academy',
    content: 'Safety is our top priority. ECS provided a comprehensive solution that gives us complete control over who enters our premises. The audit trail feature has been invaluable.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Property Manager',
    company: 'Thames Residential',
    content: 'Managing 200+ residential units used to be a nightmare. Now with the estate management system, credential management takes minutes instead of hours.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Gym Owner',
    company: 'FitLife Fitness',
    content: 'The locker locks have been brilliant. Members love the convenience of using their membership cards for lockers. Installation was quick and the team was very professional.',
    rating: 4,
  },
  {
    name: 'Robert Davies',
    role: 'IT Director',
    company: 'Vertex Financial',
    content: 'Security compliance is critical in our industry. ECS understood our requirements and delivered a system that exceeds regulatory standards. Highly recommended.',
    rating: 5,
  },
];

const stats = [
  { value: '500+', label: 'Happy Customers' },
  { value: '4.9', label: 'Average Rating' },
  { value: '15+', label: 'Years Experience' },
  { value: '99%', label: 'Customer Retention' },
];

export default function TestimonialsPage() {
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
            Testimonials & Ratings
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl">
            Do not just take our word for it. Hear from the businesses that trust 
            ECS Systems with their security.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-background-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-border hover:border-accent/50 transition-colors"
              >
                <Quote className="w-8 h-8 text-accent/30 mb-4" />
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'text-warning fill-warning'
                          : 'text-foreground-light'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-primary">{testimonial.name}</div>
                    <div className="text-sm text-foreground-muted">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-foreground-muted mb-8">
            Get in touch to discuss how we can help secure your premises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Get a Quote</Button>
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
