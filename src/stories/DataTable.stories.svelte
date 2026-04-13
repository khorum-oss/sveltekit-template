<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataTable from '$lib/components/ui/DataTable.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	const { Story } = defineMeta({
		title: 'Data/DataTable',
		component: DataTable,
		tags: ['autodocs'],
	});

	const sampleData = [
		{ id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
		{ id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active' },
		{ id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'inactive' },
		{ id: '4', name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', status: 'pending' },
	];
</script>

<Story name="Basic">
	<DataTable
		data={sampleData}
		columns={[
			{ key: 'name', label: 'Name', sortable: true },
			{ key: 'email', label: 'Email', sortable: true },
			{ key: 'role', label: 'Role', sortable: true },
			{ key: 'status', label: 'Status' },
		]}
	/>
</Story>

<Story name="Striped">
	<DataTable
		data={sampleData}
		columns={[
			{ key: 'name', label: 'Name' },
			{ key: 'email', label: 'Email' },
			{ key: 'role', label: 'Role' },
		]}
		striped
	/>
</Story>

<Story name="Compact">
	<DataTable
		data={sampleData}
		columns={[
			{ key: 'name', label: 'Name', sortable: true },
			{ key: 'role', label: 'Role' },
			{ key: 'status', label: 'Status' },
		]}
		compact
	/>
</Story>

<Story name="Empty">
	<DataTable
		data={[]}
		columns={[
			{ key: 'name', label: 'Name' },
			{ key: 'email', label: 'Email' },
		]}
		emptyMessage="No users found."
	/>
</Story>
