/**
 * Common Components Barrel Export
 * 
 * @example
 * import { ErrorBoundary, Skeleton, ProductCardSkeleton, ImageWithFallback } from '@/components/common';
 */

export { default as ErrorBoundary, ErrorFallback } from './ErrorBoundary';
export {
  Skeleton,
  ProductCardSkeleton,
  ProductGridSkeleton,
  TextSkeleton,
  TitleSkeleton,
  TableSkeleton,
  CardSkeleton,
  FormSkeleton,
  AvatarSkeleton,
  PageSkeleton,
} from './Skeleton';
export { ImageWithFallback, ProductImage, AvatarImage } from './ImageWithFallback';
