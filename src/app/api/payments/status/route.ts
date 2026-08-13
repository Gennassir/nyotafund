import { NextRequest, NextResponse } from 'next/server';
import { getTransactionStatus } from '@/lib/upesipay/client';

export async function GET(request: NextRequest) {
  try {
    const reference = request.nextUrl.searchParams.get('reference');

    if (!reference) {
      return NextResponse.json({ error: 'Missing reference parameter.' }, { status: 400 });
    }

    const result = await getTransactionStatus(reference);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message || 'Could not verify payment.' },
        { status: result.status_code || 400 }
      );
    }

    const status = result.data?.status || 'unknown';

    return NextResponse.json({
      success: true,
      status,
      transaction: result.data,
    });
  } catch (error) {
    console.error('Payment status error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch payment status.' },
      { status: 500 }
    );
  }
}
