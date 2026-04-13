<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from '$lib/components/ui/Badge.svelte';

	const { Story } = defineMeta({
		title: 'UI/Badge',
	});
</script>

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
