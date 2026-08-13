'use client';

import { useState } from 'react';
import PaymentStatusIcon from '@/components/PaymentStatusIcon';
import { useMpesaPayment, MpesaPaymentState } from '@/hooks/useMpesaPayment';

type PaymentFormProps = {
  applicationId?: string;
  defaultAmount?: number;
  defaultPhone?: string;
  purpose?: 'loan_repayment' | 'processing_fee';
  title?: string;
  description?: string;
  defaultName?: string;
  defaultIdNumber?: string;
  loanLabel?: string;
};

export default function PaymentForm({
  applicationId,
  defaultAmount,
  defaultPhone = '',
  purpose = 'loan_repayment',
  title = 'Pay with M-Pesa',
  description = 'Enter your M-Pesa number and amount. You will receive an STK push on your phone to complete payment.',
  defaultName = '',
  defaultIdNumber = '',
  loanLabel,
}: PaymentFormProps) {
  const [amount, setAmount] = useState(defaultAmount?.toString() || '');
  const [phone, setPhone] = useState(defaultPhone);
  const [name, setName] = useState(defaultName);
  const [idNumber, setIdNumber] = useState(defaultIdNumber);

  const { state, error, reference, providerReference, initiatePayment, reset } =
    useMpesaPayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await initiatePayment({
      phone,
      amount: Number(amount),
      applicationId,
      purpose,
      customerName: name || undefined,
    });
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
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2 font-government">{title}</h2>
        <p className="text-textlight">{description}</p>
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
          {(state === 'failed' || state === 'cancelled') && (
            <button
              type="button"
              onClick={reset}
              className="mt-4 w-full bg-accent text-white font-bold py-3 px-6 rounded-xl hover:bg-accentDark transition-colors"
            >
              Try Again
            </button>
          )}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ID Number</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your ID number"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">M-Pesa Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="07XX XXX XXX"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (KSh) *</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>

          {reference && state === 'waiting' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
              <p className="font-semibold mb-1">Waiting for M-Pesa confirmation</p>
              <p>
                Check your phone <span className="font-semibold">{phone}</span> and enter your
                M-Pesa PIN to approve KSh {Number(amount).toLocaleString()}.
              </p>
              <p className="mt-2 text-xs text-amber-600">
                Reference: {reference}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={state === 'sending' || state === 'waiting'}
            className="w-full bg-gradient-to-r from-accent to-accentDark hover:from-accentDark hover:to-accent disabled:opacity-60 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {state === 'sending' ? 'Sending STK push...' : state === 'waiting' ? 'Waiting for confirmation...' : 'Pay with M-Pesa'}
          </button>
        </form>
      )}
    </div>
  );
}
