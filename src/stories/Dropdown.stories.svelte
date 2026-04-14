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

	const optionsWithDisabled = [
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro' },
		{ value: 'enterprise', label: 'Enterprise (contact us)', disabled: true },
	];
</script>

<Story name="Default" args={{ label: 'Role', options, placeholder: 'Choose a role...' }} />

<Story name="With Selected" args={{ label: 'Role', options, value: 'editor' }} />

<Story name="Disabled" args={{ label: 'Role', options, value: 'admin', disabled: true }} />

<Story name="With Disabled Option" args={{ label: 'Plan', options: optionsWithDisabled }} />
