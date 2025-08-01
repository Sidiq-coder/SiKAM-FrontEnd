import apiClient from '@/api/client';

const baseURL = '/admin';

export const adminAPI = {
	getAdmins: async ({ page, itemPerPage, sort, role, search }) => {
		const response = await apiClient.get(baseURL, { params: { page, itemPerPage, sort, role, search } });
		return response.data;
	},

	createAdmin: async ({ name, email, password, role }) => {
		const response = await apiClient.post(baseURL, { name, email, password, role });
		return response.data;
	},

	getAdmin: async (id) => {
		const response = await apiClient.get(`${baseURL}/${id}`);
		return response.data;
	},

	updateAdmin: async (id, { name, email, role, password }) => {
		const response = await apiClient.put(`${baseURL}/${id}`, { name, email, role, password });
		return response.data;
	},

	deleteAdmin: async (id) => {
		const response = await apiClient.delete(`${baseURL}/${id}`);
		return response.data;
	},
};
