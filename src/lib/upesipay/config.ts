export const UPESIPAY_API_BASE = 'https://upesipay.com/api/v2';
export const UPESIPAY_API_USERNAME = process.env.UPESIPAY_API_USERNAME?.trim() || '';
export const UPESIPAY_API_PASSWORD = process.env.UPESIPAY_API_PASSWORD?.trim() || '';
export const UPESIPAY_BASIC_AUTH = process.env.UPESIPAY_BASIC_AUTH?.trim() || '';
export const UPESIPAY_CHANNEL_ID = process.env.UPESIPAY_CHANNEL_ID?.trim() || '99';

export function getAppBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL?.trim() || 'http://localhost:3000';
}

export function isUpesiPayConfigured(): boolean {
  return Boolean(
    (UPESIPAY_BASIC_AUTH || (UPESIPAY_API_USERNAME && UPESIPAY_API_PASSWORD)) &&
      UPESIPAY_CHANNEL_ID
  );
}
