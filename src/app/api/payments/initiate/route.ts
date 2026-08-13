import { NextRequest, NextResponse } from 'next/server';
import { initiateStkPush } from '@/lib/upesipay/client';
import { isUpesiPayConfigured, UPESIPAY_CHANNEL_ID, getAppBaseUrl } from '@/lib/upesipay/config';

export async function POST(request: NextRequest) {
  try {
    if (!isUpesiPayConfigured()) {
      return NextResponse.json({ error: 'Payment gateway is not configured.' }, { status: 500 });
    }

    const body = await request.json();
    const phoneNumber = body.phoneNumber?.trim();
    const amount = Number(body.amount);
    const applicationId = body.applicationId?.trim();
    const purpose = body.purpose?.trim() || 'loan_repayment';
    const customerName = body.customerName?.trim();

    if (!phoneNumber || !amount || !applicationId) {
      return NextResponse.json(
        { error: 'Missing required fields: phoneNumber, amount, applicationId.' },
        { status: 400 }
      );
    }

    const callbackUrl = `${getAppBaseUrl()}/api/payments/callback`;

    const result = await initiateStkPush({
      channel_id: UPESIPAY_CHANNEL_ID,
      phone_number: phoneNumber,
      amount,
      callback_url: callbackUrl,
      external_reference: applicationId,
      customer_name: customerName || undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.message || 'Could not start payment.' },
        { status: result.status_code || 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message || 'STK push sent. Check your phone to complete payment.',
      checkoutRequestId: result.data?.checkout_request_id,
      merchantRequestId: result.data?.merchant_request_id,
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to initiate payment.' },
      { status: 500 }
    );
  }
}
