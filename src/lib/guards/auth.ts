import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { isAuthenticated } from '$lib/stores/auth';
import { appConfig } from '$lib/config/app.config';

const PUBLIC_ROUTES = ['/login', '/register', '/__health'];

export function isPublicRoute(path: string): boolean {
	return PUBLIC_ROUTES.some((route) => path.startsWith(route));
}

export async function requireAuth(currentPath: string): Promise<boolean> {
	if (!appConfig.authEnabled) return true;
	if (isPublicRoute(currentPath)) return true;

	const authenticated = get(isAuthenticated);
	if (!authenticated) {
		await goto(`/login?redirect=${encodeURIComponent(currentPath)}`);
		return false;
	}
	return true;
}

export async function redirectIfAuthenticated(redirectTo = '/'): Promise<boolean> {
	if (!appConfig.authEnabled) return false;

	const authenticated = get(isAuthenticated);
	if (authenticated) {
		await goto(redirectTo);
		return true;
	}
	return false;
}
