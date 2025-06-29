import ProcessSteps from '@/components/process-steps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn} from '@fortawesome/free-solid-svg-icons';
import ImageSlider from '../../components/image-slider';
import { useState } from 'react';
const Home = () => {
	const sliderImages = [
	"/images/example-image.png",
	"/images/example-image.png",
	"/images/example-image.png"
	];

	return (
		<div>
			<div className="grid lg:grid-cols-2 gap-12 items-center md:px-10 lg:px-20 px-4 pb-[120px]">
			<div>
				<h1 className="text-4xl lg:text-5xl font-bold mb-6">
					SISTEM KLINIK <span className="text-yellow-400">ADVOKASI</span>
					<br />
					MAHASISWA
				</h1>
				<p className="text-lg mb-8 opacity-90 italic">Platform bagi mahasiswa untuk menyampaikan aspirasi dan mengajukan laporan terkait dengan lingkungan kampus</p>
				<button className="bg-transparent text-white border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2 cursor-pointer">
					<span>Ajukan Laporan</span>
					<FontAwesomeIcon icon={faBullhorn} size="lg" />
				</button>
			</div>
			<div className="relative">
				<div className="bg-white/10 backdrop-blur rounded-xl">
					<ImageSlider images={sliderImages} />
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
		<div>
			<MainContent/>
		</div>
	</div>
	);
};

export default Home;

const MainContent = () => {
	return (
	<div>
		{/* Content */}
		<div className={`bg-white px-32`}>
			<ProcessSteps />
			<div>
				<div
					id="laporan"
					className="bg-gradient-to-r to-[#ED9E31] from-[#875A1C] rounded-2xl shadow-xl/30 w-[95%] md:w-[94%] mx-auto my-10 px-4 pt	-8 flex flex-col md:flex-row items-center ml-0"
				>
					<img
						src="/images/Artboard 3 copy 1.png"
						alt="Artboard"
						className="w-40 md:w-60 max-w-[220px] md:max-w-[240px] mb-6 md:mb-0"
					/>
					<div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
						<h1 className="text-xl md:text-3xl lg:text-[25px] font-extrabold uppercase tracking-widest leading-tight">
							punya laporan yang ingin anda ajukan ?
						</h1>
						<h1 className="text-lg md:text-2xl font-medium capitalize">
							ajukan laporan ke <span className="uppercase">sikam</span> <br />sekarang!!
						</h1>
						<button className="bg-[#007BFF] text-white border-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2 cursor-pointer mt-2">
							<span>Ajukan Laporan</span>
							<FontAwesomeIcon icon={faBullhorn} size="lg" />
						</button>
					</div>
				</div>

				<div
					id="bandingukt"
					className="bg-gradient-to-r from-[#ED9E31] to-[#875A1C] rounded-2xl shadow-xl/30 w-[95%] md:w-[94%] mx-auto my-10 px-4 pt	-8 flex flex-col md:flex-row items-center ml-0"
				>
					<div className="flex-1 flex flex-col items-center md:items-end text-center md:text-left gap-4"> 
						<h1 className="text-xl md:text-3xl lg:text-[25px] font-extrabold uppercase tracking-widest leading-tight">
							ingin banding ukt kalian ?
						</h1>
						<h1 className="text-lg md:text-2xl font-medium capitalize text-end">
							ajukan banding ukt ke <span className="uppercase">sikam  <br />sekarang!!</span>
						</h1>
						<button className="bg-[#007BFF] text-white border-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2 cursor-pointer mt-2">
							<span>Ajukan Laporan</span>
							<FontAwesomeIcon icon={faBullhorn} size="lg" />
						</button>
					</div>
						<img
						src="/images/Artboard 3 copy 1.png"
						alt="Artboard"
						className="w-40 md:w-60 max-w-[220px] md:max-w-[240px] mb-6 md:mb-0 scale-x-[-1]"
					/>
				</div>
			</div>
		</div>
	</div>
	)
}