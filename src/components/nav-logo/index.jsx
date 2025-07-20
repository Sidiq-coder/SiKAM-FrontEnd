import { Link, useLocation } from 'react-router-dom';

const NavLogo = () => {
	const location = useLocation();

	if (location.pathname.includes('admin')) {
		return (
			<Link to="/admin/laporan" className="flex items-center space-x-2">
				<img className="w-8" src="/images/bem.png" alt="logo-bem" />
				<span className="text-white italic text-3xl font-bold">ADMIN</span>
			</Link>
		);
	}

	return (
		<Link to="/" className="flex items-center space-x-2">
			<img className="w-8" src="/images/bem.png" alt="logo-bem" />
			<span className="text-white text-xl font-bold">SIKAM</span>
		</Link>
	);
};

export default NavLogo;
