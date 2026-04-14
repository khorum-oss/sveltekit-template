<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from '$lib/components/ui/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'UI/Modal',
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="With Actions">
	<div style="height: 500px; position: relative;">
		<Modal open={true} title="Confirm Action" onclose={() => {}}>
			<p>Are you sure you want to perform this action? This cannot be undone.</p>
			{#snippet actions()}
				<Button variant="secondary" size="sm">Cancel</Button>
				<Button variant="danger" size="sm">Delete</Button>
			{/snippet}
		</Modal>
	</div>
</Story>

<Story name="Simple">
	<div style="height: 400px; position: relative;">
		<Modal open={true} title="Simple Modal" onclose={() => {}}>
			<p>A basic modal with just text content. Press Escape or click the backdrop to close.</p>
		</Modal>
	</div>
</Story>

<Story name="No Title">
	<div style="height: 350px; position: relative;">
		<Modal open={true} onclose={() => {}}>
			<p>A modal without a title bar.</p>
		</Modal>
	</div>
</Story>
