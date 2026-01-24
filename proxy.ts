import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'admin-session';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Set pathname header for routing
  response.headers.set('x-pathname', request.nextUrl.pathname);

  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const session = request.cookies.get(SESSION_COOKIE_NAME);

    if (!session?.value) {
      // Redirect to login with return URL
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('returnTo', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
