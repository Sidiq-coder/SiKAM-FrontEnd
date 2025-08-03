import { Modal } from '@/components/modal';
import Button from '@/components/button';

const AuthModal = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="md">
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
};

export default AuthModal;
