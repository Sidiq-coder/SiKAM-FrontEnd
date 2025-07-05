import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Calendar, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '@/components/button';
import Hashtag from '@/components/hashtag';
import StatusFilter from './components/status-filter';
import LaporanCard from '@/components/laporan-card';

const reportsData = [
	{
		id: 1,
		title: 'Lampu Kelas C.1 Sering Padam Saat Perkuliahan',
		description:
			'Saya ingin melaporkan bahwa lampu di ruang kelas C.1 sering padam secara tiba-tiba selama kegiatan perkuliahan berlangsung. Hal ini sudah terjadi beberapa kali sejak awal bulan Juni. Kondisi ini mengganggu kenyamanan belajar, terutama saat jadwal kuliah sore menjelang malam.',
		author: 'John Doe',
		date: '27 Jun 09:20',
		status: 'Pending',
		category: '#Fasilitas',
		votes: 0,
		timeAgo: '2 Jam lalu',
		isMy: true,
		file: 'file.jpg',
	},
	{
		id: 2,
		title: 'Toilet Gedung Mektan lt.2 Kotor',
		description:
			'Saya ingin menyampaikan aspirasi terkait kondisi toilet mahasiswa di Gedung Mektan yang kurang terawat. Banyak sampah berserakan, lantai sering becek, dan tidak tersedia sabun cuci tangan di wastafel. Kondisi ini sudah berlangsung sekitar satu minggu terakhir ...',
		author: 'John Doe',
		date: '25 Jun 09:20',
		status: 'Ditinjau',
		category: '#Kebersihan',
		votes: 2,
		timeAgo: '2 Hari lalu',
		isMy: false,
		file: null,
	},
];

const LaporanPage = () => {
	const [activeTab, setActiveTab] = useState('laporan-saya');
	const [selectedFilter, setSelectedFilter] = useState('Terbaru');
	const [reports, setReports] = useState([]);

	useEffect(() => {
		if (activeTab === 'laporan-saya') {
			setReports(reportsData.filter((report) => report.isMy));
		} else {
			setReports(reportsData);
		}
	}, [activeTab]);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-4xl font-bold text-[#2A2A2A]">Daftar Laporan</h1>
						<div className="flex items-center space-x-4">
							<div className="relative">
								<select
									className="bg-[#ED9E31] text-[#2A2A2A] px-10 py-2 rounded-lg font-medium appearance-none pr-8 cursor-pointer"
									value={selectedFilter}
									onChange={(e) => setSelectedFilter(e.target.value)}
								>
									<option>Terbaru</option>
									<option>Terpopuler</option>
									<option>Terlama</option>
								</select>
								<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#2A2A2A] pointer-events-none" />
								<ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#2A2A2A] pointer-events-none" />
							</div>
						</div>
					</div>

					<div className="flex justify-end mb-4">
						<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} className="lg:hidden" href="/aju-laporan" />
					</div>

					{/* Tabs */}
					<div className="flex space-x-8 mb-6 border-b border-[#ACACAC]">
						<button
							className={`pb-3 px-1 font-medium transition-colors ${activeTab === 'semua' ? 'text-[#2A2A2A] border-b-2 border-[#0E50A0]' : 'text-gray-500 hover:text-gray-700'}`}
							onClick={() => setActiveTab('semua')}
						>
							Semua
						</button>
						<button
							className={`pb-3 px-1 font-medium transition-colors ${activeTab === 'laporan-saya' ? 'text-[#0E50A0] border-b-2 border-[#0E50A0]' : 'text-gray-500 hover:text-gray-700'}`}
							onClick={() => setActiveTab('laporan-saya')}
						>
							Laporan Saya
						</button>
					</div>

					{/* Reports List */}
					<div className="space-y-6">
						{reports.map((report) => (
							<LaporanCard report={report} />
						))}
					</div>

					{/* Pagination */}
					<div className="flex mt-8">
						<div className="flex items-center space-x-2">
							<button className="px-3.5 py-1.5 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed">‹</button>
							<button className="px-3.5 py-1.5 rounded-lg bg-[#0E50A0] text-white font-medium">1</button>
							<button className="px-3.5 py-1.5 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-200 transition-colors">›</button>
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div className="w-80 space-y-6">
					<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} className="w-full hidden lg:block" href="/aju-laporan" />
					{/* Category Filter */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="text-2xl font-bold text-[#2A2A2A] mb-4">Kategori Terkait</h3>
						<div className="flex flex-col items-start space-y-4">
							<Hashtag label="#Fasilitas" quantity={1} />
							<Hashtag label="#Kebersihan" quantity={1} />
							<p className="text-sm text-primary italic">Muat Lebih banyak Kategori</p>
						</div>
					</div>

					{/* Status Filter */}
					<StatusFilter activeTab={activeTab} />
				</div>
			</div>
		</div>
	);
};

export default LaporanPage;
