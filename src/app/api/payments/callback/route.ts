import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

type CallbackPayload = {
  paymentSuccess?: boolean;
  success?: boolean;
  status?: string;
  reference?: string;
  user_reference?: string;
  external_reference?: string;
  providerReference?: string;
  provider_reference?: string;
  amount?: number;
  phone?: string;
};

function isSuccessful(payload: CallbackPayload): boolean {
  if (payload.paymentSuccess === true || payload.success === true) return true;
  const status = (payload.status ?? '').toUpperCase();
  return status === 'SUCCESS';
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CallbackPayload;
    const externalRef =
      payload.user_reference || payload.external_reference || payload.reference;
    const payheroRef = payload.reference;
    const providerRef = payload.providerReference || payload.provider_reference;
    const succeeded = isSuccessful(payload);

    if (!externalRef && !payheroRef) {
      return NextResponse.json({ received: true, skipped: 'no reference' });
    }

    const admin = getSupabaseAdmin();
    let query = admin.from('transactions').update({
      status: succeeded ? 'completed' : 'failed',
      transaction_id: providerRef ?? null,
      provider_reference: providerRef ?? null,
      payhero_reference: payheroRef ?? null,
      updated_at: new Date().toISOString(),
    });

    if (externalRef && payheroRef) {
      query = query.or(
        `external_reference.eq.${externalRef},payhero_reference.eq.${payheroRef}`
      );
    } else if (externalRef) {
      query = query.eq('external_reference', externalRef);
    } else if (payheroRef) {
      query = query.eq('payhero_reference', payheroRef);
    }

    const { error } = await query;
    if (error) {
      console.error('Callback update failed:', error);
    }

    return NextResponse.json({ received: true, updated: !error });
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.json({ received: true });
  }
}
