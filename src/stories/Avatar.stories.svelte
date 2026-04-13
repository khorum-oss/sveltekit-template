<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from '$lib/components/ui/Avatar.svelte';

	const { Story } = defineMeta({
		title: 'UI/Avatar',
		component: Avatar,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
		},
	});
</script>

<Story name="With Name" args={{ name: 'Alice Johnson', size: 'lg' }} />

<Story name="No Name (Placeholder)" args={{ size: 'lg' }} />
