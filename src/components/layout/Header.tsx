'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
import { Button, useToast } from '@/components/ui';
import productsData from '@/data/products.json';
import { Product } from '@/types';

const products = productsData as unknown as Product[];

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { addToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Compute search suggestions
  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.shortDescription?.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [searchQuery]);

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
      setShowSuggestions(false);
    }
  }, []);

  // Handle click outside for user menu and search suggestions
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
      setIsUserMenuOpen(false);
    }
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  }, []);

  // Handle keyboard navigation for search suggestions
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || searchSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < searchSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev > 0 ? prev - 1 : searchSuggestions.length - 1
        );
        break;
      case 'Enter':
        if (selectedSuggestionIndex >= 0) {
          e.preventDefault();
          const selectedProduct = searchSuggestions[selectedSuggestionIndex];
          router.push(`/products/${selectedProduct.slug}`);
          setShowSuggestions(false);
          setSearchQuery('');
          setIsSearchOpen(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

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
            {/* Search Box - Expandable with Autocomplete */}
            <div ref={searchContainerRef} className="flex items-center relative">
              <form
                onSubmit={handleSearch}
                className={`flex items-center transition-all duration-300 ${
                  isSearchOpen ? 'w-64 opacity-100 mr-2' : 'w-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="relative w-full">
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                      setSelectedSuggestionIndex(-1);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleSearchKeyDown}
                    className="w-full h-9 px-3 pr-8 bg-white border border-border rounded-lg text-primary text-sm placeholder-foreground-light transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    aria-label="Search products"
                    aria-autocomplete="list"
                    aria-controls="header-search-suggestions"
                    aria-expanded={showSuggestions && searchSuggestions.length > 0}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setShowSuggestions(false);
                        searchInputRef.current?.focus();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground-light hover:text-primary transition-colors p-1"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {isSearchOpen && showSuggestions && searchSuggestions.length > 0 && (
                <div
                  id="header-search-suggestions"
                  role="listbox"
                  className="absolute top-full left-0 right-12 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <div className="py-1">
                    {searchSuggestions.map((product, index) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        role="option"
                        aria-selected={index === selectedSuggestionIndex}
                        onClick={() => {
                          setShowSuggestions(false);
                          setSearchQuery('');
                          setIsSearchOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                          index === selectedSuggestionIndex
                            ? 'bg-accent/10 text-accent'
                            : 'hover:bg-background-secondary'
                        }`}
                      >
                        <Search className="w-4 h-4 text-foreground-light flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-primary font-medium truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-foreground-muted truncate">
                            {product.category} · £{product.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border px-4 py-2 bg-background-secondary">
                    <button
                      type="button"
                      onClick={() => {
                        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                        setShowSuggestions(false);
                        setSearchQuery('');
                        setIsSearchOpen(false);
                      }}
                      className="text-xs text-accent hover:underline"
                    >
                      View all results for &quot;{searchQuery}&quot;
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) {
                    setSearchQuery('');
                    setShowSuggestions(false);
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

        {/* Mobile Search with Autocomplete */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-light pointer-events-none">
                    <Search className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                      setSelectedSuggestionIndex(-1);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleSearchKeyDown}
                    className="w-full h-11 pl-10 pr-10 bg-white border border-border rounded-lg text-primary text-base placeholder-foreground-light transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    aria-label="Search products"
                    aria-autocomplete="list"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setShowSuggestions(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-light hover:text-primary transition-colors p-1"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>

              {/* Mobile Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="py-1 max-h-64 overflow-y-auto">
                    {searchSuggestions.map((product, index) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => {
                          setShowSuggestions(false);
                          setSearchQuery('');
                          setIsSearchOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          index === selectedSuggestionIndex
                            ? 'bg-accent/10 text-accent'
                            : 'hover:bg-background-secondary active:bg-background-secondary'
                        }`}
                      >
                        <Search className="w-4 h-4 text-foreground-light flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-primary font-medium truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-foreground-muted truncate">
                            {product.category} · £{product.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border px-4 py-2.5 bg-background-secondary">
                    <button
                      type="button"
                      onClick={() => {
                        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                        setShowSuggestions(false);
                        setSearchQuery('');
                        setIsSearchOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className="text-sm text-accent hover:underline"
                    >
                      View all results for &quot;{searchQuery}&quot;
                    </button>
                  </div>
                </div>
              )}
            </div>
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
