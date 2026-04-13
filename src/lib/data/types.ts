export enum DataSource {
	MOCKED = 'mocked',
	LOCAL_STORAGE = 'local-storage',
	API = 'api',
	LOCAL_DB = 'local-db'
}

export const PROD_SOURCES: DataSource[] = [
	DataSource.LOCAL_STORAGE,
	DataSource.API,
	DataSource.LOCAL_DB
];

export const DEV_SOURCES: DataSource[] = [DataSource.MOCKED, ...PROD_SOURCES];

export interface Repository<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
	getAll(): Promise<T[]>;
	getById(id: string): Promise<T | null>;
	create(data: CreateDTO): Promise<T>;
	update(id: string, data: UpdateDTO): Promise<T>;
	delete(id: string): Promise<void>;
}
