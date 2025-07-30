import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/button';
import Hashtag from '@/components/hashtag';
import StatusFilter from '@/components/status-filter';
import LaporanCard from '@/components/laporan-card';
import FilterButton from '@/components/filter-button';
import Tabs from '@/components/tabs';
import Pagination from '@/components/pagination';
import useAuth from '@/hooks/useAuth';
import useReportStore from '@/stores/useReportStore';
import { reportStatuses, reportCategories } from '@/utils/reports';
import { studentsStatus } from '@/utils/users';
import NotVerifiedModal from './components/not-verified-modal';
import { useNavigate } from 'react-router-dom';
import { FilterIcon } from 'lucide-react';
import FilterModal from './components/filter-modal';

const LaporanPage = () => {
	const navigate = useNavigate();

	const { user } = useAuth();
	const { getReports, reports, activeTab, setActiveTab, tabOptions, refresh } = useReportStore();

	const [selectedFilter, setSelectedFilter] = useState('Terbaru');
	const [category, setCategory] = useState(null);
	const [status, setStatus] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, _] = useState(1);

	const [verifModal, setVerifModal] = useState(false);
	const [filterModal, setFilterModal] = useState(false);

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

	const filteredStatuses = useMemo(() => {
		return activeTab === 'semua' ? reportStatuses.filter((status) => ['under_review', 'responded', 'done'].includes(status.value)) : reportStatuses;
	}, [activeTab]);

	const handleAjuLaporan = () => {
		if (user.status !== studentsStatus.VERIFIED) {
			setVerifModal(true);
		} else {
			navigate('/aju-laporan');
		}
	};

	const handlePageChange = (newPage) => {
		const skip = (newPage - 1) * 10;

		getReports({
			skip,
			take: 10,
			isRecent: selectedFilter === 'Terbaru',
			isPopular: selectedFilter === 'Terpopuler',
		});

		setCurrentPage(newPage);
	};

	useEffect(() => {
		const query = {
			skip: 0,
			take: 10,
		};

		if (selectedFilter === 'Terpopuler') query.isPopular = true;
		if (selectedFilter === 'Terbaru') query.isRecent = true;
		if (activeTab === 'laporan-saya' && user?.id) query.studentId = user.id;
		if (category) query.category = category;
		if (status) query.status = status;

		getReports(query);
	}, [activeTab, refresh, selectedFilter, category, status]);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-12 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-4xl font-bold text-dark">Daftar Laporan</h1>

						<div className="flex items-center flex-wrap mb-4 lg:hidden gap-4">
							<Button variant="warning" label="Filter" icon={<FilterIcon className="w-4 h-4" />} onClick={() => setFilterModal(true)} />

							<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} onClick={handleAjuLaporan} />
						</div>

						<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} className="hidden lg:block" />
					</div>

					{/* Tabs */}
					<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

					{/* Reports List */}
					<div className="space-y-6">
						{reports && reports.length > 0 ? (
							reports.map((report) => (
								<div key={report.id}>
									<LaporanCard report={report} />
								</div>
							))
						) : (
							<div className="text-center text-gray my-8">Belum ada laporan yang tersedia.</div>
						)}
					</div>

					{/* Pagination */}
					{reports?.length === 0 ? null : <Pagination className="mt-8" currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
				</div>

				<div className="w-80 space-y-6 hidden lg:block">
					<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} className="w-full" onClick={handleAjuLaporan} />

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

					<StatusFilter title="Status" statusList={filteredStatuses} onStatusClick={(status) => setStatus(status)} />
				</div>
			</div>

			<NotVerifiedModal openModal={verifModal} closeModal={() => setVerifModal(false)} />
			<FilterModal
				openModal={filterModal}
				closeModal={() => setFilterModal(false)}
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				categorizedReports={categorizedReports}
				setCategory={setCategory}
				filteredStatuses={filteredStatuses}
				setStatus={setStatus}
			/>
		</div>
	);
};

export default LaporanPage;
