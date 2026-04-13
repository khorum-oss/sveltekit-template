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

<Story name="With Name">
	<Avatar name="Alice Johnson" size="lg" />
</Story>

<Story name="No Name (Placeholder)">
	<Avatar size="lg" />
</Story>

<Story name="All Sizes">
	<div style="display: flex; gap: 12px; align-items: flex-end;">
		<Avatar name="A" size="xs" />
		<Avatar name="AB" size="sm" />
		<Avatar name="Alice" size="md" />
		<Avatar name="Alice B" size="lg" />
		<Avatar name="Alice Brown" size="xl" />
	</div>
</Story>
