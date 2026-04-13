<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import DataTable from '$lib/components/ui/DataTable.svelte';

	const envVars = [
		{ name: 'DATABASE_URL', scope: 'server', default: 'local.db', description: 'SQLite database path' },
		{ name: 'BACKEND_URL', scope: 'server', default: 'http://localhost:8080', description: 'Backend API proxy target' },
		{ name: 'JWT_SECRET', scope: 'server', default: '(none)', description: 'Token validation secret (required in prod)' },
		{ name: 'CORS_ALLOWED_ORIGINS', scope: 'server', default: 'localhost:5173,4173', description: 'Comma-separated allowed origins' },
		{ name: 'PUBLIC_APP_ENV', scope: 'public', default: 'development', description: 'Environment: development | staging | production' },
		{ name: 'PUBLIC_AUTH_ENABLED', scope: 'public', default: 'true', description: 'Enable/disable login requirement' },
		{ name: 'PUBLIC_DEFAULT_DATA_SOURCE', scope: 'public', default: 'mocked', description: 'Default data source mode' },
	];

	const columns = [
		{ key: 'name', label: 'Variable', sortable: true },
		{ key: 'scope', label: 'Scope', width: '80px', render: scopeBadge },
		{ key: 'default', label: 'Default', width: '160px' },
		{ key: 'description', label: 'Description' },
	];
</script>

{#snippet scopeBadge({ value }: { row: Record<string, unknown>; value: unknown })}
	<Badge variant={value === 'public' ? 'info' : 'default'}>{String(value)}</Badge>
{/snippet}

<div class="space-y-6 p-6">
	<Breadcrumb items={[{ label: 'Docs', href: '/docs' }, { label: 'Configuration' }, { label: 'Environment Variables' }]} />

	<div>
		<h1 class="text-2xl font-bold text-gray-900">Environment Variables</h1>
		<p class="mt-1 text-sm text-gray-500">All configuration is via <code class="rounded bg-gray-100 px-1">.env</code>. Public vars are available client-side.</p>
	</div>

	<Card>
		<DataTable data={envVars} {columns} compact />
	</Card>
</div>
