import { useEffect, useMemo, useState } from 'react';
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

const tabOptions = [
	{ label: 'Semua', value: 'semua' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Proses', value: 'responded' },
	{ label: 'Selesai', value: 'done' },
];

const AdminLaporanPage = () => {
	const { getReports, reports } = useReportStore();

	const [activeTab, setActiveTab] = useState('semua');
	const [selectedFilter, setSelectedFilter] = useState('Terbaru');
	const [category, setCategory] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');

	const [filterModal, setFilterModal] = useState(false);

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredReports = useMemo(() => {
		if (!reports) return [];

		let result = reports;

		if (activeTab !== 'semua') {
			result = result.filter((report) => report.status === activeTab);
		}

		if (searchQuery.trim()) {
			const lowerQuery = searchQuery.toLowerCase();
			result = result.filter((report) => report.title.toLowerCase().includes(lowerQuery) || report.description.toLowerCase().includes(lowerQuery));
		}

		return result;
	}, [reports, searchQuery, activeTab]);

	const filteredAllReports = useMemo(() => {
		if (!searchQuery.trim()) return reports;

		const lowerQuery = searchQuery?.toLowerCase();
		return reports.filter((report) => report.title.toLowerCase().includes(lowerQuery) || report.description.toLowerCase().includes(lowerQuery));
	}, [reports, searchQuery]);

	const categorizedReports = useMemo(() => {
		if (!filteredReports)
			return reportCategories.map((cat) => ({
				...cat,
				quantity: 0,
			}));

		const categoryMap = filteredReports.reduce((acc, report) => {
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
	}, [filteredReports]);

	useEffect(() => {
		const query = {
			skip: 0,
			take: 10,
		};

		if (selectedFilter === 'Terpopuler') query.isPopular = true;
		if (selectedFilter === 'Terbaru') query.isRecent = true;
		if (category) query.category = category;

		getReports(query);
	}, [activeTab, selectedFilter, category]);

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
					<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} data={filteredAllReports} className="mb-6" />

					{/* Reports List */}
					<div className="space-y-6">
						{filteredReports.map((report) => (
							<div key={report.id}>
								<LaporanCard report={report} isVote={false} />
							</div>
						))}
					</div>

					{/* Pagination */}
					{filteredReports.length === 0 ? null : <Pagination className="mt-8" />}
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
