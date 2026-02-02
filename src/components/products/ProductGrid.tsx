import { Product } from '@/types';
import ProductCard from './ProductCard';
import ProductListCard from './ProductListCard';

export type ViewMode = 'grid' | 'list';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  viewMode?: ViewMode;
}

export default function ProductGrid({ products, columns = 4, viewMode = 'grid' }: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background-secondary flex items-center justify-center">
          <svg
            className="w-8 h-8 text-foreground-light"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-primary mb-2">No products found</h3>
        <p className="text-foreground-muted">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  // List view
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductListCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className={`grid ${gridCols[columns]} gap-4 lg:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
