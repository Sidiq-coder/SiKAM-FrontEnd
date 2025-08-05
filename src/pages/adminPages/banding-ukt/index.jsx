import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Tabs from '@/components/tabs';
import Pagination from '@/components/pagination';
import InputField from '@/components/input-field';
import BandingUKTCard from '@/components/banding-ukt-card';
// import { usePeriodStore } from '@/components/zustand/period-banding-ukt/usePeriodStore';
import useUktAppealStore from '@/stores/useUktAppealStore';
import { toast } from 'react-toastify';

const logs = [
	{ no: 1, date: '12 Jul 2025, 10:32', admin: 'admin1', action: 'Mengaktifkan fitur' },
	{ no: 2, date: '30 Jun 2025, 17:04', admin: 'admin2', action: 'Menonaktifkan fitur' },
	{ no: 3, date: '29 Aug 2025, 15:04', admin: 'admin7', action: 'Mengaktifkan fitur' },
	{ no: 4, date: '31 Aug 2025, 12:04', admin: 'admin2', action: 'Menonaktifkan fitur' },
];

const tabOptions = [
	{ label: 'Semua', value: 'semua' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Ditinjau', value: 'under_review' },
	{ label: 'Diterima', value: 'approved' },
	{ label: 'Ditolak', value: 'rejected' },
];

const ITEMS_PER_PAGE = 10;

const AdminBandingUKTPage = () => {
	const { uktAppeals, getAdminUktAppeals, error, clearError, pagination, toggleStatusUktAppeal, isPeriodOpen } = useUktAppealStore();

	const [activeTab, setActiveTab] = useState('semua');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	// const isPeriodOpen = usePeriodStore((state) => state.isPeriodOpen);
	// const togglePeriod = usePeriodStore((state) => state.togglePeriod);

	// Filtering by name
	const filteredUktAppeals = useMemo(() => {
		if (!searchQuery.trim()) return uktAppeals;
		const lowerQuery = searchQuery.toLowerCase();
		return uktAppeals.filter((a) => a?.students?.name?.toLowerCase().includes(lowerQuery));
	}, [searchQuery, uktAppeals]);

	const handleSearch = (e) => setSearchQuery(e.target.value);

	const handlePageChange = useCallback(
		(newPage) => {
			const query = { page: newPage, itemPerPage: ITEMS_PER_PAGE };
			if (activeTab !== 'semua') query.status = activeTab;
			getAdminUktAppeals(query);
			setCurrentPage(newPage);
		},
		[activeTab]
	);

	const handlToggleStatusUktAppeal = async () => {
		try {
			const result = await toggleStatusUktAppeal();
			if (result?.data?.status) {
				toast.success(result?.data?.message);
				clearError();
			}
		} catch (error) {
			toast.error('Terjadi kesalahan');
			console.error('error:', error);
		}
	};

	useEffect(() => {
		const query = { page: 1, itemPerPage: ITEMS_PER_PAGE };
		if (activeTab !== 'semua') query.status = activeTab;
		getAdminUktAppeals(query);
		setCurrentPage(1);
	}, [activeTab]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	return (
		<div className="bg-white px-4 md:px-8 lg:px-16 py-10 min-h-screen">
			<h1 className="text-3xl md:text-4xl font-bold text-dark mb-8">Daftar Banding UKT</h1>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* ==== MAIN SECTION ==== */}
				<div className="flex-1 space-y-6">
					{/* Search Input for Mobile */}
					<div className="lg:hidden">
						<InputField placeholder="Cari berdasarkan nama/NPM" icon={Search} onChange={handleSearch} />
					</div>

					{/* Tabs */}
					<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} data={filteredUktAppeals} />

					{/* Card List */}
					{filteredUktAppeals.length > 0 ? (
						<div className="space-y-6">
							{filteredUktAppeals.map((data) => (
								<BandingUKTCard key={data.id} data={data} />
							))}
						</div>
					) : (
						<p className="text-center text-gray-500">Tidak ada data ditemukan.</p>
					)}

					{/* Pagination */}
					{uktAppeals.length > 0 && <Pagination className="pt-6" currentPage={currentPage} totalPages={pagination.total_pages} onPageChange={handlePageChange} />}
				</div>

				{/* ==== SIDEBAR SECTION ==== */}
				<div className="w-full lg:max-w-80 space-y-6">
					{/* Desktop Search */}
					<div className="hidden lg:block">
						<InputField placeholder="Cari berdasarkan nama/NPM" icon={Search} onChange={handleSearch} />
					</div>

					{/* Toggle Period Feature */}
					<div className="rounded-lg bg-white drop-shadow-md p-5">
						<h2 className="text-lg font-semibold text-dark mb-4">Status Fitur Banding UKT</h2>
						<div className="flex items-center space-x-3">
							<button
								onClick={handlToggleStatusUktAppeal}
								className={`w-12 h-6 rounded-full p-1 flex items-center transition-all cursor-pointer ${isPeriodOpen ? 'bg-main-primary justify-end' : 'bg-gray-300 justify-start'}`}
							>
								<span className="w-4 h-4 bg-white rounded-full shadow-md" />
							</button>
							<span className={`font-medium ${isPeriodOpen ? 'text-main-primary' : 'text-gray-500'}`}>Status {isPeriodOpen ? 'Aktif' : 'Nonaktif'}</span>
						</div>
					</div>

					{/* Log Table */}
					<div className="bg-white rounded-lg p-5 drop-shadow-md">
						<h2 className="text-lg font-semibold text-dark mb-4">Log Riwayat Perubahan Status</h2>
						<div className="overflow-auto">
							<table className="w-full text-xs text-left">
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
										<tr key={log.no} className="border-b border-gray-200 hover:bg-gray-50 transition">
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
		</div>
	);
};

export default AdminBandingUKTPage;
