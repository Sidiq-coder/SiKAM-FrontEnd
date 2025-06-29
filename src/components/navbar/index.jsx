import { useUser } from '@/hooks/useUser';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
	const { user, logout } = useUser();

	return (
		<header className="bg-transparent text-white py-8">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<img className="w-8" src="/images/logo-unila.png" alt="logo-unila" />
					<span className="text-yellow-400 text-xl font-bold">SIKAM</span>
				</div>
				<nav className="hidden md:flex items-center space-x-12">
					<Link to="/" className="hover:text-yellow-300 transition-colors">
						Laporan
					</Link>
					<Link to="/" className="hover:text-yellow-300 transition-colors">
						Banding UKT
					</Link>
					<Link to="/" className="hover:text-yellow-300 transition-colors">
						Riwayat
					</Link>
					<Link to="/" className="hover:text-yellow-300 transition-colors">
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
