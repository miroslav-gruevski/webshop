'use client';

/**
 * Cart Context
 * 
 * Manages shopping cart state throughout the application.
 * Currently uses localStorage for persistence.
 * 
 * TODO: [BACKEND] Sync cart with server for logged-in users
 * TODO: [BACKEND] Merge guest cart with user cart on login
 * TODO: [BACKEND] Use cartService from @/lib/api for persistence
 * TODO: [BACKEND] Add real-time stock validation
 * 
 * @module context/CartContext
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Cart } from '@/types';
import { STORAGE_KEYS, ECOMMERCE } from '@/lib/config/constants';

interface CartContextType extends Cart {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  // TODO: [BACKEND] For logged-in users, fetch cart from API instead
  // TODO: [BACKEND] Use cartService.getCart() for server-side cart
  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEYS.cart);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  // TODO: [BACKEND] Sync with server for logged-in users
  // TODO: [BACKEND] Use cartService.syncCart() for persistence
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  /**
   * Add product to cart
   * 
   * TODO: [BACKEND] Validate stock availability before adding
   * TODO: [BACKEND] Use cartService.addItem() for logged-in users
   */
  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Respect max quantity limit
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          ECOMMERCE.cart.maxQuantityPerItem
        );
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      // Respect max items limit
      if (currentItems.length >= ECOMMERCE.cart.maxItemsInCart) {
        console.warn('Cart is full');
        return currentItems;
      }

      return [...currentItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find((item) => item.product.id === productId);
    return item?.quantity || 0;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
