import apiClient from '@/api/client';

const baseURL = '/admin';

export const adminAPI = {
	getAdmins: async ({ page, itemPerPage, sort, role, search }) => {
		const response = await apiClient.get(baseURL, { params: { page, itemPerPage, sort, role, search } });
		return response.data;
	},

	createAdmin: async (data) => {
		const response = await apiClient.post(baseURL, data);
		return response.data;
	},

	getAdmin: async (id) => {
		const response = await apiClient.get(`${baseURL}/${id}`);
		return response.data;
	},

	updateAdmin: async (id, data) => {
		const response = await apiClient.put(`${baseURL}/${id}`, data);
		return response.data;
	},

	deleteAdmin: async (id) => {
		const response = await apiClient.delete(`${baseURL}/${id}`);
		return response.data;
	},
};
