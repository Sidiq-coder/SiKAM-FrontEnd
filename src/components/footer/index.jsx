const Footer = () => {
	return (
		<div className="flex flex-wrap gap-x-[100px] gap-y-20">
			<div>
				<div className="flex flex-wrap items-center space-x-2 mb-4">
					<img className="w-8" src="/images/bem.png" alt="logo-bem" />
					<span className="text-xl font-bold">SIKAM</span>
				</div>
			</div>
			<div>
				<h4 className="font-semibold mb-6">Layanan</h4>
				<ul className="space-y-4 text-sm">
					<li>
						<a href="#" className="text-[#F9F9F9] hover:text-yellow-300 transition-colors">
							Laporan
						</a>
					</li>
					<li>
						<a href="#" className="text-[#F9F9F9] hover:text-yellow-300 transition-colors">
							Banding UKT
						</a>
					</li>
					<li>
						<a href="#" className="text-[#F9F9F9] hover:text-yellow-300 transition-colors">
							Riwayat
						</a>
					</li>
				</ul>
			</div>
			<div>
				<h4 className="font-semibold mb-6">Tentang</h4>
				<ul className="space-y-2 text-sm">
					<li>
						<a href="#" className="text-[#F9F9F9] hover:text-yellow-300 transition-colors">
							SIKAM
						</a>
					</li>
					<li>
						<a href="#" className="text-[#F9F9F9] hover:text-yellow-300 transition-colors">
							Panduan
						</a>
					</li>
				</ul>
			</div>
			<div>
				<h4 className="font-semibold mb-6">Kontak</h4>
			</div>
		</div>
	);
};

export default Footer;
