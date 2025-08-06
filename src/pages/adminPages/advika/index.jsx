import { useCallback, useEffect, useState } from 'react';
import { FilterIcon, Search } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDownload, faFile } from '@fortawesome/free-solid-svg-icons';
import useSearchHandler from '@/hooks/useSearchHandler';
import useNewsStore from '@/stores/useNewsStore';
import Button from '@/components/button';
import FilterButton from '@/components/filter-button';
import Pagination from '@/components/pagination';
import InputField from '@/components/input-field';
import FilterModal from './components/FilterModal';

// Constants
const ITEMS_PER_PAGE = 10;

const FILTER_OPTIONS = {
	TERBARU: 'Terbaru',
	TERLAMA: 'Terlama',
};

const SORT_MAP = {
	[FILTER_OPTIONS.TERBARU]: 'newest',
	[FILTER_OPTIONS.TERLAMA]: 'oldest',
};

export default function AdminAdvika() {
	const { getAdminNews, news, pagination } = useNewsStore();

	const [selectedFilter, setSelectedFilter] = useState('Terbaru');
	const [searchQuery, setSearchQuery] = useState('');
	const [status, setStatus] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [filterModal, setFilterModal] = useState(false);

	const handleSearch = useSearchHandler(setSearchQuery);

	const handleStatusClick = useCallback((statusValue) => {
		setStatus((prev) => (prev === statusValue ? null : statusValue));
	}, []);

	const handlePageChange = useCallback(
		(newPage) => {
			const query = {
				page: newPage,
				itemPerPage: ITEMS_PER_PAGE,
			};

			// Add sort parameter
			const sortValue = SORT_MAP[selectedFilter];
			if (sortValue) {
				query.sort = sortValue;
			}

			if (searchQuery) query.search = searchQuery;
			if (status) query.status = status;

			getAdminNews(query);
			setCurrentPage(newPage);
		},
		[selectedFilter, searchQuery, status]
	);

	useEffect(() => {
		const query = {
			page: 1,
			itemPerPage: ITEMS_PER_PAGE,
		};

		// Add sort parameter
		const sortValue = SORT_MAP[selectedFilter];
		if (sortValue) {
			query.sort = sortValue;
		}

		if (searchQuery) query.search = searchQuery;
		if (status) query.status = status;

		getAdminNews(query);
		setCurrentPage(1);
	}, [selectedFilter, searchQuery, status]);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-18 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				<div className="flex-1 flex flex-col">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<h1 className="capitalize font-bold text-dark text-4xl">daftar berita</h1>

						<div className="flex flex-wrap items-center gap-4">
							<Button variant="warning" label="Filter" icon={<FilterIcon className="w-4 h-4" />} className="inline-flex lg:hidden" onClick={() => setFilterModal(true)} />

							<FilterButton options={Object.values(FILTER_OPTIONS)} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} className="hidden lg:flex" />

							<Button href={`/admin/buat-advika`} label="Buat Berita" icon={<FontAwesomeIcon icon={faPlus} />} />
						</div>
					</div>

					<div className="mt-4 lg:hidden lg:mt-0">
						<InputField placeholder="Cari berita" type="text" icon={Search} onChange={handleSearch} />
					</div>

					<div className="mt-6">
						<News />
					</div>

					{/* Pagination */}
					{news?.length > 0 && <Pagination className="my-8" currentPage={currentPage} totalPages={pagination.total_pages} onPageChange={handlePageChange} />}
				</div>

				<div className="w-80 flex flex-col gap-12">
					<div className="hidden lg:block">
						<InputField placeholder="Cari berita" type="text" icon={Search} onChange={handleSearch} />
					</div>

					<div className="hidden lg:block border-gray rounded-[8px] p-4 shadow">
						<div className="flex items-center w-full">
							<h1 className="font-bold text-2xl capitalize text-center">berdasarkan status</h1>
						</div>

						<div className="flex flex-col gap-4 mt-4">
							<Button
								label="Publish"
								className={`${status === 'published' ? 'bg-main-primary hover:bg-main-primary' : 'bg-yellow hover:bg-yellow'} text-xs text-white h-8 flex justify-start items-center w-26`}
								icon={<FontAwesomeIcon icon={faDownload} flip="vertical" />}
								onClick={() => handleStatusClick('published')}
							/>

							<Button
								label="Draft"
								className={`${status === 'draft' ? 'bg-main-primary hover:bg-main-primary' : 'bg-yellow hover:bg-yellow'} text-xs text-white h-8 flex justify-start items-center w-26`}
								icon={<FontAwesomeIcon icon={faFile} />}
								onClick={() => handleStatusClick('draft')}
							/>
						</div>
					</div>
				</div>
			</div>

			<FilterModal
				openModal={filterModal}
				closeModal={() => setFilterModal(false)}
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				activeStatus={status}
				handleStatusClick={handleStatusClick}
			/>
		</div>
	);
}

const News = () => {
	const { news } = useNewsStore();

	return (
		<>
			{news.map((item, index) => (
				<div key={`${item.id}-${index}`} className="flex flex-col lg:flex-row items-start gap-4 p-4 rounded-xl cursor-pointer mb-3">
					{/* Image Section */}
					<div className="w-full lg:w-[260px] h-[180px] rounded-lg overflow-hidden flex-shrink-0 block">
						<img src="/images/img-placeholder.png" alt={item.title} className="w-full h-full object-cover" />
					</div>

					{/* Text Content Section */}
					<div className="flex flex-col justify-between w-full">
						<div>
							<h3 className="text-xl font-bold text-dark mb-2">{item.title}</h3>
							<p className="text-sm text-gray-600 line-clamp-3">{item.description}</p> <span className="text-black text-sm">(Click to see more)</span>
						</div>
						<p className="text-sm text-gray-500">
							<span>{new Date(item.created_at).toLocaleDateString()}</span>
						</p>
						<div className="flex items-center gap-1">
							<FontAwesomeIcon icon={item.status === 'published' ? faDownload : faFile} flip={item.status === 'published' ? 'vertical' : undefined} className="text-main-primary" />
							<span className="capitalize">{item.status}</span>
						</div>
					</div>
				</div>
			))}
		</>
	);
};
