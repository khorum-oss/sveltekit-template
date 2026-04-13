<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from '$lib/components/ui/Alert.svelte';

	const { Story } = defineMeta({
		title: 'UI/Alert',
	});
</script>

<Story name="All Variants">
	<div style="display: flex; flex-direction: column; gap: 12px;">
		<Alert variant="info" title="Information">Informational message.</Alert>
		<Alert variant="success" title="Success">Operation completed.</Alert>
		<Alert variant="warning" title="Warning">Review before continuing.</Alert>
		<Alert variant="error" title="Error">Something went wrong.</Alert>
	</div>
</Story>
