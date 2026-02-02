'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, useToast } from '@/components/ui';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { addToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle sign out with toast notification
  const handleSignOut = useCallback(() => {
    logout();
    setIsUserMenuOpen(false);
    addToast('success', 'You have been signed out successfully');
  }, [logout, addToast]);

  // Handle Escape key for all dropdowns
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
      setIsUserMenuOpen(false);
    }
  }, []);

  // Handle click outside for user menu
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
      setIsUserMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleKeyDown, handleClickOutside]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      {/* Top Bar */}
      <div className="hidden lg:block bg-background-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
              The Fire & Security Specialists
            </p>
            <div className="flex items-center gap-6">
              <a
                href="tel:+442083009996"
                className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors duration-200"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                <span>0208 300 9996</span>
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors duration-200"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                <span>sales@ecssystems.co.uk</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors duration-200"
              >
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                <span>Find Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" aria-label="ECS Systems - Home">
            <Image
              src="/ECS-logo.svg"
              alt="ECS Systems"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 h-[72px] flex items-center ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-foreground-light hover:text-accent'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Box - Expandable */}
            <div className="flex items-center">
              <form
                onSubmit={handleSearch}
                className={`flex items-center transition-all duration-300 overflow-hidden ${
                  isSearchOpen ? 'w-64 opacity-100 mr-2' : 'w-0 opacity-0'
                }`}
              >
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 text-sm"
                  autoFocus={isSearchOpen}
                />
              </form>
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen && searchQuery) {
                    setSearchQuery('');
                  }
                }}
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                aria-expanded={isSearchOpen}
                className="p-2 text-foreground-muted hover:text-primary hover:bg-background-secondary rounded-lg transition-all duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {isSearchOpen ? (
                  <X className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Search className="w-5 h-5" strokeWidth={1.5} />
                )}
              </button>
            </div>

            {/* Quote Request */}
            <Link href="/contact">
              <Button variant="secondary" size="sm">
                Quote request
              </Button>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label={`Shopping cart${totalItems > 0 ? `, ${totalItems} items` : ''}`}
              className="relative p-2 text-foreground-muted hover:text-primary hover:bg-background-secondary rounded-lg transition-all duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-medium rounded-full flex items-center justify-center" aria-hidden="true">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="User menu"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-1 p-2 text-foreground-muted hover:text-primary hover:bg-background-secondary rounded-lg transition-all duration-150 min-w-[44px] min-h-[44px]"
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>

                {isUserMenuOpen && (
                  <div role="menu" className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-primary truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-foreground-muted truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/account"
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-foreground-muted hover:text-primary hover:bg-background-secondary"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-foreground-muted hover:text-primary hover:bg-background-secondary"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      role="menuitem"
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-background-secondary"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                aria-label="Sign in to your account"
                className="p-2 text-foreground-muted hover:text-primary hover:bg-background-secondary rounded-lg transition-all duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="lg:hidden p-2 text-foreground-muted hover:text-primary hover:bg-background-secondary rounded-lg transition-all duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              aria-expanded={isSearchOpen}
              className="p-2 text-foreground-muted hover:text-primary hover:bg-background-secondary rounded-lg transition-all duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link
              href="/cart"
              aria-label={`Shopping cart${totalItems > 0 ? `, ${totalItems} items` : ''}`}
              className="relative p-2 text-foreground-muted hover:text-primary hover:bg-background-secondary rounded-lg transition-all duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-medium rounded-full flex items-center justify-center" aria-hidden="true">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="p-2 text-foreground-muted hover:text-primary hover:bg-background-secondary rounded-lg transition-all duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <form onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" strokeWidth={1.5} />}
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-accent-bg text-accent'
                      : 'text-foreground-muted hover:bg-background-secondary hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/account"
                      className="block px-4 py-3 text-foreground-muted hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-error"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="px-4 pt-2">
                    <Button
                      size="sm"
                      fullWidth
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.location.href = '/login';
                      }}
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
