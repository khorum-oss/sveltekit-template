import { describe, it, expect, beforeEach } from 'vitest';
import { registerEntity, getRepository, hasEntity } from './registry';
import { DataSource } from './types';
import type { Repository } from './types';

function createMockRepo(): Repository<{ id: string; name: string }> {
	return {
		async getAll() {
			return [{ id: '1', name: 'test' }];
		},
		async getById(id) {
			return id === '1' ? { id: '1', name: 'test' } : null;
		},
		async create(data) {
			return { id: '2', name: data.name ?? 'new' };
		},
		async update(id, data) {
			return { id, name: data.name ?? 'updated' };
		},
		async delete() {}
	};
}

describe('Data Registry', () => {
	beforeEach(() => {
		registerEntity('test-entity', {
			[DataSource.MOCKED]: createMockRepo,
			[DataSource.LOCAL_STORAGE]: createMockRepo,
			[DataSource.API]: createMockRepo,
			[DataSource.LOCAL_DB]: createMockRepo
		});
	});

	it('should register and retrieve an entity', () => {
		expect(hasEntity('test-entity')).toBe(true);
	});

	it('should return false for unregistered entity', () => {
		expect(hasEntity('nonexistent')).toBe(false);
	});

	it('should get repository for a registered entity and source', () => {
		const repo = getRepository('test-entity', DataSource.MOCKED);
		expect(repo).toBeDefined();
		expect(typeof repo.getAll).toBe('function');
		expect(typeof repo.getById).toBe('function');
		expect(typeof repo.create).toBe('function');
		expect(typeof repo.update).toBe('function');
		expect(typeof repo.delete).toBe('function');
	});

	it('should throw for unregistered entity', () => {
		expect(() => getRepository('nonexistent', DataSource.MOCKED)).toThrow(
			'No repository registered for entity: nonexistent'
		);
	});

	it('should return working repository', async () => {
		const repo = getRepository<{ id: string; name: string }>('test-entity', DataSource.MOCKED);
		const items = await repo.getAll();
		expect(items).toEqual([{ id: '1', name: 'test' }]);

		const item = await repo.getById('1');
		expect(item).toEqual({ id: '1', name: 'test' });

		const notFound = await repo.getById('999');
		expect(notFound).toBeNull();
	});
});
