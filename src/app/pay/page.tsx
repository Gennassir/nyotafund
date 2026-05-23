'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentForm from '@/components/PaymentForm';

function PayPageContent() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('applicationId') ?? undefined;
  const amountParam = searchParams.get('amount');
  const phone = searchParams.get('phone') ?? '';
  const purposeParam = searchParams.get('purpose');
  const purpose =
    purposeParam === 'processing_fee' ? 'processing_fee' : 'loan_repayment';

  const defaultAmount = amountParam ? Number(amountParam) : undefined;

  return (
    <div className="min-h-screen bg-lightbg pt-20">
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4 font-government">Make a Payment</h1>
          <p className="text-lg font-light">
            Secure M-Pesa payments powered by PayHero
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto bg-cardbg rounded-3xl shadow-2xl p-8 border border-border">
          <PaymentForm
            applicationId={applicationId}
            defaultAmount={Number.isFinite(defaultAmount) ? defaultAmount : undefined}
            defaultPhone={phone}
            purpose={purpose}
            title={
              purpose === 'processing_fee'
                ? 'Pay Application Processing Fee'
                : 'Repay Your Loan'
            }
            description={
              purpose === 'processing_fee'
                ? 'Pay the non-refundable processing fee to submit your application for review.'
                : 'Repay part or all of your approved loan using M-Pesa STK push.'
            }
          />
        </div>
      </section>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-lightbg pt-20 flex items-center justify-center">
          <p className="text-textlight">Loading payment...</p>
        </div>
      }
    >
      <PayPageContent />
    </Suspense>
  );
}
