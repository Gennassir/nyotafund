'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      // Clear any stale sessions first to prevent "Failed to fetch" errors
      await supabase.auth.signOut({ scope: 'global' });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password
      });

      if (error) {
        alert(error.message);
        return;
      }

      // Redirect to dashboard or loans page on success
      router.push('/loans');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-lightbg pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="text-4xl font-bold mb-4 font-government">Welcome Back</h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Sign in to your Nyota Fund account to access your loan applications and manage your profile
          </p>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-md mx-auto">
          <div className="bg-cardbg rounded-3xl shadow-2xl p-8 border border-border">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary font-government">Sign In</h2>
              <p className="text-textlight mt-2">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.email ? 'border-red-500' : 'border-border'}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.password ? 'border-red-500' : 'border-border'}`}
                  placeholder="Enter your password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-textlight">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-accent hover:text-accentDark transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60"
              >
                {submitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-textlight">
                Don't have an account?{' '}
                <Link href="/register" className="text-accent hover:text-accentDark font-semibold transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>

                      </div>
        </div>
      </section>
    </div>
  );
}
