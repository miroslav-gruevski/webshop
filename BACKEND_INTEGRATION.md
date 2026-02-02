# Backend Integration Guide

This document outlines all the areas of the frontend codebase that require backend integration. Search for `TODO: [BACKEND]` throughout the codebase to find all integration points.

## Quick Start for Backend Developers

1. **API Base URL**: Update `API_URL` in `.env.local` to point to your API
2. **Authentication**: Replace mock auth in `AuthContext` with JWT-based authentication
3. **Data Fetching**: Replace JSON imports with API calls using the services in `src/lib/api/services/`

## Architecture Overview

```
src/
├── lib/
│   ├── api/
│   │   ├── client.ts          # API client with request/response handling
│   │   └── services/          # Domain-specific API services
│   │       ├── auth.service.ts
│   │       ├── cart.service.ts
│   │       ├── content.service.ts
│   │       ├── orders.service.ts
│   │       └── products.service.ts
│   └── config/
│       ├── constants.ts       # App-wide constants including API endpoints
│       └── env.ts             # Environment variable management
├── context/                   # React Context (uses services internally)
├── data/                      # Static JSON data (to be replaced by API)
└── types/                     # TypeScript types (align with API schemas)
```

## Required API Endpoints

### Authentication (`/api/auth/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login with email/password |
| POST | `/auth/register` | Register new user |
| POST | `/auth/logout` | Invalidate session |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password with token |
| GET | `/auth/me` | Get current user profile |

### Products (`/api/products/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List products with filtering, sorting, pagination |
| GET | `/products/:slug` | Get single product |
| GET | `/products/featured` | Get featured products |
| GET | `/products/:id/related` | Get related products |
| GET | `/categories` | List all categories |
| GET | `/categories/:slug` | Get single category |

**Query Parameters for `/products`:**
- `category` - Filter by category slug
- `search` - Search in name/description
- `minPrice`, `maxPrice` - Price range
- `inStock` - Boolean, filter in-stock only
- `sortBy` - `price-asc`, `price-desc`, `name-asc`, `name-desc`, `rating`, `newest`
- `page`, `limit` - Pagination

### Cart (`/api/cart/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | Get user's cart |
| POST | `/cart/items` | Add item to cart |
| PUT | `/cart/items/:id` | Update item quantity |
| DELETE | `/cart/items/:id` | Remove item from cart |
| POST | `/cart/sync` | Sync guest cart with user cart |
| POST | `/cart/clear` | Clear entire cart |

### Orders (`/api/orders/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | List user's orders |
| GET | `/orders/:id` | Get single order |
| POST | `/orders` | Create new order (checkout) |
| POST | `/orders/:id/cancel` | Cancel order |

### User (`/api/user/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/profile` | Get user profile |
| PUT | `/user/profile` | Update user profile |
| GET | `/user/addresses` | List saved addresses |
| POST | `/user/addresses` | Add new address |
| PUT | `/user/addresses/:id` | Update address |
| DELETE | `/user/addresses/:id` | Delete address |
| GET | `/user/wishlist` | Get wishlist items |
| POST | `/user/wishlist` | Add to wishlist |
| DELETE | `/user/wishlist/:productId` | Remove from wishlist |

### Content (`/api/content/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/content/team` | Get team members |
| GET | `/content/testimonials` | Get testimonials |
| GET | `/content/faqs` | Get FAQs |
| GET | `/content/jobs` | Get job listings |
| POST | `/contact` | Submit contact form |
| POST | `/jobs/:id/apply` | Submit job application |
| POST | `/newsletter/subscribe` | Subscribe to newsletter |

## Response Format

All API responses should follow this structure:

```typescript
// Success response
{
  "data": T,           // The actual data
  "success": true,
  "message": "Optional success message"
}

// Error response
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE",
  "details": {         // Optional field-level errors
    "email": ["Email is required"]
  }
}

// Paginated response
{
  "data": T[],
  "success": true,
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## Authentication Flow

1. User submits login credentials
2. Backend validates and returns JWT tokens:
   - `accessToken` - Short-lived (1 hour)
   - `refreshToken` - Long-lived (7 days)
3. Frontend stores tokens securely (HttpOnly cookies preferred)
4. Access token included in `Authorization: Bearer <token>` header
5. When access token expires, use refresh token to get new tokens
6. On logout, invalidate tokens on backend

## Mock Data Locations

These files contain mock data that should be replaced with API calls:

| File | Mock Data | Replace With |
|------|-----------|--------------|
| `src/data/products.json` | Product catalog | `GET /products` |
| `src/data/categories.json` | Categories | `GET /categories` |
| `src/context/AuthContext.tsx` | Mock users | Auth API |
| `src/app/account/orders/page.tsx` | Order history | `GET /orders` |
| `src/app/account/addresses/page.tsx` | Saved addresses | `GET /user/addresses` |
| `src/app/team/page.tsx` | Team members | `GET /content/team` |
| `src/app/testimonials/page.tsx` | Testimonials | `GET /content/testimonials` |
| `src/app/faqs/page.tsx` | FAQs | `GET /content/faqs` |
| `src/app/careers/page.tsx` | Job listings | `GET /content/jobs` |

## Integration Steps

### Step 1: Set Up API Client

1. Update `API_URL` in `.env.local`
2. Configure authentication headers in `src/lib/api/client.ts`
3. Add any custom request/response interceptors

### Step 2: Replace Mock Authentication

1. Update `src/context/AuthContext.tsx` to use `authService`
2. Implement proper token storage (HttpOnly cookies recommended)
3. Add token refresh logic

### Step 3: Replace Product Data

1. Update product pages to use `productsService.getProducts()`
2. Update product detail page to use `productsService.getProductBySlug()`
3. Remove `src/data/products.json` import

### Step 4: Implement Cart Sync

1. For logged-in users, sync cart with backend
2. Merge guest cart with user cart on login
3. Update `src/context/CartContext.tsx` to use `cartService`

### Step 5: Add Checkout Flow

1. Implement `ordersService.createOrder()`
2. Integrate Stripe/payment processing
3. Add order confirmation page

### Step 6: Connect CMS Content

1. Replace static team/testimonial/FAQ data with API calls
2. Consider using a headless CMS (Contentful, Sanity, Strapi)

## Security Considerations

- Store tokens in HttpOnly cookies (not localStorage)
- Implement CSRF protection
- Rate limit API endpoints
- Validate and sanitize all user input
- Use HTTPS in production
- Implement proper CORS policies

## Testing

Test credentials for development:
- **Consumer Account**: demo@example.com / demo123
- **Trade Account**: business@example.com / business123

## Support

For questions about the frontend implementation, search for `TODO: [BACKEND]` comments in the codebase for specific integration points.
