import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const InfoCard = ({ title1, title2, description, linkLabel, linkHref, position = 'left' }) => {
	if (position === 'right') {
		return (
			<div className="flex justify-end">
				<div className="flex-1 relative bg-[#ED9E31] rounded-2xl shadow-lg max-w-3xl h-[380px] my-10 px-4 pt-4 flex items-center lg:mr-20 overflow-hidden">
					<img src="/images/pattern1-1.png" alt="pattern1-1" className="w-[280px] absolute bottom-0 left-0" />

					<img src="/images/pattern1-2.png" alt="pattern1-2" className="w-[280px] absolute top-0 right-0" />

					<img src="/images/artboard-2.png" alt="Artboard" className="w-[250px] max-w-[250px] md:w-[320px] md:max-w-[320px] absolute bottom-0 right-0 z-2" />

					<div className="flex flex-col gap-4 max-w-xs md:max-w-md z-4 mr-2 sm:ml-10">
						<div className="flex flex-col text-2xl md:text-4xl font-extrabold gap-y-2">
							<span>{title1}</span>
							<span>{title2}</span>
						</div>

						<p className="text-sm md:text-md">{description}</p>

						<Link to={linkHref} className="bg-[#0E50A0] text-white px-6 md:px-9 py-2.5 md:py-3 rounded-lg font-medium flex items-center space-x-2 cursor-pointer mt-4 self-start text-sm md:text-base">
							<span>{linkLabel}</span>
							<FontAwesomeIcon icon={faBullhorn} size="lg" />
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="relative bg-[#ED9E31] rounded-2xl shadow-lg max-w-3xl h-[380px] my-10 px-4 pt-4 flex items-center justify-end lg:ml-20 overflow-hidden">
			<img src="/images/pattern1-1.png" alt="pattern1-1" className="w-[280px] absolute bottom-0 left-0" />

			<img src="/images/pattern1-2.png" alt="pattern1-2" className="w-[280px] absolute top-0 right-0" />

			<img src="/images/artboard-1.png" alt="Artboard" className="w-[250px] max-w-[250px] md:w-[320px] md:max-w-[320px] absolute bottom-0 left-0 z-2" />

			<div className="flex flex-col gap-4 max-w-xs md:max-w-md z-4 mr-2 sm:mr-10">
				<div className="flex flex-col text-2xl md:text-4xl font-extrabold gap-y-2">
					<span>{title1}</span>
					<span>{title2}</span>
				</div>

				<p className="text-sm md:text-md">{description}</p>

				<Link to={linkHref} className="bg-[#0E50A0] text-white px-6 md:px-9 py-2.5 md:py-3 rounded-lg font-medium flex items-center space-x-2 cursor-pointer mt-4 self-end text-sm md:text-base">
					<span>{linkLabel}</span>
					<FontAwesomeIcon icon={faBullhorn} size="lg" />
				</Link>
			</div>
		</div>
	);
};

export default InfoCard;
