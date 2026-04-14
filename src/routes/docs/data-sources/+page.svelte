<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
</script>

<div class="space-y-6 p-6">
	<Breadcrumb items={[{ label: 'Docs', href: '/docs' }, { label: 'Configuration' }, { label: 'Data Sources' }]} />

	<h1 class="text-2xl font-bold text-gray-900">Data Sources</h1>
	<p class="text-sm text-gray-500">The template supports 4 pluggable data sources via a strategy/registry pattern.</p>

	<Alert variant="info">
		In dev/staging all 4 sources are available. In production, only <strong>local-storage</strong>, <strong>api</strong>, and <strong>local-db</strong> are available.
	</Alert>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<Card title="Mocked">
			<Badge variant="warning">Dev only</Badge>
			<p class="mt-2 text-sm text-gray-600">In-memory data with hardcoded fixtures. Resets on page reload. Great for Storybook and prototyping.</p>
		</Card>
		<Card title="Local Storage">
			<Badge variant="success">All envs</Badge>
			<p class="mt-2 text-sm text-gray-600">Persists to browser localStorage. Fully offline. Data survives page reloads but is per-browser.</p>
		</Card>
		<Card title="API">
			<Badge variant="success">All envs</Badge>
			<p class="mt-2 text-sm text-gray-600">Proxied through SvelteKit's hooks.server.ts to BACKEND_URL. This is the primary production path when a separate backend exists.</p>
		</Card>
		<Card title="Local DB (SQLite)">
			<Badge variant="success">All envs</Badge>
			<p class="mt-2 text-sm text-gray-600">Server-side SQLite via Drizzle ORM. Calls /api/db/* routes. Self-contained — no external backend needed.</p>
		</Card>
	</div>

	<Card title="Architecture">
		<pre class="overflow-x-auto rounded bg-gray-50 p-4 text-sm text-gray-700">Component → Store → Registry → Repository&lt;T&gt; implementation
                        ↑
                  DataSource store (mocked | local-storage | api | local-db)</pre>
		<p class="mt-3 text-sm text-gray-600">
			Components never know which source is active. The <code class="rounded bg-gray-100 px-1">data-source</code> store drives the registry
			to resolve the correct <code class="rounded bg-gray-100 px-1">Repository&lt;T&gt;</code> implementation.
		</p>
	</Card>
</div>
