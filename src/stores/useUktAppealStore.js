import { create } from 'zustand';
import { uktAppealsAPI } from '../api/endpoints/ukt-appeals';

const useUktAppealStore = create((set, get) => ({
	// State
	uktAppeals: [],
	uktAppeal: null,
	statusList: [],
	isLoading: false,
	isUploading: false,
	error: null,
	refresh: 0,
	pagination: {
		total_items: 0,
		total_pages: 0,
		current_page: 0,
		items_per_page: 0,
	},
	totalPerStatus: {
		pending: 0,
		under_review: 0,
		responded: 0,
		rejected: 0,
	},
	isPeriodOpen: false,

	// Actions
	getMyUktAppeals: async (filters = {}) => {
		try {
			const response = await uktAppealsAPI.getMyUktAppeals(filters);
			set({ uktAppeals: response.data, pagination: response.pagination });
		} catch (error) {
			set({ uktAppeals: [] });
			console.error('Get ukt appeals error:', error);
		}
	},

	getAdminUktAppeals: async (filters = {}) => {
		try {
			const response = await uktAppealsAPI.getAdminUktAppeals(filters);
			set({ uktAppeals: response.data, pagination: response.pagination, totalPerStatus: response.total_per_status });
		} catch (error) {
			set({ uktAppeals: [] });
			console.error('Get ukt appeals error:', error);
		}
	},

	getStatusUktAppeal: async () => {
		try {
			const response = await uktAppealsAPI.getStatusUktAppeal();
			set({ isPeriodOpen: response.data.is_active });
		} catch (error) {
			set({ uktAppeals: [] });
			console.error('Get ukt appeals status error:', error);
		}
	},

	toggleStatusUktAppeal: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await uktAppealsAPI.toggleStatusUktAppeal();
			get().getStatusUktAppeal();
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Toggle status ukt appeal failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	getAdminUktAppeal: async (id) => {
		try {
			const response = await uktAppealsAPI.getAdminUktAppeal(id);
			set({ uktAppeal: response.data });
		} catch (error) {
			set({ uktAppeal: null });
			console.error('Get ukt appeal error:', error);
		}
	},

	getUktAppeal: async (id) => {
		try {
			const response = await uktAppealsAPI.getUktAppeal(id);
			set({ uktAppeal: response.data });
		} catch (error) {
			set({ uktAppeal: null, error: error.response?.data?.message || `No appeal with id ${id}` });
			console.error('Get ukt appeal error:', error);
		}
	},

	createUktAppeal: async (data) => {
		set({ isUploading: true, error: null });
		try {
			const response = await uktAppealsAPI.createUktAppeal(data);
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			console.error(error);
			const errorMessage = error.response?.data?.message || 'Create ukt appeal failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isUploading: false });
		}
	},

	updateAppealStatus: async (data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await uktAppealsAPI.updateAppealStatus(data);
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Update ukt appeal status failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	deleteUktAppeal: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await uktAppealsAPI.deleteUktAppeal(id);
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Delete ukt appeal failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	deleteAdminUktAppeal: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await uktAppealsAPI.deleteAdminUktAppeal(id);
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Delete ukt appeal failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	getAppealStatusList: async (filters = {}) => {
		try {
			const response = await uktAppealsAPI.getAppealStatusList(filters);
			set({ statusList: response.data.dataMapped });
		} catch (error) {
			set({ statusList: null });
			console.error('Get status list error:', error);
		}
	},

	clearError: () => set({ error: null }),
}));

export default useUktAppealStore;
