import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

const AdminGuard = () => {
	const { user } = useUser();
	const location = useLocation();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (user.userType !== 'admin') {
		return <Navigate to="/" replace />;
	}

	if (location.pathname === '/admin') {
		return <Navigate to="/admin/laporan" replace />;
	}

	return <Outlet />;
};

export default AdminGuard;
