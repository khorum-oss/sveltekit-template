<script lang="ts">
	import DataTable from '$lib/components/ui/DataTable.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	// Generate 30 rows to demonstrate pagination
	const sampleData = Array.from({ length: 30 }, (_, i) => ({
		id: String(i + 1),
		name: ['Alice Johnson', 'Bob Smith', 'Carol White', 'Dan Brown', 'Eve Davis', 'Frank Miller', 'Grace Lee', 'Hank Wilson'][i % 8],
		email: `user${i + 1}@example.com`,
		role: ['Admin', 'Editor', 'Viewer'][i % 3],
		status: ['active', 'inactive', 'pending'][i % 3],
		lastLogin: `2024-03-${String(15 - (i % 15)).padStart(2, '0')}`,
	}));

	const columns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', sortable: true },
		{ key: 'role', label: 'Role', sortable: true, width: '100px' },
		{ key: 'status', label: 'Status', sortable: true, width: '100px', render: statusBadge },
		{ key: 'lastLogin', label: 'Last Login', sortable: true, width: '120px' },
	];

	let selected = $state<Record<string, unknown>[]>([]);
	let clickedRow = $state<Record<string, unknown> | null>(null);
</script>

{#snippet statusBadge({ value }: { row: Record<string, unknown>; value: unknown })}
	{@const v = String(value)}
	<Badge variant={v === 'active' ? 'success' : v === 'pending' ? 'warning' : 'default'}>{v}</Badge>
{/snippet}

<div class="space-y-6 p-6">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Examples' }, { label: 'Data Table' }]} />

	<div>
		<h1 class="text-2xl font-bold text-gray-900">Data Table</h1>
		<p class="mt-1 text-sm text-gray-500">
			Sortable, selectable, paginated table. Click headers to sort, checkboxes to select, page controls to navigate.
		</p>
	</div>

	<Card title="With Selection & Pagination" subtitle="{sampleData.length} total records">
		<DataTable
			data={sampleData}
			{columns}
			selectable
			bind:selected
			pageSize={8}
			striped
			onrowclick={(row) => (clickedRow = row)}
		/>
		{#if selected.length > 0}
			<div class="mt-3 flex items-center gap-3">
				<Button size="sm" variant="danger" onclick={() => (selected = [])}>
					Clear {selected.length} selected
				</Button>
				<span class="text-xs text-gray-500">
					IDs: {selected.map((r) => r.id).join(', ')}
				</span>
			</div>
		{/if}
	</Card>

	{#if clickedRow}
		<Card title="Clicked Row">
			<pre class="overflow-x-auto rounded bg-gray-50 p-3 text-xs">{JSON.stringify(clickedRow, null, 2)}</pre>
		</Card>
	{/if}

	<Card title="Compact (no selection, no pagination)">
		<DataTable
			data={sampleData.slice(0, 4)}
			columns={[
				{ key: 'name', label: 'Name', sortable: true },
				{ key: 'role', label: 'Role' },
				{ key: 'status', label: 'Status', render: statusBadge },
			]}
			compact
		/>
	</Card>

	<Card title="External Pagination (API pattern)">
		<p class="mb-3 text-sm text-gray-500">
			Pass <code class="rounded bg-gray-100 px-1">pageInfo</code> and <code class="rounded bg-gray-100 px-1">onpage</code> for
			server-side pagination. The component displays the data as-is and delegates page changes to your callback.
		</p>
		<pre class="overflow-x-auto rounded bg-gray-50 p-3 text-xs text-gray-700">{`<DataTable
  data={currentPageData}
  columns={columns}
  pageInfo={{ page: 1, pageSize: 10, total: 100 }}
  onpage={(page) => fetchPage(page)}
/>`}</pre>
	</Card>
</div>
