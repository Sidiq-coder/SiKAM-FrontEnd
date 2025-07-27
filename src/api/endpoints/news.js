import apiClient from '@/api/client';

const baseURL = '/news';

export const newsAPI = {
	getNews: async () => {
		const response = await apiClient.get(baseURL);
		return response.data;
	},

	createNews: async (data) => {
		const formData = new FormData();

		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('status', data.status);

		if (data.cover && data.cover[0]) {
			formData.append('cover', data.cover[0]);
		}

		if (data.attachment && data.attachment[0]) {
			formData.append('attachment', data.attachment[0]);
		}

		const response = await apiClient.post(baseURL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},

	getNewsById: async (id) => {
		const response = await apiClient.get(`${baseURL}/${id}`);
		return response.data;
	},

	updateNews: async (id, data) => {
		const formData = new FormData();

		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('status', data.status);

		if (data.cover && data.cover[0]) {
			formData.append('cover', data.cover[0]);
		}

		if (data.attachment && data.attachment[0]) {
			formData.append('attachment', data.attachment[0]);
		}

		const response = await apiClient.patch(`${baseURL}/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},

	deleteNews: async (id) => {
		const response = await apiClient.delete(`${baseURL}/${id}`);
		return response.data;
	},
};
