<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from '$lib/components/ui/Badge.svelte';

	const { Story } = defineMeta({
		title: 'UI/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: ['default', 'primary', 'success', 'warning', 'danger', 'info'] },
			size: { control: 'select', options: ['sm', 'md'] },
		},
	});
</script>

<Story name="Default">Default</Story>

<Story name="Primary" args={{ variant: 'primary' }}>Primary</Story>

<Story name="Success" args={{ variant: 'success' }}>Active</Story>

<Story name="Warning" args={{ variant: 'warning' }}>Pending</Story>

<Story name="Danger" args={{ variant: 'danger' }}>Error</Story>

<Story name="Info" args={{ variant: 'info' }}>Info</Story>

<Story name="Medium Size" args={{ size: 'md', variant: 'primary' }}>Medium</Story>
