import { Megaphone } from 'lucide-react';

const Home = () => {
	return (
		<div className="grid lg:grid-cols-2 gap-12 items-center">
			<div>
				<h1 className="text-4xl lg:text-5xl font-bold mb-6">
					SISTEM KLINIK <span className="text-yellow-400">ADVOKASI</span>
					<br />
					MAHASISWA
				</h1>
				<p className="text-lg mb-8 opacity-90 italic">Platform bagi mahasiswa untuk menyampaikan aspirasi dan mengajukan laporan terkait dengan lingkungan kampus</p>
				<button className="bg-transparent text-white border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2 cursor-pointer">
					<span>Ajukan Laporan</span>
					<Megaphone size={20} />
				</button>
			</div>
			<div className="relative">
				<div className="bg-white/10 backdrop-blur rounded-xl">
					<img src="/images/example-image.png" alt="example-image" className="rounded-lg w-full object-cover" />
					<div className="absolute inset-0 rounded-lg flex flex-col items-center justify-end px-4 py-10">
						<h3 className="text-white font-bold text-xl">EXAMPLE SLIDER FOR NEWS</h3>
						<div className="mt-4">
							<p className="text-sm opacity-80 leading-relaxed">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
								cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
