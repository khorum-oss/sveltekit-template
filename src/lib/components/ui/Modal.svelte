<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		title?: string;
		onclose: () => void;
		children: Snippet;
		actions?: Snippet;
	}

	let { open = $bindable(false), title, onclose, children, actions }: Props = $props();

	function handleBackdrop(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onclose();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onclose();
		}
	}
</script>

{#if open}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
		onclick={handleBackdrop}
		onkeydown={handleKeydown}
	>
		<div class="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl" role="dialog" aria-modal="true">
			{#if title}
				<div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
					<h2 class="text-lg font-semibold text-gray-900">{title}</h2>
					<button onclick={onclose} class="text-gray-400 hover:text-gray-600" aria-label="Close">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			{/if}
			<div class="px-6 py-4">
				{@render children()}
			</div>
			{#if actions}
				<div class="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
					{@render actions()}
				</div>
			{/if}
		</div>
	</div>
{/if}
