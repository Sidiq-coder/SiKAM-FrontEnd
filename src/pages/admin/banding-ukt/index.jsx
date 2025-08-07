import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Tabs from '@/components/tabs';
import Pagination from '@/components/pagination';
import InputField from '@/components/input-field';
import BandingUKTCard from '@/components/banding-ukt-card';
import useUktAppealStore from '@/stores/useUktAppealStore';
import { toast } from 'react-toastify';
import useSearchHandler from '@/hooks/useSearchHandler';

// Dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/id'; // Bahasa Indonesia
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.locale('id'); // atur bahasa ke Indonesia

const tabOptions = [
	{ label: 'Semua', value: 'semua' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Ditinjau', value: 'under_review' },
	{ label: 'Diterima', value: 'responded' },
	{ label: 'Ditolak', value: 'rejected' },
];

const ITEMS_PER_PAGE = 10;

const AdminBandingUKTPage = () => {
	const { uktAppeals, getAdminUktAppeals, error, clearError, pagination, toggleStatusUktAppeal, isPeriodOpen, totalPerStatus, getStatusUktAppeal, getAppealStatusList, statusList } =
		useUktAppealStore();

	const [activeTab, setActiveTab] = useState('semua');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	// Filtering by name
	const filteredUktAppeals = useMemo(() => {
		if (!searchQuery.trim()) return uktAppeals;
		const lowerQuery = searchQuery.toLowerCase();
		return uktAppeals.filter((a) => a?.students?.name?.toLowerCase().includes(lowerQuery));
	}, [searchQuery, uktAppeals]);

	const handleSearch = useSearchHandler(setSearchQuery);

	const handlePageChange = useCallback(
		(newPage) => {
			const query = { page: newPage, itemPerPage: ITEMS_PER_PAGE };

			if (activeTab !== 'semua') query.status = activeTab;
			if (searchQuery) query.search = searchQuery;

			getAdminUktAppeals(query);
			setCurrentPage(newPage);
		},
		[activeTab, searchQuery]
	);

	const handlToggleStatusUktAppeal = async () => {
		try {
			const result = await toggleStatusUktAppeal();
			if (result?.data?.success) {
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
		if (searchQuery) query.search = searchQuery;

		getAdminUktAppeals(query);
		setCurrentPage(1);
	}, [activeTab, searchQuery]);

	useEffect(() => {
		getAppealStatusList({ take: 10 });
	}, [isPeriodOpen]);

	useEffect(() => {
		getStatusUktAppeal();
	}, []);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-18 pb-[120px]">
			<h1 className="text-3xl md:text-4xl font-bold text-dark mb-8">Daftar Banding UKT</h1>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* ==== MAIN SECTION ==== */}
				<div className="flex-1 space-y-6">
					{/* Search Input for Mobile */}
					<div className="lg:hidden">
						<InputField placeholder="Cari berdasarkan nama/NPM" icon={Search} onChange={handleSearch} />
					</div>

					{/* Tabs */}
					<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} data={totalPerStatus} />

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
									{statusList.length === 0 ? (
										<tr>
											<td colSpan="4" className="text-center py-4 text-gray-500">
												Tidak ada data
											</td>
										</tr>
									) : (
										statusList.map((log, idx) => (
											<tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
												<td className="py-2 px-2">{idx + 1}</td>
												<td className="py-2 px-2">{dayjs.utc(log.updated_at).tz('Asia/Jakarta').format('DD MMM YYYY, HH:mm')}</td>
												<td className="py-2 px-2">{log.admins.name}</td>
												<td className="py-2 px-2">{log.is_active ? 'Mengaktifkan fitur' : 'Menonaktifkan fitur'}</td>
											</tr>
										))
									)}
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
