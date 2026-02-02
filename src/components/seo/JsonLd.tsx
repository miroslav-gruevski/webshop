'use client';

import { Product } from '@/types';

interface OrganizationJsonLdProps {
  type: 'organization';
}

interface ProductJsonLdProps {
  type: 'product';
  product: Product;
}

interface BreadcrumbJsonLdProps {
  type: 'breadcrumb';
  items: Array<{ name: string; url: string }>;
}

interface FAQJsonLdProps {
  type: 'faq';
  faqs: Array<{ question: string; answer: string }>;
}

interface LocalBusinessJsonLdProps {
  type: 'localBusiness';
}

type JsonLdProps = 
  | OrganizationJsonLdProps 
  | ProductJsonLdProps 
  | BreadcrumbJsonLdProps
  | FAQJsonLdProps
  | LocalBusinessJsonLdProps;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecssystems.co.uk/shop';

export default function JsonLd(props: JsonLdProps) {
  let structuredData: object;

  switch (props.type) {
    case 'organization':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ECS Systems',
        url: 'https://ecssystems.co.uk',
        logo: `${BASE_URL}/icons/icon-512x512.svg`,
        description: 'THE FIRE & SECURITY SPECIALISTS. Official SALTO partner providing premium electronic locks and access control systems.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'GB',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+44-208-300-9996',
          contactType: 'sales',
          email: 'sales@ecssystems.co.uk',
        },
        sameAs: [
          // Add social media links here when available
        ],
      };
      break;

    case 'product':
      const { product } = props;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`,
        sku: product.sku,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        category: product.category,
        offers: {
          '@type': 'Offer',
          url: `${BASE_URL}/products/${product.slug}`,
          priceCurrency: 'GBP',
          price: product.price.toFixed(2),
          priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'ECS Systems',
          },
        },
        ...(product.rating && product.reviewCount && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating.toFixed(1),
            reviewCount: product.reviewCount,
            bestRating: '5',
            worstRating: '1',
          },
        }),
      };
      break;

    case 'breadcrumb':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: props.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
        })),
      };
      break;

    case 'faq':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };
      break;

    case 'localBusiness':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://ecssystems.co.uk',
        name: 'ECS Systems Limited',
        description: 'THE FIRE & SECURITY SPECIALISTS. Official SALTO partner providing premium electronic locks and access control systems.',
        url: 'https://ecssystems.co.uk',
        telephone: '+44-208-300-9996',
        email: 'sales@ecssystems.co.uk',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '75 Station Rd',
          addressLocality: 'Sidcup',
          postalCode: 'DA15 7DN',
          addressCountry: 'GB',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 51.4337,
          longitude: 0.1003,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
        priceRange: '££',
        image: `${BASE_URL}/icons/icon-512x512.png`,
        sameAs: [],
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
