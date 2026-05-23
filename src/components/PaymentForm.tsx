'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PaymentStatusIcon from '@/components/PaymentStatusIcon';
import { useMpesaPayment } from '@/hooks/useMpesaPayment';

type PaymentFormProps = {
  defaultAmount?: number;
  defaultPhone?: string;
  applicationId?: string;
  purpose?: 'loan_repayment' | 'processing_fee';
  customerName?: string;
  title?: string;
  description?: string;
};

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
  const { state, error, reference, providerReference, initiatePayment, reset } =
    useMpesaPayment();

  useEffect(() => {
    if (defaultAmount) {
      setAmount(String(Math.round(defaultAmount)));
    }
  }, [defaultAmount]);

  useEffect(() => {
    if (defaultPhone) {
      setPhone(defaultPhone);
    }
  }, [defaultPhone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await initiatePayment({
      amount: Number(amount),
      phone,
      applicationId,
      purpose,
      customerName,
    });
  };

  if (state === 'success') {
    return (
      <div className="space-y-6">
        <div className="bg-green-600/5 border border-green-600/20 rounded-2xl p-6">
          <PaymentStatusIcon
            variant="success"
            title="Success"
            description="Your M-Pesa payment was received successfully."
          />
          {providerReference && (
            <p className="text-center text-sm text-textlight -mt-2">
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

  if (state === 'failed') {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <PaymentStatusIcon
            variant="failed"
            title="Failed"
            description={error ?? 'Payment could not be completed.'}
          />
        </div>
        <button
          type="button"
          onClick={() => reset()}
          className="w-full bg-gradient-to-r from-accent to-accentDark text-white font-bold py-3 px-6 rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (state === 'cancelled') {
    return (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <PaymentStatusIcon
            variant="cancelled"
            title="Cancelled"
            description={error ?? 'You cancelled the payment on your phone.'}
          />
        </div>
        <button
          type="button"
          onClick={() => reset()}
          className="w-full bg-gradient-to-r from-accent to-accentDark text-white font-bold py-3 px-6 rounded-xl"
        >
          Try Again
        </button>
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

      {error && state !== 'waiting' && state !== 'sending' && (
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
