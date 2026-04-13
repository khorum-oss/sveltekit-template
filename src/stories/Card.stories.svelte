<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'UI/Card',
		component: Card,
		tags: ['autodocs'],
	});
</script>

<Story name="Basic">
	<Card>
		<p>Simple card with content.</p>
	</Card>
</Story>

<Story name="With Title">
	<Card title="Card Title" subtitle="Optional subtitle text">
		<p>Card body content goes here.</p>
	</Card>
</Story>

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

<Story name="No Padding">
	<Card title="No Padding" padding={false}>
		<div style="background: #f3f4f6; padding: 32px; text-align: center;">
			Content fills the card edge-to-edge.
		</div>
	</Card>
</Story>
