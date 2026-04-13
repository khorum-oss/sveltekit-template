<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { isAuthenticated } from '$lib/stores/auth';
	import { requireAuth, isPublicRoute } from '$lib/guards/auth';
	import { appConfig } from '$lib/config/app.config';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
	let checked = $state(false);

	$effect(() => {
		if (!appConfig.authEnabled) {
			checked = true;
			return;
		}

		const path = page.url.pathname;
		if (isPublicRoute(path)) {
			checked = true;
			return;
		}

		requireAuth(path).then((allowed) => {
			checked = allowed;
		});
	});
</script>

{#if checked}
	{@render children()}
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<div class="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
	</div>
{/if}
