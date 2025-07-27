import apiClient from '@/api/client';

export const authAPI = {
	register: async (data) => {
		const formData = new FormData();

		formData.append('name', data.name);
		formData.append('campus_email', data.campus_email);
		formData.append('password', data.password);

		if (data.ktm && data.ktm[0]) {
			formData.append('ktm', data.ktm[0]);
		}

		const response = await apiClient.post('/auth/register', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},

	verifyEmail: async (data) => {
		const response = await apiClient.post('/auth/verify-email', data);
		return response.data;
	},

	login: async (data) => {
		const response = await apiClient.post('/auth/login', data);
		return response.data;
	},

	logout: async () => {
		const response = await apiClient.post('/auth/logout');
		return response.data;
	},

	requestPasswordReset: async (data) => {
		const response = await apiClient.post('/auth/request-password-reset', data);
		return response.data;
	},

	verifyPasswordReset: async (data) => {
		const response = await apiClient.post('/auth/verify-password-reset', data);
		return response.data;
	},

	getProfile: async () => {
		const response = await apiClient.get('/users/me');
		return response.data;
	},
};
