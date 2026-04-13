import { env } from '$env/dynamic/private';

export function getCorsOrigins(): string[] {
	const origins = env.CORS_ALLOWED_ORIGINS ?? '';
	return origins
		.split(',')
		.map((o) => o.trim())
		.filter(Boolean);
}

export function corsHeaders(origin: string | null): Record<string, string> {
	const allowed = getCorsOrigins();
	const headers: Record<string, string> = {
		'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Access-Control-Max-Age': '86400'
	};

	if (origin && allowed.includes(origin)) {
		headers['Access-Control-Allow-Origin'] = origin;
		headers['Access-Control-Allow-Credentials'] = 'true';
	}

	return headers;
}
