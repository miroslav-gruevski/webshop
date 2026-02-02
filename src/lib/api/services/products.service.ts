/**
 * Products Service
 * 
 * Handles all product-related API operations.
 * Currently uses mock data from JSON files - will connect to backend API.
 * 
 * @module lib/api/services/products
 */

import type { Product, Category, ProductFilters } from '@/types';
import { apiClient, type ApiResponse } from '../client';

// =============================================================================
// MOCK DATA IMPORTS
// TODO: [BACKEND] Remove these imports when API is connected
// =============================================================================
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

// =============================================================================
// TYPES
// =============================================================================

export interface ProductsListParams {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | 'rating';
  page?: number;
  limit?: number;
}

export interface ProductsListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// =============================================================================
// SERVICE IMPLEMENTATION
// =============================================================================

/**
 * Products Service
 * 
 * TODO: [BACKEND] Replace mock implementations with actual API calls
 * TODO: [BACKEND] Endpoint: GET /api/products
 * TODO: [BACKEND] Endpoint: GET /api/products/:slug
 * TODO: [BACKEND] Endpoint: GET /api/products/featured
 * TODO: [BACKEND] Endpoint: GET /api/categories
 */
export const productsService = {
  /**
   * Get all products with optional filtering
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<ProductsListResponse>('/products', { params })
   * TODO: [BACKEND] API should handle filtering, sorting, and pagination server-side
   */
  async getProducts(params: ProductsListParams = {}): Promise<ApiResponse<ProductsListResponse>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay();
    
    let products = [...(productsData as unknown as Product[])];
    
    // Apply filters (TODO: [BACKEND] Move filtering to server-side)
    if (params.category) {
      products = products.filter(p => p.category === params.category);
    }
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    if (params.minPrice !== undefined) {
      products = products.filter(p => p.price >= params.minPrice!);
    }
    if (params.maxPrice !== undefined) {
      products = products.filter(p => p.price <= params.maxPrice!);
    }
    if (params.inStock) {
      products = products.filter(p => (p.stockCount ?? p.stock ?? 0) > 0);
    }
    
    // Apply sorting (TODO: [BACKEND] Move sorting to server-side)
    if (params.sortBy) {
      products = sortProducts(products, params.sortBy);
    }
    
    // Apply pagination (TODO: [BACKEND] Move pagination to server-side)
    const page = params.page || 1;
    const limit = params.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);
    
    return {
      data: {
        products: paginatedProducts,
        total: products.length,
        page,
        limit,
        hasMore: startIndex + limit < products.length,
      },
      success: true,
    };
    // =========================================================================
  },

  /**
   * Get a single product by slug
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<Product>(`/products/${slug}`)
   */
  async getProductBySlug(slug: string): Promise<ApiResponse<Product | null>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay();
    
    const product = (productsData as unknown as Product[]).find(p => p.slug === slug);
    
    return {
      data: product || null,
      success: true,
    };
    // =========================================================================
  },

  /**
   * Get featured products for homepage
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<Product[]>('/products/featured')
   */
  async getFeaturedProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay();
    
    const products = (productsData as unknown as Product[])
      .filter(p => p.featured)
      .slice(0, limit);
    
    return {
      data: products,
      success: true,
    };
    // =========================================================================
  },

  /**
   * Get related products
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<Product[]>(`/products/${productId}/related`)
   */
  async getRelatedProducts(productId: string, limit: number = 4): Promise<ApiResponse<Product[]>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay();
    
    const currentProduct = (productsData as unknown as Product[]).find(p => p.id === productId);
    if (!currentProduct) {
      return { data: [], success: true };
    }
    
    const related = (productsData as unknown as Product[])
      .filter(p => p.category === currentProduct.category && p.id !== productId)
      .slice(0, limit);
    
    return {
      data: related,
      success: true,
    };
    // =========================================================================
  },

  /**
   * Get all categories
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<Category[]>('/categories')
   */
  async getCategories(): Promise<ApiResponse<Category[]>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay();
    
    return {
      data: categoriesData as unknown as Category[],
      success: true,
    };
    // =========================================================================
  },

  /**
   * Get a single category by slug
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<Category>(`/categories/${slug}`)
   */
  async getCategoryBySlug(slug: string): Promise<ApiResponse<Category | null>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay();
    
    const category = (categoriesData as unknown as Category[]).find(c => c.slug === slug);
    
    return {
      data: category || null,
      success: true,
    };
    // =========================================================================
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Simulate network delay for mock implementations
 * TODO: [BACKEND] Remove when API is connected
 */
function simulateNetworkDelay(ms: number = 100): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sort products by specified criteria
 * TODO: [BACKEND] Move to server-side when API is connected
 */
function sortProducts(products: Product[], sortBy: ProductsListParams['sortBy']): Product[] {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'newest':
    default:
      return sorted;
  }
}
