/**
 * Cart Service
 * 
 * Handles all cart-related API operations.
 * Currently uses localStorage - will sync with backend API.
 * 
 * @module lib/api/services/cart
 */

import type { Cart, CartItem, Product } from '@/types';
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
  items: CartItem[];
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
    const cart = getCartFromStorage();
    
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
    // =========================================================================
    const cart = getCartFromStorage();
    
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === request.productId
    );
    
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += request.quantity;
    } else {
      cart.items.push({
        id: generateId(),
        productId: request.productId,
        quantity: request.quantity,
      });
    }
    
    saveCartToStorage(cart);
    
    return {
      data: cart,
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
    const cart = getCartFromStorage();
    
    const itemIndex = cart.items.findIndex(item => item.id === request.itemId);
    
    if (itemIndex >= 0) {
      if (request.quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = request.quantity;
      }
    }
    
    saveCartToStorage(cart);
    
    return {
      data: cart,
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
    const cart = getCartFromStorage();
    
    cart.items = cart.items.filter(item => item.id !== itemId);
    
    saveCartToStorage(cart);
    
    return {
      data: cart,
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
    const emptyCart: Cart = { items: [] };
    saveCartToStorage(emptyCart);
    
    return {
      data: emptyCart,
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
    const cart: Cart = { items: request.items };
    saveCartToStorage(cart);
    
    return {
      data: cart,
      success: true,
    };
    // =========================================================================
  },
};

// =============================================================================
// HELPER FUNCTIONS
// TODO: [BACKEND] These will be replaced by API calls
// =============================================================================

function getCartFromStorage(): Cart {
  if (typeof window === 'undefined') {
    return { items: [] };
  }
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
}

function saveCartToStorage(cart: Cart): void {
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
