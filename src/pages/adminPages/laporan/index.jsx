import { useCallback, useEffect, useMemo, useState } from 'react';
import { FilterIcon, Search } from 'lucide-react';
import Hashtag from '@/components/hashtag';
import LaporanCard from '@/components/laporan-card';
import FilterButton from '@/components/filter-button';
import Tabs from '@/components/tabs';
import Pagination from '@/components/pagination';
import InputField from '@/components/input-field';
import Button from '@/components/button';
import useReportStore from '@/stores/useReportStore';
import { reportCategories } from '@/utils/reports';
import FilterModal from './components/filter-modal';
import useSearchHandler from '@/hooks/useSearchHandler';

const tabOptions = [
	{ label: 'Semua', value: 'semua' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Proses', value: 'responded' },
	{ label: 'Selesai', value: 'done' },
];

// Constants
const ITEMS_PER_PAGE = 10;

const FILTER_OPTIONS = {
	TERBARU: 'Terbaru',
	TERPOPULER: 'Terpopuler',
	TERLAMA: 'Terlama',
};

const SORT_MAP = {
	[FILTER_OPTIONS.TERBARU]: 'newest',
	[FILTER_OPTIONS.TERPOPULER]: 'popular',
	[FILTER_OPTIONS.TERLAMA]: 'oldest',
};

const AdminLaporanPage = () => {
	const { getAdminReports, reports, pagination } = useReportStore();

	const [activeTab, setActiveTab] = useState('semua');
	const [selectedFilter, setSelectedFilter] = useState('Terbaru');
	const [category, setCategory] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	const [filterModal, setFilterModal] = useState(false);

	const handleSearch = useSearchHandler(setSearchQuery);

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

			if (category) query.category = category;
			if (activeTab !== 'semua') query.status = activeTab;

			getAdminReports(query);
			setCurrentPage(newPage);
		},
		[selectedFilter, category, activeTab]
	);

	const categorizedReports = useMemo(() => {
		if (!reports)
			return reportCategories.map((cat) => ({
				...cat,
				quantity: 0,
			}));

		const categoryMap = reports.reduce((acc, report) => {
			const key = report.category;
			if (!key) return acc;

			if (acc[key]) {
				acc[key].quantity += 1;
			} else {
				acc[key] = {
					value: key,
					quantity: 1,
				};
			}
			return acc;
		}, {});

		return reportCategories.map((cat) => ({
			...cat,
			quantity: categoryMap[cat.value]?.quantity || 0,
		}));
	}, [reports]);

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

		// Add filters
		if (category) query.category = category;
		if (activeTab !== 'semua') query.status = activeTab;
		if (searchQuery) query.search = searchQuery;

		getAdminReports(query);
		setCurrentPage(1); // Reset to first page when filters change
	}, [activeTab, selectedFilter, category, searchQuery]);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-18 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<div className="flex flex-wrap items-center justify-between mb-6 gap-6">
						<h1 className="text-4xl font-bold text-dark">Daftar Laporan</h1>

						<div className="flex items-center flex-wrap lg:mb-4 lg:hidden gap-4">
							<Button variant="warning" label="Filter" icon={<FilterIcon className="w-4 h-4" />} onClick={() => setFilterModal(true)} />

							<InputField placeholder="Cari laporan" type="text" icon={Search} onChange={handleSearch} className="lg:hidden" />
						</div>

						<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} className="hidden lg:block" />
					</div>

					{/* Tabs */}
					<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} data={reports} className="mb-6" />

					{/* Reports List */}
					<div className="space-y-6">
						{reports.map((report) => (
							<div key={report.id}>
								<LaporanCard report={report} isVote={false} />
							</div>
						))}
					</div>

					{/* Pagination */}
					{reports.length === 0 ? null : <Pagination currentPage={currentPage} totalPages={pagination.total_pages} className="mt-8" onPageChange={handlePageChange} />}
				</div>

				<div className="w-80 space-y-6 hidden lg:block">
					<InputField placeholder="Cari laporan" type="text" icon={Search} onChange={handleSearch} />

					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="text-2xl font-bold text-dark mb-4">Kategori Terkait</h3>
						<div className="flex flex-col items-start space-y-4">
							{categorizedReports.length > 0 ? (
								<>
									{categorizedReports.map(({ label, value, quantity }) => (
										<Hashtag key={value} label={`#${label}`} quantity={quantity} onClick={() => setCategory(value)} className="cursor-pointer" />
									))}
								</>
							) : (
								<p className="text-sm text-gray italic">Belum ada kategori yang tersedia.</p>
							)}
						</div>
					</div>
				</div>

				<FilterModal
					openModal={filterModal}
					closeModal={() => setFilterModal(false)}
					selectedFilter={selectedFilter}
					setSelectedFilter={setSelectedFilter}
					categorizedReports={categorizedReports}
					setCategory={setCategory}
				/>
			</div>
		</div>
	);
};

export default AdminLaporanPage;
