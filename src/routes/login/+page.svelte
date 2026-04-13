<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { auth } from '$lib/stores/auth';
	import { authApi } from '$lib/api/auth';
	import { redirectIfAuthenticated } from '$lib/guards/auth';
	import { appConfig } from '$lib/config/app.config';
	import { isLowerEnv } from '$lib/utils/env';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	$effect(() => {
		if (!appConfig.authEnabled) {
			goto('/');
		}
		redirectIfAuthenticated();
	});

	function getRedirectPath(): string {
		return page.url.searchParams.get('redirect') ?? '/';
	}

	async function handleDevLogin() {
		auth.login({
			user: {
				id: 'dev-user',
				email: 'dev@localhost',
				name: 'Dev User'
			},
			token: 'dev-token'
		});
		await goto(getRedirectPath());
	}

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = '';
		loading = true;
		try {
			const response = await authApi.login({ email, password });
			auth.login(response);
			await goto(getRedirectPath());
		} catch (err) {
			error = err instanceof Error ? err.message : 'Login failed';
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-gray-900">Sign In</h1>
			<p class="mt-2 text-sm text-gray-600">Sign in to your account</p>
		</div>

		{#if error}
			<div class="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>
		{/if}

		{#if isLowerEnv()}
			<button
				onclick={handleDevLogin}
				class="flex w-full justify-center rounded-md border-2 border-amber-400 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none"
			>
				Dev Login (skip auth)
			</button>
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="bg-white px-2 text-gray-500">or sign in with credentials</span>
				</div>
			</div>
		{/if}

		<form onsubmit={handleLogin} class="space-y-6">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
				/>
			</div>
			<button
				type="submit"
				disabled={loading}
				class="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
			>
				{loading ? 'Signing in...' : 'Sign In'}
			</button>
		</form>

		<p class="text-center text-sm text-gray-600">
			Don't have an account?
			<a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Register</a>
		</p>
	</div>
</div>
