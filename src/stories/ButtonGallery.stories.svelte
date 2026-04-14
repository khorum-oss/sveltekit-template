<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '$lib/components/ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'UI/Button',
	});
</script>

<Story name="All Variants">
	<div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="danger">Danger</Button>
		<Button disabled>Disabled</Button>
	</div>
</Story>

<Story name="All Sizes">
	<div style="display: flex; gap: 8px; align-items: center;">
		<Button size="sm">Small</Button>
		<Button size="md">Medium</Button>
		<Button size="lg">Large</Button>
	</div>
</Story>
