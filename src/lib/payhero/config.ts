function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getPayHeroAuthHeader(): string {
  const token = process.env.PAYHERO_BASIC_AUTH_TOKEN?.trim();
  if (token) {
    return token.startsWith('Basic ') ? token : `Basic ${token}`;
  }

  const username = process.env.PAYHERO_API_USERNAME?.trim();
  const password = process.env.PAYHERO_API_PASSWORD?.trim();
  if (username && password) {
    const encoded = Buffer.from(`${username}:${password}`).toString('base64');
    return `Basic ${encoded}`;
  }

  throw new Error(
    'PayHero credentials missing. Set PAYHERO_BASIC_AUTH_TOKEN or PAYHERO_API_USERNAME and PAYHERO_API_PASSWORD.'
  );
}

export function getPayHeroChannelId(): number {
  const raw = requireEnv('PAYHERO_CHANNEL_ID');
  const channelId = Number.parseInt(raw, 10);
  if (!Number.isFinite(channelId) || channelId <= 0) {
    throw new Error('PAYHERO_CHANNEL_ID must be a positive integer.');
  }
  return channelId;
}

export function getPayHeroAccountId(): number {
  const raw = process.env.PAYHERO_ACCOUNT_ID?.trim();
  if (!raw) return 5489;
  const accountId = Number.parseInt(raw, 10);
  if (!Number.isFinite(accountId) || accountId <= 0) {
    throw new Error('PAYHERO_ACCOUNT_ID must be a positive integer.');
  }
  return accountId;
}

export function getAppBaseUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    process.env.APP_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');

  if (configured) return configured.replace(/\/$/, '');
  return 'http://localhost:3000';
}

export const PAYHERO_API_BASE = 'https://backend.payhero.co.ke/api/v2';
