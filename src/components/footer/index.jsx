const Footer = () => {
	return (
		<div className="flex gap-x-[100px]">
			<div>
				<div className="flex items-center space-x-2 mb-4">
					<img className="w-8" src="/images/logo-unila.png" alt="logo-unila" />
					<span className="text-xl font-bold">SIKAM</span>
				</div>
			</div>
			<div>
				<h4 className="font-semibold mb-4">Layanan</h4>
				<ul className="space-y-4 text-sm opacity-80">
					<li>
						<a href="#" className="hover:text-yellow-300 transition-colors">
							Laporan
						</a>
					</li>
					<li>
						<a href="#" className="hover:text-yellow-300 transition-colors">
							Banding UKT
						</a>
					</li>
					<li>
						<a href="#" className="hover:text-yellow-300 transition-colors">
							Riwayat
						</a>
					</li>
				</ul>
			</div>
			<div>
				<h4 className="font-semibold mb-4">Tentang</h4>
				<ul className="space-y-2 text-sm opacity-80">
					<li>
						<a href="#" className="hover:text-yellow-300 transition-colors">
							SIKAM
						</a>
					</li>
					<li>
						<a href="#" className="hover:text-yellow-300 transition-colors">
							Panduan
						</a>
					</li>
				</ul>
			</div>
			<div>
				<h4 className="font-semibold mb-4">Kontak</h4>
			</div>
		</div>
	);
};

export default Footer;
