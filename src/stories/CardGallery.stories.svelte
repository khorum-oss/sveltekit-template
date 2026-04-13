<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'UI/Card',
	});
</script>

<Story name="With Footer">
	<Card title="Confirmation">
		<p>Are you sure you want to proceed?</p>
		{#snippet footer()}
			<div style="display: flex; gap: 8px; justify-content: flex-end;">
				<Button variant="secondary" size="sm">Cancel</Button>
				<Button size="sm">Confirm</Button>
			</div>
		{/snippet}
	</Card>
</Story>
