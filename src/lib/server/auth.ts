import type { RequestEvent } from '@sveltejs/kit';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

const PUBLIC_ROUTES = ['/__health'];

function isAuthEnabled(): boolean {
	return publicEnv.PUBLIC_AUTH_ENABLED !== 'false';
}

function isDev(): boolean {
	return (publicEnv.PUBLIC_APP_ENV ?? 'development') === 'development';
}

function isPublicApiRoute(pathname: string): boolean {
	return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

export function requireServerAuth(event: RequestEvent): Response | null {
	if (!isAuthEnabled()) return null;
	if (isPublicApiRoute(event.url.pathname)) return null;

	const authHeader = event.request.headers.get('authorization');
	if (!authHeader?.startsWith('Bearer ')) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const token = authHeader.slice(7);
	if (!token) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// In dev mode, accept any non-empty token (trust client)
	if (isDev()) return null;

	// In production, validate token against the backend or a shared secret
	// For now, require that a JWT_SECRET is configured and the token is present.
	// Real validation (JWT verify, backend check) should be added when deploying.
	const jwtSecret = privateEnv.JWT_SECRET;
	if (!jwtSecret) {
		// No secret configured — reject to fail secure
		return new Response(JSON.stringify({ error: 'Auth not configured on server' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// TODO: Add real JWT verification here when deploying to production
	// For now, presence of token + configured secret = allowed
	return null;
}
