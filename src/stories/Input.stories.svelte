<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from '$lib/components/ui/Input.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {
			type: { control: 'select', options: ['text', 'email', 'password', 'number', 'url'] },
			disabled: { control: 'boolean' },
			required: { control: 'boolean' },
		},
	});
</script>

<Story name="Default" args={{ label: 'Name', placeholder: 'Enter your name' }} />

<Story name="With Value" args={{ label: 'Email', type: 'email', value: 'user@example.com' }} />

<Story name="With Error" args={{ label: 'Username', value: 'a', error: 'Username must be at least 3 characters' }} />

<Story name="Disabled" args={{ label: 'Read Only', value: 'Cannot edit', disabled: true }} />

<Story name="Password" args={{ label: 'Password', type: 'password', placeholder: 'Enter password' }} />
