import LaporanCard from '@/components/laporan-card';
import BackLink from '@/components/back-link';
import { useParams } from 'react-router-dom';
import useReportStore from '@/stores/useReportStore';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const AdminDetailLaporanPage = () => {
	const { id } = useParams();
	const { getReport, report, refresh, error, clearError } = useReportStore();

	useEffect(() => {
		const fetch = async () => {
			await getReport(id);
		};
		fetch();
	}, [id, refresh]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	return (
		<div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<BackLink to="/admin/laporan" label="Laporan" className="mb-6" />

					{report && <LaporanCard report={report} isDetail />}
				</div>
			</div>
		</div>
	);
};

export default AdminDetailLaporanPage;
