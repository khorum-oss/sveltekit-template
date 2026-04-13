<script lang="ts">
	import { dataSource, availableSources, setDataSource } from '$lib/stores/data-source';
	import { isLowerEnv } from '$lib/utils/env';
	import type { DataSource } from '$lib/data/types';
</script>

{#if isLowerEnv()}
	<div class="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5">
		<span class="text-xs font-medium text-amber-700">DEV</span>
		<select
			value={$dataSource}
			onchange={(e) => setDataSource(e.currentTarget.value as DataSource)}
			class="rounded border border-amber-300 bg-white px-2 py-0.5 text-xs text-amber-800 focus:border-amber-500 focus:ring-amber-500 focus:outline-none"
		>
			{#each $availableSources as source}
				<option value={source}>{source}</option>
			{/each}
		</select>
	</div>
{/if}
