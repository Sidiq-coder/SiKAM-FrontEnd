import apiClient from '@/api/client';

const baseURL = '/users';

export const usersAPI = {
	getProfile: async () => {
		const response = await apiClient.get(`${baseURL}/me`);
		return response.data;
	},

	updateProfile: async (data) => {
		const response = await apiClient.patch(`${baseURL}/me`, data);
		return response.data;
	},

	getUser: async (id) => {
		const response = await apiClient.get(`${baseURL}/${id}`);
		return response.data;
	},

	getAdmin: async (id) => {
		const response = await apiClient.get(`${baseURL}/admin/${id}`);
		return response.data;
	},
};
