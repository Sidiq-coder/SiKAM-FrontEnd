import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '@/api/endpoints/auth';
import { usersAPI } from '@/api/endpoints/users';

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

			verifyEmail: async (data) => {
				set({ isLoading: true, error: null });
				try {
					const response = await authAPI.verifyEmail(data);
					return { success: true, data: response };
				} catch (error) {
					const errorMessage = error.response?.data?.message || 'Verify email failed';
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

			resetPassword: async (data) => {
				set({ isLoading: true, error: null });
				try {
					const response = await authAPI.resetPassword(data);
					return { success: true, data: response };
				} catch (error) {
					const errorMessage = error.response?.data?.message || 'Reset password failed';
					set({ error: errorMessage, isLoading: false });
					return { success: false, error: errorMessage };
				} finally {
					set({ isLoading: false });
				}
			},

			requestPasswordReset: async (data) => {
				set({ isLoading: true, error: null });
				try {
					const response = await authAPI.requestPasswordReset(data);
					return { success: true, data: response };
				} catch (error) {
					const errorMessage = error.response?.data?.message || 'Request reset password failed';
					set({ error: errorMessage, isLoading: false });
					return { success: false, error: errorMessage };
				} finally {
					set({ isLoading: false });
				}
			},

			verifyPasswordReset: async (data) => {
				set({ isLoading: true, error: null });
				try {
					const response = await authAPI.verifyPasswordReset(data);
					return { success: true, data: response };
				} catch (error) {
					const errorMessage = error.response?.data?.message || 'Verify password failed';
					set({ error: errorMessage, isLoading: false });
					return { success: false, error: errorMessage };
				} finally {
					set({ isLoading: false });
				}
			},

			clearError: () => set({ error: null }),

			// Initialize auth state
			initializeAuth: () => {
				const token = localStorage.getItem('token');
				if (token) {
					set({ token });
					get().getProfile();
				} else {
					set({ user: null, token: null, error: null });
				}
			},

			getProfile: async () => {
				try {
					const response = await usersAPI.getProfile();
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
