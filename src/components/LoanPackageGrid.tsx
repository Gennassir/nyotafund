'use client';

import Link from 'next/link';
import { LOAN_PACKAGES, MIN_LOAN_AMOUNT, getApplyUrl } from '@/lib/loan-packages';

type LoanPackageGridProps = {
  variant?: 'default' | 'compact';
  className?: string;
};

export default function LoanPackageGrid({
  variant = 'default',
  className = '',
}: LoanPackageGridProps) {
  const isCompact = variant === 'compact';

  return (
    <div className={className}>
      <p className="text-center text-sm text-textlight mb-6">
        Minimum loan amount:{' '}
        <span className="font-semibold text-primary">
          KSh {MIN_LOAN_AMOUNT.toLocaleString()}
        </span>
      </p>
      <div
        className={
          isCompact
            ? 'grid grid-cols-2 sm:grid-cols-3 gap-3'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
        }
      >
        {LOAN_PACKAGES.map((pkg) => (
          <Link
            key={pkg.amount}
            href={getApplyUrl(pkg.amount)}
            className={`group block bg-cardbg border-2 border-border rounded-2xl transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1 ${
              isCompact ? 'p-4' : 'p-6'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p
                  className={`font-bold text-primary font-government ${
                    isCompact ? 'text-lg' : 'text-2xl'
                  }`}
                >
                  {pkg.label}
                </p>
                <p className={`text-textlight mt-1 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  Processing fee
                </p>
              </div>
              <div
                className={`shrink-0 rounded-xl bg-gradient-to-br from-accent to-accentDark text-white font-bold ${
                  isCompact ? 'px-2 py-1 text-sm' : 'px-3 py-2 text-base'
                }`}
              >
                KSh {pkg.fee}
              </div>
            </div>
            <p
              className={`mt-3 text-accent font-semibold group-hover:underline ${
                isCompact ? 'text-xs' : 'text-sm'
              }`}
            >
              Apply now →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
