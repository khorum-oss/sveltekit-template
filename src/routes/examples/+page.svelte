<script lang="ts">
	import DataTable from '$lib/components/ui/DataTable.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';

	const sampleData = [
		{ id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', lastLogin: '2024-03-15' },
		{ id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active', lastLogin: '2024-03-14' },
		{ id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2024-02-28' },
		{ id: '4', name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', status: 'active', lastLogin: '2024-03-15' },
		{ id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'active', lastLogin: '2024-03-10' },
		{ id: '6', name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'pending', lastLogin: '2024-03-01' },
		{ id: '7', name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'active', lastLogin: '2024-03-12' },
		{ id: '8', name: 'Hank Wilson', email: 'hank@example.com', role: 'Viewer', status: 'inactive', lastLogin: '2024-01-20' },
	];

	const columns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', sortable: true },
		{ key: 'role', label: 'Role', sortable: true, width: '100px' },
		{ key: 'status', label: 'Status', sortable: true, width: '100px', render: statusBadge },
		{ key: 'lastLogin', label: 'Last Login', sortable: true, width: '120px' },
	];

	let selectedRow = $state<Record<string, unknown> | null>(null);
</script>

{#snippet statusBadge({ value }: { row: Record<string, unknown>; value: unknown })}
	{@const v = String(value)}
	<Badge variant={v === 'active' ? 'success' : v === 'pending' ? 'warning' : 'default'}>{v}</Badge>
{/snippet}

<div class="space-y-6 p-6">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Examples' }, { label: 'Data Table' }]} />

	<div>
		<h1 class="text-2xl font-bold text-gray-900">Data Table</h1>
		<p class="mt-1 text-sm text-gray-500">Sortable table with custom cell rendering. Click column headers to sort.</p>
	</div>

	<Card title="Users" subtitle="{sampleData.length} total records">
		<DataTable
			data={sampleData}
			{columns}
			striped
			onrowclick={(row) => (selectedRow = row)}
		/>
	</Card>

	{#if selectedRow}
		<Card title="Selected Row">
			<pre class="overflow-x-auto rounded bg-gray-50 p-3 text-xs">{JSON.stringify(selectedRow, null, 2)}</pre>
		</Card>
	{/if}

	<Card title="Compact Table">
		<DataTable
			data={sampleData.slice(0, 3)}
			columns={[
				{ key: 'name', label: 'Name', sortable: true },
				{ key: 'role', label: 'Role' },
				{ key: 'status', label: 'Status', render: statusBadge },
			]}
			compact
		/>
	</Card>
</div>
