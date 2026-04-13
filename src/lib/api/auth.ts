import { http } from '$lib/api/http';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '$lib/types/auth';

export const authApi = {
	async login(data: LoginRequest): Promise<AuthResponse> {
		return http.post<AuthResponse>('/api/auth/login', data);
	},

	async register(data: RegisterRequest): Promise<AuthResponse> {
		return http.post<AuthResponse>('/api/auth/register', data);
	},

	async me(): Promise<User> {
		return http.get<User>('/api/auth/me');
	},

	async logout(): Promise<void> {
		return http.post('/api/auth/logout');
	}
};
