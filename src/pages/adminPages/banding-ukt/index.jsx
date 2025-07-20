import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { daftarBandingUkt } from '@/mocks/bandingUktMock';
import Hashtag from '@/components/hashtag';
import FilterButton from '@/components/filter-button';
import Tabs from '@/components/tabs';
import Pagination from '@/components/pagination';
import InputField from '@/components/input-field';
import BandingUKTCard from '@/components/banding-ukt-card';

const logs = [
	{ no: 1, date: '12 Jul 2025, 10:32', admin: 'admin1', action: 'Mengaktifkan fitur' },
	{ no: 2, date: '30 Jun 2025, 17:04', admin: 'admin2', action: 'Menonaktifkan fitur' },
	{ no: 3, date: '29 Aug 2025, 15:04', admin: 'admin7', action: 'Mengaktifkan fitur' },
	{ no: 4, date: '31 Aug 2025, 12:04', admin: 'admin2', action: 'Menonaktifkan fitur' },
];

const AdminBandingUKTPage = () => {
	const [activeTab, setActiveTab] = useState('semua');
	const [selectedFilter, setSelectedFilter] = useState('Terbaru');
	const [searchQuery, setSearchQuery] = useState('');
	const [data, setData] = useState([]);
	const [allData, setAllData] = useState([]);
	const [isActive, setIsActive] = useState(true);

	const tabOptions = [
		{ label: 'Semua', value: 'semua' },
		{ label: 'Pending', value: 'pending' },
		{ label: 'Ditinjau', value: 'ditinjau' },
		{ label: 'Diterima', value: 'diterima' },
		{ label: 'Ditolak', value: 'ditolak' },
	];

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredData = useMemo(() => {
		const filteredByStatus = activeTab === 'semua' ? daftarBandingUkt : daftarBandingUkt.filter((report) => report.status.toLowerCase() === activeTab.toLowerCase());

		if (!searchQuery.trim()) return filteredByStatus;

		const lowerQuery = searchQuery?.toLowerCase();
		return filteredByStatus.filter((report) => report.title.toLowerCase().includes(lowerQuery) || report.description.toLowerCase().includes(lowerQuery));
	}, [activeTab, searchQuery]);

	const filteredAllData = useMemo(() => {
		if (!searchQuery.trim()) return daftarBandingUkt;

		const lowerQuery = searchQuery?.toLowerCase();
		return daftarBandingUkt.filter((report) => report.title.toLowerCase().includes(lowerQuery) || report.description.toLowerCase().includes(lowerQuery));
	}, [searchQuery]);

	useEffect(() => {
		setData(filteredData);
	}, [filteredData]);

	useEffect(() => {
		setAllData(filteredAllData);
	}, [filteredAllData]);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-18 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-4xl font-bold text-dark">Daftar Banding UKT</h1>
						<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
					</div>

					<div className="flex justify-end mb-4">
						<InputField placeholder="Cari berdasarkan nama/NPM" type="text" icon={Search} onChange={handleSearch} className="lg:hidden" />
					</div>

					{/* Tabs */}
					<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} data={allData} className="mb-6" />

					{/* Card List */}
					<div className="space-y-6">
						{data.map((item, idx) => (
							<BandingUKTCard key={idx} name={item.name} npm={item.npm} date={item.date} status={item.status} files={item.files} />
						))}
					</div>

					{/* Pagination */}
					{data.length === 0 ? null : <Pagination className="mt-8" />}
				</div>

				<div className="w-80 space-y-6">
					<InputField placeholder="Cari berdasarkan nama/NPM" type="text" icon={Search} onChange={handleSearch} className="hidden lg:block" />

					{/* Status Fitur */}
					<div className="bg-white rounded-lg p-4 drop-shadow-md mb-6">
						<h2 className="text-xl font-bold text-dark mb-6">Status Fitur Banding UKT</h2>
						<div className="flex items-center space-x-3">
							{/* Toggle Switch */}
							<button onClick={() => setIsActive(!isActive)} className={`w-12 h-6 rounded-full p-1 flex items-center transition ${isActive ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}>
								<span className="w-4 h-4 bg-white rounded-full shadow"></span>
							</button>
							<span className={`font-semibold ${isActive ? 'text-primary' : 'text-gray-500'}`}>Status {isActive ? 'Aktif' : 'Nonaktif'}</span>
						</div>
					</div>

					{/* Log Riwayat Perubahan Status */}
					<div className="bg-white rounded-lg p-4 drop-shadow-md">
						<h2 className="text-xl font-bold text-dark mb-4">Log Riwayat Perubahan Status</h2>
						<table className="w-full border-collapse text-left text-xs">
							<thead>
								<tr className="border-b border-black">
									<th className="py-2 px-2 font-normal">No</th>
									<th className="py-2 px-2 font-normal">Tgl/Waktu</th>
									<th className="py-2 px-2 font-normal">Admin</th>
									<th className="py-2 px-2 font-normal">Aksi</th>
								</tr>
							</thead>
							<tbody>
								{logs.map((log) => (
									<tr key={log.no} className="border-b border-gray-100 hover:bg-gray-50">
										<td className="py-2 px-2">{log.no}</td>
										<td className="py-2 px-2">{log.date}</td>
										<td className="py-2 px-2">{log.admin}</td>
										<td className="py-2 px-2">{log.action}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminBandingUKTPage;
