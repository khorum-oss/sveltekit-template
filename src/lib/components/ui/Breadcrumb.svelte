<script lang="ts">
	interface Crumb {
		label: string;
		href?: string;
	}

	interface Props {
		items: Crumb[];
	}

	let { items }: Props = $props();
</script>

<nav aria-label="Breadcrumb">
	<ol class="flex items-center gap-1 text-sm text-gray-500">
		{#each items as crumb, i (i)}
			{#if i > 0}
				<li>
					<svg class="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</li>
			{/if}
			<li>
				{#if crumb.href && i < items.length - 1}
					<a href={crumb.href} class="hover:text-gray-700">{crumb.label}</a>
				{:else}
					<span class={i === items.length - 1 ? 'font-medium text-gray-900' : ''}>{crumb.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
