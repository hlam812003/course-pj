import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/courses',
  '/settings'
];


const publicRoutes = [
  '/',
  '/about',
  '/contact',
  '/prices'
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/dashboard/:path*",
  ],
}
