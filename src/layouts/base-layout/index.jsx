import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { setPageTitle } from '@/utils/titleManager';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import useAuth from '@/hooks/useAuth';
import useNotificationStore from '@/stores/useNotificationStore';
import NotificationModal from '@/components/notification-modal';

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

const BaseLayout = () => {
	const location = useLocation();
	const { initializeAuth } = useAuth();
	const { isOpenModal, setOpenModal } = useNotificationStore();

	const bgPatternPaths = ['/', '/aju-laporan', '/banding-ukt'];
	const dynamicPatterns = [/^\/laporan\/\d+\/ubah$/, /^\/banding-ukt\/(\d+)$/, /^\/admin\/banding-ukt\/(\d+)$/];

	const isBgPattern = bgPatternPaths.includes(location.pathname) || dynamicPatterns.some((regex) => regex.test(location.pathname));

	const containerClass = 'container mx-auto max-w-full';
	const paddingX = 'px-4 md:px-10';

	useEffect(() => {
		initializeAuth();
	}, [location.pathname, localStorage.getItem('token')]);

	useEffect(() => {
		setPageTitle(location.pathname);
	}, [location.pathname]);

	return (
		<>
			<ScrollToTop />

			<div className={`min-h-screen w-full ${isBgPattern ? "bg-[url('/images/top-blue-bg.png')] bg-cover bg-center bg-no-repeat text-white" : 'bg-white'}`}>
				{/* Navbar */}
				<div className={isBgPattern ? 'bg-transparent' : 'bg-main-primary'}>
					<div className={`${containerClass} ${paddingX}`}>
						<Navbar />
					</div>
				</div>

				{/* Main Content */}
				<section className="min-h-screen">
					<Outlet />
				</section>

				{/* Footer */}
				<div className={`${isBgPattern ? 'bg-transparent' : 'bg-main-primary'} text-white pt-12 pb-[140px]`}>
					<div className={`${containerClass} lg:px-20 ${paddingX}`}>
						<Footer />
					</div>
				</div>

				<div className="bg-[#01428E] text-white py-2">
					<div className={`${containerClass} lg:px-20 ${paddingX}`}>
						<p>&copy; 2025 Badan Eksekutif Mahasiswa, Universitas Lampung.</p>
					</div>
				</div>

				<NotificationModal isOpen={isOpenModal} closeModal={() => setOpenModal(false)} />
			</div>
		</>
	);
};

export default BaseLayout;
