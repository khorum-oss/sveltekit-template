<script lang="ts">
	interface Props {
		src?: string;
		name?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	}

	let { src, name, size = 'md' }: Props = $props();

	const sizeClasses = {
		xs: 'h-6 w-6 text-xs',
		sm: 'h-8 w-8 text-xs',
		md: 'h-10 w-10 text-sm',
		lg: 'h-12 w-12 text-base',
		xl: 'h-16 w-16 text-lg'
	};

	function getInitials(name: string): string {
		return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
	}
</script>

{#if src}
	<img {src} alt={name ?? ''} class="rounded-full object-cover {sizeClasses[size]}" />
{:else if name}
	<div class="flex items-center justify-center rounded-full bg-indigo-600 font-medium text-white {sizeClasses[size]}">
		{getInitials(name)}
	</div>
{:else}
	<div class="flex items-center justify-center rounded-full bg-gray-300 text-gray-600 {sizeClasses[size]}">
		<svg class="h-1/2 w-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
		</svg>
	</div>
{/if}
