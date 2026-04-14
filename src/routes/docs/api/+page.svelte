<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import DataTable from '$lib/components/ui/DataTable.svelte';

	const endpoints = [
		{ method: 'GET', path: '/api/db/examples', description: 'List all examples', auth: 'Yes' },
		{ method: 'POST', path: '/api/db/examples', description: 'Create an example', auth: 'Yes' },
		{ method: 'GET', path: '/api/db/examples/:id', description: 'Get example by ID', auth: 'Yes' },
		{ method: 'PUT', path: '/api/db/examples/:id', description: 'Update example by ID', auth: 'Yes' },
		{ method: 'DELETE', path: '/api/db/examples/:id', description: 'Delete example by ID', auth: 'Yes' },
		{ method: 'GET', path: '/__health', description: 'Health check', auth: 'No' },
		{ method: '*', path: '/api/*', description: 'Proxied to BACKEND_URL', auth: 'Passthrough' },
	];

	const columns = [
		{ key: 'method', label: 'Method', width: '80px', sortable: true, render: methodBadge },
		{ key: 'path', label: 'Path', sortable: true },
		{ key: 'description', label: 'Description' },
		{ key: 'auth', label: 'Auth', width: '100px' },
	];
</script>

{#snippet methodBadge({ value }: { row: Record<string, unknown>; value: unknown })}
	{@const m = String(value)}
	<Badge variant={m === 'GET' ? 'info' : m === 'POST' ? 'success' : m === 'PUT' ? 'warning' : m === 'DELETE' ? 'danger' : 'default'}>{m}</Badge>
{/snippet}

<div class="space-y-6 p-6">
	<Breadcrumb items={[{ label: 'Docs', href: '/docs' }, { label: 'API Reference' }]} />

	<div>
		<h1 class="text-2xl font-bold text-gray-900">API Reference</h1>
		<p class="mt-1 text-sm text-gray-500">Server endpoints provided by the template.</p>
	</div>

	<Card title="Endpoints">
		<DataTable data={endpoints} {columns} compact />
	</Card>

	<Card title="Authentication">
		<p class="text-sm text-gray-600">
			When <code class="rounded bg-gray-100 px-1">PUBLIC_AUTH_ENABLED=true</code>, all <code class="rounded bg-gray-100 px-1">/api/db/*</code>
			routes require a <code class="rounded bg-gray-100 px-1">Bearer</code> token. In dev mode any non-empty token is accepted.
			In production, <code class="rounded bg-gray-100 px-1">JWT_SECRET</code> must be configured.
		</p>
	</Card>
</div>
