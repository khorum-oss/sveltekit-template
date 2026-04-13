import { writable, derived } from 'svelte/store';
import { DataSource } from '$lib/data/types';
import { getAvailableSources, isSourceAvailable, parseDataSource } from '$lib/data/config';
import { browser } from '$app/environment';

const STORAGE_KEY = 'khorum_data_source';

function getInitialSource(): DataSource {
	if (browser) {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = parseDataSource(stored);
				if (isSourceAvailable(parsed)) return parsed;
			} catch {
				// ignore invalid stored value
			}
		}
	}
	return DataSource.MOCKED;
}

export const dataSource = writable<DataSource>(getInitialSource());

if (browser) {
	dataSource.subscribe((value) => {
		localStorage.setItem(STORAGE_KEY, value);
	});
}

export const availableSources = derived(dataSource, () => getAvailableSources());

export function setDataSource(source: DataSource) {
	if (isSourceAvailable(source)) {
		dataSource.set(source);
	}
}
