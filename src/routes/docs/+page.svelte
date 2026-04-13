<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
</script>

<div class="space-y-6 p-6">
	<div>
		<h1 class="text-2xl font-bold text-gray-900">Documentation</h1>
		<p class="mt-1 text-sm text-gray-500">Template guides and component reference.</p>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<a href="/docs/installation" class="group">
			<Card>
				<h3 class="text-base font-semibold text-gray-900 group-hover:text-indigo-600">Installation</h3>
				<p class="mt-1 text-sm text-gray-500">Get up and running with the template.</p>
			</Card>
		</a>
		<a href="/docs/env" class="group">
			<Card>
				<h3 class="text-base font-semibold text-gray-900 group-hover:text-indigo-600">Environment Variables</h3>
				<p class="mt-1 text-sm text-gray-500">Configure auth, data sources, and CORS.</p>
			</Card>
		</a>
		<a href="/docs/data-sources" class="group">
			<Card>
				<h3 class="text-base font-semibold text-gray-900 group-hover:text-indigo-600">Data Sources</h3>
				<p class="mt-1 text-sm text-gray-500">Mocked, localStorage, API, and SQLite.</p>
			</Card>
		</a>
		<a href="/docs/components/ui" class="group">
			<Card>
				<div class="flex items-center gap-2">
					<h3 class="text-base font-semibold text-gray-900 group-hover:text-indigo-600">UI Components</h3>
					<Badge variant="primary">12+</Badge>
				</div>
				<p class="mt-1 text-sm text-gray-500">Buttons, cards, tables, modals, and more.</p>
			</Card>
		</a>
		<a href="/docs/components/forms" class="group">
			<Card>
				<h3 class="text-base font-semibold text-gray-900 group-hover:text-indigo-600">Form Components</h3>
				<p class="mt-1 text-sm text-gray-500">Inputs, dropdowns, and form patterns.</p>
			</Card>
		</a>
		<a href="/docs/components/layout" class="group">
			<Card>
				<h3 class="text-base font-semibold text-gray-900 group-hover:text-indigo-600">Layout Components</h3>
				<p class="mt-1 text-sm text-gray-500">AppShell, navigation, and page structure.</p>
			</Card>
		</a>
	</div>
</div>
