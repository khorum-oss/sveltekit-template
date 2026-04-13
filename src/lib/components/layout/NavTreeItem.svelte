<script lang="ts">
	import type { NavItem } from '$lib/types/nav';
	import { page } from '$app/state';
	import { MAX_NAV_DEPTH } from '$lib/config/nav.config';
	import NavTreeItem from './NavTreeItem.svelte';

	interface Props {
		item: NavItem;
		depth?: number;
	}

	let { item, depth = 0 }: Props = $props();
	let expanded = $state(false);

	const hasChildren = $derived(item.children && item.children.length > 0 && depth < MAX_NAV_DEPTH);
	const isActive = $derived(item.href ? page.url.pathname === item.href : false);

	function toggle() {
		if (hasChildren) {
			expanded = !expanded;
		}
	}
</script>

<li>
	<div
		class="flex items-center rounded-md px-2 py-1.5 text-sm transition-colors
			{isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}"
		style="padding-left: {depth * 12 + 8}px"
	>
		{#if hasChildren}
			<button
				onclick={toggle}
				class="mr-1 flex h-4 w-4 shrink-0 items-center justify-center text-gray-400"
				aria-label={expanded ? 'Collapse' : 'Expand'}
			>
				<svg
					class="h-3 w-3 transition-transform {expanded ? 'rotate-90' : ''}"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		{:else}
			<span class="mr-1 h-4 w-4 shrink-0"></span>
		{/if}

		{#if item.href}
			<a href={item.href} class="flex-1 truncate">{item.label}</a>
		{:else}
			<button onclick={toggle} class="flex-1 truncate text-left">{item.label}</button>
		{/if}

		{#if item.badge}
			<span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
				{item.badge}
			</span>
		{/if}
	</div>

	{#if hasChildren && expanded}
		<ul class="mt-0.5">
			{#each item.children! as child (child.id)}
				<NavTreeItem item={child} depth={depth + 1} />
			{/each}
		</ul>
	{/if}
</li>
