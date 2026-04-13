import { DataSource, DEV_SOURCES, PROD_SOURCES } from './types';
import { isProd } from '$lib/utils/env';

export function getAvailableSources(): DataSource[] {
	return isProd() ? PROD_SOURCES : DEV_SOURCES;
}

export function isSourceAvailable(source: DataSource): boolean {
	return getAvailableSources().includes(source);
}

export function parseDataSource(value: string): DataSource {
	const source = Object.values(DataSource).find((s) => s === value);
	if (!source) throw new Error(`Invalid data source: ${value}`);
	return source;
}
