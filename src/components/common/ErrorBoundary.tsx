'use client';

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors in child component tree and displays fallback UI.
 * Essential for production stability.
 * 
 * TODO: [BACKEND] Integrate with error reporting service (Sentry, LogRocket, etc.)
 * 
 * @module components/common/ErrorBoundary
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui';
import { ROUTES, COMPANY } from '@/lib/config/constants';

// =============================================================================
// TYPES
// =============================================================================

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// =============================================================================
// ERROR BOUNDARY CLASS COMPONENT
// =============================================================================

/**
 * Error Boundary - catches errors in child components
 * 
 * Must be a class component as React's error boundaries require
 * getDerivedStateFromError and componentDidCatch lifecycle methods.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // TODO: [BACKEND] Send error to monitoring service
    // Example: Sentry.captureException(error, { extra: { errorInfo } });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = (): void => {
    window.location.href = ROUTES.home;
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-error" />
            </div>
            
            <h2 className="text-xl font-semibold text-primary mb-2">
              Something went wrong
            </h2>
            
            <p className="text-foreground-muted mb-6">
              We apologise for the inconvenience. Please try again or contact us if the problem persists.
            </p>

            {/* Error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-background-secondary rounded-lg text-left overflow-auto">
                <p className="text-sm font-mono text-error mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <pre className="text-xs text-foreground-muted overflow-auto max-h-32">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={this.handleRetry}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" onClick={this.handleGoHome}>
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>

            <p className="text-sm text-foreground-light mt-6">
              Need help? Call us at{' '}
              <a href={`tel:${COMPANY.contact.phoneFormatted}`} className="text-accent hover:underline">
                {COMPANY.contact.phone}
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// =============================================================================
// HOOK-BASED ERROR RESET
// =============================================================================

/**
 * Error fallback component that can be used with try-catch in async functions
 */
export function ErrorFallback({
  error,
  resetError,
}: {
  error: Error;
  resetError?: () => void;
}) {
  return (
    <div className="min-h-[200px] flex items-center justify-center p-6">
      <div className="text-center">
        <AlertTriangle className="w-8 h-8 text-error mx-auto mb-3" />
        <p className="text-foreground-muted mb-4">
          {error.message || 'An error occurred'}
        </p>
        {resetError && (
          <Button size="sm" onClick={resetError}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}
