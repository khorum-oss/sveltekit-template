<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'info' | 'success' | 'warning' | 'error';
		title?: string;
		dismissible?: boolean;
		ondismiss?: () => void;
		children: Snippet;
	}

	let { variant = 'info', title, dismissible = false, ondismiss, children }: Props = $props();

	const variantClasses = {
		info: 'bg-blue-50 text-blue-800 border-blue-200',
		success: 'bg-green-50 text-green-800 border-green-200',
		warning: 'bg-amber-50 text-amber-800 border-amber-200',
		error: 'bg-red-50 text-red-800 border-red-200'
	};

	const iconPaths = {
		info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
		error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
	};
</script>

<div class="rounded-md border p-4 {variantClasses[variant]}" role="alert">
	<div class="flex">
		<svg class="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPaths[variant]} />
		</svg>
		<div class="flex-1">
			{#if title}
				<h4 class="mb-1 text-sm font-semibold">{title}</h4>
			{/if}
			<div class="text-sm">{@render children()}</div>
		</div>
		{#if dismissible && ondismiss}
			<button onclick={ondismiss} class="ml-3 shrink-0 opacity-60 hover:opacity-100" aria-label="Dismiss">
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		{/if}
	</div>
</div>
