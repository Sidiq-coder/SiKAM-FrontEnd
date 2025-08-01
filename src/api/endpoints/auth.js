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

	verifyEmail: async ({ email, otp_code }) => {
		const response = await apiClient.post(`${baseURL}/verify-email`, { email, otp_code });
		return response.data;
	},

	verifyStudent: async (npm) => {
		const response = await apiClient.patch(`${baseURL}/verify-email/${npm}`);
		return response.data;
	},

	login: async ({ identifier, password }) => {
		const response = await apiClient.post(`${baseURL}/login`, { identifier, password });
		return response.data;
	},

	logout: async () => {
		const response = await apiClient.post(`${baseURL}/logout`);
		return response.data;
	},

	resetPassword: async ({ old_password, new_password, confirm_new_password }) => {
		const response = await apiClient.patch(`${baseURL}/reset-password`, { old_password, new_password, confirm_new_password });
		return response.data;
	},

	requestPasswordReset: async ({ email }) => {
		const response = await apiClient.post(`${baseURL}/request-password-reset`, { email });
		return response.data;
	},

	verifyPasswordReset: async ({ email, otp, new_password }) => {
		const response = await apiClient.post(`${baseURL}/verify-password-reset`, { email, otp, new_password });
		return response.data;
	},
};
