'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Minus,
  Plus,
  Shield,
  Truck,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';
import { Button, Badge, FavouriteButton, useToast } from '@/components/ui';
import { ProductGrid } from '@/components/products';
import { JsonLd } from '@/components/seo';
import { useCart } from '@/context/CartContext';
import productsData from '@/data/products.json';
import { Product } from '@/types';

const products = productsData as unknown as Product[];

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
        <p className="text-foreground-muted mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/products">
          <Button size="lg">Browse All Products</Button>
        </Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);
  const isExternalImage = product.image.startsWith('http');

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast('success', `${product.name} added to cart`);
    setQuantity(1);
  };

  const handleUpdateCart = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <>
      {/* Structured Data */}
      <JsonLd type="product" product={product} />
      <JsonLd
        type="breadcrumb"
        items={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
          { name: product.category, url: `/products?category=${product.categorySlug}` },
          { name: product.name, url: `/products/${product.slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-foreground-muted mb-8 overflow-x-auto">
          <Link href="/" className="hover:text-accent whitespace-nowrap">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 flex-shrink-0" />
        <Link href="/products" className="hover:text-accent whitespace-nowrap">
          Products
        </Link>
        <ChevronRight className="w-4 h-4 flex-shrink-0" />
        <Link
          href={`/products?category=${product.categorySlug}`}
          className="hover:text-accent whitespace-nowrap"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-4 h-4 flex-shrink-0" />
        <span className="text-primary truncate">{product.name}</span>
      </nav>

      {/* Back Button (Mobile) */}
      <button
        onClick={() => router.back()}
        aria-label="Go back to previous page"
        className="lg:hidden flex items-center gap-2 text-foreground-muted hover:text-primary mb-6 py-2 px-3 -ml-3 rounded-lg hover:bg-background-secondary transition-all duration-150 min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Product Details */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Product Image */}
        <div className="relative aspect-square bg-background-secondary rounded-2xl border border-border overflow-hidden">
          {isExternalImage ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-background-tertiary flex items-center justify-center">
              <div className="w-32 h-32 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <svg
                  className="w-16 h-16 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {discountPercentage && (
              <Badge variant="accent">-{discountPercentage}%</Badge>
            )}
            {!product.inStock && <Badge variant="error">Out of Stock</Badge>}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Category & SKU */}
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="text-sm text-accent hover:underline"
            >
              {product.category}
            </Link>
            <span className="text-sm text-foreground-muted">SKU: {product.sku}</span>
          </div>

          {/* Name and Favourite */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-primary">
              {product.name}
            </h1>
            <FavouriteButton productId={product.id} size="lg" />
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-foreground-light line-through">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-sm text-foreground-muted">exc. VAT</span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-6">
            {product.inStock ? (
              <>
                <Check className="w-5 h-5 text-success" />
                <span className="text-success">In Stock</span>
                {product.stockCount && (
                  <span className="text-foreground-muted">
                    ({product.stockCount} available)
                  </span>
                )}
              </>
            ) : (
              <span className="text-error">Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <p className="text-foreground-muted mb-8">{product.description}</p>

          {/* Add to Cart */}
          {product.inStock && (
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {inCart ? (
                <div className="flex items-center gap-4">
                  <span className="text-foreground-muted">In cart:</span>
                  <div className="flex items-center gap-2 bg-background-secondary rounded-lg p-1" role="group" aria-label="Adjust cart quantity">
                    <button
                      onClick={() => handleUpdateCart(cartQuantity - 1)}
                      aria-label="Decrease quantity"
                      className="w-11 h-11 flex items-center justify-center text-primary hover:bg-border rounded-lg transition-all duration-150 active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-primary font-medium" aria-live="polite" aria-atomic="true">
                      {cartQuantity}
                    </span>
                    <button
                      onClick={() => handleUpdateCart(cartQuantity + 1)}
                      aria-label="Increase quantity"
                      className="w-11 h-11 flex items-center justify-center text-primary hover:bg-border rounded-lg transition-all duration-150 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 bg-background-secondary rounded-lg p-1" role="group" aria-label="Select quantity">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="w-11 h-11 flex items-center justify-center text-primary hover:bg-border rounded-lg transition-all duration-150 active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-primary font-medium" aria-live="polite" aria-atomic="true">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                      className="w-11 h-11 flex items-center justify-center text-primary hover:bg-border rounded-lg transition-all duration-150 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button variant="primary" onClick={handleAddToCart} size="lg" className="flex-1">
                    <ShoppingCart className="w-5 h-5 mr-2" aria-hidden="true" />
                    Add to Cart
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border">
            <div className="flex flex-col items-center text-center">
              <Truck className="w-6 h-6 text-accent mb-2" />
              <span className="text-xs text-foreground-muted">Free Shipping</span>
              <span className="text-xs text-foreground-muted">Over £500</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-6 h-6 text-accent mb-2" />
              <span className="text-xs text-foreground-muted">2 Year</span>
              <span className="text-xs text-foreground-muted">Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="w-6 h-6 text-accent mb-2" />
              <span className="text-xs text-foreground-muted">30 Day</span>
              <span className="text-xs text-foreground-muted">Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Features */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <h2 className="text-lg font-semibold text-primary mb-4">Features</h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-foreground-muted">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Specifications
            </h2>
            <dl className="space-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <dt className="text-foreground-muted">{key}</dt>
                  <dd className="text-primary font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </>
  );
}
