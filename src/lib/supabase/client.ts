import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  );
}

function createSupabaseBrowserClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client that returns errors gracefully
    return createClient('https://placeholder.supabase.co', 'placeholder-key');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

/** Browser Supabase client (lazy — safe for static page generation at build time). */
export function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createSupabaseBrowserClient();
  }
  return supabaseClient;
}

/**
 * Back-compat export. Access is deferred until first use so `next build` does not
 * throw when env vars are missing during prerender.
 */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    try {
      const client = getSupabase();
      const value = Reflect.get(client, prop, client);
      return typeof value === 'function' ? (value as (...args: unknown[]) => unknown).bind(client) : value;
    } catch {
      // Return a no-op function for methods if client creation fails
      if (prop === 'auth') {
        return {
          signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Configuration error. Please contact support.' } }),
          signUp: async () => ({ data: { user: null }, error: { message: 'Configuration error. Please contact support.' } }),
          signOut: async () => {},
        };
      }
      if (prop === 'from') {
        return () => ({
          insert: async () => ({ data: [], error: { message: 'Configuration error. Please contact support.' } }),
          select: async () => ({ data: [], error: null }),
        });
      }
      return undefined;
    }
  },
});