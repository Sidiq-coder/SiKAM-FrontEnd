import apiClient from '@/api/client';

const baseURL = '/ukt-appeals';
const adminUktURL = '/admin/ukt';

export const uktAppealsAPI = {
	getUktAppeals: async () => {
		const response = await apiClient.get(baseURL);
		return response.data;
	},

	createUktAppeal: async (data) => {
		const formData = new FormData();

		formData.append('semester', data.semester);
		formData.append('problem', data.problem);

		if (data.ktm) {
			formData.append('ktm', data.ktm);
		}

		if (data.ukt_proof) {
			formData.append('ukt_proof', data.ukt_proof);
		}

		if (data.transcript) {
			formData.append('transcript', data.transcript);
		}

		if (data.sk) {
			formData.append('sk', data.sk);
		}

		const response = await apiClient.post(baseURL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},

	getMyUktAppeals: async ({ page, itemPerPage }) => {
		const response = await apiClient.get(`${baseURL}/me`, { params: { page, itemPerPage } });
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

		if (data.ktm) {
			formData.append('ktm', data.ktm);
		}

		if (data.ukt_proof) {
			formData.append('ukt_proof', data.ukt_proof);
		}

		if (data.transcript) {
			formData.append('transcript', data.transcript);
		}

		if (data.sk) {
			formData.append('sk', data.sk);
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

	getAdminUktAppeals: async ({ page, itemPerPage, sort, status, problem, search, studentId }) => {
		const response = await apiClient.get(`${adminUktURL}/appeals`, { params: { page, itemPerPage, sort, status, problem, search, studentId } });
		return response.data;
	},

	getStatusUktAppeal: async () => {
		const response = await apiClient.get(`${baseURL}/status`);
		return response.data;
	},

	toggleStatusUktAppeal: async () => {
		const response = await apiClient.post(`${adminUktURL}/status`);
		return response.data;
	},

	getAdminUktAppeal: async (id) => {
		const response = await apiClient.get(`${adminUktURL}/appeals/${id}`);
		return response.data;
	},

	updateAppealStatus: async ({ id, status, admin_note }) => {
		const response = await apiClient.patch(`${adminUktURL}/appeals/status`, { id, status, admin_note });
		return response.data;
	},

	deleteAdminUktAppeal: async (id) => {
		const response = await apiClient.delete(`${adminUktURL}/appeals/${id}`);
		return response.data;
	},

	getAppealStatusList: async ({ take }) => {
		const response = await apiClient.get(`${adminUktURL}/status-list`, { params: { take } });
		return response.data;
	},
};
