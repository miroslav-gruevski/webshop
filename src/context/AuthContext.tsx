'use client';

/**
 * Authentication Context
 * 
 * Provides authentication state and methods throughout the application.
 * 
 * TODO: [BACKEND] Replace mock implementation with authService from @/lib/api
 * TODO: [BACKEND] Implement proper token-based authentication (JWT)
 * TODO: [BACKEND] Add token refresh logic
 * TODO: [BACKEND] Handle session expiration
 * 
 * @module context/AuthContext
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, AccountType } from '@/types';
import { STORAGE_KEYS } from '@/lib/config/constants';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name: string,
    accountType: AccountType,
    company?: string
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =============================================================================
// MOCK DATA
// TODO: [BACKEND] Remove - Authentication will be handled by backend API
// =============================================================================

/**
 * Mock users for development and demo purposes
 * 
 * Test credentials:
 * - demo@example.com / demo123 (B2C consumer account)
 * - business@example.com / business123 (B2B trade account with VAT)
 * 
 * TODO: [BACKEND] Remove this mock data
 * TODO: [BACKEND] Use authService.login() and authService.register()
 */
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    accountType: 'b2c',
  },
  {
    id: '2',
    email: 'business@example.com',
    password: 'business123',
    name: 'Business User',
    accountType: 'b2b',
    company: 'Acme Corp',
    vatNumber: 'GB123456789',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount
  // TODO: [BACKEND] Replace with token validation and user fetch from API
  // TODO: [BACKEND] Use authService.getCurrentUser() to validate session
  useEffect(() => {
    const savedAuth = localStorage.getItem(STORAGE_KEYS.auth);
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setUser(parsedAuth);
      } catch (e) {
        console.error('Failed to parse auth from localStorage:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save auth state to localStorage whenever it changes
  // TODO: [BACKEND] This will be replaced by token storage
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.auth);
      }
    }
  }, [user, isLoading]);

  /**
   * Login with email and password
   * 
   * TODO: [BACKEND] Replace with:
   *   const response = await authService.login({ email, password });
   *   if (response.success) {
   *     setUser(response.data.user);
   *     // Store tokens securely
   *     return true;
   *   }
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    // TODO: [BACKEND] Remove mock implementation
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }

    return false;
  };

  /**
   * Register a new user
   * 
   * TODO: [BACKEND] Replace with:
   *   const response = await authService.register({
   *     email, password, firstName, lastName, company, acceptTerms: true
   *   });
   *   if (response.success) {
   *     setUser(response.data.user);
   *     return true;
   *   }
   */
  const register = async (
    email: string,
    password: string,
    name: string,
    accountType: AccountType,
    company?: string
  ): Promise<boolean> => {
    // TODO: [BACKEND] Remove mock implementation
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }

    // Create new user (in real app, this would be an API call)
    const newUser: User = {
      id: `${Date.now()}`,
      email,
      name,
      accountType,
      company: accountType === 'b2b' ? company : undefined,
    };

    // Add to mock users for this session
    mockUsers.push({ ...newUser, password });
    setUser(newUser);
    return true;
  };

  /**
   * Logout user
   * 
   * TODO: [BACKEND] Replace with:
   *   await authService.logout();
   *   // Clear all tokens and cached data
   */
  const logout = () => {
    // TODO: [BACKEND] Call authService.logout() to invalidate tokens
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
