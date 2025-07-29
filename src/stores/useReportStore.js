import { create } from 'zustand';
import { reportsAPI } from '@/api/endpoints/reports';

const useReportStore = create((set) => ({
	// State
	reports: [],
	report: null,
	isLoading: false,
	error: null,

	// Actions
	getReports: async () => {
		try {
			const response = await reportsAPI.getReports();
			set({ reports: response.data });
		} catch (error) {
			console.error('Get reports error:', error);
		}
	},

	getReport: async (id) => {
		try {
			const response = await reportsAPI.getReport(id);
			set({ report: response.data });
		} catch (error) {
			console.error('Get report error:', error);
		}
	},

	getMyReports: async () => {
		try {
			const response = await reportsAPI.getMyReports();
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
}));

export default useReportStore;
