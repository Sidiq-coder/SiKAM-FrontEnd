import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className="flex flex-wrap gap-x-[100px] gap-y-20">
			<Link to="/">
				<div className="flex flex-wrap items-center space-x-2 mb-4">
					<img className="w-8" src="/images/bem.png" alt="logo-bem" />
					<span className="text-2xl font-bold">SIKAM</span>
				</div>
			</Link>
			<div>
				<h4 className="font-semibold mb-6">Layanan</h4>
				<ul className="space-y-4 text-sm">
					<li>
						<Link to="/laporan" className="text-[#F9F9F9] hover:text-yellow-300 transition-colors">
							Laporan
						</Link>
					</li>
					<li>
						<Link to="/banding-ukt" className="text-[#F9F9F9] hover:text-yellow-300 transition-colors">
							Banding UKT
						</Link>
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
						<Link to="/tentang" className="text-[#F9F9F9] hover:text-yellow-300 transition-colors">
							SIKAM
						</Link>
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
