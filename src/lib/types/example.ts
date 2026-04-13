export interface ExampleItem {
	id: string;
	title: string;
	description: string;
	priority: number;
	createdAt: string;
	updatedAt: string;
}

export interface CreateExampleItem {
	title: string;
	description: string;
	priority?: number;
}

export interface UpdateExampleItem {
	title?: string;
	description?: string;
	priority?: number;
}
