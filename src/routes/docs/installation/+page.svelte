<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
</script>

<div class="space-y-6 p-6">
	<Breadcrumb items={[{ label: 'Docs', href: '/docs' }, { label: 'Getting Started' }, { label: 'Installation' }]} />

	<h1 class="text-2xl font-bold text-gray-900">Installation</h1>

	<Alert variant="info">This template requires Node.js 22+ and npm 10+.</Alert>

	<Card title="1. Clone & Install">
		<pre class="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-green-400"><code>git clone &lt;your-repo-url&gt;
cd sveltekit-template
cp .env.example .env
npm install</code></pre>
	</Card>

	<Card title="2. Run Development Server">
		<pre class="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-green-400"><code>npm run dev</code></pre>
		<p class="mt-3 text-sm text-gray-600">Opens at <code class="rounded bg-gray-100 px-1">http://localhost:5173</code></p>
	</Card>

	<Card title="3. Other Commands">
		<div class="overflow-x-auto">
			<table class="min-w-full text-sm">
				<thead><tr class="border-b text-left text-gray-500"><th class="pb-2 pr-6">Command</th><th class="pb-2">Description</th></tr></thead>
				<tbody class="text-gray-700">
					<tr class="border-b"><td class="py-2 pr-6 font-mono text-xs">npm run dev</td><td>Dev server</td></tr>
					<tr class="border-b"><td class="py-2 pr-6 font-mono text-xs">npm run build</td><td>Production build</td></tr>
					<tr class="border-b"><td class="py-2 pr-6 font-mono text-xs">npm run storybook</td><td>Storybook on :6006</td></tr>
					<tr class="border-b"><td class="py-2 pr-6 font-mono text-xs">npm run test:unit</td><td>Vitest unit tests</td></tr>
					<tr class="border-b"><td class="py-2 pr-6 font-mono text-xs">npm run test:e2e</td><td>Playwright E2E tests</td></tr>
					<tr class="border-b"><td class="py-2 pr-6 font-mono text-xs">npm run check</td><td>TypeScript + Svelte check</td></tr>
					<tr><td class="py-2 pr-6 font-mono text-xs">npm run db:push</td><td>Push schema to SQLite</td></tr>
				</tbody>
			</table>
		</div>
	</Card>
</div>
