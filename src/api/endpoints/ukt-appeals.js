import apiClient from '@/api/client';

const baseURL = '/ukt-appeals';

export const uktAppealsAPI = {
	getUktAppeals: async () => {
		const response = await apiClient.get(baseURL);
		return response.data;
	},

	createUktAppeal: async (data) => {
		const formData = new FormData();

		formData.append('semester', data.semester);
		formData.append('problem', data.problem);

		if (data.ktm && data.ktm[0]) {
			formData.append('ktm', data.ktm[0]);
		}

		if (data.ukt_proof && data.ukt_proof[0]) {
			formData.append('ukt_proof', data.ukt_proof[0]);
		}

		if (data.transcript && data.transcript[0]) {
			formData.append('transcript', data.transcript[0]);
		}

		if (data.sk && data.sk[0]) {
			formData.append('sk', data.sk[0]);
		}

		const response = await apiClient.post(baseURL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},

	getMyUktAppeals: async () => {
		const response = await apiClient.get(`${baseURL}/me`);
		return response.data;
	},

	getUktAppeal: async (id) => {
		const response = await apiClient.get(`${baseURL}/${id}`);
		return response.data;
	},

	updateUktAppeal: async (id, data) => {
		const formData = new FormData();

		formData.append('semester', data.semester);
		formData.append('problem', data.problem);

		if (data.ktm && data.ktm[0]) {
			formData.append('ktm', data.ktm[0]);
		}

		if (data.ukt_proof && data.ukt_proof[0]) {
			formData.append('ukt_proof', data.ukt_proof[0]);
		}

		if (data.transcript && data.transcript[0]) {
			formData.append('transcript', data.transcript[0]);
		}

		if (data.sk && data.sk[0]) {
			formData.append('sk', data.sk[0]);
		}

		const response = await apiClient.patch(`${baseURL}/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},

	deleteUktAppeal: async (id) => {
		const response = await apiClient.delete(`${baseURL}/${id}`);
		return response.data;
	},
};
