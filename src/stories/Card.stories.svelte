<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from '$lib/components/ui/Card.svelte';

	const { Story } = defineMeta({
		title: 'UI/Card',
		component: Card,
		tags: ['autodocs'],
	});
</script>

<Story name="Basic">
	<p>Simple card with content.</p>
</Story>

<Story name="With Title" args={{ title: 'Card Title', subtitle: 'Optional subtitle text' }}>
	<p>Card body content goes here.</p>
</Story>

<Story name="No Padding" args={{ title: 'No Padding', padding: false }}>
	<div style="background: #f3f4f6; padding: 32px; text-align: center;">
		Content fills the card edge-to-edge.
	</div>
</Story>
