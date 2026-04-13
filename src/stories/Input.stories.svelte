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

<Story name="Default">
	<Input label="Name" placeholder="Enter your name" />
</Story>

<Story name="With Value">
	<Input label="Email" type="email" value="user@example.com" />
</Story>

<Story name="With Error">
	<Input label="Username" value="a" error="Username must be at least 3 characters" />
</Story>

<Story name="Disabled">
	<Input label="Read Only" value="Cannot edit" disabled />
</Story>

<Story name="Password">
	<Input label="Password" type="password" placeholder="Enter password" />
</Story>
