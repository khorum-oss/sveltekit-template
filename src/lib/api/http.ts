import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { logger } from '$lib/utils/logger';

const AUTH_STORAGE_KEY = 'khorum_auth';

function getToken(): string | null {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(AUTH_STORAGE_KEY);
		if (!raw) return null;
		const state = JSON.parse(raw);
		return state.token ?? null;
	} catch {
		return null;
	}
}

async function request<T>(method: string, url: string, body?: unknown): Promise<T> {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	const token = getToken();
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const res = await fetch(url, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined
	});

	if (res.status === 401 && browser) {
		localStorage.removeItem(AUTH_STORAGE_KEY);
		await goto('/login');
		throw new Error('Unauthorized');
	}

	if (!res.ok) {
		const errorBody = await res.text();
		logger.error(`HTTP ${method} ${url} failed: ${res.status}`, errorBody);
		throw new Error(`HTTP ${res.status}: ${errorBody}`);
	}

	if (res.status === 204) return undefined as T;
	return res.json();
}

export const http = {
	get: <T>(url: string) => request<T>('GET', url),
	post: <T>(url: string, body?: unknown) => request<T>('POST', url, body),
	put: <T>(url: string, body?: unknown) => request<T>('PUT', url, body),
	patch: <T>(url: string, body?: unknown) => request<T>('PATCH', url, body),
	delete: <T>(url: string) => request<T>('DELETE', url)
};
