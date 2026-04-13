import { browser } from '$app/environment';
import type { Repository } from '$lib/data/types';
import type { ExampleItem, CreateExampleItem, UpdateExampleItem } from '$lib/types/example';

const STORAGE_KEY = 'khorum_example_items';

function readItems(): ExampleItem[] {
	if (!browser) return [];
	const raw = localStorage.getItem(STORAGE_KEY);
	return raw ? JSON.parse(raw) : [];
}

function writeItems(items: ExampleItem[]) {
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function createLocalStorageExampleRepo(): Repository<
	ExampleItem,
	CreateExampleItem,
	UpdateExampleItem
> {
	return {
		async getAll() {
			return readItems();
		},
		async getById(id: string) {
			return readItems().find((item) => item.id === id) ?? null;
		},
		async create(data: CreateExampleItem) {
			const items = readItems();
			const now = new Date().toISOString();
			const item: ExampleItem = {
				id: crypto.randomUUID(),
				title: data.title,
				description: data.description,
				priority: data.priority ?? 1,
				createdAt: now,
				updatedAt: now
			};
			items.push(item);
			writeItems(items);
			return item;
		},
		async update(id: string, data: UpdateExampleItem) {
			const items = readItems();
			const index = items.findIndex((item) => item.id === id);
			if (index === -1) throw new Error(`Item not found: ${id}`);
			items[index] = {
				...items[index],
				...data,
				updatedAt: new Date().toISOString()
			};
			writeItems(items);
			return items[index];
		},
		async delete(id: string) {
			const items = readItems().filter((item) => item.id !== id);
			writeItems(items);
		}
	};
}
