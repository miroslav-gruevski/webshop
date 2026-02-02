'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Settings,
  ArrowLeft,
  User,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Check,
  Building2,
  Mail,
  Phone,
} from 'lucide-react';
import { Button, Input, Badge } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications' | 'privacy'>('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    productAlerts: true,
  });

  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
    personalization: true,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/account/settings');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ] as const;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-background-secondary rounded w-48 mb-8" />
          <div className="h-96 bg-background-secondary rounded-xl" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
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
            <Settings className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Account Settings</h1>
            <p className="text-foreground-muted">
              Manage your account preferences
            </p>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 text-success bg-success-bg px-4 py-2 rounded-lg">
            <Check className="w-4 h-4" />
            Changes saved successfully
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl border border-border p-2 space-y-1" role="tablist" aria-label="Account settings">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent-bg text-accent font-medium'
                    : 'text-foreground-muted hover:bg-background-secondary'
                }`}
              >
                <tab.icon className="w-5 h-5" aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-border p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div role="tabpanel" id="panel-profile" aria-labelledby="tab-profile" className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-primary mb-1">
                    Profile Information
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    Update your personal details and contact information.
                  </p>
                </div>

                {/* Account Type Badge */}
                <div className="flex items-center gap-3 p-4 bg-background-secondary rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    {user.accountType === 'b2b' ? (
                      <Building2 className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-primary">
                        {user.accountType === 'b2b' ? 'Business Account' : 'Personal Account'}
                      </span>
                      <Badge
                        variant={user.accountType === 'b2b' ? 'accent' : 'default'}
                        size="sm"
                      >
                        {user.accountType.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground-muted">
                      Contact support to change your account type
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light" />
                      <Input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, email: e.target.value })
                        }
                        className="pl-10"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light" />
                      <Input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, phone: e.target.value })
                        }
                        className="pl-10"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {user.accountType === 'b2b' && (
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-light" />
                        <Input
                          type="text"
                          value={profileForm.company}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, company: e.target.value })
                          }
                          className="pl-10"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div role="tabpanel" id="panel-password" aria-labelledby="tab-password" className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-primary mb-1">
                    Change Password
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    Update your password to keep your account secure.
                  </p>
                </div>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            currentPassword: e.target.value,
                          })
                        }
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-light hover:text-primary p-1"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value,
                          })
                        }
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-light hover:text-primary p-1"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-foreground-muted mt-1">
                      Minimum 8 characters with at least one number and special character
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Confirm New Password
                    </label>
                    <Input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div role="tabpanel" id="panel-notifications" aria-labelledby="tab-notifications" className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-primary mb-1">
                    Notification Preferences
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    Choose what updates you want to receive.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      key: 'orderUpdates',
                      label: 'Order Updates',
                      description:
                        'Receive notifications about your order status and delivery updates.',
                    },
                    {
                      key: 'promotions',
                      label: 'Promotions & Offers',
                      description:
                        'Get notified about special offers, discounts, and promotional campaigns.',
                    },
                    {
                      key: 'newsletter',
                      label: 'Newsletter',
                      description:
                        'Weekly newsletter with industry news, product tips, and company updates.',
                    },
                    {
                      key: 'productAlerts',
                      label: 'Product Alerts',
                      description:
                        'Notifications when products in your wishlist are back in stock or on sale.',
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-start gap-4 p-4 bg-background-secondary rounded-lg cursor-pointer hover:bg-background-secondary/80 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            [item.key]: e.target.checked,
                          })
                        }
                        className="w-5 h-5 mt-0.5 rounded border-border bg-white text-accent focus:ring-accent accent-accent cursor-pointer"
                      />
                      <div>
                        <p className="font-medium text-primary">{item.label}</p>
                        <p className="text-sm text-foreground-muted">
                          {item.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div role="tabpanel" id="panel-privacy" aria-labelledby="tab-privacy" className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-primary mb-1">
                    Privacy Settings
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    Control how your data is used and shared.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      key: 'shareData',
                      label: 'Share Data with Partners',
                      description:
                        'Allow us to share your data with trusted partners for better product recommendations.',
                    },
                    {
                      key: 'analytics',
                      label: 'Analytics & Improvements',
                      description:
                        'Help us improve our services by allowing usage analytics collection.',
                    },
                    {
                      key: 'personalization',
                      label: 'Personalized Experience',
                      description:
                        'Allow us to personalize your shopping experience based on your browsing history.',
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-start gap-4 p-4 bg-background-secondary rounded-lg cursor-pointer hover:bg-background-secondary/80 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={privacy[item.key as keyof typeof privacy]}
                        onChange={(e) =>
                          setPrivacy({
                            ...privacy,
                            [item.key]: e.target.checked,
                          })
                        }
                        className="w-5 h-5 mt-0.5 rounded border-border bg-white text-accent focus:ring-accent accent-accent cursor-pointer"
                      />
                      <div>
                        <p className="font-medium text-primary">{item.label}</p>
                        <p className="text-sm text-foreground-muted">
                          {item.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="p-4 bg-warning-bg rounded-lg border border-warning/20">
                  <h3 className="font-medium text-primary mb-2">
                    Delete Account
                  </h3>
                  <p className="text-sm text-foreground-muted mb-4">
                    Permanently delete your account and all associated data. This action
                    cannot be undone.
                  </p>
                  <Button variant="outline" size="sm" className="text-error border-error hover:bg-error-bg">
                    Request Account Deletion
                  </Button>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Settings'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
