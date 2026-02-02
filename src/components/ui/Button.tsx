'use client';

/**
 * Button Component
 * 
 * A consistent, accessible button component with multiple variants.
 * All buttons use the same hover/focus patterns for consistency.
 * 
 * @module components/ui/Button
 */

import { forwardRef, ButtonHTMLAttributes, CSSProperties } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Base styles with consistent transition timing (200ms)
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-[0.98] hover:scale-[1.02]';

    // Variant-specific hover classes
    const variantClasses = {
      primary: 'hover:brightness-110 hover:shadow-lg focus-visible:ring-accent',
      secondary: 'hover:brightness-110 hover:shadow-lg focus-visible:ring-primary',
      outline: 'border hover:bg-primary/5 hover:shadow-md focus-visible:ring-primary',
      'outline-white': 'border hover:bg-white/10 hover:shadow-md focus-visible:ring-white focus-visible:ring-offset-primary',
      ghost: 'hover:bg-background-secondary hover:shadow-sm focus-visible:ring-primary',
    };

    // Variant-specific inline styles (for colors that aren't in Tailwind)
    const variantStyles: Record<string, CSSProperties> = {
      primary: {
        backgroundColor: 'var(--accent)',
        color: '#ffffff',
      },
      secondary: {
        backgroundColor: 'var(--primary)',
        color: '#ffffff',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--primary)',
        borderColor: 'var(--primary)',
      },
      'outline-white': {
        backgroundColor: 'transparent',
        color: '#ffffff',
        borderColor: '#ffffff',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--foreground-muted)',
      },
    };

    // Responsive sizes with proper touch targets (min 44px for accessibility)
    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[44px] sm:min-h-[36px]',
      md: 'px-5 py-2.5 text-sm min-h-[44px] sm:min-h-[42px]',
      lg: 'px-6 py-3 text-base min-h-[48px]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantClasses[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        style={{ ...variantStyles[variant], ...style }}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" strokeWidth={1.5} />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
