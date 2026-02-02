/**
 * Orders Service
 * 
 * Handles all order-related API operations.
 * Currently uses mock data - will connect to backend API.
 * 
 * @module lib/api/services/orders
 */

import { apiClient, type ApiResponse } from '../client';

// =============================================================================
// TYPES
// =============================================================================

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  county?: string;
  postcode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethodId: string;
}

export interface OrdersListParams {
  page?: number;
  limit?: number;
  status?: Order['status'];
}

// =============================================================================
// MOCK DATA
// TODO: [BACKEND] Remove when API is connected
// =============================================================================

/**
 * Mock orders for development
 * TODO: [BACKEND] Orders will be fetched from order management system
 */
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ECS-2024-001234',
    status: 'delivered',
    items: [
      {
        id: 'item1',
        productId: 'xs4-original',
        productName: 'SALTO XS4 Original',
        productImage: 'https://saltosystems.com/en/wp-content/uploads/sites/2/2023/04/xs4-original-escutcheon-black.png',
        quantity: 2,
        price: 285.00,
        total: 570.00,
      },
    ],
    subtotal: 570.00,
    shipping: 0,
    tax: 114.00,
    total: 684.00,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Business Park',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Business Park',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    paymentMethod: 'Credit Card',
    trackingNumber: 'RM123456789GB',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-18T14:00:00Z',
  },
  {
    id: '2',
    orderNumber: 'ECS-2024-001189',
    status: 'shipped',
    items: [
      {
        id: 'item2',
        productId: 'neo-cylinder',
        productName: 'SALTO Neo Cylinder',
        productImage: 'https://saltosystems.com/en/wp-content/uploads/sites/2/2023/04/neo-cylinder-european.png',
        quantity: 5,
        price: 195.00,
        total: 975.00,
      },
    ],
    subtotal: 975.00,
    shipping: 0,
    tax: 195.00,
    total: 1170.00,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Business Park',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Business Park',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    paymentMethod: 'Bank Transfer',
    trackingNumber: 'DP987654321GB',
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
  },
];

// =============================================================================
// SERVICE IMPLEMENTATION
// =============================================================================

/**
 * Orders Service
 * 
 * TODO: [BACKEND] Replace mock implementations with actual API calls
 * TODO: [BACKEND] Endpoint: GET /api/orders
 * TODO: [BACKEND] Endpoint: GET /api/orders/:id
 * TODO: [BACKEND] Endpoint: POST /api/orders
 * TODO: [BACKEND] Endpoint: POST /api/orders/:id/cancel
 * TODO: [BACKEND] Integrate with payment processor (Stripe, PayPal, etc.)
 */
export const ordersService = {
  /**
   * Get user's orders
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<Order[]>('/orders', { params })
   */
  async getOrders(params: OrdersListParams = {}): Promise<ApiResponse<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
  }>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(300);
    
    let orders = [...MOCK_ORDERS];
    
    if (params.status) {
      orders = orders.filter(o => o.status === params.status);
    }
    
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const paginatedOrders = orders.slice(startIndex, startIndex + limit);
    
    return {
      data: {
        orders: paginatedOrders,
        total: orders.length,
        page,
        limit,
      },
      success: true,
    };
    // =========================================================================
  },

  /**
   * Get a single order by ID
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<Order>(`/orders/${id}`)
   */
  async getOrderById(id: string): Promise<ApiResponse<Order | null>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(200);
    
    const order = MOCK_ORDERS.find(o => o.id === id || o.orderNumber === id);
    
    return {
      data: order || null,
      success: true,
    };
    // =========================================================================
  },

  /**
   * Create a new order (checkout)
   * 
   * TODO: [BACKEND] Replace with: apiClient.post<Order>('/orders', request)
   * TODO: [BACKEND] Integrate payment processing
   * TODO: [BACKEND] Handle inventory reservation
   * TODO: [BACKEND] Send order confirmation email
   */
  async createOrder(request: CreateOrderRequest): Promise<ApiResponse<Order>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(1000);
    
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      orderNumber: `ECS-2024-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
      status: 'pending',
      items: [], // Would be populated from request
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      shippingAddress: request.shippingAddress,
      billingAddress: request.billingAddress,
      paymentMethod: 'Credit Card',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return {
      data: newOrder,
      success: true,
      message: 'Order created successfully',
    };
    // =========================================================================
  },

  /**
   * Cancel an order
   * 
   * TODO: [BACKEND] Replace with: apiClient.post<Order>(`/orders/${id}/cancel`)
   * TODO: [BACKEND] Handle refund processing
   */
  async cancelOrder(id: string): Promise<ApiResponse<Order>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(500);
    
    const order = MOCK_ORDERS.find(o => o.id === id);
    
    if (!order) {
      throw new Error('Order not found');
    }
    
    return {
      data: { ...order, status: 'cancelled' },
      success: true,
      message: 'Order cancelled successfully',
    };
    // =========================================================================
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function simulateNetworkDelay(ms: number = 100): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
