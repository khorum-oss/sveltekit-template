<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from '$lib/components/ui/Spinner.svelte';

	const { Story } = defineMeta({
		title: 'UI/Spinner',
		component: Spinner,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
		},
	});
</script>

<Story name="Small" args={{ size: 'sm' }} />

<Story name="Medium" args={{ size: 'md' }} />

<Story name="Large" args={{ size: 'lg' }} />
