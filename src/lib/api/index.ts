/**
 * API Module Barrel Export
 * 
 * Central export point for all API-related functionality.
 * 
 * @example
 * import { apiClient, productsService, ApiClientError } from '@/lib/api';
 */

export { apiClient, ApiClientError, type ApiResponse, type ApiError } from './client';
export * from './services';
