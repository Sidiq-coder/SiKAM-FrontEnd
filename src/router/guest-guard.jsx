import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const GuestGuard = () => {
	const { user } = useAuth();

	if (user && user.role !== 'superadmin') {
		return <Navigate to="/" replace />;
	}

	if (user && user.role === 'superadmin') {
		return <Navigate to="/admin" replace />;
	}

	return <Outlet />;
};

export default GuestGuard;
