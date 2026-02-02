'use client';

import Link from 'next/link';
import { FileQuestion, Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-background-secondary flex items-center justify-center">
          <FileQuestion className="w-12 h-12 text-foreground-light" />
        </div>

        {/* Error Code */}
        <p className="text-6xl font-bold text-accent mb-4">404</p>

        {/* Title */}
        <h1 className="text-2xl font-bold text-primary mb-3">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-foreground-muted mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. 
          It might have been moved, deleted, or never existed.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="primary">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="secondary">
              <Search className="w-5 h-5 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Back Link */}
        <div className="mt-6">
          <button
            onClick={() => typeof window !== 'undefined' && window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back to previous page
          </button>
        </div>
      </div>
    </div>
  );
}
