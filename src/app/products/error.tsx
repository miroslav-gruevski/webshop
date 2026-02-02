'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Package, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Products error:', error);
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-background-secondary flex items-center justify-center">
          <Package className="w-12 h-12 text-foreground-light" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-primary mb-3">
          Unable to Load Products
        </h1>

        {/* Description */}
        <p className="text-foreground-muted mb-6">
          We&apos;re having trouble loading our product catalog. 
          This might be a temporary issue - please try again.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-amber-50 rounded-lg text-left">
            <p className="text-sm font-medium text-amber-800 mb-1">Error:</p>
            <p className="text-sm text-amber-700 font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            onClick={reset}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="secondary">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
