import type { Repository } from '$lib/data/types';
import type { ExampleItem, CreateExampleItem, UpdateExampleItem } from '$lib/types/example';
import { http } from '$lib/api/http';

const BASE_URL = '/api/examples';

export function createApiExampleRepo(): Repository<
	ExampleItem,
	CreateExampleItem,
	UpdateExampleItem
> {
	return {
		async getAll() {
			return http.get<ExampleItem[]>(BASE_URL);
		},
		async getById(id: string) {
			return http.get<ExampleItem | null>(`${BASE_URL}/${id}`);
		},
		async create(data: CreateExampleItem) {
			return http.post<ExampleItem>(BASE_URL, data);
		},
		async update(id: string, data: UpdateExampleItem) {
			return http.put<ExampleItem>(`${BASE_URL}/${id}`, data);
		},
		async delete(id: string) {
			await http.delete(`${BASE_URL}/${id}`);
		}
	};
}
