'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check, Lock, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button, Badge, FavouriteButton, useToast } from '@/components/ui';

interface ProductListCardProps {
  product: Product;
}

/**
 * ProductListCard Component
 * 
 * Displays a product in list view with horizontal layout.
 * Memoized to prevent unnecessary re-renders in product grids.
 */
const ProductListCard = memo(function ProductListCard({ product }: ProductListCardProps) {
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast('success', `${product.name} added to cart`);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const isExternalImage = product.image.startsWith('http');

  return (
    <article className="relative group bg-white rounded-xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
      {/* Favourite button - Positioned on the image area */}
      <div className="absolute top-6 right-6 sm:top-6 sm:left-[9.5rem] md:left-[11.5rem] sm:right-auto z-50">
        <FavouriteButton productId={product.id} size="sm" />
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col sm:flex-row gap-4 p-4"
        aria-label={`View ${product.name} - £${product.price.toFixed(2)}`}
      >
        {/* Image Container */}
        <div className="relative w-full sm:w-40 md:w-48 aspect-square sm:aspect-auto sm:h-40 md:h-48 flex-shrink-0 bg-background-secondary overflow-hidden rounded-lg">
          {isExternalImage ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, 192px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-background-tertiary flex items-center justify-center">
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Lock className="w-6 h-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {discountPercentage && (
              <Badge variant="accent" size="sm">
                -{discountPercentage}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="error" size="sm">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Category */}
          <span className="text-xs text-accent font-medium mb-1">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="text-primary font-semibold text-base sm:text-lg mb-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-foreground-muted text-sm line-clamp-2 mb-3 leading-relaxed">
            {product.shortDescription || product.description}
          </p>

          {/* Features (if available) */}
          {product.features && product.features.length > 0 && (
            <ul className="hidden md:flex flex-wrap gap-x-4 gap-y-1 mb-3">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-xs text-foreground-light flex items-center gap-1">
                  <Check className="w-3 h-3 text-success" strokeWidth={2} />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Bottom row: Price and Actions */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-foreground-light line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant={inCart ? 'secondary' : 'primary'}
                size="sm"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                aria-label={inCart ? `${product.name} is in cart` : `Add ${product.name} to cart`}
              >
                {inCart ? (
                  <>
                    <Check className="w-4 h-4 mr-1" strokeWidth={1.5} aria-hidden="true" />
                    In Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-1" strokeWidth={1.5} aria-hidden="true" />
                    Add to Cart
                  </>
                )}
              </Button>
              <span className="text-accent group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
});

export default ProductListCard;
