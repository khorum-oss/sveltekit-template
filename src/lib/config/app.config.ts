import { env } from '$env/dynamic/public';

export const appConfig = {
	appEnv: (env.PUBLIC_APP_ENV ?? 'development') as 'development' | 'staging' | 'production',
	authEnabled: env.PUBLIC_AUTH_ENABLED !== 'false',
	defaultDataSource: (env.PUBLIC_DEFAULT_DATA_SOURCE ?? 'mocked') as
		| 'mocked'
		| 'local-storage'
		| 'api'
		| 'local-db'
};
