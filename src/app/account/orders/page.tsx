'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Package,
  ArrowLeft,
  Search,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
} from 'lucide-react';
import { Button, Badge, Input } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

// Mock order data
const orders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 970.0,
    items: [
      { name: 'SALTO XS4 One Electronic Lock', quantity: 2, price: 485.0 },
    ],
    shippingAddress: '123 Business Park, London, EC1A 1BB',
    trackingNumber: 'GB123456789',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'processing',
    total: 485.0,
    items: [
      { name: 'SALTO Neo Cylinder', quantity: 1, price: 485.0 },
    ],
    shippingAddress: '123 Business Park, London, EC1A 1BB',
    trackingNumber: null,
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'shipped',
    total: 1250.0,
    items: [
      { name: 'SALTO XS4 Wall Reader', quantity: 2, price: 350.0 },
      { name: 'SALTO Locker Lock', quantity: 2, price: 275.0 },
    ],
    shippingAddress: '456 Office Complex, Manchester, M1 2AB',
    trackingNumber: 'GB987654321',
  },
  {
    id: 'ORD-2024-004',
    date: '2024-01-10',
    status: 'cancelled',
    total: 320.0,
    items: [
      { name: 'SALTO Electronic Padlock', quantity: 1, price: 320.0 },
    ],
    shippingAddress: '123 Business Park, London, EC1A 1BB',
    trackingNumber: null,
  },
  {
    id: 'ORD-2023-089',
    date: '2023-12-15',
    status: 'delivered',
    total: 2150.0,
    items: [
      { name: 'SALTO XS4 One Electronic Lock', quantity: 3, price: 485.0 },
      { name: 'SALTO Smart Credentials Pack (50)', quantity: 1, price: 695.0 },
    ],
    shippingAddress: '123 Business Park, London, EC1A 1BB',
    trackingNumber: 'GB111222333',
  },
];

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const statusConfig: Record<OrderStatus, { color: 'warning' | 'accent' | 'success' | 'error' | 'default'; icon: typeof Clock; label: string }> = {
  pending: { color: 'warning', icon: Clock, label: 'Pending' },
  processing: { color: 'accent', icon: Package, label: 'Processing' },
  shipped: { color: 'accent', icon: Truck, label: 'Shipped' },
  delivered: { color: 'success', icon: CheckCircle2, label: 'Delivered' },
  cancelled: { color: 'error', icon: XCircle, label: 'Cancelled' },
};

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/account/orders');
    }
  }, [isAuthenticated, isLoading, router]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-background-secondary rounded w-48 mb-8" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-background-secondary rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/account"
        className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Account
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent-bg flex items-center justify-center">
            <Package className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Order History</h1>
            <p className="text-foreground-muted">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} total
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light" />
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-foreground-muted" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
            className="px-3 py-2 border border-border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const status = statusConfig[order.status as OrderStatus];
            const StatusIcon = status.icon;
            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-border hover:border-accent/50 transition-colors overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-border bg-background-secondary/50">
                  <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`w-5 h-5 ${
                        status.color === 'success' ? 'text-success' :
                        status.color === 'error' ? 'text-error' :
                        status.color === 'warning' ? 'text-warning' :
                        'text-accent'
                      }`} />
                      <span className="font-semibold text-primary">{order.id}</span>
                    </div>
                    <Badge variant={status.color} size="sm">
                      {status.label}
                    </Badge>
                  </div>
                  <div className="text-sm text-foreground-muted">
                    {new Date(order.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-foreground-muted">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-primary font-medium">
                          £{(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-border">
                    <div className="mb-3 sm:mb-0">
                      <p className="text-sm text-foreground-muted">
                        Shipping to: {order.shippingAddress}
                      </p>
                      {order.trackingNumber && (
                        <p className="text-sm text-accent">
                          Tracking: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-primary">
                        £{order.total.toFixed(2)}
                      </span>
                      <Link href={`/account/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-background-secondary rounded-2xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Package className="w-10 h-10 text-foreground-light" />
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">
            No orders found
          </h2>
          <p className="text-foreground-muted mb-6 max-w-md mx-auto">
            {searchQuery || statusFilter !== 'all'
              ? "Try adjusting your search or filter criteria."
              : "You haven't placed any orders yet. Start shopping to see your orders here."}
          </p>
          <Link href="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
