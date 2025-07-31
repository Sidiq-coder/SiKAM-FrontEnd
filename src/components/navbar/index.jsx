import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, HelpCircle, Menu, User, X } from 'lucide-react';
import NavLink from '../nav-link';
import NavLogo from '../nav-logo';
import IconButton from '../icon-button';
import useAuth from '@/hooks/useAuth';
import { create } from 'zustand';
import useProfilStore from '@/stores/useProfilStore';
import useNotificationStore from '@/stores/useNotificationStore';

const navLinks = {
	student: [
		{ label: 'Laporan', href: '/laporan' },
		{ label: 'Banding UKT', href: '/banding-ukt' },
		{ label: 'Advika', href: '/advika' },
		{ label: 'Tentang Sikam', href: '/tentang' },
	],
	superadmin: [
		{ label: 'Laporan', href: '/admin/laporan' },
		{ label: 'Banding UKT', href: '/admin/banding-ukt' },
		{ label: 'Advika', href: '/admin/advika' },
		{ label: 'Kelola Akun', href: '/admin/kelola-akun' },
	],
};

const useNavbarStore = create((set) => ({
	isMenuOpen: false,

	setMenuOpen: (isMenuOpen) => {
		set({ isMenuOpen });
	},
}));

const NavbarAuthButtons = () => {
	return (
		<>
			{/* Desktop View */}
			<div className="hidden lg:flex items-center space-x-4">
				<Link to="/login" className="bg-white text-primary px-6 py-3 rounded-lg">
					Masuk
				</Link>
				<Link to="/register" className="bg-transparent border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors">
					Daftar
				</Link>
			</div>

			{/* Mobile View */}
			<div className="flex flex-col lg:hidden space-y-1">
				<Link to="/login" className="bg-white text-primary px-2 py-1 rounded text-center">
					Masuk
				</Link>
				<Link to="/register" className="bg-primary text-white px-2 py-1 rounded text-center hover:bg-dark-primary transition-colors">
					Daftar
				</Link>
			</div>
		</>
	);
};

const NavbarActions = () => {
	const navigate = useNavigate();
	const iconStyle = 'w-6 h-6 text-white lg:text-primary';
	const { setMenuOpen } = useNavbarStore();
	const { setProfilMenu } = useProfilStore();
	const { setOpenModal } = useNotificationStore();
	const { user } = useAuth();

	return (
		<>
			<IconButton
				bgColor="bg-primary lg:bg-white"
				onClick={() => {
					setMenuOpen(false);
					navigate('/');
					setTimeout(() => {
						window.location.hash = '#faq';
					}, 500);
				}}
			>
				<HelpCircle className={iconStyle} />
			</IconButton>
			<IconButton
				bgColor="bg-primary lg:bg-white"
				onClick={() => {
					setMenuOpen(false);
					setOpenModal(true);
				}}
			>
				<Bell className={iconStyle} />
			</IconButton>
			<IconButton
				bgColor="bg-primary lg:bg-white"
				rounded="rounded-full"
				onClick={() => {
					setMenuOpen(false);
					setProfilMenu('profil');
					if (user?.role !== 'superadmin') {
						navigate('/profil');
					} else {
						navigate('/admin/profil');
					}
				}}
			>
				<User className={iconStyle} />
			</IconButton>
		</>
	);
};

const Navbar = () => {
	const { user } = useAuth();
	const location = useLocation();
	const { isMenuOpen, setMenuOpen } = useNavbarStore();
	const isAdminPath = location.pathname.includes('/admin');
	const userType = isAdminPath && user?.role === 'superadmin' ? 'superadmin' : 'student';
	const links = navLinks[userType];

	return (
		<header className="text-white py-6 relative z-50">
			<div className="flex items-center justify-between">
				<NavLogo />

				{/* Desktop Menu */}
				<nav className="hidden lg:flex items-center gap-x-12">
					{links.map((link) => (
						<NavLink key={link.href} href={link.href}>
							{link.label}
						</NavLink>
					))}
				</nav>

				{/* Auth Buttons Desktop */}
				<div className="hidden lg:flex items-center space-x-4">{user ? <NavbarActions /> : <NavbarAuthButtons />}</div>

				{/* Mobile Menu Button */}
				<button className="lg:hidden text-white focus:outline-none cursor-pointer" onClick={() => setMenuOpen(!isMenuOpen)}>
					{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* Mobile Dropdown Menu */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-50 bg-white p-6 flex flex-col space-y-2 slide-left">
					<div className="flex items-center justify-between mb-6">
						{/* Nav Logo */}
						<NavLogo textColorAdmin="text-yellow" textColor="text-yellow" />

						{/* Close Button */}
						<button className="self-end text-primary text-5xl cursor-pointer" onClick={() => setMenuOpen(false)}>
							&times;
						</button>
					</div>

					{/* Nav Links */}
					{links.map((link) => (
						<Link key={link.href} to={link.href} className="text-primary text-lg font-medium hover:text-yellow transition-colors" onClick={() => setMenuOpen(false)}>
							{link.label}
						</Link>
					))}

					{/* Auth Section */}
					<div className="flex flex-col items-start space-y-3 mt-10">
						{user ? (
							<div className="flex flex-wrap gap-4">
								<NavbarActions />
							</div>
						) : (
							<NavbarAuthButtons />
						)}
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
