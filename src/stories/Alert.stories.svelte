<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from '$lib/components/ui/Alert.svelte';

	const { Story } = defineMeta({
		title: 'UI/Alert',
		component: Alert,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
			dismissible: { control: 'boolean' },
		},
	});
</script>

<Story name="Info">
	<Alert variant="info" title="Information">This is an informational message.</Alert>
</Story>

<Story name="Success">
	<Alert variant="success" title="Success">Operation completed successfully.</Alert>
</Story>

<Story name="Warning">
	<Alert variant="warning" title="Warning">Please review before continuing.</Alert>
</Story>

<Story name="Error">
	<Alert variant="error" title="Error">Something went wrong. Please try again.</Alert>
</Story>

<Story name="Dismissible">
	<Alert variant="info" title="Dismissible" dismissible ondismiss={() => {}}>
		Click the X to dismiss this alert.
	</Alert>
</Story>

<Story name="No Title">
	<Alert variant="warning">A simple alert without a title heading.</Alert>
</Story>
