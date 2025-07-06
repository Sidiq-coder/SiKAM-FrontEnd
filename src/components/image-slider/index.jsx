import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';

const ImageSlider = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % images.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [images.length]);

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	const goToSlide = (index) => {
		setCurrentIndex(index);
	};

	return (
		<div className="relative w-full max-w-4xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl">
			<div className="relative overflow-hidden">
				<div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
					{images.map((image, index) => (
						<div key={index} className="min-w-full flex justify-center items-center  cursor-pointer">
							<img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-contain mx-auto" loading={index === currentIndex ? 'eager' : 'lazy'} />
						</div>
					))}
				</div>

				<button
					onClick={goToPrevious}
					className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
					aria-label="Previous image"
				>
					<FontAwesomeIcon icon={faChevronLeft} size={24} />
				</button>

				<button
					onClick={goToNext}
					className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
					aria-label="Next image"
				>
					<FontAwesomeIcon icon={faChevronRight} size={24} />
				</button>

				<div className="flex flex-col bottom-0 left-0 right-0 absolute">
					<div className="rounded-lg flex flex-col items-center justify-end px-4 pb-0 md:pb-8 lg:pb-12">
						<h3 className="text-white font-bold text-lg lg:text-xl">EXAMPLE SLIDER FOR NEWS</h3>
						<div className="mt-2 md:mt-6 lg:mt-12">
							<p className="text-xs lg:text-sm opacity-80 leading-relaxed hidden md:block">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
								cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
							<p className="text-xs lg:text-sm opacity-80 leading-relaxed md:hidden">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi laboriosam necessitatibus iure ullam! Voluptatum mollitia, quia ratione autem delectus optio.
							</p>
						</div>
					</div>
					<div className="flex justify-center space-x-3 py-6">
						{images.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125 shadow-lg' : 'bg-white/40 hover:bg-white/60'}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageSlider;
