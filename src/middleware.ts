import { NextResponse, type NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard(.*)', '/checkout'];
const excludedRoutes = ['/api(.*)'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionCookie = request.cookies.get('authjs.session-token');

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isExcluded = excludedRoutes.some((route) => pathname.startsWith(route));

  if (isExcluded) {
    return NextResponse.next();
  }

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
