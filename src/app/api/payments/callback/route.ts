import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const merchantRequestId = payload.merchant_request_id?.trim();
    const checkoutRequestId = payload.checkout_request_id?.trim();
    const referenceId = payload.reference_id?.trim();
    const status = payload.status?.trim();

    if (!merchantRequestId || !checkoutRequestId || !status) {
      return NextResponse.json({ error: 'Invalid callback payload.' }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    let query = admin
      .from('transactions')
      .select('id, status')
      .or(`external_reference.eq.${referenceId || merchantRequestId}`);

    if (checkoutRequestId) {
      query = query.or(`external_reference.eq.${checkoutRequestId}`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Payment callback lookup error:', error);
    }

    const mappedStatus = status === 'success' ? 'completed' : status === 'cancelled' ? 'cancelled' : 'failed';

    if (data && data.length > 0) {
      await admin
        .from('transactions')
        .update({
          status: mappedStatus,
          transaction_id: checkoutRequestId,
          provider_reference: merchantRequestId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', data[0].id);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.json({ error: 'Callback processing failed.' }, { status: 500 });
  }
}
