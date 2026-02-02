'use client';

import { useState, useMemo, useEffect, Suspense, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, LayoutGrid, List, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ProductGrid, ProductFilters } from '@/components/products';
import { ViewMode } from '@/components/products/ProductGrid';
import { Input } from '@/components/ui';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import { Product, Category, ProductFilters as Filters } from '@/types';

const ITEMS_PER_PAGE_OPTIONS = [9, 18, 36];
const DEFAULT_ITEMS_PER_PAGE = 9;

const products = productsData as unknown as Product[];
const categories = categoriesData as unknown as Category[];

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const [filters, setFilters] = useState<Filters>({
    category: categoryParam || undefined,
    search: searchParam || undefined,
    sortBy: 'name',
  });

  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load view mode and items per page preference from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem('ecs-product-view-mode') as ViewMode | null;
    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      setViewMode(savedViewMode);
    }
    const savedItemsPerPage = localStorage.getItem('ecs-items-per-page');
    if (savedItemsPerPage) {
      const parsed = parseInt(savedItemsPerPage, 10);
      if (ITEMS_PER_PAGE_OPTIONS.includes(parsed)) {
        setItemsPerPage(parsed);
      }
    }
  }, []);

  // Save view mode preference to localStorage
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('ecs-product-view-mode', mode);
  };

  // Update filters when URL params change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryParam || undefined,
      search: searchParam || undefined,
    }));
    setSearchQuery(searchParam || '');
  }, [categoryParam, searchParam]);

  // Debounced search - update filters as user types
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchQuery || undefined }));
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Search suggestions - compute matching products
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase();
    const matches = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
    );
    
    // Return unique suggestions (max 6)
    return matches.slice(0, 6);
  }, [searchQuery]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation in suggestions
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || searchSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => 
          prev < searchSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < searchSuggestions.length) {
          e.preventDefault();
          const selectedProduct = searchSuggestions[selectedSuggestionIndex];
          setSearchQuery(selectedProduct.name);
          setShowSuggestions(false);
          setSelectedSuggestionIndex(-1);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  }, [showSuggestions, searchSuggestions, selectedSuggestionIndex]);

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (filters.category) {
      result = result.filter((p) => p.categorySlug === filters.category);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
      );
    }

    // Filter by price
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // Filter by stock
    if (filters.inStock) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'name':
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, itemsPerPage]);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      
      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    localStorage.setItem('ecs-items-per-page', value.toString());
  };

  const handleReset = () => {
    setFilters({
      sortBy: 'name',
    });
    setSearchQuery('');
  };

  const currentCategory = categories.find((c) => c.slug === filters.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
          {currentCategory ? currentCategory.name : 'All Products'}
        </h1>
        <p className="text-foreground-muted">
          {currentCategory
            ? currentCategory.description
            : 'Browse our complete range of SALTO electronic access control solutions.'}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <ProductFilters
          filters={filters}
          categories={categories}
          onFiltersChange={setFilters}
          onReset={handleReset}
        />

        {/* Products Section */}
        <div className="flex-1 min-w-0">
          {/* Search, Sort & Count Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 bg-background-secondary p-4 rounded-lg border border-border">
            {/* Search Box with Predictive Search */}
            <div ref={searchContainerRef} className="w-full sm:w-auto sm:flex-1 sm:max-w-sm relative">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-light pointer-events-none z-10">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  ref={inputRef}
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                    setSelectedSuggestionIndex(-1);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full pl-10 pr-10 py-2.5 min-h-[44px] sm:min-h-[42px] bg-white border border-border rounded-lg text-primary text-base sm:text-sm placeholder-foreground-light transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  aria-label="Search products"
                  aria-autocomplete="list"
                  aria-controls="search-suggestions"
                  aria-expanded={showSuggestions && searchSuggestions.length > 0}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-light hover:text-primary transition-colors p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div
                  id="search-suggestions"
                  role="listbox"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <div className="py-1">
                    {searchSuggestions.map((product, index) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        role="option"
                        aria-selected={index === selectedSuggestionIndex}
                        onClick={() => {
                          setShowSuggestions(false);
                          setSearchQuery('');
                        }}
                        className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                          index === selectedSuggestionIndex
                            ? 'bg-accent/10 text-accent'
                            : 'hover:bg-background-secondary'
                        }`}
                      >
                        <Search className="w-4 h-4 text-foreground-light flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-primary font-medium truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-foreground-muted truncate">
                            {product.category} · £{product.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {searchQuery.length >= 2 && (
                    <div className="border-t border-border px-4 py-2 bg-background-secondary">
                      <button
                        type="button"
                        onClick={() => {
                          setShowSuggestions(false);
                        }}
                        className="text-xs text-accent hover:underline"
                      >
                        View all {filteredProducts.length} results for &quot;{searchQuery}&quot;
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right side: Count, View Switcher, and Sort */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Item count */}
              <span className="text-sm text-foreground-muted whitespace-nowrap">
                Showing{' '}
                <span className="text-primary font-medium">
                  {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}
                </span>{' '}
                of {filteredProducts.length}
              </span>

              {/* View mode switcher */}
              <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'bg-white text-foreground-muted hover:text-primary hover:bg-background-secondary'
                  }`}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                >
                  <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'bg-white text-foreground-muted hover:text-primary hover:bg-background-secondary'
                  }`}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  <List className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Sort dropdown */}
              <select
                value={filters.sortBy || 'name'}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sortBy: e.target.value as Filters['sortBy'],
                  })
                }
                className="pl-3 pr-8 py-2 bg-white border border-border rounded-lg text-sm text-primary focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%235a6a7a%22%20d%3d%22M6%208L1%203h10z%22%2f%3e%3c%2fsvg%3e')] bg-no-repeat bg-[right_0.75rem_center]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid/List */}
          <ProductGrid products={paginatedProducts} columns={3} viewMode={viewMode} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Items per page selector */}
              <div className="flex items-center gap-2 text-sm text-foreground-muted">
                <span>Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value, 10))}
                  className="px-2 py-1 bg-white border border-border rounded-lg text-sm text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span>per page</span>
              </div>

              {/* Page navigation */}
              <nav className="flex items-center gap-1" aria-label="Pagination">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-border bg-white text-foreground-muted hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-foreground-muted transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) =>
                    page === 'ellipsis' ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-2 py-1 text-foreground-muted"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'bg-white border border-border text-foreground-muted hover:text-primary hover:border-primary'
                        }`}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-border bg-white text-foreground-muted hover:text-primary hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-foreground-muted transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </nav>

              {/* Page info (mobile-friendly) */}
              <div className="text-sm text-foreground-muted sm:hidden">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-background-secondary rounded mb-4" />
            <div className="h-6 w-96 bg-background-secondary rounded mb-8" />
            <div className="flex gap-8">
              <div className="hidden lg:block w-64 h-96 bg-background-secondary rounded-xl" />
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-background-secondary rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
