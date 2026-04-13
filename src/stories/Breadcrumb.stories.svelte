<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';

	const { Story } = defineMeta({
		title: 'UI/Breadcrumb',
		component: Breadcrumb,
		tags: ['autodocs'],
	});
</script>

<Story name="Simple" args={{ items: [{ label: 'Home', href: '/' }, { label: 'Current Page' }] }} />

<Story name="Deep Path" args={{ items: [
	{ label: 'Home', href: '/' },
	{ label: 'Docs', href: '/docs' },
	{ label: 'Components', href: '/docs/components' },
	{ label: 'UI Elements' },
] }} />
