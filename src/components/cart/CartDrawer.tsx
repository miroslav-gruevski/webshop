'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { X, Minus, Plus, ShoppingCart, Trash2, Package } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { useCart } from '@/context/CartContext';
import { useFocusTrap } from '@/hooks/useFocusTrap';

// Mini image component with error handling for drawer
function DrawerItemImage({ src, alt, href, onNavigate }: { src: string; alt: string; href: string; onNavigate: () => void }) {
  const [hasError, setHasError] = useState(false);
  const hasValidImage = src && src.startsWith('http') && !hasError;
  
  return (
    <Link 
      href={href}
      onClick={onNavigate}
      className="w-12 h-12 bg-white rounded flex items-center justify-center flex-shrink-0 border border-border overflow-hidden relative"
    >
      {hasValidImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="48px"
          onError={() => setHasError(true)}
        />
      ) : (
        <Package className="w-5 h-5 text-foreground-light/40" strokeWidth={1.5} aria-hidden="true" />
      )}
    </Link>
  );
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } =
    useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const focusTrapRef = useFocusTrap(isOpen);

  // Handle Escape key to close drawer
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Focus management and keyboard handlers
  useEffect(() => {
    if (isOpen) {
      // Add escape key listener
      document.addEventListener('keydown', handleKeyDown);
      // Focus the close button when drawer opens
      closeButtonRef.current?.focus();
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={focusTrapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl flex flex-col animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="cart-drawer-title" className="text-lg font-semibold text-primary flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            Cart ({totalItems})
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 text-foreground-muted hover:text-primary hover:bg-background-secondary rounded-lg transition-all duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-foreground-light mx-auto mb-4" />
              <p className="text-foreground-muted">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-background-secondary rounded-lg p-3"
                >
                  {/* Product name and price */}
                  <div className="mb-3">
                    <p className="text-sm text-primary font-medium truncate">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-accent font-medium">
                      £{item.product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Bottom row: Image + Quantity controls */}
                  <div className="flex items-center gap-3">
                    {/* Image */}
                    <DrawerItemImage
                      src={item.product.image}
                      alt={item.product.name}
                      href={`/products/${item.product.slug}`}
                      onNavigate={onClose}
                    />

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1" role="group" aria-label={`Quantity for ${item.product.name}`}>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        aria-label={`Decrease quantity of ${item.product.name}`}
                        className="w-8 h-8 flex items-center justify-center text-foreground-muted hover:text-primary hover:bg-white bg-white rounded border border-border transition-all duration-150 active:scale-95"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-primary text-sm font-medium" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${item.product.name}`}
                        className="w-8 h-8 flex items-center justify-center text-foreground-muted hover:text-primary hover:bg-white bg-white rounded border border-border transition-all duration-150 active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label={`Remove ${item.product.name} from cart`}
                      className="w-8 h-8 p-1.5 text-error hover:text-error/80 hover:bg-error-bg rounded transition-all duration-150 active:scale-95 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border">
            <div className="flex justify-between mb-4">
              <span className="text-foreground-muted">Subtotal</span>
              <span className="text-primary font-semibold">
                £{totalPrice.toFixed(2)}
              </span>
            </div>
            <Link href="/cart" onClick={onClose}>
              <Button fullWidth size="lg">
                View Cart & Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
