import { useCallback, useEffect, useState } from 'react';
import useNewsStore from '@/stores/useNewsStore';
import Pagination from '@/components/pagination';

const ITEMS_PER_PAGE = 10;

export default function Advika() {
	const { getNews, news, pagination } = useNewsStore();

	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = useCallback((newPage) => {
		const query = {
			page: newPage,
			itemPerPage: ITEMS_PER_PAGE,
			sort: 'newest',
		};

		getNews(query);
		setCurrentPage(newPage);
	}, []);

	useEffect(() => {
		const query = {
			page: 1,
			itemPerPage: ITEMS_PER_PAGE,
			sort: 'newest',
		};

		getNews(query);
		setCurrentPage(1);
	}, []);

	return (
		<div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat px-10 md:px-20 lg:px-32 pb-1">
			{/* Title Section */}
			<div id="title" className="pt-[.1px]">
				<h2 className="uppercase font-bold text-2xl text-dark mb-2 mt-12">advika</h2>
				<h4 className="capitalize text-xl opacity-[60%]">advokasi informasi kampus</h4>
			</div>

			{/* Main News */}
			<MainNews />

			<div className="flex flex-col lg:flex-row gap-2">
				{/* New News */}
				<NewNews />

				{/* Trending News */}
				<TrendingNews />
			</div>

			{/* Pagination */}
			{news?.length > 0 && <Pagination className="my-8" currentPage={currentPage} totalPages={pagination.total_pages} onPageChange={handlePageChange} />}
		</div>
	);
}

const TrendingNews = () => {
	const { news } = useNewsStore();

	return (
		<div className="max-w-xs w-full">
			<div className="bg-yellow text-white px-[.5rem] text-[1.2rem] tracking-tighter rounded-[3px] hover:brightness-90 transition-all duration-500 ease-in-out mt-[2rem] mb-[1.6rem] cursor-pointer w-fit">
				<h1 className="uppercase">trending</h1>
			</div>
			<div className="flex flex-col gap-3">
				{news.map((item) => (
					<a href={`/advika/${item.id}`} key={item.id} className="flex items-center gap-3 rounded-lg p-2" style={{ minWidth: 0 }}>
						<img src="/images/img-placeholder.png" alt={item.title} className="w-14 h-14 object-cover rounded" />
						<div className="flex-1 min-w-0">
							<h3 className="text-xs font-bold text-dark truncate">{item.title}</h3>
							<p className="text-[.6rem] text-gray-500 truncate">{new Date(item.published_at).toLocaleDateString()}</p>
						</div>
					</a>
				))}
			</div>
		</div>
	);
};

const NewNews = () => {
	return (
		<div>
			<div className="bg-[#0B4D9B] text-white px-[.5rem] text-[1.2rem] tracking-tighter rounded-[3px] hover:opacity-80 transition-all duration-500 ease-in-out mt-[2rem] mb-[1.6rem] cursor-pointer w-fit">
				<h1 className="uppercase">berita terbaru</h1>
			</div>
			<Berita />
		</div>
	);
};

const Berita = () => {
	const { news } = useNewsStore();

	return (
		<div>
			{news.map((item, index) => (
				<a href={`/advika/${item.id}`} key={`${item.id}-${index}`} className="flex flex-col lg:flex-row items-start gap-4 p-4 rounded-xl cursor-pointer mb-3">
					{/* Image Section */}
					<div className="w-full lg:w-[260px] h-[180px] rounded-lg overflow-hidden flex-shrink-0 block">
						<img src="/images/img-placeholder.png" alt={item.title} className="w-full h-full object-cover" />
					</div>

					{/* Text Content Section */}
					<div className="flex flex-col justify-between w-full">
						<div>
							<h3 className="text-2xl font-bold text-dark mb-2">{item.title}</h3>
							<p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
						</div>
						<p className="text-sm text-gray-500">{new Date(item.published_at).toLocaleDateString()}</p>
					</div>
				</a>
			))}
		</div>
	);
};

const MainNews = () => {
	const { news } = useNewsStore();

	return (
		<div>
			<div className="flex flex-col lg:flex-row justify-between mt-6 gap-x-1">
				<div className="flex-1">
					{news.slice(0, 1).map((item) => (
						<a href={`/advika/${item.id}`} key={item.id} className="block">
							<div className="grid relative rounded-[.2rem] overflow-hidden w-full max-w-full hover:brightness-90 transition-all duration-500 ease-in-out mb-[4px] cursor-pointer">
								<img src="/images/img-placeholder.png" alt={item.title} className="w-full h-auto object-cover row-start-1 col-start-1" />

								<div className="row-start-1 col-start-1 self-end p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white">
									<h3 className="text-xl font-bold mb-2">{item.title}</h3>
									<p className="text-sm text-blue-300">
										{item.admins.name} - <span className="text-white">{new Date(item.published_at).toLocaleDateString()}</span>
									</p>
								</div>
							</div>
						</a>
					))}
				</div>

				<div>
					{news.slice(1, 4).map((item) => (
						<div key={item.id} className="grid relative rounded-[.2rem] overflow-hidden w-full max-w-full hover:brightness-90 transition-all duration-500 ease-in-out mb-[1px] cursor-pointer">
							<a href={`/advika/${item.id}`} className="w-full h-auto object-cover row-start-1 col-start-1 block">
								<img src="/images/img-placeholder.png" alt={item.title} />
							</a>
							<div className="row-start-1 col-start-1 self-end p-1 pr-[1.8rem] bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white">
								<h3 className="text-xs font-bold mb-2">{item.title}</h3>
								<p className="text-[.5rem] text-white">{new Date(item.published_at).toLocaleDateString()}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
