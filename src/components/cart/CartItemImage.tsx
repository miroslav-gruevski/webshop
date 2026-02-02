'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package } from 'lucide-react';

interface CartItemImageProps {
  src: string;
  alt: string;
  href: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-16 h-16 sm:w-20 sm:h-20',
  md: 'w-full sm:w-32 h-32',
  lg: 'w-full sm:w-40 h-40',
};

/**
 * Cart item image with fallback handling
 * Used in cart page and cart drawer for consistent error handling
 */
export function CartItemImage({ src, alt, href, size = 'md' }: CartItemImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleError = useCallback(() => {
    setImageError(true);
  }, []);

  const hasValidImage = src && src.startsWith('http') && !imageError;

  return (
    <Link
      href={href}
      className={`${sizeClasses[size]} bg-background-secondary rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden relative group`}
    >
      {hasValidImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes={size === 'sm' ? '80px' : '128px'}
          onError={handleError}
        />
      ) : (
        <Package className="w-1/3 h-1/3 text-foreground-light/40" strokeWidth={1.5} />
      )}
    </Link>
  );
}
