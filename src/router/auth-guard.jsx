import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Modal } from '@/components/modal';
import Button from '@/components/button';
import { studentsStatus } from '@/utils/users';

const AuthGuard = () => {
	const location = useLocation();
	const { token, user } = useAuth();

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	if (location.pathname === '/aju-laporan' && user?.status !== studentsStatus.VERIFIED) {
		return <Navigate to="/laporan" replace />;
	}

	return <Outlet />;
};

export default AuthGuard;
