<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '$lib/components/ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'UI/Button',
		tags: ['autodocs'],
		component: Button,
		argTypes: {
			variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
			disabled: { control: 'boolean' },
		},
	});
</script>

<Story name="Primary" args={{ variant: 'primary' }}>
	Primary Button
</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>
	Secondary Button
</Story>

<Story name="Ghost" args={{ variant: 'ghost' }}>
	Ghost Button
</Story>

<Story name="Danger" args={{ variant: 'danger' }}>
	Danger Button
</Story>

<Story name="Small" args={{ size: 'sm' }}>
	Small
</Story>

<Story name="Large" args={{ size: 'lg' }}>
	Large
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	Disabled
</Story>
