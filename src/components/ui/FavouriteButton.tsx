'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavourites } from '@/context/FavouritesContext';
import { useAuth } from '@/context/AuthContext';

interface FavouriteButtonProps {
  productId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

export default function FavouriteButton({
  productId,
  size = 'md',
  className = '',
  showTooltip = true,
}: FavouriteButtonProps) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const { isAuthenticated } = useAuth();
  const [showSignInHint, setShowSignInHint] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isFav = isFavourite(productId);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowSignInHint(true);
      setTimeout(() => setShowSignInHint(false), 3000);
      return;
    }

    setIsAnimating(true);
    toggleFavourite(productId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative" style={{ zIndex: showSignInHint ? 30 : 'auto' }}>
      <button
        onClick={handleClick}
        aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
        className={`
          ${sizeClasses[size]}
          flex items-center justify-center
          bg-white rounded-full shadow-md
          hover:shadow-lg hover:scale-110
          transition-all duration-200 ease-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
          ${isAnimating ? 'scale-125' : ''}
          ${className}
        `}
      >
        <Heart
          className={`
            ${iconSizes[size]}
            transition-all duration-200
            ${isFav ? 'fill-error text-error' : 'text-foreground-muted hover:text-error'}
          `}
          strokeWidth={isFav ? 0 : 1.5}
        />
      </button>

      {/* Sign in hint tooltip - positioned to the left to avoid overflow clipping */}
      {showTooltip && showSignInHint && (
        <div 
          className="absolute right-full top-1/2 -translate-y-1/2 mr-2 animate-fade-in pointer-events-auto"
          style={{ zIndex: 30 }}
        >
          <div className="bg-primary text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
            <a href="/login" className="underline hover:no-underline">
              Sign in
            </a>{' '}
            to save favourites
            {/* Arrow pointing right */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-primary" />
          </div>
        </div>
      )}
    </div>
  );
}
