<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from '$lib/components/ui/Spinner.svelte';

	const { Story } = defineMeta({
		title: 'UI/Spinner',
		component: Spinner,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
		},
	});
</script>

<Story name="Small">
	<Spinner size="sm" />
</Story>

<Story name="Medium">
	<Spinner size="md" />
</Story>

<Story name="Large">
	<Spinner size="lg" />
</Story>

<Story name="All Sizes">
	<div style="display: flex; gap: 16px; align-items: center;">
		<Spinner size="sm" />
		<Spinner size="md" />
		<Spinner size="lg" />
	</div>
</Story>
