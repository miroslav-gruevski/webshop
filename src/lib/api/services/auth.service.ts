/**
 * Authentication Service
 * 
 * Handles all authentication-related API operations.
 * Currently uses mock implementation - will connect to backend auth API.
 * 
 * @module lib/api/services/auth
 */

import type { User } from '@/types';
import { apiClient, type ApiResponse, ApiClientError } from '../client';

// =============================================================================
// TYPES
// =============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  acceptTerms: boolean;
  subscribeNewsletter?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

// =============================================================================
// MOCK DATA
// TODO: [BACKEND] Remove mock data when API is connected
// =============================================================================

/**
 * Mock users for development
 * TODO: [BACKEND] Remove - authentication will be handled by backend
 * 
 * Test credentials:
 * - demo@example.com / demo123 (regular user)
 * - business@example.com / business123 (business account with trade pricing)
 */
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    firstName: 'Demo',
    lastName: 'User',
    accountType: 'b2c',
    role: 'customer',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'business@example.com',
    password: 'business123',
    name: 'Business Account',
    firstName: 'Business',
    lastName: 'Account',
    company: 'Acme Security Ltd',
    accountType: 'b2b',
    role: 'trade',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// In-memory registered users for development
let registeredUsers = [...MOCK_USERS];

// =============================================================================
// SERVICE IMPLEMENTATION
// =============================================================================

/**
 * Authentication Service
 * 
 * TODO: [BACKEND] Replace mock implementations with actual API calls
 * TODO: [BACKEND] Endpoint: POST /api/auth/login
 * TODO: [BACKEND] Endpoint: POST /api/auth/register
 * TODO: [BACKEND] Endpoint: POST /api/auth/logout
 * TODO: [BACKEND] Endpoint: POST /api/auth/refresh
 * TODO: [BACKEND] Endpoint: POST /api/auth/forgot-password
 * TODO: [BACKEND] Endpoint: POST /api/auth/reset-password
 * TODO: [BACKEND] Endpoint: GET /api/auth/me
 */
export const authService = {
  /**
   * Login user with email and password
   * 
   * TODO: [BACKEND] Replace with: apiClient.post<AuthResponse>('/auth/login', credentials)
   * TODO: [BACKEND] Store tokens securely (HttpOnly cookies preferred)
   * TODO: [BACKEND] Handle MFA if enabled
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(500);
    
    const user = registeredUsers.find(
      u => u.email.toLowerCase() === credentials.email.toLowerCase()
    );
    
    if (!user || user.password !== credentials.password) {
      throw new ApiClientError('Invalid email or password', 'INVALID_CREDENTIALS');
    }
    
    // Create mock response (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      data: {
        user: userWithoutPassword,
        tokens: {
          accessToken: `mock_access_token_${user.id}`,
          refreshToken: `mock_refresh_token_${user.id}`,
          expiresIn: 3600,
        },
      },
      success: true,
    };
    // =========================================================================
  },

  /**
   * Register a new user
   * 
   * TODO: [BACKEND] Replace with: apiClient.post<AuthResponse>('/auth/register', data)
   * TODO: [BACKEND] Handle email verification flow
   */
  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(500);
    
    // Check if email exists
    const existingUser = registeredUsers.find(
      u => u.email.toLowerCase() === data.email.toLowerCase()
    );
    
    if (existingUser) {
      throw new ApiClientError(
        'An account with this email already exists',
        'EMAIL_EXISTS'
      );
    }
    
    // Create new user
    const newUser: User & { password: string } = {
      id: String(registeredUsers.length + 1),
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`,
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      phone: data.phone,
      accountType: data.company ? 'b2b' : 'b2c',
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    
    registeredUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      data: {
        user: userWithoutPassword,
        tokens: {
          accessToken: `mock_access_token_${newUser.id}`,
          refreshToken: `mock_refresh_token_${newUser.id}`,
          expiresIn: 3600,
        },
      },
      success: true,
    };
    // =========================================================================
  },

  /**
   * Logout current user
   * 
   * TODO: [BACKEND] Replace with: apiClient.post('/auth/logout')
   * TODO: [BACKEND] Invalidate tokens on server
   */
  async logout(): Promise<ApiResponse<void>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(100);
    
    // TODO: [BACKEND] Clear tokens from storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    
    return {
      data: undefined,
      success: true,
    };
    // =========================================================================
  },

  /**
   * Get current user profile
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<User>('/auth/me')
   */
  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(100);
    
    // In production, this would validate the token and return user data
    return {
      data: null,
      success: true,
    };
    // =========================================================================
  },

  /**
   * Request password reset email
   * 
   * TODO: [BACKEND] Replace with: apiClient.post('/auth/forgot-password', { email })
   */
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(500);
    
    // Always return success to prevent email enumeration
    return {
      data: undefined,
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.',
    };
    // =========================================================================
  },

  /**
   * Reset password with token
   * 
   * TODO: [BACKEND] Replace with: apiClient.post('/auth/reset-password', data)
   */
  async resetPassword(data: PasswordResetConfirm): Promise<ApiResponse<void>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(500);
    
    return {
      data: undefined,
      success: true,
      message: 'Your password has been reset successfully.',
    };
    // =========================================================================
  },

  /**
   * Refresh access token
   * 
   * TODO: [BACKEND] Replace with: apiClient.post<AuthTokens>('/auth/refresh', { refreshToken })
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthTokens>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(100);
    
    return {
      data: {
        accessToken: `mock_access_token_refreshed`,
        refreshToken: `mock_refresh_token_refreshed`,
        expiresIn: 3600,
      },
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
