/**
 * Skeleton Loading Components
 * 
 * Provides loading placeholder UI for better perceived performance.
 * Use these components while data is being fetched.
 * 
 * @module components/common/Skeleton
 */

import { cn } from '@/lib/utils';

// =============================================================================
// BASE SKELETON
// =============================================================================

interface SkeletonProps {
  className?: string;
}

/**
 * Base skeleton component with pulse animation
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-background-secondary rounded',
        className
      )}
    />
  );
}

// =============================================================================
// PRODUCT CARD SKELETON
// =============================================================================

/**
 * Skeleton for ProductCard component
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      {/* Image placeholder */}
      <Skeleton className="aspect-square w-full" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <Skeleton className="h-4 w-20" />
        
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        
        {/* Price and button */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// PRODUCT GRID SKELETON
// =============================================================================

interface ProductGridSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
}

/**
 * Skeleton for ProductGrid component
 */
export function ProductGridSkeleton({ count = 8, columns = 4 }: ProductGridSkeletonProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', gridCols[columns])}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// =============================================================================
// TEXT SKELETONS
// =============================================================================

/**
 * Skeleton for text content
 */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for page title
 */
export function TitleSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

// =============================================================================
// TABLE SKELETON
// =============================================================================

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

/**
 * Skeleton for table content
 */
export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-background-secondary p-4 flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4 flex gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// CARD SKELETON
// =============================================================================

/**
 * Generic card skeleton
 */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// FORM SKELETON
// =============================================================================

/**
 * Skeleton for form fields
 */
export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      ))}
      <Skeleton className="h-11 w-32 rounded-lg" />
    </div>
  );
}

// =============================================================================
// AVATAR SKELETON
// =============================================================================

interface AvatarSkeletonProps {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Skeleton for avatar/profile image
 */
export function AvatarSkeleton({ size = 'md' }: AvatarSkeletonProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  return <Skeleton className={cn('rounded-full', sizes[size])} />;
}

// =============================================================================
// PAGE SKELETON
// =============================================================================

/**
 * Full page loading skeleton
 */
export function PageSkeleton() {
  return (
    <div className="animate-fade-in">
      {/* Hero skeleton */}
      <Skeleton className="h-64 w-full" />
      
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TitleSkeleton />
        
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <TextSkeleton lines={5} />
          </div>
          <div>
            <CardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
