'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Building2,
  Mail,
  Phone,
  MapPin,
  Edit2,
} from 'lucide-react';
import { Button, Badge, useToast } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  {
    icon: Package,
    label: 'Order History',
    description: 'View and track your orders',
    href: '/account/orders',
  },
  {
    icon: Heart,
    label: 'Wishlist',
    description: 'Products you\'ve saved',
    href: '/account/wishlist',
  },
  {
    icon: MapPin,
    label: 'Addresses',
    description: 'Manage delivery addresses',
    href: '/account/addresses',
  },
  {
    icon: Settings,
    label: 'Account Settings',
    description: 'Password and preferences',
    href: '/account/settings',
  },
];

// Mock order data
const recentOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 970.00,
    items: 2,
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'processing',
    total: 485.00,
    items: 1,
  },
];

const statusColors = {
  pending: 'warning',
  processing: 'accent',
  shipped: 'accent',
  delivered: 'success',
  cancelled: 'error',
} as const;

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { addToast } = useToast();

  const handleSignOut = () => {
    logout();
    addToast('success', 'You have been signed out successfully');
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/account');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-pulse text-foreground-muted">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background-secondary min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
          My Account
        </h1>
        <p className="text-foreground-muted">
          Manage your account settings and view orders
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-border">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-primary">{user.name || 'User'}</h2>
                <Badge
                  variant={user.accountType === 'b2b' ? 'accent' : 'default'}
                  size="sm"
                >
                  {user.accountType === 'b2b' ? 'Business' : 'Personal'}
                </Badge>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-foreground-muted">{user.email}</span>
              </div>
              {user.company && (
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-accent" />
                  <span className="text-foreground-muted">{user.company}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-foreground-muted">{user.phone}</span>
                </div>
              )}
            </div>

            {/* Edit Profile Button */}
            <Button variant="outline" fullWidth size="sm">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>

            {/* Logout */}
            <button
              onClick={handleSignOut}
              className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-error hover:bg-error-bg rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Links */}
          <div className="grid sm:grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-border hover:border-accent/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-bg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary font-medium">{item.label}</h3>
                  <p className="text-sm text-foreground-muted">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-light group-hover:text-accent transition-colors" />
              </Link>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-primary">Recent Orders</h2>
              <Link
                href="/account/orders"
                className="text-sm text-accent hover:underline"
              >
                View All
              </Link>
            </div>

            {recentOrders.length > 0 ? (
              <div className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="flex items-center justify-between p-4 hover:bg-background-secondary transition-colors"
                  >
                    <div>
                      <p className="text-primary font-medium">{order.id}</p>
                      <p className="text-sm text-foreground-muted">
                        {new Date(order.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        • {order.items} {order.items === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-medium">
                        £{order.total.toFixed(2)}
                      </p>
                      <Badge
                        variant={statusColors[order.status as keyof typeof statusColors]}
                        size="sm"
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Package className="w-12 h-12 text-foreground-light mx-auto mb-4" />
                <p className="text-foreground-muted">No orders yet</p>
                <Link href="/products">
                  <Button variant="outline" size="sm" className="mt-4">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* B2B Account Info */}
          {user.accountType === 'b2b' && (
            <div className="bg-accent-bg rounded-xl p-6 border border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-primary font-semibold mb-1">
                    Business Account Benefits
                  </h3>
                  <p className="text-sm text-foreground-muted mb-4">
                    As a business customer, you have access to volume discounts,
                    priority support, and dedicated account management.
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Account Manager
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
