import { describe, it, expect, beforeEach } from 'vitest';
import { createMockedExampleRepo } from './example.mock';

describe('Mocked Example Repository', () => {
	let repo: ReturnType<typeof createMockedExampleRepo>;

	beforeEach(() => {
		repo = createMockedExampleRepo();
	});

	it('should return initial mock data', async () => {
		const items = await repo.getAll();
		expect(items.length).toBe(3);
		expect(items[0].title).toBe('Getting Started');
	});

	it('should get item by id', async () => {
		const item = await repo.getById('1');
		expect(item).not.toBeNull();
		expect(item!.title).toBe('Getting Started');
	});

	it('should return null for nonexistent id', async () => {
		const item = await repo.getById('nonexistent');
		expect(item).toBeNull();
	});

	it('should create a new item', async () => {
		const item = await repo.create({ title: 'New Item', description: 'Test' });
		expect(item.title).toBe('New Item');
		expect(item.description).toBe('Test');
		expect(item.priority).toBe(1);
		expect(item.id).toBeDefined();

		const items = await repo.getAll();
		expect(items.length).toBe(4);
	});

	it('should update an existing item', async () => {
		const updated = await repo.update('1', { title: 'Updated Title' });
		expect(updated.title).toBe('Updated Title');
		expect(updated.description).toBe('Learn the basics of the template');
	});

	it('should throw when updating nonexistent item', async () => {
		await expect(repo.update('nonexistent', { title: 'test' })).rejects.toThrow(
			'Item not found: nonexistent'
		);
	});

	it('should delete an item', async () => {
		await repo.delete('1');
		const items = await repo.getAll();
		expect(items.length).toBe(2);
		expect(items.find((i) => i.id === '1')).toBeUndefined();
	});
});
