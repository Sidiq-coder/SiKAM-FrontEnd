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
import useReportStore from '@/stores/useReportStore';
import { getCategoryLabel } from '@/utils/reports';

const LaporanPage = () => {
	const { getReports, getMyReports, reports } = useReportStore();
	const [activeTab, setActiveTab] = useState('semua');
	const [selectedFilter, setSelectedFilter] = useState('Terbaru');

	const tabOptions = [
		{ label: 'Semua', value: 'semua' },
		{ label: 'Laporan Saya', value: 'laporan-saya' },
	];

	const categorizedReports = useMemo(() => {
		if (!reports) return [];

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

		return Object.values(categoryMap);
	}, [reports]);

	const uniqueStatuses = useMemo(() => {
		if (!reports) return [];

		const seen = new Set();
		const result = [];

		for (const report of reports) {
			if (report.status && !seen.has(report.status)) {
				seen.add(report.status);
				result.push(report.status);
			}
		}

		return result;
	}, [reports]);

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
					{reports?.length === 0 ? null : <Pagination className="mt-8" />}
				</div>

				<div className="w-80 space-y-6">
					<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} className="w-full hidden lg:block" href="/aju-laporan" />

					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="text-2xl font-bold text-dark mb-4">Kategori Terkait</h3>
						<div className="flex flex-col items-start space-y-4">
							{categorizedReports.length > 0 ? (
								<>
									{categorizedReports.map(({ value, quantity }) => (
										<Hashtag key={value} label={`#${getCategoryLabel(value)}`} quantity={quantity} />
									))}
									{/* <p className="text-sm text-primary italic">Muat Lebih banyak Kategori</p> */}
								</>
							) : (
								<p className="text-sm text-gray italic">Belum ada kategori yang tersedia.</p>
							)}
						</div>
					</div>

					<StatusFilter title="Status" statusList={uniqueStatuses} />
				</div>
			</div>
		</div>
	);
};

export default LaporanPage;
