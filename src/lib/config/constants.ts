/**
 * Application Constants
 * 
 * Centralizes all magic numbers, strings, and configuration values.
 * Makes the codebase more maintainable and easier to update.
 * 
 * @module lib/config/constants
 */

// =============================================================================
// COMPANY INFORMATION
// TODO: [BACKEND] These could be fetched from CMS for easier updates
// =============================================================================

export const COMPANY = {
  name: 'ECS Systems',
  legalName: 'ECS Systems Limited',
  tagline: 'The Fire & Security Specialists',
  description: 'Quality design and engineering, careful installation and excellent aftercare - we\'re on your side.',
  founded: '2009',
  
  contact: {
    phone: '0208 300 9996',
    phoneFormatted: '+44 208 300 9996',
    email: 'sales@ecssystems.co.uk',
    supportEmail: 'support@ecssystems.co.uk',
    careersEmail: 'careers@ecssystems.co.uk',
  },
  
  address: {
    street: '75 Station Road',
    city: 'Sidcup',
    postcode: 'DA15 7DN',
    country: 'United Kingdom',
    full: '75 Station Road, Sidcup, DA15 7DN',
  },
  
  social: {
    linkedin: 'https://www.linkedin.com/company/ecs-systems-ltd',
    twitter: 'https://twitter.com/ecssystems',
    facebook: 'https://www.facebook.com/ecssystemsltd',
  },
} as const;

// =============================================================================
// E-COMMERCE SETTINGS
// =============================================================================

export const ECOMMERCE = {
  currency: {
    code: 'GBP',
    symbol: '£',
    locale: 'en-GB',
  },
  
  // TODO: [BACKEND] These should come from backend configuration
  shipping: {
    freeShippingThreshold: 250, // Free shipping for orders over £250
    standardShippingCost: 9.95,
    expressShippingCost: 19.95,
  },
  
  // TODO: [BACKEND] Tax rates should be calculated server-side
  tax: {
    vatRate: 0.20, // 20% UK VAT
    includeVat: true, // Prices shown include VAT
  },
  
  // Cart limits
  cart: {
    maxQuantityPerItem: 100,
    maxItemsInCart: 50,
  },
  
  // Stock status thresholds
  stock: {
    lowStockThreshold: 5,
    outOfStockThreshold: 0,
  },
} as const;

// =============================================================================
// UI CONFIGURATION
// =============================================================================

export const UI = {
  // Pagination
  pagination: {
    defaultPageSize: 12,
    pageSizeOptions: [12, 24, 48],
  },
  
  // Animations
  animations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Breakpoints (match Tailwind)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // Toast/notification durations
  notifications: {
    success: 3000,
    error: 5000,
    warning: 4000,
    info: 3000,
  },
  
  // Image placeholders
  images: {
    productPlaceholder: '/images/product-placeholder.svg',
    avatarPlaceholder: '/images/avatar-placeholder.svg',
  },
} as const;

// =============================================================================
// STORAGE KEYS
// =============================================================================

export const STORAGE_KEYS = {
  // Cart
  cart: 'salto-shop-cart',
  
  // Authentication
  auth: 'salto-shop-auth',
  authToken: 'auth_token',
  refreshToken: 'refresh_token',
  
  // Preferences
  favourites: 'ecs-favourites',
  recentlyViewed: 'ecs-recently-viewed',
  cookieConsent: 'ecs-cookie-consent',
  
  // UI State
  sidebarCollapsed: 'ecs-sidebar-collapsed',
  theme: 'ecs-theme',
} as const;

// =============================================================================
// API ENDPOINTS
// TODO: [BACKEND] Update these when API is implemented
// =============================================================================

export const API_ENDPOINTS = {
  // Products
  products: '/products',
  productBySlug: (slug: string) => `/products/${slug}`,
  featuredProducts: '/products/featured',
  relatedProducts: (id: string) => `/products/${id}/related`,
  
  // Categories
  categories: '/categories',
  categoryBySlug: (slug: string) => `/categories/${slug}`,
  
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  me: '/auth/me',
  
  // User
  profile: '/user/profile',
  addresses: '/user/addresses',
  addressById: (id: string) => `/user/addresses/${id}`,
  
  // Cart
  cart: '/cart',
  cartItems: '/cart/items',
  cartItemById: (id: string) => `/cart/items/${id}`,
  cartSync: '/cart/sync',
  cartClear: '/cart/clear',
  
  // Orders
  orders: '/orders',
  orderById: (id: string) => `/orders/${id}`,
  orderCancel: (id: string) => `/orders/${id}/cancel`,
  
  // Checkout
  checkout: '/checkout',
  checkoutSession: '/checkout/session',
  
  // Content
  team: '/content/team',
  testimonials: '/content/testimonials',
  faqs: '/content/faqs',
  jobs: '/content/jobs',
  
  // Contact
  contact: '/contact',
  newsletter: '/newsletter/subscribe',
} as const;

// =============================================================================
// VALIDATION
// =============================================================================

export const VALIDATION = {
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: false,
  },
  
  email: {
    maxLength: 254,
  },
  
  name: {
    minLength: 1,
    maxLength: 100,
  },
  
  phone: {
    pattern: /^[\d\s\-\+\(\)]{10,20}$/,
  },
  
  postcode: {
    // UK postcode pattern
    pattern: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i,
  },
} as const;

// =============================================================================
// ROUTES
// =============================================================================

export const ROUTES = {
  home: '/',
  
  // Products
  products: '/products',
  productDetail: (slug: string) => `/products/${slug}`,
  
  // Categories
  category: (slug: string) => `/products?category=${slug}`,
  
  // Auth
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  
  // Account
  account: '/account',
  accountOrders: '/account/orders',
  accountAddresses: '/account/addresses',
  accountSettings: '/account/settings',
  accountWishlist: '/account/wishlist',
  
  // Cart & Checkout
  cart: '/cart',
  checkout: '/checkout',
  
  // Info pages
  about: '/about',
  contact: '/contact',
  team: '/team',
  careers: '/careers',
  testimonials: '/testimonials',
  faqs: '/faqs',
  
  // Support
  maintenance: '/maintenance',
  estateManagement: '/estate-management',
  response: '/response',
  
  // Legal
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookies',
} as const;
