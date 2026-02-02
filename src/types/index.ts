/**
 * Application Type Definitions
 * 
 * Centralized type definitions for the entire application.
 * Organized by domain for better maintainability.
 * 
 * @module types
 */

// =============================================================================
// PRODUCT TYPES
// =============================================================================

/**
 * Product entity
 * TODO: [BACKEND] Align with API response schema
 */
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  shortDescription: string;
  specs: Record<string, string>;
  features: string[];
  inStock: boolean;
  stock?: number;
  stockCount?: number;
  sku: string;
  brand: string;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Category entity
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  parentId?: string;
  order?: number;
}

/**
 * Product filters for listing pages
 */
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  search?: string;
}

// =============================================================================
// CART TYPES
// =============================================================================

/**
 * Cart item (client-side with full product)
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Cart item (for API requests - product ID only)
 * TODO: [BACKEND] Use this for API requests
 */
export interface CartItemRequest {
  id: string;
  productId: string;
  quantity: number;
  variant?: string;
}

/**
 * Cart state (client-side)
 */
export interface Cart {
  items: CartItem[];
  totalItems?: number;
  totalPrice?: number;
}

/**
 * Cart response from API
 * TODO: [BACKEND] Cart response will include calculated totals
 */
export interface CartResponse {
  items: CartItemRequest[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

// =============================================================================
// USER & AUTH TYPES
// =============================================================================

/**
 * Account type for pricing tiers
 */
export type AccountType = 'b2b' | 'b2c';

/**
 * User roles for authorization
 */
export type UserRole = 'customer' | 'trade' | 'admin';

/**
 * User entity
 * TODO: [BACKEND] Align with API user schema
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  accountType: AccountType;
  role?: UserRole;
  company?: string;
  vatNumber?: string;
  phone?: string;
  address?: Address;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Address entity
 */
export interface Address {
  id?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  street: string;
  address1?: string;
  address2?: string;
  city: string;
  county?: string;
  postcode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
  type?: 'shipping' | 'billing';
}

/**
 * Authentication state
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Authentication tokens
 * TODO: [BACKEND] JWT token structure
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

// =============================================================================
// ORDER TYPES
// =============================================================================

/**
 * Order status enum
 */
export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

/**
 * Order line item
 */
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

/**
 * Order entity
 * TODO: [BACKEND] Align with order management system
 */
export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * API error response
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  statusCode?: number;
}

// =============================================================================
// UI TYPES
// =============================================================================

/**
 * Loading states for async operations
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Toast/notification types
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * Notification message
 */
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// =============================================================================
// FORM TYPES
// =============================================================================

/**
 * Form field error
 */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Form state
 */
export interface FormState<T> {
  values: T;
  errors: Record<keyof T, string | undefined>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// =============================================================================
// CONTENT TYPES (CMS)
// =============================================================================

/**
 * Team member for about/team pages
 * TODO: [BACKEND] Fetch from CMS
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  order: number;
}

/**
 * Testimonial/review
 * TODO: [BACKEND] Fetch from CMS or reviews API
 */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  featured: boolean;
  createdAt?: string;
}

/**
 * FAQ item
 * TODO: [BACKEND] Fetch from CMS
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

/**
 * Job listing
 * TODO: [BACKEND] Fetch from CMS or job board
 */
export interface JobListing {
  id: string;
  title: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  department: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  closingDate?: string;
  active: boolean;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extract the type of array elements
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/**
 * Make specific properties required
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * Make specific properties optional
 */
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
