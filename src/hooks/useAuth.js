import { useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';

const useAuth = () => {
	const { user, token, isLoading, error, register, login, logout, clearError, initializeAuth } = useAuthStore();

	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);

	const isAuthenticated = !!token && !!user;

	return {
		user,
		token,
		isLoading,
		error,
		isAuthenticated,
		register,
		login,
		logout,
		clearError,
	};
};

export default useAuth;
