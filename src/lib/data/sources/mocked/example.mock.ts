import type { Repository } from '$lib/data/types';
import type { ExampleItem, CreateExampleItem, UpdateExampleItem } from '$lib/types/example';

const mockData: ExampleItem[] = [
	{
		id: '1',
		title: 'Getting Started',
		description: 'Learn the basics of the template',
		priority: 1,
		createdAt: '2024-01-01T00:00:00Z',
		updatedAt: '2024-01-01T00:00:00Z'
	},
	{
		id: '2',
		title: 'Data Sources',
		description: 'Explore the 4 data source modes',
		priority: 2,
		createdAt: '2024-01-02T00:00:00Z',
		updatedAt: '2024-01-02T00:00:00Z'
	},
	{
		id: '3',
		title: 'Authentication',
		description: 'Configure optional auth system',
		priority: 3,
		createdAt: '2024-01-03T00:00:00Z',
		updatedAt: '2024-01-03T00:00:00Z'
	}
];

export function createMockedExampleRepo(): Repository<
	ExampleItem,
	CreateExampleItem,
	UpdateExampleItem
> {
	let items = [...mockData];

	return {
		async getAll() {
			return [...items];
		},
		async getById(id: string) {
			return items.find((item) => item.id === id) ?? null;
		},
		async create(data: CreateExampleItem) {
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
			return item;
		},
		async update(id: string, data: UpdateExampleItem) {
			const index = items.findIndex((item) => item.id === id);
			if (index === -1) throw new Error(`Item not found: ${id}`);
			items[index] = {
				...items[index],
				...data,
				updatedAt: new Date().toISOString()
			};
			return items[index];
		},
		async delete(id: string) {
			items = items.filter((item) => item.id !== id);
		}
	};
}
