import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getTransactionStatus } from '@/lib/payhero/client';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference')?.trim();

    if (!reference) {
      return NextResponse.json({ error: 'reference is required.' }, { status: 400 });
    }

    const status = await getTransactionStatus(reference);
    const normalized = (status.status ?? '').toUpperCase();

    if (normalized === 'SUCCESS' || normalized === 'FAILED') {
      const admin = getSupabaseAdmin();
      await admin
        .from('transactions')
        .update({
          status: normalized === 'SUCCESS' ? 'completed' : 'failed',
          transaction_id:
            status.provider_reference ||
            status.third_party_reference ||
            status.payment_reference ||
            null,
          provider_reference:
            status.provider_reference || status.third_party_reference || null,
          payhero_reference: status.reference ?? reference,
          updated_at: new Date().toISOString(),
        })
        .or(`payhero_reference.eq.${reference},external_reference.eq.${reference}`);
    }

    return NextResponse.json({
      reference,
      status: normalized || status.status,
      success: normalized === 'SUCCESS',
      providerReference:
        status.provider_reference || status.third_party_reference || null,
      raw: status,
    });
  } catch (error) {
    console.error('Payment status error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to fetch payment status.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
