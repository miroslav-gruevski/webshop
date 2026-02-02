'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Eye, EyeOff, AlertCircle, Lock } from 'lucide-react';
import { Button, Input, useToast } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        addToast('success', 'Welcome back! You have signed in successfully');
        router.push(redirect);
      } else {
        setError('Invalid email or password. Try demo@example.com / demo123');
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
          <h1 className="text-2xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-foreground-muted">
            Sign in to your ECS Systems account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl p-8 border border-border shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-error-bg border border-error-border rounded-lg text-error text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border bg-white text-primary focus:ring-primary"
                />
                <span className="text-foreground-muted">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-accent hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-background-secondary rounded-lg">
            <p className="text-xs text-foreground-muted mb-2">Demo Credentials:</p>
            <p className="text-xs text-primary">
              <strong>Consumer:</strong> demo@example.com / demo123
            </p>
            <p className="text-xs text-primary">
              <strong>Business:</strong> business@example.com / business123
            </p>
          </div>
        </div>

        {/* Register Link */}
        <p className="text-center mt-8 text-foreground-muted">
          Don't have an account?{' '}
          <Link
            href={`/register${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
            className="text-accent underline font-medium hover:text-primary transition-colors duration-200"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-background-secondary">
        <div className="animate-pulse text-foreground-muted">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
