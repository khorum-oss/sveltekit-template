import { appConfig } from '$lib/config/app.config';

export function getAppEnv() {
	return appConfig.appEnv;
}

export function isProd() {
	return appConfig.appEnv === 'production';
}

export function isDev() {
	return appConfig.appEnv === 'development';
}

export function isStaging() {
	return appConfig.appEnv === 'staging';
}

export function isLowerEnv() {
	return !isProd();
}
