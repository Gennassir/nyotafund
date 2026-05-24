import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const publicRoutes = ['/forgot-password', '/terms', '/privacy'];
const protectedRoutes = ['/loans', '/apply', '/calculator', '/how-it-works', '/testimonials', '/contact', '/profile', '/pay'];

export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};