<script lang="ts">
	import NavTree from './NavTree.svelte';
	import { leftNavItems } from '$lib/config/nav.config';

	interface Props {
		collapsed?: boolean;
		onToggleCollapse?: () => void;
	}

	let { collapsed = false, onToggleCollapse }: Props = $props();
</script>

<aside
	class="flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-200
		{collapsed ? 'w-12' : 'w-64'}"
	data-testid="left-nav"
	data-collapsed={collapsed}
>
	<div class="flex items-center border-b border-gray-200 {collapsed ? 'justify-center px-2 py-3' : 'justify-between px-4 py-3'}">
		{#if !collapsed}
			<span class="text-sm font-semibold text-gray-600">Navigation</span>
		{/if}
		{#if onToggleCollapse}
			<button
				onclick={onToggleCollapse}
				class="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
				aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				data-testid="sidebar-toggle"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					{#if collapsed}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
					{/if}
				</svg>
			</button>
		{/if}
	</div>
	{#if !collapsed}
		<div class="flex-1 overflow-y-auto p-3">
			<NavTree items={leftNavItems} />
		</div>
	{/if}
</aside>
