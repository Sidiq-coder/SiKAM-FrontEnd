import { useEffect, useState } from "react";

export const Laporan = () => {
	const [activeTab, setActiveTab] = useState('laporan-saya');
	const [reports, setReports] = useState([]);

	const tabOptions = [
		{ label: 'Semua', value: 'semua' },
		{ label: 'Pending', value: 'pending' },
    { label: 'Proses', value: 'proses' },
    { label: 'selesai', value: 'selesai' },
	];

	const filteredReports = useMemo(() => {
		return activeTab === 'laporan-saya' ? daftarLaporan.filter((report) => report.isMy) : daftarLaporan;
	}, [activeTab]);

	useEffect(() => {
		setReports(filteredReports);
	}, [filteredReports]);

	return (
		<div className="bg-white px-4 py-8 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-2xl font-bold text-[#2A2A2A]">Laporan Saya</h1>
					</div>

					<div className="flex justify-end mb-4">
						<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} className="lg:hidden" href="/aju-laporan" />
					</div>

					{/* Tabs */}
					<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} />

					{/* Reports List */}
					<div className="space-y-6">
						{reports.map((report) => (
							<div key={report.id}>
								<LaporanCard report={report} />
							</div>
						))}
					</div>

					{/* Pagination */}
					{reports.length === 0 ? null : <Pagination className="mt-8" />}
				</div>

				
			</div>
		</div>
	);
};