import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Modal } from '@/components/modal';
import Button from '@/components/button';
import { studentsStatus } from '@/utils/users';

const AuthGuard = () => {
	const location = useLocation();
	const { token, user } = useAuth();

	if (location.pathname === '/aju-laporan' && user?.status !== studentsStatus.VERIFIED) {
		return <Navigate to="/laporan" replace />;
	}

	if (!token) {
		return (
			<Modal isOpen={true} size="md">
				<div className="flex flex-col items-center text-center">
					<img src="/images/artboard-1-1.png" alt="artboard-1-1.png" className="w-60" />

					<h2 className="text-2xl text-dark font-semibold mt-4">Anda harus login terlebih dahulu untuk mengajukan laporan atau Banding UKT</h2>
				</div>
				<div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 py-10">
					<Button variant="primary" label="Masuk" href="/login" size="large" />
					<Button variant="outline" label="Daftar" href="/register" size="large" />
				</div>
			</Modal>
		);
	}

	return <Outlet />;
};

export default AuthGuard;
