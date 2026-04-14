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

<Story name="Info" args={{ variant: 'info', title: 'Information' }}>
	This is an informational message.
</Story>

<Story name="Success" args={{ variant: 'success', title: 'Success' }}>
	Operation completed successfully.
</Story>

<Story name="Warning" args={{ variant: 'warning', title: 'Warning' }}>
	Please review before continuing.
</Story>

<Story name="Error" args={{ variant: 'error', title: 'Error' }}>
	Something went wrong. Please try again.
</Story>

<Story name="Dismissible" args={{ variant: 'info', title: 'Dismissible', dismissible: true, ondismiss: () => {} }}>
	Click the X to dismiss this alert.
</Story>

<Story name="No Title" args={{ variant: 'warning' }}>
	A simple alert without a title heading.
</Story>
