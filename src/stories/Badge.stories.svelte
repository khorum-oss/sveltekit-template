<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from '$lib/components/ui/Badge.svelte';

	const { Story } = defineMeta({
		title: 'UI/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: ['default', 'primary', 'success', 'warning', 'danger', 'info'] },
			size: { control: 'select', options: ['sm', 'md'] },
		},
	});
</script>

<Story name="Default">
	<Badge>Default</Badge>
</Story>

<Story name="Primary">
	<Badge variant="primary">Primary</Badge>
</Story>

<Story name="Success">
	<Badge variant="success">Active</Badge>
</Story>

<Story name="Warning">
	<Badge variant="warning">Pending</Badge>
</Story>

<Story name="Danger">
	<Badge variant="danger">Error</Badge>
</Story>

<Story name="All Variants">
	<div style="display: flex; gap: 8px; flex-wrap: wrap;">
		<Badge>Default</Badge>
		<Badge variant="primary">Primary</Badge>
		<Badge variant="success">Success</Badge>
		<Badge variant="warning">Warning</Badge>
		<Badge variant="danger">Danger</Badge>
		<Badge variant="info">Info</Badge>
	</div>
</Story>
