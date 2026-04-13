<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
		size?: 'sm' | 'md';
		children: Snippet;
	}

	let { variant = 'default', size = 'sm', children }: Props = $props();

	const variantClasses = {
		default: 'bg-gray-100 text-gray-700',
		primary: 'bg-indigo-100 text-indigo-700',
		success: 'bg-green-100 text-green-700',
		warning: 'bg-amber-100 text-amber-700',
		danger: 'bg-red-100 text-red-700',
		info: 'bg-blue-100 text-blue-700'
	};

	const sizeClasses = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-2.5 py-1 text-sm'
	};
</script>

<span class="inline-flex items-center rounded-full font-medium {variantClasses[variant]} {sizeClasses[size]}">
	{@render children()}
</span>
