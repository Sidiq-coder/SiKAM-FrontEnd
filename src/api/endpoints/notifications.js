import apiClient from '@/api/client';

const baseURL = '/notifications';

export const notificationsAPI = {
	getNotificationsCount: async () => {
		const response = await apiClient.get(`${baseURL}/count`);
		return response.data;
	},

	getNotification: async (id) => {
		const response = await apiClient.get(`${baseURL}/${id}`);
		return response.data;
	},

	deleteNotification: async (id) => {
		const response = await apiClient.delete(`${baseURL}/${id}`);
		return response.data;
	},

	updateNotification: async (id) => {
		const response = await apiClient.patch(`${baseURL}/${id}`);
		return response.data;
	},

	getNotifications: async () => {
		const response = await apiClient.get(baseURL);
		return response.data;
	},

	readAllNotifications: async () => {
		const response = await apiClient.patch(`${baseURL}/read-all`);
		return response.data;
	},
};
