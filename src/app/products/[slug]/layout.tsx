import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/types';

const products = productsData as unknown as Product[];

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found - ECS Systems',
      description: 'The requested product could not be found.',
    };
  }

  const title = `${product.name} - ${product.category} | ECS Systems`;
  const description = product.description.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: product.name,
      description,
      type: 'website',
      images: product.image.startsWith('http') 
        ? [{ url: product.image, alt: product.name }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: product.image.startsWith('http') ? [product.image] : undefined,
    },
  };
}

export default function ProductLayout({ children }: Props) {
  return children;
}
