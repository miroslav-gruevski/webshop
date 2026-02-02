/**
 * API Services Barrel Export
 * 
 * All API services are exported from here for clean imports.
 * 
 * @example
 * import { productsService, authService, cartService } from '@/lib/api/services';
 */

export { productsService } from './products.service';
export { authService } from './auth.service';
export { cartService } from './cart.service';
export { ordersService } from './orders.service';
export { contentService } from './content.service';

// Re-export types
export type { ProductsListParams, ProductsListResponse } from './products.service';
export type { 
  LoginCredentials, 
  RegisterData, 
  AuthTokens, 
  AuthResponse 
} from './auth.service';
export type { 
  AddToCartRequest, 
  UpdateCartItemRequest, 
  CartSyncRequest 
} from './cart.service';
export type { 
  Order, 
  OrderItem, 
  Address, 
  CreateOrderRequest, 
  OrdersListParams 
} from './orders.service';
export type {
  TeamMember,
  Testimonial,
  FAQ,
  FAQCategory,
  JobListing,
  CompanyInfo,
} from './content.service';
