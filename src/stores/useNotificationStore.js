import { create } from 'zustand';
import { notificationsAPI } from '@/api/endpoints/notifications';

const useNotificationStore = create((set, get) => ({
	isOpenModal: false,
	notifications: [],
	isLoading: false,
	error: null,
	refresh: 0,

	setOpenModal: (isOpenModal) => {
		set({ isOpenModal });
	},

	getNotifications: async () => {
		try {
			const response = await notificationsAPI.getNotifications();
			set({ notifications: response.data });
		} catch (error) {
			set({ notifications: [] });
			console.error('Get notifications error:', error);
		}
	},

	deleteNotification: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await notificationsAPI.deleteNotification(id);
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Delete notification failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	readNotification: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await notificationsAPI.readNotification(id);
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Read notification failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	readAllNotifications: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await notificationsAPI.readAllNotifications();
			set({ refresh: get().refresh + 1 });
			return { success: true, data: response };
		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Read all notifications failed';
			set({ error: errorMessage, isLoading: false });
			return { success: false, error: errorMessage };
		} finally {
			set({ isLoading: false });
		}
	},

	clearError: () => set({ error: null }),
}));

export default useNotificationStore;
