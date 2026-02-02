/**
 * Cart Service
 * 
 * Handles all cart-related API operations.
 * Currently uses localStorage - will sync with backend API.
 * 
 * @module lib/api/services/cart
 */

import type { Cart, Product } from '@/types';
import { apiClient, type ApiResponse } from '../client';

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * localStorage key for cart data
 * TODO: [BACKEND] Cart will be stored server-side for logged-in users
 */
const CART_STORAGE_KEY = 'salto-shop-cart';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Mock cart item structure for localStorage
 * TODO: [BACKEND] This will be replaced by the API cart structure
 */
interface MockCartItem {
  id: string;
  productId: string;
  quantity: number;
}

interface MockCart {
  items: MockCartItem[];
  totalItems?: number;
  totalPrice?: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  variant?: string;
}

export interface UpdateCartItemRequest {
  itemId: string;
  quantity: number;
}

export interface CartSyncRequest {
  items: Array<{ product: Product; quantity: number }>;
}

// =============================================================================
// SERVICE IMPLEMENTATION
// =============================================================================

/**
 * Cart Service
 * 
 * TODO: [BACKEND] Replace localStorage with API calls for logged-in users
 * TODO: [BACKEND] Endpoint: GET /api/cart
 * TODO: [BACKEND] Endpoint: POST /api/cart/items
 * TODO: [BACKEND] Endpoint: PUT /api/cart/items/:id
 * TODO: [BACKEND] Endpoint: DELETE /api/cart/items/:id
 * TODO: [BACKEND] Endpoint: POST /api/cart/sync (merge guest cart with user cart)
 * TODO: [BACKEND] Endpoint: POST /api/cart/clear
 */
export const cartService = {
  /**
   * Get current cart
   * 
   * TODO: [BACKEND] For logged-in users: apiClient.get<Cart>('/cart')
   * TODO: [BACKEND] For guests: continue using localStorage
   */
  async getCart(): Promise<ApiResponse<Cart>> {
    // TODO: [BACKEND] Check if user is logged in and fetch from API
    // =========================================================================
    // MOCK IMPLEMENTATION - Using localStorage
    // =========================================================================
    const mockCart = getCartFromStorage();
    
    // Convert mock cart to Cart type (mock implementation)
    const cart: Cart = {
      items: [],
      totalItems: mockCart.items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: 0,
    };
    
    return {
      data: cart,
      success: true,
    };
    // =========================================================================
  },

  /**
   * Add item to cart
   * 
   * TODO: [BACKEND] Replace with: apiClient.post<Cart>('/cart/items', request)
   * TODO: [BACKEND] Handle stock validation server-side
   */
  async addItem(request: AddToCartRequest): Promise<ApiResponse<Cart>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Using localStorage
    // Note: This mock uses a simplified structure; real API will return full Cart
    // =========================================================================
    const mockCart = getCartFromStorage();
    
    const existingItemIndex = mockCart.items.findIndex(
      item => item.productId === request.productId
    );
    
    if (existingItemIndex >= 0) {
      mockCart.items[existingItemIndex].quantity += request.quantity;
    } else {
      mockCart.items.push({
        id: generateId(),
        productId: request.productId,
        quantity: request.quantity,
      });
    }
    
    saveCartToStorage(mockCart);
    
    // Return empty cart structure (actual implementation will be replaced by backend)
    return {
      data: { items: [], totalItems: 0, totalPrice: 0 },
      success: true,
    };
    // =========================================================================
  },

  /**
   * Update cart item quantity
   * 
   * TODO: [BACKEND] Replace with: apiClient.put<Cart>(`/cart/items/${itemId}`, { quantity })
   */
  async updateItem(request: UpdateCartItemRequest): Promise<ApiResponse<Cart>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Using localStorage
    // =========================================================================
    const mockCart = getCartFromStorage();
    
    const itemIndex = mockCart.items.findIndex(item => item.id === request.itemId);
    
    if (itemIndex >= 0) {
      if (request.quantity <= 0) {
        mockCart.items.splice(itemIndex, 1);
      } else {
        mockCart.items[itemIndex].quantity = request.quantity;
      }
    }
    
    saveCartToStorage(mockCart);
    
    return {
      data: { items: [], totalItems: 0, totalPrice: 0 },
      success: true,
    };
    // =========================================================================
  },

  /**
   * Remove item from cart
   * 
   * TODO: [BACKEND] Replace with: apiClient.delete<Cart>(`/cart/items/${itemId}`)
   */
  async removeItem(itemId: string): Promise<ApiResponse<Cart>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Using localStorage
    // =========================================================================
    const mockCart = getCartFromStorage();
    
    mockCart.items = mockCart.items.filter(item => item.id !== itemId);
    
    saveCartToStorage(mockCart);
    
    return {
      data: { items: [], totalItems: 0, totalPrice: 0 },
      success: true,
    };
    // =========================================================================
  },

  /**
   * Clear entire cart
   * 
   * TODO: [BACKEND] Replace with: apiClient.post<Cart>('/cart/clear')
   */
  async clearCart(): Promise<ApiResponse<Cart>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Using localStorage
    // =========================================================================
    const emptyMockCart: MockCart = { items: [], totalItems: 0, totalPrice: 0 };
    saveCartToStorage(emptyMockCart);
    
    return {
      data: { items: [], totalItems: 0, totalPrice: 0 },
      success: true,
    };
    // =========================================================================
  },

  /**
   * Sync guest cart with user cart after login
   * 
   * TODO: [BACKEND] Replace with: apiClient.post<Cart>('/cart/sync', { items })
   * TODO: [BACKEND] Server should merge guest items with existing user cart
   */
  async syncCart(request: CartSyncRequest): Promise<ApiResponse<Cart>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Just return the items as-is
    // =========================================================================
    // Convert Cart items to mock format for storage
    const mockItems: MockCartItem[] = request.items.map((item, index) => ({
      id: `sync-${index}`,
      productId: item.product.id,
      quantity: item.quantity,
    }));
    
    saveCartToStorage({ items: mockItems, totalItems: 0, totalPrice: 0 });
    
    return {
      data: { items: request.items, totalItems: 0, totalPrice: 0 },
      success: true,
    };
    // =========================================================================
  },
};

// =============================================================================
// HELPER FUNCTIONS
// TODO: [BACKEND] These will be replaced by API calls
// =============================================================================

function getCartFromStorage(): MockCart {
  if (typeof window === 'undefined') {
    return { items: [], totalItems: 0, totalPrice: 0 };
  }
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [], totalItems: 0, totalPrice: 0 };
  } catch {
    return { items: [], totalItems: 0, totalPrice: 0 };
  }
}

function saveCartToStorage(cart: MockCart): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    console.error('Failed to save cart to localStorage');
  }
}

function generateId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
