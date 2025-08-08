import { Modal } from '@/components/modal';
import Button from '@/components/button';

const NotVerifiedModal = ({ isOpen, closeModal }) => {
	return (
		<Modal isOpen={isOpen} onClose={closeModal} size="md">
			<div className="flex flex-col items-center text-center md:py-20">
				<svg xmlns="http://www.w3.org/2000/svg" className="w-30 h-30 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
				<h2 className="text-2xl text-dark font-semibold mt-10">Verifikasi Akun Ditolak</h2>
				<p className="text-[#6C757D] mt-2">
					Mohon maaf, akun Anda tidak berhasil diverifikasi karena tidak memenuhi syarat yang ditentukan. Silakan lakukan proses <span className="font-medium text-dark">registrasi ulang</span> dengan
					memastikan data yang Anda isi sudah benar dan sesuai.
				</p>
			</div>
			<div className="flex justify-center items-center pt-10 md:pt-0">
				<Button variant="danger" label="Registrasi Ulang" href="/registrasi-ulang" size="large" />
			</div>
		</Modal>
	);
};

export default NotVerifiedModal;
