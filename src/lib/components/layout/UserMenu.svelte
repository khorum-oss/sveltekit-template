<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser, isAuthenticated, auth } from '$lib/stores/auth';
	import { appConfig } from '$lib/config/app.config';

	let open = $state(false);

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}

	function handleLogout() {
		auth.logout();
		close();
		goto('/login');
	}

	function getInitials(name: string): string {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}
</script>

<div class="relative">
	<button
		onclick={toggle}
		class="flex items-center rounded-full focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
		data-testid="user-menu-toggle"
	>
		{#if $currentUser?.avatarUrl}
			<img
				src={$currentUser.avatarUrl}
				alt={$currentUser.name}
				class="h-8 w-8 rounded-full"
			/>
		{:else if $currentUser}
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
				{getInitials($currentUser.name)}
			</div>
		{:else}
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xs text-gray-600">
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			</div>
		{/if}
	</button>

	{#if open}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="fixed inset-0 z-40" onclick={close} onkeydown={(e) => e.key === 'Escape' && close()}></div>
		<div class="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
			{#if $isAuthenticated && $currentUser}
				<div class="border-b border-gray-100 px-4 py-2">
					<p class="text-sm font-medium text-gray-900">{$currentUser.name}</p>
					<p class="text-xs text-gray-500">{$currentUser.email}</p>
				</div>
			{/if}

			<a
				href="/settings"
				onclick={close}
				class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
			>
				Settings
			</a>

			{#if appConfig.authEnabled}
				{#if $isAuthenticated}
					<button
						onclick={handleLogout}
						class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
					>
						Sign Out
					</button>
				{:else}
					<a
						href="/login"
						onclick={close}
						class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						Sign In
					</a>
				{/if}
			{/if}
		</div>
	{/if}
</div>
