<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Snippet } from 'svelte';

	interface Column<T> {
		key: string;
		label: string;
		sortable?: boolean;
		width?: string;
		render?: Snippet<[{ row: T; value: unknown }]>;
	}

	interface PageInfo {
		page: number;
		pageSize: number;
		total: number;
	}

	interface Props {
		data: T[];
		columns: Column<T>[];
		striped?: boolean;
		hoverable?: boolean;
		compact?: boolean;
		emptyMessage?: string;
		selectable?: boolean;
		selected?: T[];
		rowKey?: string;
		pageSize?: number;
		pageInfo?: PageInfo;
		onrowclick?: (row: T) => void;
		onselect?: (selected: T[]) => void;
		onpage?: (page: number) => void;
	}

	let {
		data,
		columns,
		striped = false,
		hoverable = true,
		compact = false,
		emptyMessage = 'No data available',
		selectable = false,
		selected = $bindable([]),
		rowKey = 'id',
		pageSize = 10,
		pageInfo,
		onrowclick,
		onselect,
		onpage
	}: Props = $props();

	let sortKey = $state('');
	let sortDir = $state<'asc' | 'desc'>('asc');
	let localPage = $state(1);

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

	// Pagination: external (pageInfo) takes priority over local
	const isExternalPaging = $derived(!!pageInfo);
	const currentPage = $derived(isExternalPaging ? pageInfo!.page : localPage);
	const totalItems = $derived(isExternalPaging ? pageInfo!.total : sortedData.length);
	const effectivePageSize = $derived(isExternalPaging ? pageInfo!.pageSize : pageSize);
	const totalPages = $derived(Math.max(1, Math.ceil(totalItems / effectivePageSize)));

	const pagedData = $derived.by(() => {
		if (isExternalPaging) return sortedData;
		const start = (localPage - 1) * pageSize;
		return sortedData.slice(start, start + pageSize);
	});

	const startItem = $derived((currentPage - 1) * effectivePageSize + 1);
	const endItem = $derived(Math.min(currentPage * effectivePageSize, totalItems));

	function goToPage(page: number) {
		if (page < 1 || page > totalPages) return;
		if (isExternalPaging) {
			onpage?.(page);
		} else {
			localPage = page;
		}
	}

	// Selection
	const selectedKeys = $derived(new Set(selected.map((r) => r[rowKey])));
	const allPageSelected = $derived(
		pagedData.length > 0 && pagedData.every((r) => selectedKeys.has(r[rowKey]))
	);
	const somePageSelected = $derived(
		pagedData.some((r) => selectedKeys.has(r[rowKey])) && !allPageSelected
	);

	function toggleRow(row: T) {
		const key = row[rowKey];
		if (selectedKeys.has(key)) {
			selected = selected.filter((r) => r[rowKey] !== key);
		} else {
			selected = [...selected, row];
		}
		onselect?.(selected);
	}

	function toggleAll() {
		if (allPageSelected) {
			const pageKeys = new Set(pagedData.map((r) => r[rowKey]));
			selected = selected.filter((r) => !pageKeys.has(r[rowKey]));
		} else {
			const existing = new Set(selected.map((r) => r[rowKey]));
			const toAdd = pagedData.filter((r) => !existing.has(r[rowKey]));
			selected = [...selected, ...toAdd];
		}
		onselect?.(selected);
	}

	const cellPadding = $derived(compact ? 'px-3 py-1.5' : 'px-4 py-3');
	const showPagination = $derived(totalItems > effectivePageSize || isExternalPaging);

	// Reset local page when data changes
	$effect(() => {
		if (!isExternalPaging) {
			void data.length;
			localPage = 1;
		}
	});
</script>

<div class="overflow-hidden rounded-lg ring-1 ring-gray-200">
	<!-- Selection info bar -->
	{#if selectable && selected.length > 0}
		<div class="flex items-center justify-between border-b border-indigo-100 bg-indigo-50 px-4 py-2 text-sm text-indigo-700">
			<span>{selected.length} item{selected.length === 1 ? '' : 's'} selected</span>
			<button class="text-xs font-medium hover:text-indigo-900" onclick={() => { selected = []; onselect?.([]); }}>
				Clear selection
			</button>
		</div>
	{/if}

	<div class="overflow-x-auto">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					{#if selectable}
						<th class="w-10 {cellPadding}">
							<input
								type="checkbox"
								checked={allPageSelected}
								indeterminate={somePageSelected}
								onchange={toggleAll}
								class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								aria-label="Select all rows"
							/>
						</th>
					{/if}
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
				{#if pagedData.length === 0}
					<tr>
						<td colspan={columns.length + (selectable ? 1 : 0)} class="py-8 text-center text-sm text-gray-500">
							{emptyMessage}
						</td>
					</tr>
				{:else}
					{#each pagedData as row, i (i)}
						{@const isRowSelected = selectedKeys.has(row[rowKey])}
						<tr
							class="{isRowSelected ? 'bg-indigo-50' : striped && i % 2 === 1 ? 'bg-gray-50' : ''} {hoverable && !isRowSelected ? 'hover:bg-gray-50' : ''} {onrowclick ? 'cursor-pointer' : ''}"
							onclick={() => onrowclick?.(row)}
						>
							{#if selectable}
								<td class="w-10 {cellPadding}">
									<input
										type="checkbox"
										checked={isRowSelected}
										onchange={() => toggleRow(row)}
										onclick={(e) => e.stopPropagation()}
										class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
										aria-label="Select row"
									/>
								</td>
							{/if}
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

	<!-- Pagination -->
	{#if showPagination}
		<div class="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3">
			<p class="text-sm text-gray-500">
				{#if totalItems > 0}
					Showing <span class="font-medium">{startItem}</span> to <span class="font-medium">{endItem}</span> of <span class="font-medium">{totalItems}</span>
				{:else}
					No results
				{/if}
			</p>
			<div class="flex items-center gap-1">
				<button
					onclick={() => goToPage(1)}
					disabled={currentPage <= 1}
					class="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
					aria-label="First page"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
					</svg>
				</button>
				<button
					onclick={() => goToPage(currentPage - 1)}
					disabled={currentPage <= 1}
					class="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
					aria-label="Previous page"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7 7" />
					</svg>
				</button>
				<span class="px-3 text-sm text-gray-700">
					Page <span class="font-medium">{currentPage}</span> of <span class="font-medium">{totalPages}</span>
				</span>
				<button
					onclick={() => goToPage(currentPage + 1)}
					disabled={currentPage >= totalPages}
					class="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
					aria-label="Next page"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
				<button
					onclick={() => goToPage(totalPages)}
					disabled={currentPage >= totalPages}
					class="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
					aria-label="Last page"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	{/if}
</div>
