import Navbar from '@/components/navbar';
import ProcessSteps from '@/components/process-steps';
import Footer from '@/components/footer';

const BaseLayout = ({ children }) => {
	const containerClass = 'container mx-auto';

	return (
		<div className="min-h-screen w-full bg-white">
			<div className="bg-[url('/images/top-blue-bg.png')] bg-cover bg-center bg-no-repeat text-white">
				<div className={containerClass}>
					{/* Navbar */}
					<div className="bg-[#0B4D9B] md:px-10 lg:px-20 px-4">
						<Navbar />
					</div>
				</div>
				{/* Hero Section */}
				<section className="pb-[120px]">{children}</section>
			</div>

			{/* Footer */}
			<div className="bg-[#0B4D9B] text-white pt-12 pb-[140px]">
				<div className={`${containerClass} md:px-10 lg:px-20 px-4`}>
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default BaseLayout;
