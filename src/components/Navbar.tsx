'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } finally {
      setMobileOpen(false);
    }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-cardbg shadow-lg border-b border-border z-50 backdrop-blur-lg bg-cardbg/95">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-3xl font-bold text-primary hover:text-secondary transition-colors font-government"
              onClick={closeMobile}
            >
              Nyota <span className="text-accent">Fund</span>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-10">
            <Link
              href="/"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              Home
            </Link>
            <Link
              href="/loans"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              Loans
            </Link>
            <Link
              href="/calculator"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              Calculator
            </Link>
            <Link
              href="/how-it-works"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              How It Works
            </Link>
            <Link
              href="/testimonials"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              Contact
            </Link>
            <Link
              href="/pay"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
            >
              Pay
            </Link>
          </nav>

          {/* Hamburger (Mobile) */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-6 h-6 text-textdark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {!loading && user && (
            <div className="hidden lg:flex items-center space-x-6">
              <Link
                href="/profile"
                className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
              >
                Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-accent hover:text-accentDark font-semibold transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <div className={`${mobileOpen ? 'block' : 'hidden'} lg:hidden pb-4`}>
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
              onClick={closeMobile}
            >
              Home
            </Link>
            <Link
              href="/loans"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
              onClick={closeMobile}
            >
              Loans
            </Link>
            <Link
              href="/calculator"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
              onClick={closeMobile}
            >
              Calculator
            </Link>
            <Link
              href="/how-it-works"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
              onClick={closeMobile}
            >
              How It Works
            </Link>
            <Link
              href="/testimonials"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
              onClick={closeMobile}
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
              onClick={closeMobile}
            >
              Contact
            </Link>
            <Link
              href="/pay"
              className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
              onClick={closeMobile}
            >
              Pay
             </Link>

            {!loading && user && (
              <>
                <Link
                  href="/profile"
                  className="text-textdark hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide pt-3"
                  onClick={closeMobile}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-accent hover:text-accentDark font-semibold transition-colors font-medium text-left"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
