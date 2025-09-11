import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import NewsSlider from '@/components/news-slider';
import { Link } from 'react-router-dom';
import useNewsStore from '@/stores/useNewsStore';
import { useEffect } from 'react';

const HeroSection = () => {
	const { getNews, news } = useNewsStore();

	useEffect(() => {
		getNews({ itemPerPage: 3 });
	}, []);

	return (
		<div className="flex flex-col gap-12 items-center md:px-10 lg:px-20 px-4 pb-[120px]">
			<div className="text-center">
				<h1 className="text-4xl lg:text-5xl font-bold mx-auto mb-7">
					SISTEM KLINIK <span className="text-yellow">ADVOKASI</span> MAHASISWA
				</h1>
				<p className="text-md lg:text-lg mb-8 opacity-90 italic mx-auto max-w-[75ch]">Platform bagi mahasiswa untuk menyampaikan aspirasi dan mengajukan laporan terkait dengan lingkungan kampus</p>
				<Link
					to="/aju-laporan"
					className="bg-transparent text-white border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center space-x-2 cursor-pointer mx-auto"
				>
					<span>Ajukan Laporan</span>
					<FontAwesomeIcon icon={faBullhorn} size="lg" />
				</Link>
			</div>
			<div className="relative">
				<div className="bg-white/10 backdrop-blur rounded-xl">
					<NewsSlider 
						contents={
							news && news.length && news
								.map(n => {
									return {
										newsId: n.id,
										title: n.title,
										desc: n.description,
										image: n.cover_url || '/images/example-image.png'
									}
								})
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
