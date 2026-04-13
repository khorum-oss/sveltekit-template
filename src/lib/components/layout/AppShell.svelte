<script lang="ts">
	import type { Snippet } from 'svelte';
	import TopNav from './TopNav.svelte';
	import LeftNav from './LeftNav.svelte';
	import AuthGuard from '$lib/components/auth/AuthGuard.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
	let sidebarCollapsed = $state(false);
	let mobileOpen = $state(false);

	function toggleSidebar() {
		if (window.innerWidth < 768) {
			mobileOpen = !mobileOpen;
		} else {
			sidebarCollapsed = !sidebarCollapsed;
		}
	}
</script>

<div class="flex h-screen flex-col">
	<TopNav onToggleSidebar={toggleSidebar} />

	<div class="flex flex-1 overflow-hidden">
		<!-- Desktop sidebar -->
		<div class="hidden h-full shrink-0 md:block">
			<LeftNav collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
		</div>

		<!-- Mobile sidebar overlay -->
		{#if mobileOpen}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="fixed inset-0 z-30 bg-black/50 md:hidden" onclick={() => (mobileOpen = false)} onkeydown={(e) => e.key === 'Escape' && (mobileOpen = false)}>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div class="h-full w-64" onclick={(e) => e.stopPropagation()}>
					<LeftNav />
				</div>
			</div>
		{/if}

		<!-- Main content -->
		<main class="flex-1 overflow-y-auto bg-gray-50">
			<AuthGuard>
				{@render children()}
			</AuthGuard>
		</main>
	</div>
</div>
