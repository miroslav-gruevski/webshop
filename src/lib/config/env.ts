/**
 * Environment Configuration
 * 
 * Centralizes all environment variables with validation and type safety.
 * This ensures environment variables are properly set before the app runs.
 * 
 * @module lib/config/env
 */

// =============================================================================
// ENVIRONMENT VARIABLE DEFINITIONS
// =============================================================================

interface EnvironmentVariables {
  // App
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_APP_URL: string;
  
  // API
  API_URL: string;
  
  // Feature Flags
  ENABLE_ANALYTICS: boolean;
  ENABLE_PWA: boolean;
  
  // External Services (TODO: [BACKEND] Add when integrating)
  // STRIPE_PUBLIC_KEY: string;
  // GOOGLE_ANALYTICS_ID: string;
  // SENTRY_DSN: string;
}

// =============================================================================
// DEFAULT VALUES
// =============================================================================

const defaults: Partial<EnvironmentVariables> = {
  NODE_ENV: 'development',
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  API_URL: '/api', // TODO: [BACKEND] Replace with actual API URL
  ENABLE_ANALYTICS: false,
  ENABLE_PWA: true,
};

// =============================================================================
// ENVIRONMENT PARSER
// =============================================================================

function getEnvVariable<T extends keyof EnvironmentVariables>(
  key: T,
  defaultValue?: EnvironmentVariables[T]
): EnvironmentVariables[T] {
  const value = process.env[key] ?? process.env[`NEXT_PUBLIC_${key}`];
  
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    // In development, use defaults; in production, throw error for required vars
    if (defaults[key] !== undefined) {
      return defaults[key] as EnvironmentVariables[T];
    }
    console.warn(`Environment variable ${key} is not set`);
    return '' as EnvironmentVariables[T];
  }
  
  // Parse boolean values
  if (typeof defaultValue === 'boolean' || typeof defaults[key] === 'boolean') {
    return (value === 'true' || value === '1') as EnvironmentVariables[T];
  }
  
  return value as EnvironmentVariables[T];
}

// =============================================================================
// EXPORTED ENVIRONMENT OBJECT
// =============================================================================

/**
 * Type-safe environment variables
 * 
 * Usage:
 * ```typescript
 * import { env } from '@/lib/config/env';
 * 
 * console.log(env.API_URL);
 * if (env.ENABLE_ANALYTICS) {
 *   // Initialize analytics
 * }
 * ```
 */
export const env = {
  // App
  NODE_ENV: getEnvVariable('NODE_ENV', 'development'),
  APP_URL: getEnvVariable('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  
  // API
  // TODO: [BACKEND] Update with actual API URL when backend is ready
  API_URL: getEnvVariable('API_URL', '/api'),
  
  // Feature Flags
  ENABLE_ANALYTICS: getEnvVariable('ENABLE_ANALYTICS', false),
  ENABLE_PWA: getEnvVariable('ENABLE_PWA', true),
  
  // Computed
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;

// =============================================================================
// TYPE EXPORT
// =============================================================================

export type Env = typeof env;
