import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { corsHeaders } from '$lib/server/cors';
import { requireServerAuth } from '$lib/server/auth';
import { logger } from '$lib/utils/logger';

export const handle: Handle = async ({ event, resolve }) => {
	const origin = event.request.headers.get('origin');

	// Handle CORS preflight
	if (event.request.method === 'OPTIONS') {
		return new Response(null, {
			status: 204,
			headers: corsHeaders(origin)
		});
	}

	// Enforce server-side auth on /api/db/* routes
	if (event.url.pathname.startsWith('/api/db/')) {
		const authError = requireServerAuth(event);
		if (authError) return authError;
	}

	// Proxy /api/* requests (except /api/db/*) to backend
	if (event.url.pathname.startsWith('/api/') && !event.url.pathname.startsWith('/api/db/')) {
		const backendUrl = env.BACKEND_URL;
		if (!backendUrl) {
			logger.warn('BACKEND_URL not set, cannot proxy API request');
			return new Response(JSON.stringify({ error: 'Backend not configured' }), {
				status: 502,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const targetUrl = `${backendUrl}${event.url.pathname}${event.url.search}`;
		const headers = new Headers(event.request.headers);
		headers.delete('host');

		try {
			const response = await fetch(targetUrl, {
				method: event.request.method,
				headers,
				body: event.request.body,
				// @ts-expect-error duplex needed for streaming body
				duplex: 'half'
			});

			const responseHeaders = new Headers(response.headers);
			const cors = corsHeaders(origin);
			for (const [key, value] of Object.entries(cors)) {
				responseHeaders.set(key, value);
			}

			return new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers: responseHeaders
			});
		} catch (e) {
			logger.error('Backend proxy error', e);
			return new Response(JSON.stringify({ error: 'Backend unavailable' }), {
				status: 502,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}

	const response = await resolve(event);

	// Add CORS headers to all responses
	if (origin) {
		const cors = corsHeaders(origin);
		for (const [key, value] of Object.entries(cors)) {
			response.headers.set(key, value);
		}
	}

	return response;
};
