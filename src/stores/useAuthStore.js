import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '@/api/endpoints/auth';

const useAuthStore = create(
	persist(
		(set, get) => ({
			// State
			user: null,
			token: null,
			isLoading: false,
			error: null,

			// Actions
			register: async (data) => {
				set({ isLoading: true, error: null });
				try {
					const response = await authAPI.register(data);
					return { success: true, data: response };
				} catch (error) {
					const errorMessage = error.response?.data?.message || 'Registration failed';
					set({ error: errorMessage, isLoading: false });
					return { success: false, error: errorMessage };
				} finally {
					set({ isLoading: false });
				}
			},

			login: async (data) => {
				set({ isLoading: true, error: null });
				try {
					const response = await authAPI.login(data);
					const { token } = response;

					localStorage.setItem('token', token);
					set({ token, isLoading: false });

					return { success: true, data: response };
				} catch (error) {
					const errorMessage = error.response?.data?.message || 'Login failed';
					set({ error: errorMessage, isLoading: false });
					return { success: false, error: errorMessage };
				} finally {
					set({ isLoading: false });
				}
			},

			logout: async () => {
				try {
					const response = await authAPI.logout();
					return { success: true, data: response };
				} catch (error) {
					const errorMessage = error.response?.data?.message || 'Logout failed';
					set({ error: errorMessage });
				} finally {
					localStorage.removeItem('token');
					set({ user: null, token: null, error: null });
				}
			},

			clearError: () => set({ error: null }),

			// Initialize auth state
			initializeAuth: () => {
				const token = localStorage.getItem('token');
				if (token) {
					set({ token });
					get().getProfile();
				}
			},

			getProfile: async () => {
				try {
					const response = await authAPI.getProfile();
					set({ user: response.data.user });
				} catch (error) {
					console.error('Get profile error:', error);
					get().logout();
				}
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				token: state.token,
			}),
		}
	)
);

export default useAuthStore;
