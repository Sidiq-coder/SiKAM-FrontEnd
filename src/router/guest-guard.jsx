import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { userRole } from '@/utils/users';

const GuestGuard = () => {
	const { user } = useAuth();

	if (user && (user.role === userRole.SUPERADMIN || user.role === userRole.ADMIN)) {
		return <Navigate to="/admin" replace />;
	}

	if (user && user.role !== userRole.SUPERADMIN && user.role !== userRole.ADMIN) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default GuestGuard;
