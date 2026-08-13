import { useState, useCallback, useEffect } from 'react';

export type MpesaPaymentState = 'idle' | 'sending' | 'waiting' | 'success' | 'failed' | 'cancelled';

export interface MpesaPaymentResult {
  state: MpesaPaymentState;
  error: string | null;
  reference: string | null;
  providerReference: string | null;
}

export function useMpesaPayment(): MpesaPaymentResult & {
  initiatePayment: (params: {
    phone: string;
    amount: number;
    applicationId?: string;
    purpose?: 'loan_repayment' | 'processing_fee';
    customerName?: string;
  }) => Promise<void>;
  reset: () => void;
} {
  const [state, setState] = useState<MpesaPaymentState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [providerReference, setProviderReference] = useState<string | null>(null);

  const reset = useCallback(() => {
    setState('idle');
    setError(null);
    setReference(null);
    setProviderReference(null);
  }, []);

  useEffect(() => {
    if (state !== 'waiting') return;
    let cancelled = false;

    const pollStatus = async () => {
      if (!reference) return;
      try {
        const res = await fetch(`/api/payments/status?reference=${encodeURIComponent(reference)}`);
        const data = await res.json();
        if (cancelled) return;

        if (data.status === 'success') {
          setState('success');
          setProviderReference(data.transaction?.id || reference);
        } else if (data.status === 'failed') {
          setState('failed');
          setError('Payment failed. Please try again.');
        } else if (data.status === 'cancelled') {
          setState('cancelled');
          setError('Payment was cancelled on your phone.');
        } else {
          setTimeout(() => pollStatus(), 3000);
        }
      } catch {
        if (!cancelled) {
          setTimeout(() => pollStatus(), 3000);
        }
      }
    };

    pollStatus();

    return () => {
      cancelled = true;
    };
  }, [state, reference]);

  const initiatePayment = useCallback(
    async (params: {
      phone: string;
      amount: number;
      applicationId?: string;
      purpose?: 'loan_repayment' | 'processing_fee';
      customerName?: string;
    }) => {
      reset();
      setState('sending');

      try {
        const res = await fetch('/api/payments/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber: params.phone,
            amount: params.amount,
            applicationId: params.applicationId,
            purpose: params.purpose,
            customerName: params.customerName,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to start payment.');
        }

        setReference(data.checkoutRequestId || data.merchantRequestId);
        setState('waiting');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to start payment.';
        setError(message);
        setState('failed');
      }
    },
    [reset]
  );

  return {
    state,
    error,
    reference,
    providerReference,
    initiatePayment,
    reset,
  };
}
