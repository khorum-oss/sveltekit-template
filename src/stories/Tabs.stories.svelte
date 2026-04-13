<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tabs from '$lib/components/ui/Tabs.svelte';

	const { Story } = defineMeta({
		title: 'UI/Tabs',
		component: Tabs,
		tags: ['autodocs'],
	});

	const basicTabs = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'features', label: 'Features' },
		{ id: 'pricing', label: 'Pricing' },
	];

	const badgeTabs = [
		{ id: 'all', label: 'All', badge: 42 },
		{ id: 'active', label: 'Active', badge: 12 },
		{ id: 'archived', label: 'Archived', badge: 30 },
	];
</script>

<Story name="Default">
	<Tabs tabs={basicTabs}>
		<p>Tab content appears here. Switch tabs above.</p>
	</Tabs>
</Story>

<Story name="With Badges">
	<Tabs tabs={badgeTabs}>
		<p>Tabs can display count badges.</p>
	</Tabs>
</Story>
