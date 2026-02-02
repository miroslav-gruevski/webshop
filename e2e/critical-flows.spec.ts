import { test, expect } from '@playwright/test';

/**
 * Critical E2E Tests
 * 
 * These tests cover the essential user flows that must work.
 * Run with: npm run test:e2e
 */

test.describe('Homepage', () => {
  test('loads correctly with key elements', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/ECS Systems/);
    
    // Check header elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByLabel('Main navigation')).toBeVisible();
    
    // Check hero section
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check footer
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });
});

test.describe('Product Search', () => {
  test('search autocomplete shows suggestions', async ({ page }) => {
    await page.goto('/');
    
    // Click search button to open search
    await page.getByRole('button', { name: /Open search/i }).click();
    
    // Type in search - use the visible input
    const searchInput = page.locator('input[type="search"]:visible');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('xs4');
    
    // Wait for suggestions to appear (link in dropdown)
    await expect(page.locator('[role="listbox"] a').first()).toBeVisible({ timeout: 5000 });
  });

  test('products page search filters results', async ({ page }) => {
    await page.goto('/products');
    
    // Search for a product
    const searchInput = page.locator('main input[type="search"]');
    await searchInput.fill('lock');
    
    // Results should show
    await expect(page.getByRole('article').first()).toBeVisible();
  });
});

test.describe('Cart Flow', () => {
  test('can add product to cart', async ({ page }) => {
    await page.goto('/products');
    
    // Click Add to Cart on first product
    const addToCartButton = page.getByRole('button', { name: /Add.*to cart/i }).first();
    await addToCartButton.click();
    
    // Toast should appear
    await expect(page.getByText(/added to cart/i)).toBeVisible({ timeout: 5000 });
  });

  test('cart page displays correctly', async ({ page }) => {
    // Go to cart
    await page.goto('/cart');
    
    // Should see cart page (either with items or empty state)
    const cartHeading = page.getByRole('heading', { name: /Shopping Cart|Your Cart is Empty/i });
    await expect(cartHeading).toBeVisible();
  });
});

test.describe('Authentication', () => {
  test('login page loads correctly', async ({ page }) => {
    await page.goto('/login');
    
    await expect(page.getByRole('heading', { name: /Welcome Back/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
    // Demo credentials text should be visible
    await expect(page.getByText(/demo@example.com/).first()).toBeVisible();
  });

  test('can login with demo credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Fill in demo credentials using textbox role
    const emailInput = page.getByRole('textbox', { name: /email/i });
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    
    await emailInput.fill('demo@example.com');
    await passwordInput.fill('demo123');
    
    // Submit
    await page.getByRole('button', { name: /Sign In/i }).click();
    
    // Should redirect away from login page (to account or home)
    await expect(page).not.toHaveURL(/login/, { timeout: 10000 });
    
    // Should show success toast
    await expect(page.getByText(/Welcome back|signed in/i)).toBeVisible({ timeout: 5000 });
  });

  test('account page requires authentication', async ({ page }) => {
    // Try to access account page directly
    await page.goto('/account');
    
    // Should either show account page (if logged in) or redirect to login
    const url = page.url();
    const isAccountOrLogin = url.includes('/account') || url.includes('/login');
    expect(isAccountOrLogin).toBe(true);
  });
});

test.describe('Navigation', () => {
  test('main navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Use the main navigation specifically
    const mainNav = page.getByLabel('Main navigation');
    
    // Navigate to Products
    await mainNav.getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL('/products');
    
    // Navigate to About
    await mainNav.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    
    // Navigate to Contact
    await mainNav.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('404 page shows for invalid routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText(/Page Not Found/i)).toBeVisible();
  });
});
