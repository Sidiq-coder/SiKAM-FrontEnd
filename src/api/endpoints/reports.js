import apiClient from '@/api/client';

const baseURL = '/reports';

export const reportsAPI = {
	getReports: async () => {
		const response = await apiClient.get(baseURL);
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

		const response = await apiClient.post(baseURL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},

	getReport: async (id) => {
		const response = await apiClient.get(`${baseURL}/${id}`);
		return response.data;
	},

	updateReport: async (id, data) => {
		const formData = new FormData();

		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('category', data.category);
		formData.append('report_level', data.report_level);
		formData.append('isAnonymous', data.isAnonymous);

		if (data.file && data.file[0]) {
			formData.append('file', data.file[0]);
		}

		const response = await apiClient.patch(`${baseURL}/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},

	deleteReport: async (id) => {
		const response = await apiClient.delete(`${baseURL}/${id}`);
		return response.data;
	},

	updateReportStatus: async (id, data) => {
		const response = await apiClient.patch(`${baseURL}/${id}/status`, data);
		return response.data;
	},

	createReportResponse: async (id, data) => {
		const response = await apiClient.post(`${baseURL}/${id}/response`, data);
		return response.data;
	},

	deleteReportResponse: async (id) => {
		const response = await apiClient.delete(`${baseURL}/${id}/response`);
		return response.data;
	},

	getMyReports: async () => {
		const response = await apiClient.get(`${baseURL}/me`);
		return response.data;
	},

	getVotesReport: async (id) => {
		const response = await apiClient.get(`${baseURL}/${id}/votes`);
		return response.data;
	},

	voteReport: async (id, data) => {
		const response = await apiClient.post(`${baseURL}/${id}/vote`, data);
		return response.data;
	},
};
