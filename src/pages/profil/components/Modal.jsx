import { Modal } from '@/components/modal';
import Button from '@/components/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

export const LogoutModal = ({ openModal, closeModal }) => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		const response = await logout();
		if (response?.data?.success) {
			toast.success(response?.data?.message);
			navigate('/login');
		}
	};

	return (
		<Modal isOpen={openModal} onClose={closeModal} size="md">
			<div className="flex flex-col items-center text-center md:pt-10">
				<img src="/images/right-from-bracket.png" alt="right-from-bracket.png" className="w-30" />
				<h2 className="text-2xl text-dark font-semibold mt-10">Keluar dari akun?</h2>
				<p className="text-[#6C757D] mt-2">Anda akan keluar dari sesi saat ini.</p>
			</div>
			<div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-10 pb-4">
				<Button variant="secondary" label="Batal" size="large" onClick={closeModal} />
				<Button variant="danger" label="Logout" size="large" onClick={handleLogout} />
			</div>
		</Modal>
	);
};
