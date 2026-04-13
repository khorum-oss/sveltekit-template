<script lang="ts">
	import { exampleStore } from '$lib/stores/example';
	import { dataSource } from '$lib/stores/data-source';
	import Spinner from '$lib/components/ui/Spinner.svelte';

	const { items, loading, error: storeError } = exampleStore;

	let newTitle = $state('');
	let newDescription = $state('');
	let creating = $state(false);

	async function handleCreate(e: Event) {
		e.preventDefault();
		if (!newTitle.trim()) return;
		creating = true;
		try {
			await exampleStore.create({ title: newTitle, description: newDescription });
			newTitle = '';
			newDescription = '';
		} finally {
			creating = false;
		}
	}

	async function handleDelete(id: string) {
		await exampleStore.remove(id);
	}
</script>

<div class="p-6">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
		<p class="mt-1 text-sm text-gray-500">
			Data source: <span class="font-medium text-indigo-600">{$dataSource}</span>
		</p>
	</div>

	<!-- Create form -->
	<div class="mb-6 rounded-lg bg-white p-4 shadow-sm">
		<h2 class="mb-3 text-sm font-semibold text-gray-700">Add New Item</h2>
		<form onsubmit={handleCreate} class="flex gap-3">
			<input
				type="text"
				bind:value={newTitle}
				placeholder="Title"
				required
				class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
			/>
			<input
				type="text"
				bind:value={newDescription}
				placeholder="Description"
				class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
			/>
			<button
				type="submit"
				disabled={creating}
				class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
			>
				{creating ? 'Adding...' : 'Add'}
			</button>
		</form>
	</div>

	<!-- Items list -->
	{#if $loading}
		<div class="flex justify-center py-8">
			<Spinner />
		</div>
	{:else if $storeError}
		<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">{$storeError}</div>
	{:else if $items.length === 0}
		<div class="rounded-md bg-gray-50 p-8 text-center text-sm text-gray-500">
			No items yet. Add one above!
		</div>
	{:else}
		<div class="space-y-2">
			{#each $items as item (item.id)}
				<div class="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
					<div>
						<h3 class="font-medium text-gray-900">{item.title}</h3>
						<p class="text-sm text-gray-500">{item.description}</p>
					</div>
					<div class="flex items-center gap-2">
						<span class="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
							P{item.priority}
						</span>
						<button
							onclick={() => handleDelete(item.id)}
							class="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
							aria-label="Delete"
						>
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
