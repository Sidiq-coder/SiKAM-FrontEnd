import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { setPageTitle } from '@/utils/titleManager';
import useAuth from '@/hooks/useAuth';

const AuthLayout = () => {
	const location = useLocation();
	const { initializeAuth } = useAuth();

	useEffect(() => {
		initializeAuth();
	}, [location.pathname, localStorage.getItem('token')]);

	useEffect(() => {
		setPageTitle(location.pathname);
	}, [location.pathname]);

	return (
		<div className="min-h-screen bg-[url('/images/top-blue-bg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
			<Outlet />
		</div>
	);
};

export default AuthLayout;
