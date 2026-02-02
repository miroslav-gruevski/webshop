'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Home,
  Building2,
  Check,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

interface SavedAddress {
  id: string;
  label: string;
  type: 'home' | 'business';
  name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

// Mock addresses data
const initialAddresses: SavedAddress[] = [
  {
    id: '1',
    label: 'Main Office',
    type: 'business',
    name: 'John Smith',
    street: '123 Business Park, Suite 100',
    city: 'London',
    postcode: 'EC1A 1BB',
    country: 'United Kingdom',
    phone: '+44 20 7123 4567',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Warehouse',
    type: 'business',
    name: 'John Smith',
    street: '456 Industrial Estate',
    city: 'Manchester',
    postcode: 'M1 2AB',
    country: 'United Kingdom',
    phone: '+44 161 123 4567',
    isDefault: false,
  },
  {
    id: '3',
    label: 'Home',
    type: 'home',
    name: 'John Smith',
    street: '789 Residential Street, Flat 5',
    city: 'Birmingham',
    postcode: 'B1 1AA',
    country: 'United Kingdom',
    phone: '+44 121 123 4567',
    isDefault: false,
  },
];

export default function AddressesPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [addresses, setAddresses] = useState<SavedAddress[]>(initialAddresses);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/account/addresses');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    // Simulate API call
    setTimeout(() => {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      setDeletingId(null);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-background-secondary rounded w-48 mb-8" />
          <div className="grid sm:grid-cols-2 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-background-secondary rounded-xl" />
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
            <MapPin className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">My Addresses</h1>
            <p className="text-foreground-muted">
              {addresses.length} saved {addresses.length === 1 ? 'address' : 'addresses'}
            </p>
          </div>
        </div>

        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {/* Addresses Grid */}
      {addresses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`relative bg-white rounded-xl border p-5 transition-all ${
                address.isDefault
                  ? 'border-accent shadow-sm'
                  : 'border-border hover:border-accent/50'
              } ${deletingId === address.id ? 'opacity-50' : ''}`}
            >
              {/* Default Badge */}
              {address.isDefault && (
                <div className="absolute top-3 right-3">
                  <Badge variant="accent" size="sm">
                    <Check className="w-3 h-3 mr-1" />
                    Default
                  </Badge>
                </div>
              )}

              {/* Address Type Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  address.type === 'business' ? 'bg-accent-bg' : 'bg-background-secondary'
                }`}>
                  {address.type === 'business' ? (
                    <Building2 className="w-5 h-5 text-accent" />
                  ) : (
                    <Home className="w-5 h-5 text-foreground-muted" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{address.label}</h3>
                  <span className="text-xs text-foreground-muted capitalize">
                    {address.type} address
                  </span>
                </div>
              </div>

              {/* Address Details */}
              <div className="text-sm text-foreground-muted space-y-1 mb-4">
                <p className="text-primary font-medium">{address.name}</p>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.postcode}
                </p>
                <p>{address.country}</p>
                {address.phone && (
                  <p className="text-accent">{address.phone}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                {!address.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                    className="flex-1"
                  >
                    Set as Default
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="p-2" aria-label={`Edit ${address.label} address`}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-error hover:bg-error-bg"
                  onClick={() => handleDelete(address.id)}
                  disabled={deletingId === address.id}
                  aria-label={`Delete ${address.label} address`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Add New Address Card */}
          <button
            aria-label="Add new address"
            className="flex flex-col items-center justify-center gap-3 bg-background-secondary rounded-xl border-2 border-dashed border-border hover:border-accent/50 p-8 transition-colors min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Plus className="w-6 h-6 text-accent" />
            </div>
            <span className="text-foreground-muted font-medium">
              Add New Address
            </span>
          </button>
        </div>
      ) : (
        <div className="text-center py-16 bg-background-secondary rounded-2xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm">
            <MapPin className="w-10 h-10 text-foreground-light" />
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">
            No addresses saved
          </h2>
          <p className="text-foreground-muted mb-6 max-w-md mx-auto">
            Add delivery addresses to make checkout faster and easier.
          </p>
          <Button size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Address
          </Button>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-accent-bg rounded-xl p-6 border border-accent/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-primary font-semibold mb-1">
              Delivery Information
            </h3>
            <p className="text-sm text-foreground-muted">
              Your default address will be pre-selected during checkout. You can add
              multiple delivery addresses for different locations such as your office,
              warehouse, or home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
