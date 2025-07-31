import useAuthStore from '@/stores/useAuthStore';

const useAuth = () => {
	const { user, token, isLoading, error, register, login, logout, clearError, initializeAuth, verifyEmail, requestPasswordReset, verifyPasswordReset, resetPassword } = useAuthStore();

	return {
		user,
		token,
		isLoading,
		error,
		initializeAuth,
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
