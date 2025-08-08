import { Modal } from '@/components/modal';
import { AtSign, Instagram } from 'lucide-react';

const WaitingModal = ({ isOpen, closeModal }) => {
	return (
		<Modal isOpen={isOpen} onClose={closeModal} size="md">
			<div className="flex flex-col items-center text-center md:py-20">
				<img src="/images/stopwatch.png" alt="stopwatch.png" className="w-30" />
				<h2 className="text-2xl text-dark font-semibold mt-10">Akun Anda belum diverifikasi. </h2>
				<p className="text-[#6C757D] mt-2">Silakan tunggu proses verifikasi dari admin untuk dapat membuat laporan.</p>
			</div>
			<div className="flex justify-center items-center gap-4 text-[#6C757D] pt-10 md:pt-0">
				<a href="https://www.instagram.com/gradienunila/" target="_blank">
					<Instagram className="w-7 h-7" />
				</a>
				<AtSign className="w-7 h-7" />
			</div>
		</Modal>
	);
};

export default WaitingModal;
