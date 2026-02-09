import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Shield,
  Smartphone,
  Lock,
  Zap,
  Award,
  Headphones,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { ProductGrid } from '@/components/products';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import { Product, Category } from '@/types';

export const metadata: Metadata = {
  title: 'ECS Systems Shop - Electronic Access Control & Security Solutions',
  description: 'Official SALTO partner providing premium electronic locks, wall readers, cylinders, and access control systems. Free shipping on orders over £500.',
  keywords: ['electronic locks', 'access control', 'SALTO', 'security systems', 'smart locks', 'wall readers'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ECS Systems Shop - Electronic Access Control Solutions',
    description: 'Official SALTO partner providing premium electronic locks and access control systems for businesses and homes.',
    type: 'website',
  },
};

const products = productsData as unknown as Product[];
const categories = categoriesData as unknown as Category[];

// Category images from SALTO (working URLs - PNG with transparent backgrounds)
const categoryImages: Record<string, string> = {
  'electronic-locks': 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-one-list-ok.png?itok=27oXgqyn',
  'wall-readers': 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/portada-xs4-one-s-eu.png?itok=qVdZwuVA',
  'electronic-cylinders': 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/aelement-list-ok.png?itok=lPjwa0-k',
  'locker-locks': 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-locker-list-ok.png?itok=uNThdvMJ',
  'padlocks': 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-padlock-g4-list_0.png?itok=EA1dtfcB',
  'credentials': 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/wearable-smart-wristbands-list-ok.png?itok=cm9HBQtu',
};

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and audit trails for complete peace of mind.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Access',
    description: 'Unlock doors with your smartphone using Bluetooth or NFC technology.',
  },
  {
    icon: Zap,
    title: 'Easy Installation',
    description: 'Retrofit solutions that work with your existing doors and frames.',
  },
  {
    icon: Award,
    title: 'SALTO Partner',
    description: 'Official SALTO Systems distributor with full manufacturer support.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert technical support whenever you need it, day or night.',
  },
  {
    icon: Lock,
    title: 'Full Warranty',
    description: 'Comprehensive warranty coverage on all products.',
  },
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section - Light, clean design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-background-secondary to-background-tertiary">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <div className="order-2 lg:order-1">
              <p className="text-xs tracking-[0.2em] uppercase text-primary/60 mb-4 font-medium">
                Official SALTO Systems Partner
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
                Smart Access Control{' '}
                <span className="text-accent">Solutions</span>
              </h1>
              <p className="text-base lg:text-lg text-foreground-muted mb-8 max-w-lg leading-relaxed">
                Premium electronic locks, cylinders, and credentials for commercial,
                education, healthcare, and residential properties. Expert installation and support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button variant="primary" size="lg" className="shadow-lg shadow-accent/30 px-8">
                    Browse Products
                    <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
                  </Button>
                </Link>
                <Button variant="secondary" size="lg" className="px-8">
                  Our Services
                </Button>
              </div>
              
              {/* Trust badges */}
              <div className="mt-10 pt-8 border-t border-border">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary">Certified</p>
                      <p className="text-xs text-foreground-light">SALTO Partner</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary">5+ Years</p>
                      <p className="text-xs text-foreground-light">Experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary">24/7</p>
                      <p className="text-xs text-foreground-light">Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right - Product showcase (hidden on mobile) */}
            <div className="relative order-1 lg:order-2 perspective-1000 hidden lg:block">
              {/* Main featured product */}
              <div className="relative bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-border transform lg:-rotate-y-2 lg:rotate-x-1 hover:rotate-y-0 hover:rotate-x-0 hover:scale-[1.02] transition-all duration-500 ease-out">
                <div className="aspect-square relative mb-4 bg-gradient-to-br from-background-secondary to-white rounded-xl overflow-hidden group">
                  <Image
                    src="https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-one-list-ok.png?itok=27oXgqyn"
                    alt="SALTO XS4 One Electronic Lock"
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    priority
                    loading="eager"
                  />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1">XS4 One Electronic Lock</h3>
                <p className="text-sm text-foreground-muted mb-3">Smart access with sleek design</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">£425.00</span>
                  <Link href="/products/xs4-one-electronic-lock">
                    <Button variant="primary" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Floating product cards */}
              <div className="hidden lg:block absolute -left-8 top-1/4 w-32 hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-white rounded-xl shadow-lg p-3 border border-border hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square relative bg-white rounded-lg overflow-hidden mb-2">
                    <Image
                      src="https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/aelement-fusion-list-ok.png?itok=bhu0MxBl"
                      alt="Aelement Fusion"
                      fill
                      sizes="128px"
                      className="object-contain p-1"
                    />
                  </div>
                  <p className="text-xs font-medium text-primary truncate">Aelement Fusion</p>
                  <p className="text-xs text-accent font-semibold">£595</p>
                </div>
              </div>
              
              <div className="hidden lg:block absolute -right-4 bottom-1/4 w-32 hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-white rounded-xl shadow-lg p-3 border border-border hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square relative bg-white rounded-lg overflow-hidden mb-2">
                    <Image
                      src="https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-padlock-g4-list_0.png?itok=EA1dtfcB"
                      alt="Neoxx Padlock"
                      fill
                      sizes="128px"
                      className="object-contain p-1"
                    />
                  </div>
                  <p className="text-xs font-medium text-primary truncate">Neoxx G4</p>
                  <p className="text-xs text-accent font-semibold">£295</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">
              Our Products
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Browse by Category
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Explore our comprehensive range of SALTO access control products,
              from electronic locks to credentials.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-[4/3] relative bg-background-secondary overflow-hidden">
                  {categoryImages[category.slug] ? (
                    <Image
                      src={categoryImages[category.slug]}
                      alt={category.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      loading={index < 2 ? 'eager' : 'lazy'}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Lock className="w-12 h-12 text-accent" strokeWidth={1} />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-primary font-medium text-sm mb-1 group-hover:text-accent transition-colors flex items-center gap-1">
                    {category.name}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  </h3>
                  <p className="text-xs text-foreground-light">
                    {category.productCount} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">
                Top Picks
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                Featured Products
              </h2>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-primary transition-colors">
              View All
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} columns={4} />

          <div className="mt-8 text-center sm:hidden">
            <Link href="/products">
              <Button variant="outline">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Why Choose ECS Systems?
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Quality design and engineering, careful installation and excellent
              aftercare - we're on your side.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border border-border hover:border-accent/30 transition-colors hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-bg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{feature.description}</p>
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
