import axios from 'axios';

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001',
	timeout: 60000,
	headers: {
		'Content-Type': 'application/json',
		'ngrok-skip-browser-warning': 'true'
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
		const excludedPaths = ['/reset-password'];
		const requestUrl = error.config?.url;

		const isExcluded = excludedPaths.some((path) => requestUrl?.includes(path));

		if (error.response?.status === 401 && !isExcluded) {
			localStorage.removeItem('token');
		}

		return Promise.reject(error);
	}
);

export default apiClient;
