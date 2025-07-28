import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Button from '@/components/button';
import Hashtag from '@/components/hashtag';
import StatusFilter from '@/components/status-filter';
import LaporanCard from '@/components/laporan-card';
import FilterButton from '@/components/filter-button';
import Tabs from '@/components/tabs';
import Pagination from '@/components/pagination';
import useReportStore from '@/stores/useReportStore';

const rawStatusOptions = [
	{ status: 'Pending', color: 'text-yellow' },
	{ status: 'Ditinjau', color: 'text-[#EDC831]' },
	{ status: 'Ditanggapi', color: 'text-primary' },
	{ status: 'Selesai', color: 'text-[#2FCB51]' },
	{ status: 'Ditolak', color: 'text-[#EE4848]' },
];

const LaporanPage = () => {
	const { getReports, getMyReports, reports } = useReportStore();
	const [activeTab, setActiveTab] = useState('laporan-saya');
	const [selectedFilter, setSelectedFilter] = useState('Terbaru');

	const tabOptions = [
		{ label: 'Semua', value: 'semua' },
		{ label: 'Laporan Saya', value: 'laporan-saya' },
	];

	useEffect(() => {
		if (activeTab === 'laporan-saya') {
			getMyReports();
		} else if (activeTab === 'semua') {
			getReports();
		}
	}, [activeTab]);

	console.log(reports);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-12 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-4xl font-bold text-dark">Daftar Laporan</h1>
						<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
					</div>

					<div className="flex justify-end mb-4">
						<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} className="lg:hidden" href="/aju-laporan" />
					</div>

					{/* Tabs */}
					<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

					{/* Reports List */}
					<div className="space-y-6">
						{reports?.map((report) => (
							<div key={report.id}>
								<LaporanCard report={report} />
							</div>
						))}
					</div>

					{/* Pagination */}
					{reports?.length === 0 ? null : <Pagination className="mt-8" />}
				</div>

				<div className="w-80 space-y-6">
					<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} className="w-full hidden lg:block" href="/aju-laporan" />

					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="text-2xl font-bold text-dark mb-4">Kategori Terkait</h3>
						<div className="flex flex-col items-start space-y-4">
							<Hashtag label="#Fasilitas" quantity={1} />
							<Hashtag label="#Kebersihan" quantity={1} />
							<p className="text-sm text-primary italic">Muat Lebih banyak Kategori</p>
						</div>
					</div>

					<StatusFilter title="Status" statusList={rawStatusOptions} />
				</div>
			</div>
		</div>
	);
};

export default LaporanPage;
