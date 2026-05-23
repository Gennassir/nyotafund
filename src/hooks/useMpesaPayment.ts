'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type MpesaPaymentState =
  | 'idle'
  | 'sending'
  | 'waiting'
  | 'success'
  | 'failed'
  | 'cancelled';

type InitiateParams = {
  amount: number;
  phone: string;
  applicationId?: string;
  purpose?: 'loan_repayment' | 'processing_fee';
  customerName?: string;
};

function isCancelledStatus(status: string, raw: unknown): boolean {
  const upper = status.toUpperCase();
  if (upper === 'CANCELLED' || upper === 'CANCELED') return true;
  const desc =
    typeof raw === 'object' && raw !== null
      ? String(
          (raw as { ResultDesc?: string; result_desc?: string; message?: string })
            .ResultDesc ??
            (raw as { result_desc?: string }).result_desc ??
            (raw as { message?: string }).message ??
            ''
        )
      : '';
  return /cancel/i.test(desc);
}

export function useMpesaPayment() {
  const [state, setState] = useState<MpesaPaymentState>('idle');
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

  const reset = useCallback(() => {
    stopPolling();
    setState('idle');
    setError(null);
    setReference(null);
    setProviderReference(null);
  }, [stopPolling]);

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

          if (isCancelledStatus(status, data.raw)) {
            stopPolling();
            setState('cancelled');
            setError('Payment was cancelled on your phone.');
            return;
          }

          if (status === 'FAILED') {
            stopPolling();
            setState('failed');
            setError('Payment failed. Please try again.');
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

  const initiatePayment = useCallback(
    async (params: InitiateParams) => {
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
            amount: params.amount,
            phone: params.phone,
            applicationId: params.applicationId,
            purpose: params.purpose ?? 'processing_fee',
            customerName: params.customerName,
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
    },
    [pollStatus, stopPolling]
  );

  return {
    state,
    error,
    reference,
    providerReference,
    initiatePayment,
    reset,
    stopPolling,
  };
}
