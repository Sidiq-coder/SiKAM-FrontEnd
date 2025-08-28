import { useEffect, useState } from 'react';
import ProcessSteps from '@/components/process-steps';
import LaporanCard from '@/components/laporan-card';
import FilterButton from '@/components/filter-button';
import Hashtag from '@/components/hashtag';
import Button from '@/components/button';
import InfoCard from '../info-card';
import useReportStore from '@/stores/useReportStore';
import { reportCategories } from '@/utils/reports';
import useVotesStore from '@/stores/useVotesStore';

const ITEMS_PER_PAGE = 3;

const FILTER_OPTIONS = {
	TERBARU: 'Terbaru',
	TERPOPULER: 'Terpopuler',
	TERLAMA: 'Terlama',
};

const SORT_MAP = {
	[FILTER_OPTIONS.TERBARU]: 'newest',
	[FILTER_OPTIONS.TERPOPULER]: 'popular',
	[FILTER_OPTIONS.TERLAMA]: 'oldest',
};

const MainSection = () => {
	const { getReports, reports, totalPerCategory, refresh } = useReportStore();
	const { getMyReportVotes, myReportVotes } = useVotesStore();

	const [selectedFilter, setSelectedFilter] = useState('Terbaru');
	const [activeCategory, setActiveCategory] = useState(null);

	useEffect(() => {
		const query = {
			page: 1,
			itemPerPage: ITEMS_PER_PAGE,
		};

		// Add sort parameter
		const sortValue = SORT_MAP[selectedFilter];
		if (sortValue) {
			query.sort = sortValue;
		}

		// Add filters
		if (activeCategory) query.category = activeCategory;

		getReports(query);
		getMyReportVotes();
	}, [selectedFilter, activeCategory, refresh]);

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
					<div className="flex flex-wrap items-center justify-between gap-4 mb-12">
						<h1 className="text-4xl font-bold text-dark">Laporan Terkini</h1>
						<FilterButton options={Object.values(FILTER_OPTIONS)} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} className="lg:hidden text-dark" />
					</div>

					<div className="space-y-6">
						{reports.length > 0 ? (
							reports.map((report) => (
								<div key={report.id}>
									<LaporanCard 
										report={report}
										vote={
											myReportVotes
												.find(e => e.report_id === report.id)
												?.type ?? ''
										} 
										className="border-none shadow-md rounded" 
									/>
								</div>
							))
						) : (
							<div className="text-center text-gray my-8">Belum ada laporan yang tersedia.</div>
						)}
					</div>
				</div>
				<div className="hidden lg:block">
					<FilterButton options={Object.values(FILTER_OPTIONS)} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} className="text-dark" />

					<h3 className="text-2xl font-bold text-dark mb-4 mt-12">Kategori Terkait</h3>

					<div className="flex flex-col items-start space-y-4 w-60">
						{Object.values(totalPerCategory).some((qty) => qty > 0) ? (
							Object.entries(totalPerCategory).map(([key, quantity]) => {
								const category = reportCategories.find((c) => c.value === key);
								if (!category) return null; // kategori tidak dikenal

								return (
									<Hashtag
										key={key}
										label={`#${category.label}`}
										quantity={quantity}
										onClick={() => setActiveCategory((prev) => (prev === key ? null : key))}
										active={activeCategory === key}
										className="cursor-pointer"
									/>
								);
							})
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
