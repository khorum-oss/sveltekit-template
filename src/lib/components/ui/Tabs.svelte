<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Tab {
		id: string;
		label: string;
		badge?: string | number;
	}

	interface Props {
		tabs: Tab[];
		activeTab?: string;
		onchange?: (tabId: string) => void;
		children: Snippet;
	}

	let { tabs, activeTab = $bindable(tabs[0]?.id ?? ''), onchange, children }: Props = $props();

	function selectTab(tabId: string) {
		activeTab = tabId;
		onchange?.(tabId);
	}
</script>

<div>
	<div class="border-b border-gray-200">
		<nav class="-mb-px flex gap-4" aria-label="Tabs">
			{#each tabs as tab (tab.id)}
				<button
					onclick={() => selectTab(tab.id)}
					class="whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors
						{activeTab === tab.id
							? 'border-indigo-500 text-indigo-600'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
				>
					{tab.label}
					{#if tab.badge !== undefined}
						<span class="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{tab.badge}</span>
					{/if}
				</button>
			{/each}
		</nav>
	</div>
	<div class="pt-4">
		{@render children()}
	</div>
</div>
