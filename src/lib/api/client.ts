/**
 * API Client Configuration
 * 
 * This module provides a configured API client for making HTTP requests.
 * Currently uses mock implementations - replace with real API calls when backend is ready.
 * 
 * @module lib/api/client
 */

import { env } from '@/lib/config/env';

// =============================================================================
// TYPES
// =============================================================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

// =============================================================================
// API CLIENT
// =============================================================================

/**
 * Base API client for making HTTP requests
 * 
 * TODO: [BACKEND] Configure with actual API base URL from environment
 * TODO: [BACKEND] Add request/response interceptors for auth tokens
 * TODO: [BACKEND] Add retry logic for failed requests
 * TODO: [BACKEND] Add request queuing for offline support
 */
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    // TODO: [BACKEND] Replace with actual API URL from environment
    this.baseUrl = env.API_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get authentication headers
   * TODO: [BACKEND] Implement proper token retrieval from auth state
   */
  private getAuthHeaders(): Record<string, string> {
    // TODO: [BACKEND] Get auth token from secure storage (HttpOnly cookie or secure storage)
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('auth_token') 
      : null;
    
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }

  /**
   * Make an API request
   */
  async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, cache, next } = config;

    const url = `${this.baseUrl}${endpoint}`;
    
    const fetchConfig: RequestInit & { next?: NextFetchRequestConfig } = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeaders(),
        ...headers,
      },
      cache,
      next,
    };

    if (body && method !== 'GET') {
      fetchConfig.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, fetchConfig);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new ApiClientError(
          error.message || `HTTP ${response.status}`,
          response.status.toString(),
          error.details
        );
      }

      const data = await response.json();
      return {
        data,
        success: true,
      };
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }
      throw new ApiClientError(
        error instanceof Error ? error.message : 'Unknown error',
        'NETWORK_ERROR'
      );
    }
  }

  // Convenience methods
  get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  post<T>(endpoint: string, body: unknown, config?: Omit<RequestConfig, 'method'>) {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  put<T>(endpoint: string, body: unknown, config?: Omit<RequestConfig, 'method'>) {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  patch<T>(endpoint: string, body: unknown, config?: Omit<RequestConfig, 'method'>) {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
  }

  delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// =============================================================================
// ERROR CLASS
// =============================================================================

export class ApiClientError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

// =============================================================================
// SINGLETON EXPORT
// =============================================================================

export const apiClient = new ApiClient();
