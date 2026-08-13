import {
  UPESIPAY_API_BASE,
  UPESIPAY_BASIC_AUTH,
  UPESIPAY_API_USERNAME,
  UPESIPAY_API_PASSWORD,
} from './config';

export interface StkPushResponse {
  success: boolean;
  status_code: number;
  message: string;
  data?: {
    checkout_request_id: string;
    merchant_request_id: string;
    phone_number: string;
    amount: number;
    status: string;
  };
  request_id?: string;
}

export interface TransactionStatusResponse {
  success: boolean;
  status_code: number;
  message: string;
  data?: {
    id: string;
    type: string;
    status: string;
    amount: number;
    charge?: number;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };
}

function getAuthHeader(): string {
  if (UPESIPAY_BASIC_AUTH) {
    return UPESIPAY_BASIC_AUTH;
  }
  if (UPESIPAY_API_USERNAME && UPESIPAY_API_PASSWORD) {
    const token = Buffer.from(`${UPESIPAY_API_USERNAME}:${UPESIPAY_API_PASSWORD}`).toString('base64');
    return `Basic ${token}`;
  }
  throw new Error('UpesiPay credentials are not configured.');
}

async function upesipayFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${UPESIPAY_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`UpesiPay request failed (${response.status}): ${text}`);
  }

  return response.json();
}

export async function initiateStkPush(params: {
  channel_id: string | number;
  phone_number: string;
  amount: number;
  callback_url?: string;
  external_reference?: string;
  customer_name?: string;
}): Promise<StkPushResponse> {
  const payload: Record<string, unknown> = {
    channel_id: params.channel_id,
    phone_number: params.phone_number,
    amount: params.amount,
  };

  if (params.callback_url) {
    payload.callback_url = params.callback_url;
  }
  if (params.external_reference) {
    payload.external_reference = params.external_reference;
  }
  if (params.customer_name) {
    payload.customer_name = params.customer_name;
  }

  return upesipayFetch<StkPushResponse>('/collections/initiate/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getTransactionStatus(reference: string): Promise<TransactionStatusResponse> {
  return upesipayFetch<TransactionStatusResponse>(
    `/transaction-status?reference=${encodeURIComponent(reference)}`
  );
}
