import {
  getPayHeroAuthHeader,
  getPayHeroChannelId,
  PAYHERO_API_BASE,
} from './config';

export type StkPushRequest = {
  amount: number;
  phone_number: string;
  external_reference: string;
  customer_name?: string;
  callback_url: string;
  channel_id?: number;
};

export type StkPushResponse = {
  success: boolean;
  status: string;
  reference: string;
  CheckoutRequestID?: string;
};

export type TransactionStatusResponse = {
  success?: boolean;
  status: 'QUEUED' | 'SUCCESS' | 'FAILED' | string;
  reference?: string;
  provider_reference?: string;
  third_party_reference?: string;
  payment_reference?: string;
  provider?: string;
  transaction_date?: string;
};

async function payHeroFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${PAYHERO_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: getPayHeroAuthHeader(),
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  const text = await response.text();
  let body: unknown = {};
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { error_message: text };
    }
  }

  if (!response.ok) {
    const message =
      (body as { error_message?: string }).error_message ||
      (body as { message?: string }).message ||
      `PayHero request failed (${response.status})`;
    throw new Error(message);
  }

  return body as T;
}

export async function initiateMpesaStkPush(
  payload: StkPushRequest
): Promise<StkPushResponse> {
  return payHeroFetch<StkPushResponse>('/payments', {
    method: 'POST',
    body: JSON.stringify({
      amount: Math.round(payload.amount),
      phone_number: payload.phone_number,
      channel_id: payload.channel_id ?? getPayHeroChannelId(),
      provider: 'm-pesa',
      external_reference: payload.external_reference,
      customer_name: payload.customer_name,
      callback_url: payload.callback_url,
    }),
  });
}

export async function getTransactionStatus(
  reference: string
): Promise<TransactionStatusResponse> {
  const params = new URLSearchParams({ reference });
  return payHeroFetch<TransactionStatusResponse>(
    `/transaction-status?${params.toString()}`,
    { method: 'GET' }
  );
}

export function normalizeKenyanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('254') && digits.length === 12) {
    return `0${digits.slice(3)}`;
  }
  if (digits.startsWith('0') && digits.length === 10) {
    return digits;
  }
  if (digits.length === 9) {
    return `0${digits}`;
  }
  throw new Error('Enter a valid Kenyan phone number (e.g. 0712345678).');
}
