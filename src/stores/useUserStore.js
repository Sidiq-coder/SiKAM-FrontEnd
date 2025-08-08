import { create } from 'zustand';
import { usersAPI } from '../api/endpoints/users';
import { studentAPI } from '../api/endpoints/student';

const useUserStore = create((set, get) => ({
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

	reRegister: async (data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await usersAPI.reRegister(data);
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Re-register failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	verifyStudent: async (data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await studentAPI.verifyStudent(data);
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Verify student failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	inputNpm: async (data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await studentAPI.inputNpm(data);
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Input NPM failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	clearError: () => set({ error: null }),
}));

export default useUserStore;
