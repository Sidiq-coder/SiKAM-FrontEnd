import { create } from 'zustand';
import { newsAPI } from '@/api/endpoints/news';

const useNewsStore = create((set) => ({
	// State
	news: [],
	newsItem: null,
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
	getNews: async (filters = {}) => {
		try {
			const response = await newsAPI.getNews(filters);
			set({ news: response.data, pagination: response.pagination });
		} catch (error) {
			set({ news: [] });
			console.error('Get news error:', error);
		}
	},

	getNewsById: async (id) => {
		try {
			const response = await newsAPI.getNewsById(id);
			set({ newsItem: response.data });
		} catch (error) {
			set({ newsItem: null });
			console.error('Get news error:', error);
		}
	},

	clearError: () => set({ error: null }),
}));

export default useNewsStore;
