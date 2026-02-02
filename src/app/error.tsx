'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Page error:', error);
    }
    // TODO: [BACKEND] Send error to monitoring service (Sentry, etc.)
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-primary mb-3">
          Something Went Wrong
        </h1>

        {/* Description */}
        <p className="text-foreground-muted mb-6">
          We encountered an unexpected error. Please try again, or contact support if the problem persists.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
            <p className="text-sm font-medium text-red-800 mb-1">Error Details:</p>
            <p className="text-sm text-red-700 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Digest: {error.digest}
              </p>
            )}
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

        {/* Support Link */}
        <p className="mt-8 text-sm text-foreground-muted">
          Need help?{' '}
          <Link href="/contact" className="text-accent hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
