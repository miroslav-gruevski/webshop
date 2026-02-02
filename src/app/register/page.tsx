'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  User,
  Building2,
  Check,
  Lock,
} from 'lucide-react';
import { Button, Input, useToast } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { AccountType } from '@/types';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { register } = useAuth();
  const { addToast } = useToast();

  const [accountType, setAccountType] = useState<AccountType>('b2c');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(
        email,
        password,
        name,
        accountType,
        accountType === 'b2b' ? company : undefined
      );
      if (success) {
        addToast('success', 'Account created successfully! Welcome to ECS Systems');
        router.push(redirect);
      } else {
        setError('An account with this email already exists');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-background-secondary">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4" aria-label="Go to homepage">
            <Image
              src="/ECS-logo.svg"
              alt="ECS Systems"
              width={80}
              height={80}
              className="mx-auto"
              priority
            />
          </Link>
          <h1 className="text-2xl font-bold text-primary mb-2">Create Account</h1>
          <p className="text-foreground-muted">
            Join ECS Systems for exclusive access
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-border shadow-sm">
          {/* Account Type Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setAccountType('b2c')}
              className={`flex-1 p-4 rounded-xl border transition-all ${
                accountType === 'b2c'
                  ? 'bg-accent-bg border-accent text-accent'
                  : 'bg-background-secondary border-border text-foreground-muted hover:border-accent/50'
              }`}
            >
              <User className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium text-sm">Personal</p>
              <p className="text-xs mt-1 opacity-75">For home use</p>
            </button>
            <button
              type="button"
              onClick={() => setAccountType('b2b')}
              className={`flex-1 p-4 rounded-xl border transition-all ${
                accountType === 'b2b'
                  ? 'bg-accent-bg border-accent text-accent'
                  : 'bg-background-secondary border-border text-foreground-muted hover:border-accent/50'
              }`}
            >
              <Building2 className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium text-sm">Business</p>
              <p className="text-xs mt-1 opacity-75">For companies</p>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-error-bg border border-error-border rounded-lg text-error text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            {accountType === 'b2b' && (
              <Input
                label="Company Name"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Corporation"
                leftIcon={<Building2 className="w-4 h-4" />}
                required
              />
            )}

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="focus:outline-none p-1 rounded hover:bg-background-secondary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              required
            />

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-border bg-white text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground-muted">
                I agree to the{' '}
                <Link href="/terms" className="text-accent hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          {/* B2B Benefits */}
          {accountType === 'b2b' && (
            <div className="mt-6 p-4 bg-background-secondary rounded-lg">
              <p className="text-sm font-medium text-primary mb-3">
                Business Account Benefits:
              </p>
              <ul className="space-y-2">
                {[
                  'Volume discounts on bulk orders',
                  'Dedicated account manager',
                  'Priority technical support',
                  'Extended payment terms',
                  'Custom quotations',
                ].map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2 text-xs text-foreground-muted"
                  >
                    <Check className="w-3 h-3 text-success" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Login Link */}
        <p className="text-center mt-8 text-foreground-muted">
          Already have an account?{' '}
          <Link
            href={`/login${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
            className="text-accent underline font-medium hover:text-primary transition-colors duration-200"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-background-secondary">
        <div className="animate-pulse text-foreground-muted">Loading...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
