<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Dropdown from '$lib/components/ui/Dropdown.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Dropdown',
		component: Dropdown,
		tags: ['autodocs'],
	});

	const options = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' },
	];
</script>

<Story name="Default">
	<Dropdown label="Role" {options} placeholder="Choose a role..." />
</Story>

<Story name="With Selected">
	<Dropdown label="Role" {options} value="editor" />
</Story>

<Story name="Disabled">
	<Dropdown label="Role" {options} value="admin" disabled />
</Story>

<Story name="With Disabled Option">
	<Dropdown
		label="Plan"
		options={[
			{ value: 'free', label: 'Free' },
			{ value: 'pro', label: 'Pro' },
			{ value: 'enterprise', label: 'Enterprise (contact us)', disabled: true },
		]}
	/>
</Story>
