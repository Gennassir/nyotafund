'use client';

import { useState } from 'react';
import PaymentStatusIcon from '@/components/PaymentStatusIcon';
import { useMpesaPayment, MpesaPaymentState } from '@/hooks/useMpesaPayment';

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
  const { state, error, reference, providerReference, initiatePayment, reset } =
    useMpesaPayment();

  const [mpesaNumber, setMpesaNumber] = useState(defaultPhone);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await initiatePayment({
      phone: mpesaNumber,
      amount,
      applicationId,
      purpose,
    });
  };

  const handleClose = () => {
    reset();
    setMpesaNumber(defaultPhone);
    onClose();
  };

  const getStatusVariant = (currentState: MpesaPaymentState): 'success' | 'failed' | 'cancelled' => {
    if (currentState === 'success') return 'success';
    if (currentState === 'cancelled') return 'cancelled';
    return 'failed';
  };

  const getStatusDescription = (currentState: MpesaPaymentState): string => {
    if (currentState === 'success') {
      if (purpose === 'processing_fee' && loanLabel) {
        return `Your processing fee for ${loanLabel} was received successfully. Your application will be reviewed shortly.`;
      }
      return 'Your M-Pesa payment was received successfully.';
    }
    if (currentState === 'cancelled') {
      return error ?? 'You cancelled the payment on your phone.';
    }
    return error ?? 'Payment could not be completed. Please try again.';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-cardbg rounded-3xl shadow-2xl p-8 border border-border max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 id="mpesa-modal-title" className="text-xl font-bold text-primary font-government">
            {purpose === 'processing_fee' ? 'Pay Processing Fee' : 'M-Pesa Payment'}
          </h2>
          <button
            onClick={handleClose}
            disabled={state === 'sending' || state === 'waiting'}
            className="text-textlight hover:text-primary transition-colors disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {(state === 'success' || state === 'failed' || state === 'cancelled') && (
          <div className="mb-6">
            <PaymentStatusIcon variant={getStatusVariant(state)} description={getStatusDescription(state)} />
            {state === 'success' && providerReference && (
              <p className="mt-2 text-sm text-gray-500 text-center">
                M-Pesa code:{' '}
                <span className="font-semibold text-primary">{providerReference}</span>
              </p>
            )}
            <div className="mt-6 flex gap-3">
              {(state === 'failed' || state === 'cancelled') && (
                <button
                  type="button"
                  onClick={reset}
                  className="flex-1 bg-accent text-white font-bold py-3 px-6 rounded-xl hover:bg-accentDark transition-colors"
                >
                  Try Again
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {(state === 'idle' || state === 'sending' || state === 'waiting') && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {purpose === 'processing_fee' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={defaultName}
                    readOnly
                    className="w-full px-4 py-3 border border-border rounded-xl bg-gray-50 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ID Number</label>
                  <input
                    type="text"
                    value={defaultIdNumber}
                    readOnly
                    className="w-full px-4 py-3 border border-border rounded-xl bg-gray-50 text-gray-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">M-Pesa Number *</label>
              <input
                type="tel"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
                required
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="07XX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (KSh)</label>
              <div className="w-full px-4 py-3 border border-border rounded-xl bg-gray-50 text-gray-700 font-semibold">
                KSh {amount.toLocaleString()}
              </div>
            </div>

            {reference && state === 'waiting' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
                <p className="font-semibold mb-1">Waiting for M-Pesa confirmation</p>
                <p>
                  Check your phone <span className="font-semibold">{mpesaNumber}</span> and enter your
                  M-Pesa PIN to approve KSh {amount.toLocaleString()}.
                </p>
                <p className="mt-2 text-xs text-amber-600">
                  Reference: {reference}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={state === 'sending' || state === 'waiting'}
                className="flex-1 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={state === 'sending' || state === 'waiting'}
                className="flex-1 bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {state === 'sending' ? 'Sending STK push...' : state === 'waiting' ? 'Waiting...' : 'Pay Now'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
