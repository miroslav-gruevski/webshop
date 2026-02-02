'use client';

import { useState, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import { Package, User, Image as ImageIcon, Building2 } from 'lucide-react';

type FallbackType = 'product' | 'user' | 'generic' | 'company';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackType?: FallbackType;
  fallbackClassName?: string;
}

const fallbackIcons: Record<FallbackType, typeof Package> = {
  product: Package,
  user: User,
  generic: ImageIcon,
  company: Building2,
};

/**
 * Image component with built-in error handling and fallback UI
 * 
 * When an image fails to load (404, network error, etc.), 
 * displays a styled fallback with an appropriate icon.
 */
export function ImageWithFallback({
  src,
  alt,
  fallbackType = 'generic',
  fallbackClassName = '',
  className = '',
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const FallbackIcon = fallbackIcons[fallbackType];

  // If no src or error occurred, show fallback
  if (!src || hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-background-secondary ${fallbackClassName || className}`}
        role="img"
        aria-label={alt}
      >
        <FallbackIcon className="w-1/3 h-1/3 max-w-12 max-h-12 text-foreground-light/40" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-background-secondary animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
}

/**
 * Product image with fallback - optimized for product cards and listings
 */
export function ProductImage({
  src,
  alt,
  className = '',
  ...props
}: Omit<ImageWithFallbackProps, 'fallbackType'>) {
  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      fallbackType="product"
      className={className}
      {...props}
    />
  );
}

/**
 * Avatar image with fallback - optimized for user profiles
 */
export function AvatarImage({
  src,
  alt,
  className = '',
  ...props
}: Omit<ImageWithFallbackProps, 'fallbackType'>) {
  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      fallbackType="user"
      className={className}
      {...props}
    />
  );
}
