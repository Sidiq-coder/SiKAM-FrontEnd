import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronLeft } from 'lucide-react';
import { setPageTitle } from '@/utils/titleManager';
import { daftarLaporan } from '@/mocks/laporanMock';
import Button from '@/components/button';
import LaporanCard from '@/components/laporan-card';

const AdminDetailLaporanPage = () => {
	useEffect(() => {
		setPageTitle('/detail-laporan');
	}, []);

	return (
		<div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="container mx-auto flex flex-col lg:flex-row gap-8">
				{/* Main Content */}
				<div className="flex-1">
					{/* Page Header */}
					<Link to="/admin/laporan" className="flex items-center text-gray-500 mb-6">
						<ChevronLeft className="w-8 h-8" />
						<h1 className="text-xl">Laporan</h1>
					</Link>

					<div className="flex justify-end mb-4">
						<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} size="md" />} className="lg:hidden" href="/aju-laporan" />
					</div>

					<LaporanCard report={daftarLaporan[0]} isDetail />
				</div>
			</div>
		</div>
	);
};

export default AdminDetailLaporanPage;
