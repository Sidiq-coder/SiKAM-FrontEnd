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

	reRegister: async (data) => {
		const formData = new FormData();

		formData.append('name', data.name);

		if (data.ktm) {
			formData.append('ktm', data.ktm);
		}

		const response = await apiClient.put(`${baseURL}/re-register`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},
};
