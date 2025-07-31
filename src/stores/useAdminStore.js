import { create } from 'zustand';
import { adminAPI } from '@/api/endpoints/admin';

const useAdminStore = create((set, get) => ({
	// State
	admins: [],
	admin: null,
	isLoading: false,
	error: null,
	refresh: 0,

	// Actions
	getAdmins: async (filters = {}) => {
		try {
			const response = await adminAPI.getAdmins(filters);
			set({ admins: response.data });
		} catch (error) {
			set({ admins: [] });
			console.error('Get admins error:', error);
		}
	},

	getAdmin: async (id) => {
		try {
			const response = await adminAPI.getAdmin(id);
			set({ admin: response.data });
		} catch (error) {
			set({ admin: null });
			console.error('Get admin error:', error);
		}
	},

	createAdmin: async (data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await adminAPI.createAdmin(data);
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Create admin failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	updateAdmin: async (id, data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await adminAPI.updateAdmin(id, data);
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Update admin failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	deleteAdmin: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await adminAPI.deleteAdmin(id);
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Delete admin failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	clearError: () => set({ error: null }),
}));

export default useAdminStore;
