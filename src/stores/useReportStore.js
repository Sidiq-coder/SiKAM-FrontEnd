import { create } from 'zustand';
import { reportsAPI } from '@/api/endpoints/reports';

const useReportStore = create((set, get) => ({
	// State
	reports: [],
	report: null,
	isLoading: false,
	error: null,
	activeTab: 'semua',
	tabOptions: [
		{ label: 'Semua', value: 'semua' },
		{ label: 'Laporan Saya', value: 'laporan-saya' },
	],
	refresh: 0,
	pagination: {
		total_items: 0,
		total_pages: 0,
		current_page: 0,
		items_per_page: 0,
	},
	totalPerCategory: {
		general: 0,
		administration: 0,
		bureaucracy: 0,
		facilities: 0,
		academic: 0,
		ukt_appeal: 0,
		financial: 0,
	},

	// Actions
	setActiveTab: (activeTab) => {
		set({ activeTab });
	},

	getReports: async (filters = {}) => {
		try {
			const response = await reportsAPI.getReports(filters);
			set({ reports: response.data, pagination: response.pagination, totalPerCategory: response.total_per_category });
		} catch (error) {
			set({ reports: [] });
			console.error('Get reports error:', error);
		}
	},

	getAdminReports: async (filters = {}) => {
		try {
			const response = await reportsAPI.getAdminReports(filters);
			set({ reports: response.data, pagination: response.pagination });
		} catch (error) {
			set({ reports: [] });
			console.error('Get reports error:', error);
		}
	},

	getReport: async (id) => {
		try {
			const response = await reportsAPI.getReport(id);
			set({ report: response.data });
		} catch (error) {
			set({ report: null });
			console.error('Get report error:', error);
		}
	},

	getMyReports: async (filters = {}) => {
		try {
			const response = await reportsAPI.getMyReports(filters);
			set({ reports: response.data });
		} catch (error) {
			set({ reports: [] });
			console.error('Get my reports error:', error);
		}
	},

	setReports: async (reports) => {
		set({ reports });
	},

	createReport: async (data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await reportsAPI.createReport(data);
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Create report failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	updateReport: async (id, data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await reportsAPI.updateReport(id, data);
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Update report failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	deleteReport: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await reportsAPI.deleteReport(id);
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Delete report failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	upvoteReport: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await reportsAPI.voteReport(id, { type: 'upvote' });
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Upvote report failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	downvoteReport: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await reportsAPI.voteReport(id, { type: 'downvote' });
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Downvote report failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	updateReportStatus: async (id, data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await reportsAPI.updateReportStatus(id, data);
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Update report response failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	clearError: () => set({ error: null }),
}));

export default useReportStore;
