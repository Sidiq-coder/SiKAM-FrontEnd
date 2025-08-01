import { create } from 'zustand';
import { uktAppealsAPI } from '../api/endpoints/ukt-appeals';

const useUktAppealStore = create((set) => ({
	// State
	uktAppeals: [],
	isLoading: false,
	error: null,
	refresh: 0,
	pagination: {
		total_items: 0,
		total_pages: 0,
		current_page: 0,
		items_per_page: 0,
	},

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

	clearError: () => set({ error: null }),
}));

export default useUktAppealStore;
