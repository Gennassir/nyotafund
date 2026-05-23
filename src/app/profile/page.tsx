'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/components/AuthProvider';

type LoanRow = {
  id: string;
  loan_type: string;
  loan_amount: number;
  mpesa_number: string;
  status: string;
  created_at: string;
};

type GroupKey = 'pending' | 'processing' | 'approved' | 'rejected';

const statusOrder: GroupKey[] = ['pending', 'processing', 'approved', 'rejected'];

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [applications, setApplications] = useState<LoanRow[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const groups: Record<GroupKey, LoanRow[]> = {
      pending: [],
      processing: [],
      approved: [],
      rejected: [],
    };

    for (const app of applications) {
      const key = (app.status ?? 'pending').toLowerCase() as GroupKey;
      if (groups[key]) groups[key].push(app);
      else groups.pending.push(app);
    }

    return groups;
  }, [applications]);

  useEffect(() => {
    if (loading) return;

    if (!user?.email) {
      setApplications([]);
      return;
    }

    let cancelled = false;

    const fetchApplications = async () => {
      try {
        setFetching(true);
        setError(null);

        const { data, error } = await supabase
          .from('loan_applications')
          .select('id, loan_type, loan_amount, mpesa_number, status, created_at')
          .eq('email', user.email)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (cancelled) return;

        setApplications((data ?? []) as LoanRow[]);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? 'Failed to load loan applications.');
      } finally {
        if (!cancelled) setFetching(false);
      }
    };

    fetchApplications();

    // Live updates: subscribe to realtime changes on loan_applications.
    // We filter by email on the client after receiving events.
    const channel = supabase
      .channel('loan-applications-profile')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'loan_applications',
        },
        () => {
          // Re-fetch on any change so status updates reflect instantly.
          // Guard against unmount/race.
          if (cancelled) return;
          fetchApplications();
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [loading, user?.email]);

  return (
    <div className="min-h-screen bg-lightbg pt-20">
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-primary font-government">My Profile</h1>
            <p className="text-textlight mt-2">
              Track your loan applications and their current status (live updates).
            </p>
          </div>

          {!loading && !user && (
            <div className="bg-cardbg rounded-3xl shadow-xl p-8 border border-border">
              <p className="text-textlight">
                You are not signed in.{' '}
                <Link
                  href="/login"
                  className="text-accent hover:text-accentDark font-semibold transition-colors"
                >
                  Sign in
                </Link>{' '}
                to view your loan tracking.
              </p>
            </div>
          )}

          {(loading || fetching) && (
            <div className="bg-cardbg rounded-3xl shadow-xl p-8 border border-border">
              <p className="text-textlight">Loading your loan applications...</p>
            </div>
          )}

          {error && !fetching && (
            <div className="bg-cardbg rounded-3xl shadow-xl p-8 border border-border">
              <p className="text-red-500 font-semibold">{error}</p>
            </div>
          )}

          {!fetching && !loading && user && applications.length === 0 && !error && (
            <div className="bg-cardbg rounded-3xl shadow-xl p-8 border border-border">
              <p className="text-textlight">
                No loan applications found for{' '}
                <span className="font-semibold text-primary">{user.email}</span>. You can apply for
                a loan product to get started.
              </p>
              <div className="mt-6 flex gap-4 flex-col sm:flex-row">
                <Link
                  href="/loans"
                  className="flex-1 bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  Explore Loan Products
                </Link>
                <Link
                  href="/apply"
                  className="flex-1 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-center"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          )}

          {!fetching && !loading && user && applications.length > 0 && (
            <div className="grid grid-cols-1 gap-6">
              {statusOrder.map((statusKey) => {
                const rows = grouped[statusKey];
                if (!rows.length) return null;

                const title =
                  statusKey === 'pending'
                    ? 'Pending'
                    : statusKey === 'processing'
                      ? 'Processing'
                      : statusKey === 'approved'
                        ? 'Approved'
                        : 'Rejected';

                const accent =
                  statusKey === 'pending'
                    ? 'text-textlight'
                    : statusKey === 'processing'
                      ? 'text-accent'
                      : statusKey === 'approved'
                        ? 'text-green-600'
                        : 'text-red-600';

                return (
                  <div
                    key={statusKey}
                    className="bg-cardbg rounded-3xl shadow-xl p-6 border border-border"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className={`text-2xl font-bold ${accent} font-government`}>{title}</h2>
                      <span className="text-textlight text-sm">
                        {rows.length} application(s)
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Loan</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold">Amount</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold">MPesa</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold">Submitted</th>
                            {statusKey === 'approved' && (
                              <th className="px-4 py-3 text-right text-sm font-semibold">Action</th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {rows.map((row) => (
                            <tr
                              key={row.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-4">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-primary">
                                    {row.loan_type}
                                  </span>
                                  <span className="text-xs text-textlight capitalize">
                                    {row.status}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-right font-bold text-primary">
                                KSh{' '}
                                {Number(row.loan_amount).toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}
                              </td>
                              <td className="px-4 py-4 text-right text-textlight text-sm">
                                {row.mpesa_number || '-'}
                              </td>
                              <td className="px-4 py-4 text-right text-textlight text-sm">
                                {row.created_at ? new Date(row.created_at).toLocaleDateString() : '-'}
                              </td>
                              {statusKey === 'approved' && (
                                <td className="px-4 py-4 text-right">
                                  <Link
                                    href={`/pay?applicationId=${row.id}&amount=${Math.round(Number(row.loan_amount) * 0.1)}&phone=${encodeURIComponent(row.mpesa_number || '')}&purpose=loan_repayment`}
                                    className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accentDark transition-colors text-sm font-semibold"
                                  >
                                    Repay
                                  </Link>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}

              <div className="bg-cardbg rounded-3xl shadow-xl p-6 border border-border">
                <p className="text-textlight">
                  Need to apply again?{' '}
                  <Link
                    href="/loans"
                    className="text-accent hover:text-accentDark font-semibold transition-colors"
                  >
                    View loan products
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
