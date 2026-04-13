import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { User, AuthState, AuthResponse } from '$lib/types/auth';

const STORAGE_KEY = 'khorum_auth';

function loadFromStorage(): AuthState {
	if (!browser) return { user: null, token: null, isAuthenticated: false };
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return { user: null, token: null, isAuthenticated: false };
		const data = JSON.parse(raw);
		return {
			user: data.user ?? null,
			token: data.token ?? null,
			isAuthenticated: !!data.token
		};
	} catch {
		return { user: null, token: null, isAuthenticated: false };
	}
}

const state = writable<AuthState>(loadFromStorage());

if (browser) {
	state.subscribe((value) => {
		if (value.isAuthenticated) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: value.user, token: value.token }));
		} else {
			localStorage.removeItem(STORAGE_KEY);
		}
	});
}

export const auth = {
	subscribe: state.subscribe,

	login(response: AuthResponse) {
		state.set({
			user: response.user,
			token: response.token,
			isAuthenticated: true
		});
	},

	updateUser(user: User) {
		state.update((s) => ({ ...s, user }));
	},

	logout() {
		state.set({ user: null, token: null, isAuthenticated: false });
	}
};

export const isAuthenticated = derived(state, ($state) => $state.isAuthenticated);
export const currentUser = derived(state, ($state) => $state.user);
