<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		padding?: boolean;
		children: Snippet;
		footer?: Snippet;
	}

	let { title, subtitle, padding = true, children, footer }: Props = $props();
</script>

<div class="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
	{#if title}
		<div class="border-b border-gray-200 px-4 py-3 sm:px-6">
			<h3 class="text-base font-semibold text-gray-900">{title}</h3>
			{#if subtitle}
				<p class="mt-1 text-sm text-gray-500">{subtitle}</p>
			{/if}
		</div>
	{/if}
	<div class={padding ? 'px-4 py-4 sm:px-6' : ''}>
		{@render children()}
	</div>
	{#if footer}
		<div class="border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6">
			{@render footer()}
		</div>
	{/if}
</div>
