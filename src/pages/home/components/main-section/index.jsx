import ProcessSteps from '@/components/process-steps';
import LaporanCard from '@/components/laporan-card';
import FilterButton from '@/components/filter-button';
import Hashtag from '@/components/hashtag';
import Button from '@/components/button';
import InfoCard from '../info-card';
import { useState } from 'react';

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
		isMy: false,
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

const MainSection = () => {
	const [selectedFilter, setSelectedFilter] = useState('Terbaru');

	return (
		<div className={`bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat px-10 md:px-20 lg:px-32 pb-1`}>
			<ProcessSteps />

			<div className="border-t-2 border-[#0B4D9B99] mb-16"></div>

			<InfoCard
				title1="Laporan"
				title2="Mahasiswa"
				description="Sampaikan aspirasi, keluhan, atau permasalahan yang Anda temui selama di lingkungan kampus. Kami siap menindaklanjuti secara transparan."
				linkLabel="Ajukan Laporan"
				linkHref="/"
				position="left"
			/>
			<InfoCard
				title1="Pengajuan"
				title2="Banding UKT"
				description="Ajukan permohonan peninjauan ulang UKT Anda berdasarkan kondisi dan dokumen yang relevan. Proses mudah dan dapat dipantau."
				linkLabel="Banding UKT"
				linkHref="/"
				position="right"
			/>

			<div className="flex flex-col lg:flex-row justify-between mt-12 gap-x-10">
				<div>
					<div className="flex items-center justify-between mb-12">
						<h1 className="text-4xl font-bold text-[#2A2A2A]">Laporan Terkini</h1>
						<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} className="lg:hidden" />
					</div>

					<div className="space-y-6">
						{reportsData.map((report) => (
							<div key={report.id}>
								<LaporanCard report={report} className="border-none shadow-md rounded" />
							</div>
						))}
					</div>
				</div>
				<div>
					<FilterButton options={['Terbaru', 'Terpopuler', 'Terlama']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} className="hidden lg:block" />

					<h3 className="text-2xl font-bold text-[#2A2A2A] mb-4 mt-12">Kategori Terkait</h3>

					<div className="flex flex-col items-start space-y-4 w-60">
						<Hashtag label="#Fasilitas" quantity={1} />
						<Hashtag label="#Kebersihan" quantity={1} />
						<p className="text-sm text-primary italic">Muat Lebih banyak Kategori</p>
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
