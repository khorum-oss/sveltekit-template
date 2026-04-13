<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from '$lib/components/ui/Spinner.svelte';

	const { Story } = defineMeta({
		title: 'UI/Spinner',
	});
</script>

<Story name="All Sizes">
	<div style="display: flex; gap: 16px; align-items: center;">
		<Spinner size="sm" />
		<Spinner size="md" />
		<Spinner size="lg" />
	</div>
</Story>
