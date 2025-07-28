import apiClient from '@/api/client';

const baseURL = '/auth';

export const authAPI = {
	register: async (data) => {
		const formData = new FormData();

		formData.append('name', data.name);
		formData.append('campus_email', data.campus_email);
		formData.append('password', data.password);

		if (data.ktm && data.ktm[0]) {
			formData.append('ktm', data.ktm[0]);
		}

		const response = await apiClient.post(`${baseURL}/register`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},

	verifyEmail: async (data) => {
		const response = await apiClient.post(`${baseURL}/verify-email`, data);
		return response.data;
	},

	verifyStudent: async (npm) => {
		const response = await apiClient.patch(`${baseURL}/verify-email/${npm}`);
		return response.data;
	},

	login: async (data) => {
		const response = await apiClient.post(`${baseURL}/login`, data);
		return response.data;
	},

	logout: async () => {
		const response = await apiClient.post(`${baseURL}/logout`);
		return response.data;
	},

	resetPassword: async (data) => {
		const response = await apiClient.patch(`${baseURL}/reset-password`, data);
		return response.data;
	},

	requestPasswordReset: async (data) => {
		const response = await apiClient.post(`${baseURL}/request-password-reset`, data);
		return response.data;
	},

	verifyPasswordReset: async (data) => {
		const response = await apiClient.post(`${baseURL}/verify-password-reset`, data);
		return response.data;
	},
};
