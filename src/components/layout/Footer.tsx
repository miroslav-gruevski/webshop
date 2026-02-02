import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'Electronic Locks', href: '/products?category=electronic-locks' },
    { name: 'Wall Readers', href: '/products?category=wall-readers' },
    { name: 'Electronic Cylinders', href: '/products?category=electronic-cylinders' },
    { name: 'Locker Locks', href: '/products?category=locker-locks' },
    { name: 'Electronic Padlocks', href: '/products?category=padlocks' },
    { name: 'Credentials', href: '/products?category=credentials' },
  ],
  support: [
    { name: 'Maintenance & Aftercare', href: '/maintenance' },
    { name: 'Estate Management', href: '/estate-management' },
    { name: '24/7 Response', href: '/response' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' },
  ],
  company: [
    { name: 'Testimonials & Ratings', href: '/testimonials' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Work for us', href: '/careers' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block mb-6" aria-label="ECS Systems - Home">
              <Image
                src="/ECS-logo.svg"
                alt="ECS Systems"
                width={64}
                height={64}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-primary-dark font-semibold mb-6 max-w-xs leading-relaxed">
              Quality design and engineering, careful installation and excellent
              aftercare - we're on your side.
            </p>
            <div className="space-y-3">
              <a
                href="tel:02083009996"
                className="flex items-center gap-3 text-sm text-foreground-muted hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                0208 300 9996
              </a>
              <a
                href="mailto:sales@ecssystems.co.uk"
                className="flex items-center gap-3 text-sm text-foreground-muted hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                sales@ecssystems.co.uk
              </a>
              <div className="flex items-start gap-3 text-sm text-foreground-muted">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span>75 Station Rd, Sidcup DA15 7DN</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-start-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-primary transition-colors group"
                  >
                    {link.name}
                    <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Support & Management
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-primary transition-colors group"
                  >
                    {link.name}
                    <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Why ECS?
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-primary transition-colors group"
                  >
                    {link.name}
                    <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground-light">
              © {new Date().getFullYear()} ECS Systems Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-foreground-light hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-foreground-light hover:text-primary transition-colors">
                Terms of Use
              </Link>
              <Link href="/cookies" className="text-sm text-foreground-light hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
