import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useLocation } from 'react-router-dom';

const BaseLayout = ({ children }) => {
	const location = useLocation();

	const bgPatternPaths = ['/', '/aju-laporan', '/ubah-laporan'];
	const isBgPattern = bgPatternPaths.includes(location.pathname);

	const containerClass = 'container mx-auto max-w-full';
	const paddingX = 'px-4 md:px-10';

	return (
		<div className={`min-h-screen w-full ${isBgPattern ? "bg-[url('/images/top-blue-bg.png')] bg-cover bg-center bg-no-repeat text-white" : 'bg-white'}`}>
			{/* Navbar */}
			<div className={isBgPattern ? 'bg-transparent' : 'bg-primary'}>
				<div className={`${containerClass} ${paddingX}`}>
					<Navbar />
				</div>
			</div>

			{/* Main Content */}
			<section>{children}</section>

			{/* Footer */}
			<div className={`${isBgPattern ? 'bg-transparent' : 'bg-primary'} text-white pt-12 pb-[140px]`}>
				<div className={`${containerClass} lg:px-20 ${paddingX}`}>
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default BaseLayout;
