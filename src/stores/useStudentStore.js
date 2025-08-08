import { create } from 'zustand';
import { studentAPI } from '@/api/endpoints/student';

const useStudentStore = create((set, get) => ({
	// State
	students: [],
	student: null,
	isLoading: false,
	error: null,
	refresh: 0,
	pagination: {
		total_items: 0,
		total_pages: 0,
		current_page: 0,
		items_per_page: 0,
	},
	totalStudents: 0,
	totalPerStatus: {
		waiting: 0,
		verified: 0,
		not_verified: 0,
	},

	// Actions
	getAllStudents: async (filters = {}) => {
		try {
			const response = await studentAPI.getAllStudents(filters);
			set({ students: response.data, pagination: response.pagination, totalStudents: response.total_students, totalPerStatus: response.total_per_status });
		} catch (error) {
			set({ students: [] });
			console.error('Get students error:', error);
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

	clearError: () => set({ error: null }),
}));

export default useStudentStore;
