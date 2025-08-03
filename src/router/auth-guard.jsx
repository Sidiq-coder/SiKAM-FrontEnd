import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import AuthModal from '@/components/auth-modal';
import { studentsStatus } from '@/utils/users';

const AuthGuard = () => {
	const location = useLocation();
	const { token, user } = useAuth();

	if (location.pathname === '/aju-laporan' && user?.status !== studentsStatus.VERIFIED) {
		return <Navigate to="/laporan" replace />;
	}

	return (
		<>
			<Outlet />
			{!token && <AuthModal isOpen={true} />}
		</>
	);
};

export default AuthGuard;
