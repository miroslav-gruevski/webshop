'use client';

import Link from 'next/link';
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button, useToast } from '@/components/ui';
import { CartItemImage } from '@/components/cart';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    addToast('info', `${productName} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    addToast('info', 'Cart cleared');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-background-secondary flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-foreground-light" />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-foreground-muted mb-8 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet. Browse our
            collection to find the perfect access control solutions.
          </p>
          <Link href="/products">
            <Button size="lg">
              Browse Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const vatRate = 0.2; // 20% VAT
  const subtotal = totalPrice;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary">
          Shopping Cart
          <span className="text-foreground-muted font-normal text-lg ml-2">
            ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </span>
        </h1>
        <button
          onClick={handleClearCart}
          className="text-sm text-error hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-xl p-4 sm:p-6 border border-border flex flex-col sm:flex-row gap-4"
            >
              {/* Product Image */}
              <CartItemImage
                src={item.product.image}
                alt={item.product.name}
                href={`/products/${item.product.slug}`}
                size="md"
              />

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-primary font-medium hover:text-accent transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-foreground-muted mt-1">
                      {item.product.category}
                    </p>
                    <p className="text-xs text-foreground-light mt-1">
                      SKU: {item.product.sku}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      £{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-foreground-muted">
                      £{item.product.price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 bg-background-secondary rounded-lg p-1" role="group" aria-label={`Quantity for ${item.product.name}`}>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      aria-label={`Decrease quantity of ${item.product.name}`}
                      className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center text-primary hover:bg-border rounded-lg transition-all duration-150 active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-primary font-medium" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      aria-label={`Increase quantity of ${item.product.name}`}
                      className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center text-primary hover:bg-border rounded-lg transition-all duration-150 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                    aria-label={`Remove ${item.product.name} from cart`}
                    className="flex items-center gap-2 text-error hover:text-error/80 text-sm py-2 px-3 rounded-lg hover:bg-error-bg transition-all duration-150 min-h-[44px] sm:min-h-0"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary mt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-border sticky top-24">
            <h2 className="text-lg font-semibold text-primary mb-6">Order Summary</h2>

            {/* Free Shipping Progress */}
            {remainingForFreeShipping > 0 && (
              <div className="mb-6">
                <p className="text-sm text-foreground-muted mb-2">
                  Add{' '}
                  <span className="text-accent font-medium">
                    £{remainingForFreeShipping.toFixed(2)}
                  </span>{' '}
                  more for free shipping
                </p>
                <div className="h-2 bg-background-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (subtotal / freeShippingThreshold) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-foreground-muted">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground-muted">
                <span>VAT (20%)</span>
                <span>£{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground-muted">
                <span>Shipping</span>
                <span>
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    'Calculated at checkout'
                  )}
                </span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-primary font-semibold text-lg">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            {isAuthenticated ? (
              <Button fullWidth size="lg">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <div className="space-y-3">
                <Link href="/login?redirect=/cart">
                  <Button fullWidth size="lg">
                    Sign In to Checkout
                  </Button>
                </Link>
                <p className="text-xs text-center text-foreground-muted pt-2">
                  Don't have an account?{' '}
                  <Link
                    href="/register?redirect=/cart"
                    className="text-accent hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            )}

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-4 text-xs text-foreground-muted">
                <span>Secure Checkout</span>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
