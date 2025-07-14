import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { daftarLaporan } from '@/mocks/laporanMock';
import Hashtag from '@/components/hashtag';
import LaporanCard from '@/components/laporan-card';
import FilterButton from '@/components/filter-button';
import Tabs from '@/components/tabs';
import Pagination from '@/components/pagination';
import InputField from '@/components/input-field';

const AdminLaporanPage = () => {
	const [activeTab, setActiveTab] = useState('semua');
	const [selectedFilter, setSelectedFilter] = useState('Terbaru');
	const [searchQuery, setSearchQuery] = useState('');
	const [reports, setReports] = useState([]);
	const [allReports, setAllReports] = useState([]);

	const tabOptions = [
		{ label: 'Semua', value: 'semua' },
		{ label: 'Pending', value: 'pending' },
		{ label: 'Proses', value: 'ditinjau' },
		{ label: 'Selesai', value: 'selesai' },
	];

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredReports = useMemo(() => {
		const filteredByStatus = activeTab === 'semua' ? daftarLaporan : daftarLaporan.filter((report) => report.status.toLowerCase() === activeTab.toLowerCase());

		if (!searchQuery.trim()) return filteredByStatus;

		const lowerQuery = searchQuery.toLowerCase();
		return filteredByStatus.filter((report) => report.title.toLowerCase().includes(lowerQuery) || report.description.toLowerCase().includes(lowerQuery));
	}, [activeTab, searchQuery]);

	const filteredAllReports = useMemo(() => {
		if (!searchQuery.trim()) return daftarLaporan;

		const lowerQuery = searchQuery.toLowerCase();
		return daftarLaporan.filter((report) => report.title.toLowerCase().includes(lowerQuery) || report.description.toLowerCase().includes(lowerQuery));
	}, [searchQuery]);

	useEffect(() => {
		setReports(filteredReports);
	}, [filteredReports]);

	useEffect(() => {
		setAllReports(filteredAllReports);
	}, [filteredAllReports]);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-4xl font-bold text-[#2A2A2A]">Daftar Laporan</h1>
						<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
					</div>

					<div className="flex justify-end mb-4">
						<InputField placeholder="Cari laporan" type="text" icon={Search} onChange={handleSearch} className="lg:hidden" />
					</div>

					{/* Tabs */}
					<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} data={allReports} />

					{/* Reports List */}
					<div className="space-y-6">
						{reports.map((report) => (
							<div key={report.id}>
								<LaporanCard report={report} isVote={false} />
							</div>
						))}
					</div>

					{/* Pagination */}
					{reports.length === 0 ? null : <Pagination className="mt-8" />}
				</div>

				<div className="w-80 space-y-6">
					<InputField placeholder="Cari laporan" type="text" icon={Search} onChange={handleSearch} className="hidden lg:block" />

					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="text-2xl font-bold text-[#2A2A2A] mb-4">Kategori Terkait</h3>
						<div className="flex flex-col items-start space-y-4">
							<Hashtag label="#Fasilitas" quantity={1} />
							<Hashtag label="#Kebersihan" quantity={1} />
							<p className="text-sm text-primary italic">Muat Lebih banyak Kategori</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLaporanPage;
