<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '$lib/components/ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'UI/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
			size: { control: 'select', options: ['sm', 'md', 'lg'] },
			disabled: { control: 'boolean' },
		},
	});
</script>

<Story name="Primary">
	<Button variant="primary">Primary Button</Button>
</Story>

<Story name="Secondary">
	<Button variant="secondary">Secondary Button</Button>
</Story>

<Story name="Ghost">
	<Button variant="ghost">Ghost Button</Button>
</Story>

<Story name="Danger">
	<Button variant="danger">Danger Button</Button>
</Story>

<Story name="Small">
	<Button size="sm">Small</Button>
</Story>

<Story name="Large">
	<Button size="lg">Large</Button>
</Story>

<Story name="Disabled">
	<Button disabled>Disabled</Button>
</Story>

<Story name="All Variants">
	<div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="danger">Danger</Button>
		<Button disabled>Disabled</Button>
	</div>
</Story>
