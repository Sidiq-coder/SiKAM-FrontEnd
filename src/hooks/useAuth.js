import { useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';

const useAuth = () => {
	const { user, token, isLoading, error, register, login, logout, clearError, initializeAuth, verifyEmail, requestPasswordReset, verifyPasswordReset, resetPassword } = useAuthStore();

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
		verifyEmail,
		requestPasswordReset,
		verifyPasswordReset,
		resetPassword,
	};
};

export default useAuth;
