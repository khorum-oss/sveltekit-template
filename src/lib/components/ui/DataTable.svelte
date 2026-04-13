<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Snippet } from 'svelte';

	interface Column<T> {
		key: string;
		label: string;
		sortable?: boolean;
		width?: string;
		render?: Snippet<[{ row: T; value: unknown }]>;
	}

	interface Props {
		data: T[];
		columns: Column<T>[];
		striped?: boolean;
		hoverable?: boolean;
		compact?: boolean;
		emptyMessage?: string;
		onrowclick?: (row: T) => void;
	}

	let {
		data,
		columns,
		striped = false,
		hoverable = true,
		compact = false,
		emptyMessage = 'No data available',
		onrowclick
	}: Props = $props();

	let sortKey = $state('');
	let sortDir = $state<'asc' | 'desc'>('asc');

	function handleSort(key: string) {
		if (sortKey === key) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDir = 'asc';
		}
	}

	const sortedData = $derived.by(() => {
		if (!sortKey) return data;
		return [...data].sort((a, b) => {
			const aVal = a[sortKey];
			const bVal = b[sortKey];
			if (aVal == null && bVal == null) return 0;
			if (aVal == null) return 1;
			if (bVal == null) return -1;
			const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
			return sortDir === 'asc' ? cmp : -cmp;
		});
	});

	const cellPadding = $derived(compact ? 'px-3 py-1.5' : 'px-4 py-3');
</script>

<div class="overflow-hidden rounded-lg ring-1 ring-gray-200">
	<div class="overflow-x-auto">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					{#each columns as col (col.key)}
						<th
							class="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 {cellPadding}"
							style={col.width ? `width: ${col.width}` : ''}
						>
							{#if col.sortable}
								<button
									class="group flex items-center gap-1 hover:text-gray-700"
									onclick={() => handleSort(col.key)}
								>
									{col.label}
									<span class="text-gray-400 {sortKey === col.key ? 'text-indigo-500' : 'opacity-0 group-hover:opacity-100'}">
										{#if sortKey === col.key && sortDir === 'desc'}
											<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
											</svg>
										{:else}
											<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
											</svg>
										{/if}
									</span>
								</button>
							{:else}
								{col.label}
							{/if}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#if sortedData.length === 0}
					<tr>
						<td colspan={columns.length} class="py-8 text-center text-sm text-gray-500">
							{emptyMessage}
						</td>
					</tr>
				{:else}
					{#each sortedData as row, i (i)}
						<tr
							class="{striped && i % 2 === 1 ? 'bg-gray-50' : ''} {hoverable ? 'hover:bg-gray-50' : ''} {onrowclick ? 'cursor-pointer' : ''}"
							onclick={() => onrowclick?.(row)}
						>
							{#each columns as col (col.key)}
								<td class="text-sm text-gray-700 {cellPadding}">
									{#if col.render}
										{@render col.render({ row, value: row[col.key] })}
									{:else}
										{row[col.key] ?? ''}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
