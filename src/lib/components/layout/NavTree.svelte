<script lang="ts">
	import type { NavItem } from '$lib/types/nav';
	import NavTreeItem from './NavTreeItem.svelte';

	interface Props {
		items: NavItem[];
	}

	let { items }: Props = $props();
</script>

<nav aria-label="Side navigation">
	<ul class="space-y-0.5">
		{#each items as item (item.id)}
			<NavTreeItem {item} />
		{/each}
	</ul>
</nav>
