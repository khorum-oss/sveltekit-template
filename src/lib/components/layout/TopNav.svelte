<script lang="ts">
	import { page } from '$app/state';
	import { topNavSections } from '$lib/config/nav.config';
	import UserMenu from './UserMenu.svelte';
	import DevModeToggle from '$lib/components/dev/DevModeToggle.svelte';

	interface Props {
		onToggleSidebar?: () => void;
	}

	let { onToggleSidebar }: Props = $props();
</script>

<header class="flex h-14 items-center border-b border-gray-200 bg-white px-4">
	<!-- Hamburger for mobile -->
	{#if onToggleSidebar}
		<button
			onclick={onToggleSidebar}
			class="mr-3 rounded p-1.5 text-gray-500 hover:bg-gray-100 md:hidden"
			aria-label="Toggle sidebar"
		>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	{/if}

	<!-- Logo / Brand -->
	<a href="/" class="mr-6 text-lg font-bold text-gray-900">Khorum</a>

	<!-- Section Tabs -->
	<nav class="hidden items-center gap-1 md:flex">
		{#each topNavSections as section (section.id)}
			<a
				href={section.href}
				class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors
					{page.url.pathname === section.href || (section.href !== '/' && page.url.pathname.startsWith(section.href))
						? 'bg-indigo-50 text-indigo-700'
						: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}"
			>
				{section.label}
			</a>
		{/each}
	</nav>

	<!-- Right side -->
	<div class="ml-auto flex items-center gap-3">
		<DevModeToggle />
		<UserMenu />
	</div>
</header>
