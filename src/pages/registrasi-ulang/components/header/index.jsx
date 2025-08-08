import { ChevronLeft } from 'lucide-react';

const Header = () => {
	return (
		<div className="mb-8">
			<div className="flex items-center gap-x-3 text-dark mb-2">
				<a href="/profil">
					<ChevronLeft className="w-9 h-9" />
				</a>
				<h1 className="text-[26px] font-semibold">Registrasi Ulang</h1>
			</div>
			<p className="text-[#909090] text-sm">Data yang Anda kirim sebelumnya tidak dapat diverifikasi. Silakan perbarui informasi berikut untuk diproses kembali oleh admin.</p>
		</div>
	);
};

export default Header;
