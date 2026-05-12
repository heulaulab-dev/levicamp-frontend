import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const response = NextResponse.next();

	// Content-Security-Policy
	response.headers.set(
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval'",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: https://assets.levicamp.id https://assets.tazkiyaworks.fun https://api.sandbox.midtrans.com https://api.midtrans.com blob:",
			"font-src 'self' data:",
			"connect-src 'self' https://api.levicamp.id https://api-sandbox.levicamp.id",
			"frame-ancestors 'none'",
			"form-action 'self'",
		].join('; '),
	);

	// X-Frame-Options
	response.headers.set('X-Frame-Options', 'DENY');

	// X-Content-Type-Options
	response.headers.set('X-Content-Type-Options', 'nosniff');

	// Strict-Transport-Security (HSTS)
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains; preload',
	);

	// X-XSS-Protection (legacy but still recommended)
	response.headers.set('X-XSS-Protection', '1; mode=block');

	// Referrer-Policy
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	// Permissions-Policy
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=()',
	);

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};