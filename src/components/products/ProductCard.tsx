'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check, Package } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button, Badge, FavouriteButton, useToast } from '@/components/ui';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard Component
 * 
 * Displays a product in grid view with image, name, price, and actions.
 * Memoized to prevent unnecessary re-renders in product grids.
 */
const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();
  const [imageError, setImageError] = useState(false);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addToCart(product, 1);
    addToast('success', `${product.name} added to cart`);
  };

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const hasValidImage = product.image && product.image.startsWith('http') && !imageError;

  return (
    <article className="relative group bg-white rounded-xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg flex flex-col">
      {/* Favourite button - Outside image container to avoid overflow clipping */}
      <div className="absolute top-3 right-3 z-50">
        <FavouriteButton productId={product.id} size="sm" />
      </div>

      {/* Product Link - Main clickable area */}
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col flex-1"
        aria-label={`View ${product.name} - £${product.price.toFixed(2)}`}
      >
        {/* Image Container */}
        <div className="relative aspect-square bg-background-secondary overflow-hidden rounded-t-xl">
          {hasValidImage ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={handleImageError}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-background-tertiary flex items-center justify-center">
              <div className="text-foreground-light text-center p-4">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <Package className="w-8 h-8 text-foreground-light/50" strokeWidth={1.5} aria-hidden="true" />
                </div>
              </div>
            </div>
          )}

          {/* Hover overlay - Only covers image area */}
          <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

          {/* Quick add button - Centered on image */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <Button
              variant={inCart ? 'secondary' : 'primary'}
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={!product.inStock}
              className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto"
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
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
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
        <div className="p-4 flex flex-col flex-1">
          {/* Category */}
          <span className="text-xs text-accent font-medium mb-1">
            {product.category}
          </span>

          {/* Name - fixed 2 lines */}
          <h3 className="text-primary font-medium text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.75rem] group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Short description - fixed 2 lines */}
          <p className="text-foreground-muted text-xs line-clamp-2 mb-3 min-h-[2.5rem] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-bold text-primary">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-foreground-light line-through">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
});

export default ProductCard;
