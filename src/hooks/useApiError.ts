'use client';

import { useCallback } from 'react';
import { useToast } from '@/components/ui';
import { ApiClientError } from '@/lib/api/client';

type ErrorMessage = string | ((error: ApiClientError) => string);

interface UseApiErrorOptions {
  /** Default error message to show when no specific message is provided */
  defaultMessage?: string;
  /** Whether to show toast notifications for errors */
  showToast?: boolean;
}

/**
 * Custom hook for handling API errors with toast notifications
 * 
 * @example
 * const { handleError, withErrorHandling } = useApiError();
 * 
 * // Manual error handling
 * try {
 *   await apiCall();
 * } catch (error) {
 *   handleError(error, 'Failed to load products');
 * }
 * 
 * // Automatic error handling wrapper
 * const result = await withErrorHandling(
 *   () => apiCall(),
 *   'Failed to load products'
 * );
 */
export function useApiError(options: UseApiErrorOptions = {}) {
  const { defaultMessage = 'An error occurred. Please try again.', showToast = true } = options;
  const { addToast } = useToast();

  /**
   * Handle an error and show appropriate toast notification
   */
  const handleError = useCallback(
    (error: unknown, message?: ErrorMessage) => {
      if (!showToast) return;

      let errorMessage = defaultMessage;

      if (error instanceof ApiClientError) {
        // Use custom message function if provided
        if (typeof message === 'function') {
          errorMessage = message(error);
        } else if (typeof message === 'string') {
          errorMessage = message;
        } else {
          // Generate message based on error code
          errorMessage = getErrorMessage(error, defaultMessage);
        }
      } else if (typeof message === 'string') {
        errorMessage = message;
      }

      addToast('error', errorMessage);
      
      // Log error in development
      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', error);
      }

      return error;
    },
    [addToast, defaultMessage, showToast]
  );

  /**
   * Wrap an async function with automatic error handling
   */
  const withErrorHandling = useCallback(
    async <T>(
      fn: () => Promise<T>,
      errorMessage?: ErrorMessage
    ): Promise<T | null> => {
      try {
        return await fn();
      } catch (error) {
        handleError(error, errorMessage);
        return null;
      }
    },
    [handleError]
  );

  return {
    handleError,
    withErrorHandling,
  };
}

/**
 * Get user-friendly error message based on error code
 */
function getErrorMessage(error: ApiClientError, fallback: string): string {
  const errorMessages: Record<string, string> = {
    // Auth errors
    UNAUTHORIZED: 'Your session has expired. Please sign in again.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    EMAIL_EXISTS: 'An account with this email already exists.',
    ACCOUNT_LOCKED: 'Your account has been locked. Please contact support.',
    
    // Network errors
    NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
    TIMEOUT: 'Request timed out. Please try again.',
    
    // Server errors
    '500': 'Server error. Please try again later.',
    '502': 'Service temporarily unavailable.',
    '503': 'Service is under maintenance. Please try again later.',
    
    // Client errors
    '400': 'Invalid request. Please check your input.',
    '403': 'You don\'t have permission to perform this action.',
    '404': 'The requested resource was not found.',
    '409': 'This action conflicts with existing data.',
    '422': 'Invalid data provided. Please check your input.',
    '429': 'Too many requests. Please wait and try again.',
  };

  return errorMessages[error.code] || error.message || fallback;
}

/**
 * Common error messages for different operations
 */
export const API_ERROR_MESSAGES = {
  // Auth
  LOGIN_FAILED: 'Failed to sign in. Please check your credentials.',
  REGISTER_FAILED: 'Failed to create account. Please try again.',
  LOGOUT_FAILED: 'Failed to sign out. Please try again.',
  
  // Products
  PRODUCTS_LOAD_FAILED: 'Failed to load products. Please refresh the page.',
  PRODUCT_NOT_FOUND: 'Product not found.',
  
  // Cart
  ADD_TO_CART_FAILED: 'Failed to add item to cart.',
  UPDATE_CART_FAILED: 'Failed to update cart.',
  REMOVE_FROM_CART_FAILED: 'Failed to remove item from cart.',
  
  // Orders
  ORDERS_LOAD_FAILED: 'Failed to load orders.',
  ORDER_CREATE_FAILED: 'Failed to create order. Please try again.',
  
  // Account
  PROFILE_UPDATE_FAILED: 'Failed to update profile.',
  ADDRESS_SAVE_FAILED: 'Failed to save address.',
  
  // Generic
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;
