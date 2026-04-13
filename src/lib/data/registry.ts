import type { Repository } from './types';
import { DataSource } from './types';

type RepositoryFactory<T> = () => Repository<T>;
type SourceMap<T> = Record<DataSource, RepositoryFactory<T>>;

const registrations = new Map<string, SourceMap<unknown>>();

export function registerEntity<T>(name: string, sources: SourceMap<T>) {
	registrations.set(name, sources as SourceMap<unknown>);
}

export function getRepository<T>(name: string, source: DataSource): Repository<T> {
	const sources = registrations.get(name);
	if (!sources) throw new Error(`No repository registered for entity: ${name}`);
	const factory = sources[source];
	if (!factory) throw new Error(`No ${source} source registered for entity: ${name}`);
	return factory() as Repository<T>;
}

export function hasEntity(name: string): boolean {
	return registrations.has(name);
}
