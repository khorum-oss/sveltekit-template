<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataTable from '$lib/components/ui/DataTable.svelte';

	const { Story } = defineMeta({
		title: 'Data/DataTable',
		tags: ['autodocs'],
	});

	const sampleData = Array.from({ length: 25 }, (_, i) => ({
		id: String(i + 1),
		name: ['Alice Johnson', 'Bob Smith', 'Carol White', 'Dan Brown', 'Eve Davis', 'Frank Miller', 'Grace Lee', 'Hank Wilson'][i % 8],
		email: `user${i + 1}@example.com`,
		role: ['Admin', 'Editor', 'Viewer'][i % 3],
		status: ['active', 'inactive', 'pending'][i % 3],
	}));

	const basicColumns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'Email', sortable: true },
		{ key: 'role', label: 'Role', sortable: true },
		{ key: 'status', label: 'Status' },
	];
</script>

<Story name="Basic">
	<DataTable
		data={sampleData.slice(0, 5)}
		columns={basicColumns}
	/>
</Story>

<Story name="With Pagination">
	<DataTable
		data={sampleData}
		columns={basicColumns}
		pageSize={5}
	/>
</Story>

<Story name="With Selection">
	<DataTable
		data={sampleData.slice(0, 8)}
		columns={basicColumns}
		selectable
		pageSize={5}
	/>
</Story>

<Story name="Striped + Compact">
	<DataTable
		data={sampleData.slice(0, 10)}
		columns={basicColumns}
		striped
		compact
		pageSize={5}
	/>
</Story>

<Story name="Empty">
	<DataTable
		data={[]}
		columns={basicColumns}
		emptyMessage="No users found."
	/>
</Story>
