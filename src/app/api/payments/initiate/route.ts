import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getAppBaseUrl } from '@/lib/payhero/config';
import { initiateMpesaStkPush, normalizeKenyanPhone } from '@/lib/payhero/client';
import { createPaymentReference } from '@/lib/payments/reference';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

type InitiateBody = {
  amount?: number;
  phone?: string;
  applicationId?: string;
  purpose?: 'loan_repayment' | 'processing_fee';
  customerName?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InitiateBody;
    const amount = Number(body.amount);
    const purpose = body.purpose ?? 'loan_repayment';

    if (!Number.isFinite(amount) || amount < 1) {
      return NextResponse.json({ error: 'Amount must be at least KSh 1.' }, { status: 400 });
    }

    if (!body.phone?.trim()) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    const phone_number = normalizeKenyanPhone(body.phone);
    const external_reference = createPaymentReference(
      purpose === 'processing_fee' ? 'FEE' : 'PAY'
    );
    const callback_url = `${getAppBaseUrl()}/api/payments/callback`;

    const admin = getSupabaseAdmin();
    const { data: transaction, error: insertError } = await admin
      .from('transactions')
      .insert({
        application_id: body.applicationId ?? null,
        mpesa_number: phone_number,
        amount,
        status: 'pending',
        external_reference,
        payment_purpose: purpose,
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Failed to create transaction record:', insertError);
      return NextResponse.json(
        { error: 'Could not start payment. Please try again.' },
        { status: 500 }
      );
    }

    const stk = await initiateMpesaStkPush({
      amount,
      phone_number,
      external_reference,
      customer_name: body.customerName,
      callback_url,
    });

    await admin
      .from('transactions')
      .update({
        payhero_reference: stk.reference,
        updated_at: new Date().toISOString(),
      })
      .eq('id', transaction.id);

    return NextResponse.json({
      success: true,
      reference: stk.reference,
      externalReference: external_reference,
      status: stk.status,
      checkoutRequestId: stk.CheckoutRequestID,
      transactionId: transaction.id,
      message: 'STK push sent. Check your phone to complete payment.',
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to initiate payment.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
