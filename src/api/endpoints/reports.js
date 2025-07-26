import apiClient from '@/api/client';

export const reportsAPI = {
	getReports: async () => {
		const response = await apiClient.get('/reports');
		return response.data;
	},

	createReport: async (data) => {
		const formData = new FormData();

		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('category', data.category);
		formData.append('report_level', data.report_level);
		formData.append('isAnonymous', data.isAnonymous);

		if (data.file && data.file[0]) {
			formData.append('file', data.file[0]);
		}

		const response = await apiClient.post('/reports', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},
};
