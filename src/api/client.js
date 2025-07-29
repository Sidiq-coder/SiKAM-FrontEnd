import axios from 'axios';

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const requestUrl = error.config?.url;

		// Cek status 401 dan pastikan bukan dari endpoint /login
		if (error.response?.status === 401 && !requestUrl.includes('/login')) {
			localStorage.removeItem('token');
			window.location.href = '/login';
		}

		return Promise.reject(error);
	}
);

export default apiClient;
