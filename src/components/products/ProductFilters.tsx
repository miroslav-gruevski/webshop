'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Filter, X, ChevronDown, RotateCcw } from 'lucide-react';
import { ProductFilters as Filters, Category } from '@/types';
import { Button, Input } from '@/components/ui';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface ProductFiltersProps {
  filters: Filters;
  categories: Category[];
  onFiltersChange: (filters: Filters) => void;
  onReset: () => void;
}

export default function ProductFilters({
  filters,
  categories,
  onFiltersChange,
  onReset,
}: ProductFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    availability: true,
  });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const focusTrapRef = useFocusTrap(isMobileOpen);

  // Handle Escape key to close mobile drawer
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsMobileOpen(false);
    }
  }, []);

  // Focus management and keyboard handlers
  useEffect(() => {
    if (isMobileOpen) {
      document.addEventListener('keydown', handleKeyDown);
      closeButtonRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileOpen, handleKeyDown]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <button
          onClick={() => toggleSection('category')}
          aria-expanded={expandedSections.category}
          aria-controls="filter-categories"
          className="flex items-center justify-between w-full text-primary font-medium mb-3 py-2 hover:opacity-80 transition-opacity"
        >
          Categories
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedSections.category ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.category && (
          <div id="filter-categories" className="space-y-2 animate-fade-in">
            <button
              onClick={() =>
                onFiltersChange({ ...filters, category: undefined })
              }
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !filters.category
                  ? 'bg-accent-bg text-accent'
                  : 'text-foreground-muted hover:bg-background-secondary'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  onFiltersChange({ ...filters, category: category.slug })
                }
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  filters.category === category.slug
                    ? 'bg-accent-bg text-accent'
                    : 'text-foreground-muted hover:bg-background-secondary'
                }`}
              >
                {category.name}
                <span className="text-xs ml-2 text-foreground-light">
                  ({category.productCount})
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          aria-expanded={expandedSections.price}
          aria-controls="filter-price"
          className="flex items-center justify-between w-full text-primary font-medium mb-3 py-2 hover:opacity-80 transition-opacity"
        >
          Price Range
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedSections.price ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.price && (
          <div id="filter-price" className="space-y-3 animate-fade-in">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    minPrice: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    maxPrice: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Availability */}
      <div>
        <button
          onClick={() => toggleSection('availability')}
          aria-expanded={expandedSections.availability}
          aria-controls="filter-availability"
          className="flex items-center justify-between w-full text-primary font-medium mb-3 py-2 hover:opacity-80 transition-opacity"
        >
          Availability
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedSections.availability ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.availability && (
          <label id="filter-availability" className="flex items-center gap-3 cursor-pointer animate-fade-in min-h-[44px]">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  inStock: e.target.checked || undefined,
                })
              }
              className="w-5 h-5 rounded border-border bg-white text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer accent-accent"
            />
            <span className="text-sm text-foreground-muted">In Stock Only</span>
          </label>
        )}
      </div>

      {/* Reset Filters */}
      <button 
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 text-sm text-foreground-muted hover:text-primary py-2 transition-colors duration-200"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Filters Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white rounded-xl p-5 border border-border sticky top-24">
          <h2 className="text-lg font-semibold text-primary mb-4">Filters</h2>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Button - This is rendered separately via openMobileFilters */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden inline-flex items-center gap-2 px-4 py-2 min-h-[44px] border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all duration-200 hover:shadow-md active:scale-[0.98]"
      >
        <Filter className="w-4 h-4" />
        Filters
      </button>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={focusTrapRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filters-title"
            className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white p-5 overflow-y-auto animate-slide-in-left"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 id="mobile-filters-title" className="text-lg font-semibold text-primary">Filters</h2>
              <button
                ref={closeButtonRef}
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close filters"
                className="p-2 text-foreground-muted hover:text-primary hover:bg-background-secondary rounded-lg transition-all duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}
