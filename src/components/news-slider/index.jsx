import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { truncateText } from '@/utils/truncateText';

const NewsSlider = ({ contents = [] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % contents.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [contents.length]);

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? contents.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev + 1) % contents.length);
	};

	const goToSlide = (index) => {
		setCurrentIndex(index);
	};

	return (
		contents.length ? <a href={`/advika/${contents[currentIndex].newsId}`}>
			<div className="relative w-full max-h-120 max-w-4xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl">
				<div className="relative overflow-hidden">
					<div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
						{contents.map((c, index) => (
							<div
								key={index} 
								className="min-w-full flex justify-center items-center cursor-pointer max-h-120" 
							>
								<img 
									src={c.image} 
									alt={`Slide ${index + 1}`} 
									className="w-full h-full mx-auto object-cover"
									loading={index === currentIndex ? 'eager' : 'lazy'} 
								/>
							</div>
						))}
					</div>

					<button
						onClick={e => {
							e.stopPropagation();
							e.preventDefault();
							goToPrevious();
						}}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
						aria-label="Previous image"
					>
						<FontAwesomeIcon icon={faChevronLeft} size={24} />
					</button>

					<button
						onClick={ e => {
							e.stopPropagation();
							e.preventDefault();
							goToNext();
						}}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
						aria-label="Next image"
					>
						<FontAwesomeIcon icon={faChevronRight} size={24} />
					</button>

					<div className="flex flex-col bottom-0 left-0 right-0 absolute">
						<div className="rounded-lg flex flex-col gap-4 items-center justify-end px-4 pb-0 md:pb-8">
							<h3 className="text-white font-bold text-lg lg:text-xl">{contents.length && truncateText(contents[currentIndex].title, 20)}</h3>
							<div>
								<p className="text-xs lg:text-sm opacity-80 leading-relaxed hidden md:block">
									{contents.length && truncateText(contents[currentIndex].desc, 150)}
								</p>
								<p className="text-xs lg:text-sm opacity-80 leading-relaxed md:hidden">
									{contents.length && truncateText(contents[currentIndex].desc, 150)}
								</p>
							</div>
						</div>
						<div className="flex justify-center space-x-3 py-6">
							{contents.map((_, index) => (
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
		</a> : <></>
	);
};

export default NewsSlider;
