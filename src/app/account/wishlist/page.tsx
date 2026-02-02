'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { ProductGrid } from '@/components/products';
import { useAuth } from '@/context/AuthContext';
import { useFavourites } from '@/context/FavouritesContext';
import productsData from '@/data/products.json';
import { Product } from '@/types';

const allProducts = productsData as unknown as Product[];

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { favourites, clearFavourites } = useFavourites();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/account/wishlist');
    }
  }, [isAuthenticated, isLoading, router]);

  // Get favourite products
  const favouriteProducts = allProducts.filter((product) =>
    favourites.includes(product.id)
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-background-secondary rounded w-48 mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-background-secondary rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/account"
        className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Account
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent-bg flex items-center justify-center">
            <Heart className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">My Wishlist</h1>
            <p className="text-foreground-muted">
              {favouriteProducts.length} {favouriteProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        </div>

        {favouriteProducts.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFavourites}
            className="self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Content */}
      {favouriteProducts.length > 0 ? (
        <ProductGrid products={favouriteProducts} columns={4} />
      ) : (
        <div className="text-center py-16 bg-background-secondary rounded-2xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Heart className="w-10 h-10 text-foreground-light" />
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-foreground-muted mb-6 max-w-md mx-auto">
            Save your favourite products by clicking the heart icon on any product.
            They&apos;ll appear here for easy access.
          </p>
          <Link href="/products">
            <Button size="lg">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
