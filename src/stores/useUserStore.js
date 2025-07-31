import { create } from 'zustand';
import { usersAPI } from '../api/endpoints/users';

const useUserStore = create((set) => ({
	// State
	user: null,
	student: null,
	isLoading: false,
	error: null,
	refresh: 0,

	// Actions
	getProfile: async () => {
		try {
			const response = await usersAPI.getProfile();
			set({ user: response.data });
		} catch (error) {
			console.error('Get profile error:', error);
		}
	},

	getStudent: async (id) => {
		try {
			const response = await usersAPI.getUser(id);
			set({ student: response.data.student });
		} catch (error) {
			console.error('Get user error:', error);
		}
	},

	updateProfile: async (data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await usersAPI.updateProfile(data);
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Update profile failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	clearError: () => set({ error: null }),
}));

export default useUserStore;
