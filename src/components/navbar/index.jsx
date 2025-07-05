import { useUser } from '@/hooks/useUser';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
	const location = useLocation();
	const { user, logout } = useUser();

	return (
		<header className="text-white py-6">
			<div className="flex items-center justify-between">
				<Link to="/" className="flex items-center space-x-2">
					<img className="w-8" src="/images/logo-unila.png" alt="logo-unila" />
					<span className="text-yellow-400 text-xl font-bold">SIKAM</span>
				</Link>
				<nav className="hidden md:flex items-center space-x-12">
					<Link to="/laporan" className={`hover:text-[#ED9E31] transition-colors ${location.pathname === '/laporan' ? 'text-[#ED9E31]' : ''}`}>
						Laporan
					</Link>
					<Link to="/bandingukt" className="hover:text-[#ED9E31] transition-colors">
						Banding UKT
					</Link>
					<Link to="/" className="hover:text-[#ED9E31] transition-colors">
						Riwayat
					</Link>
					<Link to="/" className="hover:text-[#ED9E31] transition-colors">
						Tentang Sikam
					</Link>
				</nav>
				<div className="flex items-center space-x-4">
					{user ? (
						<div className="flex items-center space-x-3">
							<span className="text-sm">Hi, {user.name}</span>
							<button
								onClick={() => {
									logout();
									toast.success('Berhasil keluar');
								}}
								className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition-colors"
							>
								Logout
							</button>
						</div>
					) : (
						<>
							<Link to="/login" className="bg-white text-blue-600 px-6 py-3 rounded-lg">
								Masuk
							</Link>
							<Link to="/register" className="bg-transparent border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
								Daftar
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
