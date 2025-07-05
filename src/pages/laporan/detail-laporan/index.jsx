import { useEffect, useState } from 'react';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setPageTitle } from '@/utils/titleManager';
import Button from '@/components/button';
import LaporanItem from '@/components/laporan-item';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const reportData = {
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
};

const DetailLaporan = () => {
	const [report, setReport] = useState({});

	useEffect(() => {
		setPageTitle('/detail-laporan');
		setReport(reportData);
	}, []);

	return (
		<div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<Link to="/laporan" className="flex items-center text-gray-500 mb-6">
						<ChevronLeft className="w-8 h-8" />
						<h1 className="text-xl">Laporan</h1>
					</Link>

					<div className="flex justify-end mb-4">
						<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} className="lg:hidden" href="/aju-laporan" />
					</div>

					<LaporanItem report={report} isDetail />
				</div>
			</div>
		</div>
	);
};

export default DetailLaporan;
