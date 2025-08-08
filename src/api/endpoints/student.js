import apiClient from '@/api/client';

const baseURL = '/admin/students';

export const studentAPI = {
	getAllStudents: async ({ page, itemPerPage, sort, search, status }) => {
		const response = await apiClient.get(baseURL, { params: { page, itemPerPage, sort, search, status } });
		return response.data;
	},

	verifyStudent: async ({ campus_email, status }) => {
		const response = await apiClient.patch(`${baseURL}/verify`, { campus_email, status });
		return response.data;
	},

	inputNpm: async ({ campus_email, npm }) => {
		const response = await apiClient.post(`${baseURL}/input-npm`, { campus_email, npm });
		return response.data;
	},
};
