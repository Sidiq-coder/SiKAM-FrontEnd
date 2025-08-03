import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterIcon } from 'lucide-react';

import Button from '@/components/button';
import Hashtag from '@/components/hashtag';
import StatusFilter from '@/components/status-filter';
import LaporanCard from '@/components/laporan-card';
import FilterButton from '@/components/filter-button';
import Tabs from '@/components/tabs';
import Pagination from '@/components/pagination';

import useAuth from '@/hooks/useAuth';
import useReportStore from '@/stores/useReportStore';
import useFilteredReports from '@/hooks/useFilteredReports';

import { reportStatuses, reportCategories } from '@/utils/reports';
import { studentsStatus } from '@/utils/users';

import NotVerifiedModal from './components/not-verified-modal';
import FilterModal from './components/filter-modal';
import AuthModal from '@/components/auth-modal';
import { toast } from 'react-toastify';

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

// Sub-components
const AjukanLaporanButton = ({ onClick, className = 'w-full' }) => (
	<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} onClick={onClick} className={className} />
);

const ReportList = ({ reports }) => {
	if (!reports?.length) {
		return <p className="text-center text-gray my-8">Belum ada laporan yang tersedia.</p>;
	}

	return (
		<div className="space-y-6">
			{reports.map((report) => (
				<LaporanCard key={report.id} report={report} />
			))}
		</div>
	);
};

const CategorySection = ({ totalPerCategory, onCategoryClick, activeCategory }) => (
	<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
		<h3 className="text-2xl font-bold text-dark mb-4">Kategori Terkait</h3>
		<div className="flex flex-col items-start space-y-4">
			{Object.values(totalPerCategory).some((qty) => qty > 0) ? (
				Object.entries(totalPerCategory).map(([key, quantity]) => {
					const category = reportCategories.find((c) => c.value === key);
					if (!category) return null; // kategori tidak dikenal

					return <Hashtag key={key} label={`#${category.label}`} quantity={quantity} onClick={() => onCategoryClick(key)} active={activeCategory === key} className="cursor-pointer" />;
				})
			) : (
				<p className="text-sm text-gray italic">Belum ada kategori yang tersedia.</p>
			)}
		</div>
	</div>
);

const Sidebar = ({ onAjuLaporan, totalPerCategory, onCategoryClick, filteredStatuses, onStatusClick, activeCategory, activeStatus }) => (
	<div className="w-80 space-y-6 hidden lg:block">
		<AjukanLaporanButton onClick={onAjuLaporan} />

		<CategorySection totalPerCategory={totalPerCategory} onCategoryClick={onCategoryClick} activeCategory={activeCategory} />

		<StatusFilter title="Status" statusList={filteredStatuses} onStatusClick={onStatusClick} activeStatus={activeStatus} />
	</div>
);

const MobileControls = ({ onFilter, onAjuLaporan }) => (
	<div className="flex items-center flex-wrap lg:mb-4 lg:hidden gap-4">
		<Button variant="warning" label="Filter" icon={<FilterIcon className="w-4 h-4" />} onClick={onFilter} />
		<AjukanLaporanButton onClick={onAjuLaporan} className="" />
	</div>
);

// Main component
const LaporanPage = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { getReports, reports, activeTab, setActiveTab, tabOptions, refresh, pagination, totalPerCategory, error, clearError } = useReportStore();
	const { filteredReports } = useFilteredReports({
		reports,
		user,
		activeTab,
	});

	// State
	const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS.TERBARU);
	const [category, setCategory] = useState(null);
	const [status, setStatus] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [verifModal, setVerifModal] = useState(false);
	const [authModal, setAuthModal] = useState(false);
	const [filterModal, setFilterModal] = useState(false);

	// Computed values
	const filteredStatuses = useMemo(() => {
		if (activeTab === 'semua') {
			return reportStatuses.filter((status) => ['under_review', 'responded', 'done'].includes(status.value));
		}
		return reportStatuses;
	}, [activeTab]);

	// Event handlers
	const handleAjuLaporan = useCallback(() => {
		if (!user) {
			setAuthModal(true);
			return;
		}

		if (user.status !== studentsStatus.VERIFIED) {
			setVerifModal(true);
			return;
		}

		navigate('/aju-laporan');
	}, [user, navigate]);

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
			if (status) query.status = status;

			getReports(query);
			setCurrentPage(newPage);
		},
		[selectedFilter, category, status]
	);

	const handleCategoryClick = useCallback((categoryValue) => {
		setCategory((prev) => (prev === categoryValue ? null : categoryValue));
	}, []);

	const handleStatusClick = useCallback((statusValue) => {
		setStatus((prev) => (prev === statusValue ? null : statusValue));
	}, []);

	const handleFilterModalClose = useCallback(() => {
		setFilterModal(false);
	}, []);

	const handleVerifModalClose = useCallback(() => {
		setVerifModal(false);
	}, []);

	// Effects
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
		if (status) query.status = status;

		getReports(query);
		setCurrentPage(1); // Reset to first page when filters change
	}, [refresh, selectedFilter, category, status]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-12 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<div className="flex flex-wrap items-center justify-between mb-6 gap-6">
						<h1 className="text-4xl font-bold text-dark">Daftar Laporan</h1>

						<MobileControls onFilter={() => setFilterModal(true)} onAjuLaporan={handleAjuLaporan} />

						<FilterButton options={Object.values(FILTER_OPTIONS)} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} className="hidden lg:block" />
					</div>

					{/* Tabs */}
					<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

					{/* Reports List */}
					<ReportList reports={filteredReports} />

					{/* Pagination */}
					{filteredReports?.length > 0 && <Pagination className="mt-8" currentPage={currentPage} totalPages={pagination.total_pages} onPageChange={handlePageChange} />}
				</div>

				{/* Sidebar */}
				<Sidebar
					onAjuLaporan={handleAjuLaporan}
					totalPerCategory={totalPerCategory}
					onCategoryClick={handleCategoryClick}
					filteredStatuses={filteredStatuses}
					onStatusClick={handleStatusClick}
					activeCategory={category}
					activeStatus={status}
				/>
			</div>

			{/* Modals */}
			<NotVerifiedModal openModal={verifModal} closeModal={handleVerifModalClose} />

			<FilterModal
				openModal={filterModal}
				closeModal={handleFilterModalClose}
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				totalPerCategory={totalPerCategory}
				activeCategory={category}
				setCategory={setCategory}
				filteredStatuses={filteredStatuses}
				activeStatus={status}
				setStatus={setStatus}
			/>

			<AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
		</div>
	);
};

export default LaporanPage;
