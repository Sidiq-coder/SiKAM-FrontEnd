import Navbar from '@/components/navbar';
import ProcessSteps from '@/components/process-steps';
import Footer from '@/components/footer';
import { useLocation } from 'react-router-dom';

const BaseLayout = ({ children }) => {
	const location = useLocation();

	const containerClass = 'container mx-auto max-w-full';

	const pathPattern = ['/', '/aju-laporan'];

	const isBgPattern = pathPattern.includes(location.pathname);

	return (
		<div className={`${isBgPattern ? "bg-[url('/images/top-blue-bg.png')] bg-cover bg-center bg-no-repeat text-white" : 'bg-white'} min-h-screen w-full`}>
			<div className={`${isBgPattern ? 'bg-transparent' : 'bg-primary'}`}>
				<div className={`${containerClass} md:px-10 lg:px-20 px-4`}>
					{/* Navbar */}
					<Navbar />
				</div>
			</div>
			{location.pathname === '/' ? (
				<>
					{/* Main Section */}
					<section>{children}</section>
				</>
			) : null}

			{location.pathname !== '/' ? (
				<>
					{/* Main Section */}
					<section>{children}</section>
				</>
			) : null}

			{/* Footer */}
			<div className={`${isBgPattern ? 'bg-transparent' : 'bg-primary'} text-white pt-12 pb-[140px]`}>
				<div className={`${containerClass} md:px-10 lg:px-20 px-4`}>
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default BaseLayout;
