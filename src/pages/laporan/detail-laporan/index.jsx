import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/components/button';
import LaporanCard from '@/components/laporan-card';
import BackLink from '@/components/back-link';
import useReportStore from '@/stores/useReportStore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const DetailLaporan = () => {
	const { id } = useParams();
	const { getReport, report, refresh } = useReportStore();

	useEffect(() => {
		const fetch = async () => {
			await getReport(id);
		};
		fetch();
	}, [id, refresh]);

	return (
		<div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<BackLink to="/laporan" label="Laporan" className="mb-6" />

					<div className="flex justify-end mb-4">
						<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} className="lg:hidden" href="/aju-laporan" />
					</div>

					{report && <LaporanCard report={report} isDetail />}
				</div>
			</div>
		</div>
	);
};

export default DetailLaporan;
