import { useCallback, useEffect, useState } from 'react';
import LaporanCard from '@/components/laporan-card';
import Tabs from '@/components/tabs';
import Pagination from '@/components/pagination';
import useReportStore from '@/stores/useReportStore';
import useUserStore from '@/stores/useUserStore';

const tabOptions = [
	{ label: 'Semua', value: 'semua' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Ditinjau', value: 'under_review' },
	{ label: 'Ditanggapi', value: 'responded' },
	{ label: 'Ditolak', value: 'rejected' },
];

// Constants
const ITEMS_PER_PAGE = 10;

const Laporan = () => {
	const { student } = useUserStore();
	const { getAdminReports, reports, pagination, totalPerStatus } = useReportStore();

	const [activeTab, setActiveTab] = useState('semua');
	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = useCallback(
		(newPage) => {
			const query = {
				page: newPage,
				itemPerPage: ITEMS_PER_PAGE,
			};

			if (activeTab !== 'semua') query.status = activeTab;
			if (student?.id) query.studentId = student?.id;

			getAdminReports(query);
			setCurrentPage(newPage);
		},
		[activeTab]
	);

	useEffect(() => {
		const query = {
			page: 1,
			itemPerPage: ITEMS_PER_PAGE,
		};

		// Add filters
		if (activeTab !== 'semua') query.status = activeTab;
		if (student?.id) query.studentId = student?.id;

		getAdminReports(query);
		setCurrentPage(1); // Reset to first page when filters change
	}, [activeTab, student?.id]);

	return (
		<div className="flex-1">
			{/* Page Header */}
			<h1 className="text-2xl font-bold text-dark mb-6">Laporan Saya</h1>

			{/* Tabs */}
			<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} data={totalPerStatus} className="mb-6" />

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
	);
};

export default Laporan;
