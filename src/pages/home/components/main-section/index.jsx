import { useEffect, useMemo, useState } from 'react';
import ProcessSteps from '@/components/process-steps';
import LaporanCard from '@/components/laporan-card';
import FilterButton from '@/components/filter-button';
import Hashtag from '@/components/hashtag';
import Button from '@/components/button';
import InfoCard from '../info-card';
import useReportStore from '@/stores/useReportStore';
import { getCategoryLabel } from '@/utils/reports';

const MainSection = () => {
	const { getReports, reports } = useReportStore();
	const [selectedFilter, setSelectedFilter] = useState('Terbaru');

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

	useEffect(() => {
		getReports();
	}, []);

	return (
		<div className={`bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat px-10 md:px-20 lg:px-32 pb-1`}>
			<ProcessSteps />

			<div className="border-t-2 border-[#0B4D9B99] mb-16"></div>

			<InfoCard
				title1="Laporan"
				title2="Mahasiswa"
				description="Sampaikan aspirasi, keluhan, atau permasalahan yang Anda temui selama di lingkungan kampus. Kami siap menindaklanjuti secara transparan."
				linkLabel="Ajukan Laporan"
				linkHref="/aju-laporan"
				position="left"
			/>

			<InfoCard
				title1="Pengajuan"
				title2="Banding UKT"
				description="Ajukan permohonan peninjauan ulang UKT Anda berdasarkan kondisi dan dokumen yang relevan. Proses mudah dan dapat dipantau."
				linkLabel="Banding UKT"
				linkHref="/banding-ukt"
				position="right"
			/>

			<div className="flex flex-col lg:flex-row justify-between mt-12 gap-x-10">
				<div className="flex-1">
					<div className="flex items-center justify-between mb-12">
						<h1 className="text-4xl font-bold text-dark">Laporan Terkini</h1>
						<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} className="lg:hidden" />
					</div>

					<div className="space-y-6">
						{reports.length > 0 ? (
							reports.slice(0, 3).map((report) => (
								<div key={report.id}>
									<LaporanCard report={report} className="border-none shadow-md rounded" />
								</div>
							))
						) : (
							<div className="text-center text-gray my-8">Belum ada laporan yang tersedia.</div>
						)}
					</div>
				</div>
				<div>
					<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} className="hidden lg:block" />

					<h3 className="text-2xl font-bold text-dark mb-4 mt-12">Kategori Terkait</h3>

					<div className="flex flex-col items-start space-y-4 w-60">
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
			</div>

			<div className="flex justify-center mt-12">
				<Button variant="primary" label="Lihat Lebih Banyak" href="/laporan" className="inline-block" />
			</div>

			<div className="border-t-2 border-[#0B4D9B99] my-16"></div>
		</div>
	);
};

export default MainSection;
