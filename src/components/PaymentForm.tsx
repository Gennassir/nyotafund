'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import SuccessTick from '@/components/SuccessTick';

type PaymentFormProps = {
  defaultAmount?: number;
  defaultPhone?: string;
  applicationId?: string;
  purpose?: 'loan_repayment' | 'processing_fee';
  customerName?: string;
  title?: string;
  description?: string;
};

type PaymentState = 'idle' | 'sending' | 'waiting' | 'success' | 'failed';

export default function PaymentForm({
  defaultAmount,
  defaultPhone = '',
  applicationId,
  purpose = 'loan_repayment',
  customerName,
  title = 'Pay with M-Pesa',
  description = 'Enter your M-Pesa number and amount. You will receive an STK push on your phone to complete payment.',
}: PaymentFormProps) {
  const [amount, setAmount] = useState(
    defaultAmount ? String(Math.round(defaultAmount)) : ''
  );
  const [phone, setPhone] = useState(defaultPhone);
  const [state, setState] = useState<PaymentState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [providerReference, setProviderReference] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => () => stopPolling(), [stopPolling]);

  const pollStatus = useCallback(
    (payheroReference: string) => {
      stopPolling();
      let attempts = 0;

      pollRef.current = setInterval(async () => {
        attempts += 1;
        try {
          const res = await fetch(
            `/api/payments/status?reference=${encodeURIComponent(payheroReference)}`
          );
          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || 'Could not verify payment.');
          }

          const status = String(data.status ?? '').toUpperCase();
          if (status === 'SUCCESS') {
            stopPolling();
            setProviderReference(data.providerReference ?? null);
            setState('success');
            return;
          }

          if (status === 'FAILED') {
            stopPolling();
            setState('failed');
            setError('Payment failed or was cancelled. Please try again.');
            return;
          }

          if (attempts >= 40) {
            stopPolling();
            setState('failed');
            setError(
              'Payment is still pending. If you completed it on your phone, check your profile shortly.'
            );
          }
        } catch (pollError) {
          if (attempts >= 5) {
            stopPolling();
            setState('failed');
            setError(
              pollError instanceof Error
                ? pollError.message
                : 'Could not verify payment status.'
            );
          }
        }
      }, 3000);
    },
    [stopPolling]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setState('sending');
    setReference(null);
    setProviderReference(null);
    stopPolling();

    try {
      const res = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(amount),
          phone,
          applicationId,
          purpose,
          customerName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to start payment.');
      }

      setReference(data.reference);
      setState('waiting');
      pollStatus(data.reference);
    } catch (submitError) {
      setState('failed');
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Failed to start payment.'
      );
    }
  };

  if (state === 'success') {
    return (
      <div className="space-y-6">
        <div className="bg-green-600/5 border border-green-600/20 rounded-2xl p-6">
          <SuccessTick />
          <p className="text-center text-textlight mt-4">
            Your M-Pesa payment was received successfully.
          </p>
          {providerReference && (
            <p className="text-center text-sm text-textlight mt-2">
              M-Pesa code: <span className="font-semibold text-primary">{providerReference}</span>
            </p>
          )}
          {reference && (
            <p className="text-center text-xs text-textlight mt-1">
              Reference: {reference}
            </p>
          )}
        </div>
        <Link
          href="/profile"
          className="block w-full text-center bg-gradient-to-r from-accent to-accentDark text-white font-bold py-3 px-6 rounded-xl"
        >
          Back to Profile
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary font-government">{title}</h2>
        <p className="text-textlight mt-2">{description}</p>
      </div>

      {state === 'waiting' && (
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 text-sm text-primary">
          STK push sent to <span className="font-semibold">{phone}</span>. Enter your M-Pesa PIN on
          your phone to complete the payment.
          {reference && (
            <p className="mt-2 text-xs text-textlight">Tracking reference: {reference}</p>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Amount (KSh) *
        </label>
        <input
          type="number"
          min={1}
          step={1}
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={state === 'waiting' || state === 'sending'}
          className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g. 5000"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          M-Pesa Phone Number *
        </label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={state === 'waiting' || state === 'sending'}
          className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="07XX XXX XXX"
        />
      </div>

      <button
        type="submit"
        disabled={state === 'waiting' || state === 'sending'}
        className="w-full bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent disabled:opacity-60 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg"
      >
        {state === 'sending'
          ? 'Sending STK Push...'
          : state === 'waiting'
            ? 'Waiting for M-Pesa confirmation...'
            : 'Pay with M-Pesa'}
      </button>
    </form>
  );
}
