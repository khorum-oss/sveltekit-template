import { writable, derived } from 'svelte/store';
import { dataSource } from '$lib/stores/data-source';
import { getRepository } from '$lib/data/registry';
import '$lib/data/repositories/example.repository';
import type { ExampleItem, CreateExampleItem, UpdateExampleItem } from '$lib/types/example';
import type { DataSource } from '$lib/data/types';
import { logger } from '$lib/utils/logger';

const items = writable<ExampleItem[]>([]);
const loading = writable(false);
const error = writable<string | null>(null);

let currentSource: DataSource;

dataSource.subscribe((source) => {
	currentSource = source;
	loadItems();
});

function getRepo() {
	return getRepository<ExampleItem>('example', currentSource);
}

async function loadItems() {
	loading.set(true);
	error.set(null);
	try {
		const result = await getRepo().getAll();
		items.set(result);
	} catch (e) {
		const msg = e instanceof Error ? e.message : 'Failed to load items';
		logger.error('Failed to load example items', e);
		error.set(msg);
	} finally {
		loading.set(false);
	}
}

export const exampleStore = {
	items: derived(items, ($items) => $items),
	loading: derived(loading, ($loading) => $loading),
	error: derived(error, ($error) => $error),

	async refresh() {
		await loadItems();
	},

	async create(data: CreateExampleItem) {
		const item = await getRepo().create(data);
		items.update((current) => [...current, item]);
		return item;
	},

	async update(id: string, data: UpdateExampleItem) {
		const item = await getRepo().update(id, data);
		items.update((current) => current.map((i) => (i.id === id ? item : i)));
		return item;
	},

	async remove(id: string) {
		await getRepo().delete(id);
		items.update((current) => current.filter((i) => i.id !== id));
	}
};
