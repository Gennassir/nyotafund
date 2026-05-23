'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PaymentStatusIcon from '@/components/PaymentStatusIcon';
import { useMpesaPayment } from '@/hooks/useMpesaPayment';

type MpesaPaymentModalProps = {
  open: boolean;
  onClose: () => void;
  amount: number;
  applicationId?: string;
  purpose?: 'loan_repayment' | 'processing_fee';
  defaultName?: string;
  defaultIdNumber?: string;
  defaultPhone?: string;
  loanLabel?: string;
};

export default function MpesaPaymentModal({
  open,
  onClose,
  amount,
  applicationId,
  purpose = 'processing_fee',
  defaultName = '',
  defaultIdNumber = '',
  defaultPhone = '',
  loanLabel,
}: MpesaPaymentModalProps) {
  const [fullName, setFullName] = useState(defaultName);
  const [idNumber, setIdNumber] = useState(defaultIdNumber);
  const [mpesaNumber, setMpesaNumber] = useState(defaultPhone);
  const { state, error, reference, providerReference, initiatePayment, reset } =
    useMpesaPayment();

  useEffect(() => {
    if (open) {
      setFullName(defaultName);
      setIdNumber(defaultIdNumber);
      setMpesaNumber(defaultPhone);
      reset();
    }
  }, [open, defaultName, defaultIdNumber, defaultPhone, reset]);

  if (!open) return null;

  const handleClose = () => {
    if (state === 'waiting' || state === 'sending') return;
    reset();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void initiatePayment({
      amount,
      phone: mpesaNumber,
      applicationId,
      purpose,
      customerName: fullName.trim() || undefined,
    });
  };

  const isTerminal = state === 'success' || state === 'failed' || state === 'cancelled';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mpesa-modal-title"
    >
      <div className="bg-cardbg rounded-3xl shadow-2xl w-full max-w-md border border-border overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <h2 id="mpesa-modal-title" className="text-lg font-bold text-primary font-government">
            M-Pesa Payment
          </h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={state === 'waiting' || state === 'sending'}
            className="text-textlight hover:text-primary disabled:opacity-40 p-1 rounded-lg"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {loanLabel && state === 'idle' && (
            <p className="text-sm text-textlight mb-4 text-center">
              {loanLabel} — pay <span className="font-semibold text-accent">KSh {amount.toLocaleString()}</span>{' '}
              processing fee
            </p>
          )}

          {state === 'success' && (
            <div className="space-y-4">
              <PaymentStatusIcon
                variant="success"
                title="Success"
                description="Your M-Pesa payment was received successfully."
              />
              {providerReference && (
                <p className="text-center text-sm text-textlight">
                  M-Pesa code:{' '}
                  <span className="font-semibold text-primary">{providerReference}</span>
                </p>
              )}
              <Link
                href="/profile"
                className="block w-full text-center bg-gradient-to-r from-accent to-accentDark text-white font-bold py-3 px-6 rounded-xl"
              >
                View Profile
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="block w-full text-center text-primary font-semibold py-2"
              >
                Close
              </button>
            </div>
          )}

          {state === 'failed' && (
            <div className="space-y-4">
              <PaymentStatusIcon
                variant="failed"
                title="Failed"
                description={error ?? 'Payment could not be completed. Please try again.'}
              />
              <button
                type="button"
                onClick={() => reset()}
                className="w-full bg-gradient-to-r from-accent to-accentDark text-white font-bold py-3 px-6 rounded-xl"
              >
                Try Again
              </button>
            </div>
          )}

          {state === 'cancelled' && (
            <div className="space-y-4">
              <PaymentStatusIcon
                variant="cancelled"
                title="Cancelled"
                description={error ?? 'You cancelled the payment on your phone.'}
              />
              <button
                type="button"
                onClick={() => reset()}
                className="w-full bg-gradient-to-r from-accent to-accentDark text-white font-bold py-3 px-6 rounded-xl"
              >
                Try Again
              </button>
            </div>
          )}

          {(state === 'waiting' || state === 'sending') && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-accent/30 border-t-accent animate-spin" />
              <p className="text-primary font-semibold">
                {state === 'sending' ? 'Sending STK push...' : 'Waiting for M-Pesa confirmation'}
              </p>
              <p className="text-sm text-textlight">
                Check your phone <span className="font-semibold">{mpesaNumber}</span> and enter your
                M-Pesa PIN to approve KSh {amount.toLocaleString()}.
              </p>
              {reference && (
                <p className="text-xs text-textlight">Reference: {reference}</p>
              )}
            </div>
          )}

          {state === 'idle' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-textlight text-center">
                Enter your details to receive an STK push on your phone.
              </p>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="As on National ID"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  ID Number *
                </label>
                <input
                  type="text"
                  required
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="National ID number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  M-Pesa Number *
                </label>
                <input
                  type="tel"
                  required
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="07XX XXX XXX"
                />
              </div>

              <div className="rounded-xl bg-primary/5 border border-primary/15 p-3 text-center">
                <p className="text-xs text-textlight uppercase tracking-wide">Amount to pay</p>
                <p className="text-2xl font-bold text-primary">KSh {amount.toLocaleString()}</p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-accent to-accentDark text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Pay with M-Pesa
              </button>
            </form>
          )}

          {error && !isTerminal && state !== 'waiting' && state !== 'sending' && (
            <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
