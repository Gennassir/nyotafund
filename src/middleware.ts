import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register', '/forgot-password', '/terms', '/privacy'];
const protectedRoutes = ['/loans', '/apply', '/calculator', '/how-it-works', '/testimonials', '/contact', '/profile', '/pay'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never protect API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Allow public routes (exact match or starts with)
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  if (publicRoutes.some(route => pathname.startsWith(route + '/'))) {
    return NextResponse.next();
  }

  // Check for protected routes
  const isProtected = protectedRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

  if (isProtected) {
    // If Supabase env vars are missing, redirect to login (safer than crashing)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      let response = NextResponse.next();

      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              request.cookies.set({ name, value, ...options });
              response = NextResponse.next();
              response.cookies.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
              request.cookies.set({ name, value: '', ...options });
              response = NextResponse.next();
              response.cookies.set({ name, value: '', ...options });
            },
          },
        }
      );

      const { data: { user } } = await supabase.auth.getUser();

      // If not logged in, redirect to login
      if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      return response;
    } catch (err) {
      // Log error but don't crash - redirect to login as fallback
      console.error('Middleware auth error:', err);
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};