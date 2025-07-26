import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const AdminGuard = () => {
	const { user } = useAuth();
	const location = useLocation();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (user.role !== 'superadmin') {
		return <Navigate to="/" replace />;
	}

	if (location.pathname === '/admin') {
		return <Navigate to="/admin/laporan" replace />;
	}

	return <Outlet />;
};

export default AdminGuard;
