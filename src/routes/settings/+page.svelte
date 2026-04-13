<script lang="ts">
	import { currentUser, auth } from '$lib/stores/auth';
	import { dataSource, availableSources, setDataSource } from '$lib/stores/data-source';
	import { isLowerEnv } from '$lib/utils/env';
	import type { DataSource } from '$lib/data/types';

	let name = $state($currentUser?.name ?? '');
	let email = $state($currentUser?.email ?? '');
	let saved = $state(false);

	function handleSave(e: Event) {
		e.preventDefault();
		if ($currentUser) {
			auth.updateUser({ ...$currentUser, name, email });
			saved = true;
			setTimeout(() => (saved = false), 2000);
		}
	}
</script>

<div class="mx-auto max-w-2xl space-y-8 p-8">
	<h1 class="text-2xl font-bold text-gray-900">Settings</h1>

	{#if $currentUser}
		<section class="rounded-lg bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold text-gray-800">Profile</h2>
			<form onsubmit={handleSave} class="space-y-4">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
					/>
				</div>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
					/>
				</div>
				<div class="flex items-center gap-3">
					<button
						type="submit"
						class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
					>
						Save
					</button>
					{#if saved}
						<span class="text-sm text-green-600">Saved!</span>
					{/if}
				</div>
			</form>
		</section>
	{/if}

	{#if isLowerEnv()}
		<section class="rounded-lg bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold text-gray-800">Developer Settings</h2>
			<div>
				<label for="dataSource" class="block text-sm font-medium text-gray-700">Data Source</label>
				<select
					id="dataSource"
					value={$dataSource}
					onchange={(e) => setDataSource(e.currentTarget.value as DataSource)}
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
				>
					{#each $availableSources as source}
						<option value={source}>{source}</option>
					{/each}
				</select>
				<p class="mt-1 text-xs text-gray-500">
					Switch between data sources for development. Current: <strong>{$dataSource}</strong>
				</p>
			</div>
		</section>
	{/if}
</div>
