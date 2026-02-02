'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  ArrowLeft,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  CreditCard,
  Calendar,
  Hash,
  Download,
  RotateCcw,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

// Mock order data - TODO: [BACKEND] Replace with API call to orders.service.ts
const ordersData = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 970.0,
    subtotal: 970.0,
    shipping: 0,
    tax: 0,
    items: [
      { 
        id: '1',
        name: 'SALTO XS4 One Electronic Lock', 
        slug: 'xs4-one-electronic-lock',
        quantity: 2, 
        price: 485.0,
        image: 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-one-list-ok.png?itok=27oXgqyn',
      },
    ],
    shippingAddress: {
      name: 'John Smith',
      line1: '123 Business Park',
      line2: 'Suite 456',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    billingAddress: {
      name: 'John Smith',
      line1: '123 Business Park',
      line2: 'Suite 456',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    trackingNumber: 'GB123456789',
    trackingUrl: 'https://www.royalmail.com/track-your-item',
    paymentMethod: 'Visa ending in 4242',
    deliveredDate: '2024-01-18',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'processing',
    total: 485.0,
    subtotal: 485.0,
    shipping: 0,
    tax: 0,
    items: [
      { 
        id: '5',
        name: 'SALTO Neo Cylinder', 
        slug: 'neo-european-cylinder',
        quantity: 1, 
        price: 485.0,
        image: 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neo-cylinder-euro-list-ok.png?itok=rz5zblGr',
      },
    ],
    shippingAddress: {
      name: 'John Smith',
      line1: '123 Business Park',
      line2: 'Suite 456',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    billingAddress: {
      name: 'John Smith',
      line1: '123 Business Park',
      line2: 'Suite 456',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    trackingNumber: null,
    trackingUrl: null,
    paymentMethod: 'Visa ending in 4242',
    deliveredDate: null,
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'shipped',
    total: 1250.0,
    subtotal: 1250.0,
    shipping: 0,
    tax: 0,
    items: [
      { 
        id: '8',
        name: 'SALTO XS4 Wall Reader', 
        slug: 'salto-wall-reader-xs4',
        quantity: 2, 
        price: 350.0,
        image: 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-wr-mtl-list-ok.png?itok=3dCEcBIl',
      },
      { 
        id: '12',
        name: 'SALTO Locker Lock', 
        slug: 'xs4-locker-lock',
        quantity: 2, 
        price: 275.0,
        image: 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-locker-list-ok.png?itok=uNThdvMJ',
      },
    ],
    shippingAddress: {
      name: 'Jane Doe',
      line1: '456 Office Complex',
      line2: '',
      city: 'Manchester',
      postcode: 'M1 2AB',
      country: 'United Kingdom',
    },
    billingAddress: {
      name: 'John Smith',
      line1: '123 Business Park',
      line2: 'Suite 456',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    trackingNumber: 'GB987654321',
    trackingUrl: 'https://www.royalmail.com/track-your-item',
    paymentMethod: 'Mastercard ending in 8888',
    deliveredDate: null,
  },
  {
    id: 'ORD-2024-004',
    date: '2024-01-10',
    status: 'cancelled',
    total: 320.0,
    subtotal: 320.0,
    shipping: 0,
    tax: 0,
    items: [
      { 
        id: '15',
        name: 'SALTO Electronic Padlock', 
        slug: 'neoxx-padlock-g4',
        quantity: 1, 
        price: 320.0,
        image: 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/neoxx-padlock-g4-list_0.png?itok=EA1dtfcB',
      },
    ],
    shippingAddress: {
      name: 'John Smith',
      line1: '123 Business Park',
      line2: 'Suite 456',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    billingAddress: {
      name: 'John Smith',
      line1: '123 Business Park',
      line2: 'Suite 456',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    trackingNumber: null,
    trackingUrl: null,
    paymentMethod: 'Visa ending in 4242',
    deliveredDate: null,
    cancelledReason: 'Customer requested cancellation',
  },
  {
    id: 'ORD-2023-089',
    date: '2023-12-15',
    status: 'delivered',
    total: 2150.0,
    subtotal: 2150.0,
    shipping: 0,
    tax: 0,
    items: [
      { 
        id: '1',
        name: 'SALTO XS4 One Electronic Lock', 
        slug: 'xs4-one-electronic-lock',
        quantity: 3, 
        price: 485.0,
        image: 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/xs4-one-list-ok.png?itok=27oXgqyn',
      },
      { 
        id: '18',
        name: 'SALTO Smart Credentials Pack (50)', 
        slug: 'salto-key-fobs-50',
        quantity: 1, 
        price: 695.0,
        image: 'https://saltosystems.com/sites/default/files/styles/breakpoint_1920/public/images/products/keyfobs-list-ok.png?itok=Oz3EB2FI',
      },
    ],
    shippingAddress: {
      name: 'John Smith',
      line1: '123 Business Park',
      line2: 'Suite 456',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    billingAddress: {
      name: 'John Smith',
      line1: '123 Business Park',
      line2: 'Suite 456',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
    },
    trackingNumber: 'GB111222333',
    trackingUrl: 'https://www.royalmail.com/track-your-item',
    paymentMethod: 'Visa ending in 4242',
    deliveredDate: '2023-12-18',
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

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, isLoading } = useAuth();
  const [order, setOrder] = useState<typeof ordersData[0] | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/account/orders');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    // TODO: [BACKEND] Replace with API call
    const orderId = params.id as string;
    const foundOrder = ordersData.find((o) => o.id === orderId);
    setOrder(foundOrder || null);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-background-secondary rounded w-48 mb-8" />
          <div className="space-y-4">
            <div className="h-32 bg-background-secondary rounded-xl" />
            <div className="h-48 bg-background-secondary rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
        <div className="text-center py-16 bg-background-secondary rounded-2xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Package className="w-10 h-10 text-foreground-light" />
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">Order not found</h2>
          <p className="text-foreground-muted mb-6">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/account/orders">
            <Button>View All Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[order.status as OrderStatus];
  const StatusIcon = status.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      {/* Order Header */}
      <div className="bg-white rounded-xl border border-border overflow-hidden mb-6">
        <div className="p-4 sm:p-6 border-b border-border bg-background-secondary/50">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <StatusIcon className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${
                  status.color === 'success' ? 'text-success' :
                  status.color === 'error' ? 'text-error' :
                  status.color === 'warning' ? 'text-warning' :
                  'text-accent'
                }`} />
                <h1 className="text-lg sm:text-2xl font-bold text-primary break-all">{order.id}</h1>
                <Badge variant={status.color} size="sm">{status.label}</Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-4 text-xs sm:text-sm text-foreground-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  Ordered: {new Date(order.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                {order.deliveredDate && (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-success" />
                    Delivered: {new Date(order.deliveredDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
            </div>
            {order.status === 'delivered' && (
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Invoice</span>
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Reorder</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Tracking Info */}
        {order.trackingNumber && order.status !== 'cancelled' && (
          <div className="p-3 sm:p-4 bg-accent-bg border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-primary">Tracking Number:</span>
                <span className="text-xs sm:text-sm text-foreground-muted break-all">{order.trackingNumber}</span>
              </div>
              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-accent hover:underline font-medium"
                >
                  Track Package →
                </a>
              )}
            </div>
          </div>
        )}

        {/* Cancelled Reason */}
        {'cancelledReason' in order && order.cancelledReason && (
          <div className="p-3 sm:p-4 bg-error/5 border-b border-border">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-error">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Cancellation Reason:</span>
              <span className="text-xs sm:text-sm">{order.cancelledReason}</span>
            </div>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl border border-border overflow-hidden mb-6">
        <div className="p-3 sm:p-4 border-b border-border bg-background-secondary/50">
          <h2 className="text-base sm:text-lg font-semibold text-primary">Order Items</h2>
        </div>
        <div className="divide-y divide-border">
          {order.items.map((item, idx) => (
            <div key={idx} className="p-3 sm:p-4">
              <div className="flex gap-3 sm:gap-4">
                <Link href={`/products/${item.slug}`} className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-background-secondary rounded-lg overflow-hidden relative flex items-center justify-center">
                    {/* Fallback icon shown behind image */}
                    <Package className="w-8 h-8 text-foreground-light/30 absolute" />
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1.5 sm:p-2 relative z-10"
                      sizes="(max-width: 640px) 64px, 80px"
                      onError={(e) => {
                        // Hide broken image to show fallback icon
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/products/${item.slug}`}
                    className="text-sm sm:text-base text-primary font-medium hover:text-accent transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs sm:text-sm text-foreground-muted mt-0.5 sm:mt-1">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-xs sm:text-sm text-foreground-muted">
                    Price: £{item.price.toFixed(2)} each
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-base sm:text-lg font-semibold text-primary">
                    £{(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="p-3 sm:p-4 bg-background-secondary/50 border-t border-border">
          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-foreground-muted">Subtotal</span>
              <span className="text-primary">£{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">Shipping</span>
              <span className="text-primary">{order.shipping === 0 ? 'Free' : `£${order.shipping.toFixed(2)}`}</span>
            </div>
            {order.tax > 0 && (
              <div className="flex justify-between">
                <span className="text-foreground-muted">Tax</span>
                <span className="text-primary">£{order.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-border text-sm sm:text-base font-semibold">
              <span className="text-primary">Total</span>
              <span className="text-primary">£{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping & Payment Info */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Shipping Address */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-border bg-background-secondary/50 flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
            <h2 className="text-base sm:text-lg font-semibold text-primary">Shipping Address</h2>
          </div>
          <div className="p-3 sm:p-4 text-sm sm:text-base">
            <p className="font-medium text-primary">{order.shippingAddress.name}</p>
            <p className="text-foreground-muted">{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 && (
              <p className="text-foreground-muted">{order.shippingAddress.line2}</p>
            )}
            <p className="text-foreground-muted">
              {order.shippingAddress.city}, {order.shippingAddress.postcode}
            </p>
            <p className="text-foreground-muted">{order.shippingAddress.country}</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-border bg-background-secondary/50 flex items-center gap-2">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
            <h2 className="text-base sm:text-lg font-semibold text-primary">Payment Method</h2>
          </div>
          <div className="p-3 sm:p-4 text-sm sm:text-base">
            <p className="font-medium text-primary">{order.paymentMethod}</p>
            <p className="text-xs sm:text-sm text-foreground-muted mt-1.5 sm:mt-2">
              Billing address same as shipping
            </p>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-background-secondary rounded-xl text-center">
        <h3 className="text-base sm:text-lg font-semibold text-primary mb-1.5 sm:mb-2">Need Help?</h3>
        <p className="text-xs sm:text-sm text-foreground-muted mb-3 sm:mb-4">
          If you have any questions about your order, please contact our support team.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full">Contact Support</Button>
          </Link>
          <Link href="/faqs" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full">View FAQs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
