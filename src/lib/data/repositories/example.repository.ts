import { DataSource } from '$lib/data/types';
import { registerEntity } from '$lib/data/registry';
import { createMockedExampleRepo } from '$lib/data/sources/mocked/example.mock';
import { createLocalStorageExampleRepo } from '$lib/data/sources/local-storage/example.ls';
import { createApiExampleRepo } from '$lib/data/sources/api/example.api';
import { createLocalDbExampleRepo } from '$lib/data/sources/local-db/example.db';

registerEntity('example', {
	[DataSource.MOCKED]: createMockedExampleRepo,
	[DataSource.LOCAL_STORAGE]: createLocalStorageExampleRepo,
	[DataSource.API]: createApiExampleRepo,
	[DataSource.LOCAL_DB]: createLocalDbExampleRepo
});
