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

	getAdminNews: async (filters = {}) => {
		try {
			const response = await newsAPI.getAdminNews(filters);
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

	createNews: async (data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await newsAPI.createNews(data);
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Create news failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	updateNews: async (id, data) => {
		set({ isLoading: true, error: null });
		try {
			const response = await newsAPI.updateNews(id, data);
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Update news failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	deleteNews: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await newsAPI.deleteNews(id);
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Delete news failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	clearError: () => set({ error: null }),
}));

export default useNewsStore;
