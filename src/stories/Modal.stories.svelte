<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from '$lib/components/ui/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'UI/Modal',
		component: Modal,
		tags: ['autodocs'],
	});
</script>

<Story name="Open">
	<Modal open={true} title="Confirm Action" onclose={() => {}}>
		<p>Are you sure you want to perform this action? This cannot be undone.</p>
		{#snippet actions()}
			<Button variant="secondary" size="sm">Cancel</Button>
			<Button variant="danger" size="sm">Delete</Button>
		{/snippet}
	</Modal>
</Story>

<Story name="No Title">
	<Modal open={true} onclose={() => {}}>
		<p>A modal without a title bar. Press Escape to close.</p>
	</Modal>
</Story>
