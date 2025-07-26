import { useState, useEffect, useMemo } from 'react';
import { LogOut, Edit3 } from 'lucide-react';
import { toast } from 'react-toastify';
import { daftarLaporan } from '@/mocks/laporanMock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BandingUkt } from './components/BandingUkt';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { Notifikasi } from './components/Notifikasi';
import { PasswordContent } from './components/PasswordContent';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/button';
import Tabs from '@/components/tabs';
import LaporanCard from '@/components/laporan-card';
import Pagination from '@/components/pagination';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
	return (
		<div className="px-10 md:px-20 mt-8 lg:px-32 pb-1 min-h-screen bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat">
			<div>
				<ProfileSection />
			</div>
		</div>
	);
}

const ProfileSection = () => {
	const [option, setOption] = useState('Profil');
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		if (confirm('Apakah Anda yakin ingin keluar?')) {
			const response = await logout();
			if (response?.data?.success) {
				toast.success(response?.data?.message);
				navigate('/login');
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 rounded-[1rem]">
			{/* Header */}
			<div className="bg-[#0B4D9B] h-32 relative rounded-t-[1rem]"></div>

			<div className="flex rounded-b-[1rem]">
				{/* Sidebar */}
				<div className="w-80 bg-white shadow-lg min-h-screen relative rounded-bl-[1rem] font-semibold">
					{/* Profile Picture */}
					<div className="absolute -top-16 left-8 ">
						<div className="w-32 h-32 bg-[#0B4D9B] p-2 rounded-full border-4 border-white flex items-center justify-center">
							<img src="../../../public/images/Artboard 3 copy 1.png" alt="" />
						</div>
					</div>

					{/* User Info */}
					<div className="pt-20 px-8 rounded-bl-[1rem] ">
						<h2 className="text-2xl font-bold text-gray-800 mb-2">John Doe</h2>
						<p className="text-gray-500 text-sm mb-8">2315150115</p>

						{/* Navigation Menu */}
						<nav className="space-y-4">
							<div
								onClick={() => {
									setOption('Profil');
								}}
								className={`block py-2 border-l-4 pl-4 cursor-pointer ${
									option === 'Profil' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-700 border-transparent hover:text-blue-600 hover:bg-gray-50'
								}`}
							>
								Profil
							</div>
							<div
								onClick={() => {
									setOption('password');
								}}
								className={`block py-2 border-l-4 pl-4 cursor-pointer ${
									option === 'password' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-700 border-transparent hover:text-blue-600 hover:bg-gray-50'
								}`}
							>
								Password
							</div>
							<div
								onClick={() => {
									setOption('notifikasi');
								}}
								className={`block py-2 border-l-4 pl-4 cursor-pointer ${
									option === 'notifikasi' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-700 border-transparent hover:text-blue-600 hover:bg-gray-50'
								}`}
							>
								Notifikasi
							</div>
							<div
								onClick={() => {
									setOption('laporan');
								}}
								className={`block py-2 border-l-4 pl-4 cursor-pointer ${
									option === 'laporan' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-700 border-transparent hover:text-blue-600 hover:bg-gray-50'
								}`}
							>
								Laporan
							</div>
							<div
								onClick={() => {
									setOption('banding');
								}}
								className={`block py-2 border-l-4 pl-4 cursor-pointer mb-32 ${
									option === 'banding' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-700 border-transparent hover:text-blue-600 hover:bg-gray-50'
								}`}
							>
								Banding UKT
							</div>

							<div className="flex text-[#EE4848] hover:opacity-80 py-2 pl-4 hover:bg-gray-50 rounded cursor-pointer" onClick={handleLogout}>
								<span className="mr-2">Logout</span>
								<LogOut className="w-6 h-6 font-bold" />
							</div>
						</nav>
					</div>
				</div>

				<div className="flex-1">
					{option === 'Profil' && <Profil />}
					{option === 'password' && <PasswordContent />}
					{option === 'notifikasi' && <Notifikasi />}
					{option === 'laporan' && <Laporan />}
					{option === 'banding' && <BandingUkt />}
				</div>
			</div>
		</div>
	);
};

const Profil = () => {
	return (
		<div>
			{/* Main Content */}
			<div className="flex-1 p-8">
				<div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center space-x-3">
							<h1 className="text-2xl font-bold text-gray-800">Profil</h1>
							<div className="flex items-center space-x-1">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-green-500 text-sm font-medium">verified</span>
							</div>
						</div>
						<button className="flex items-center space-x-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
							<span>edit</span>
							<Edit3 className="w-4 h-4" />
						</button>
					</div>

					{/* Profile Information */}
					<div className="space-y-6">
						<div className="grid grid-cols-3 gap-4 items-center">
							<label className="text-blue-600 font-medium">Nama</label>
							<span className="text-gray-700">:</span>
							<span className="text-gray-800">John Doe</span>
						</div>

						<div className="grid grid-cols-3 gap-4 items-center">
							<label className="text-blue-600 font-medium">NPM</label>
							<span className="text-gray-700">:</span>
							<span className="text-gray-800">2315150115</span>
						</div>

						<div className="grid grid-cols-3 gap-4 items-center">
							<label className="text-blue-600 font-medium">Email</label>
							<span className="text-gray-700">:</span>
							<span className="text-gray-800">JohnDoe123@gmail.com</span>
						</div>

						<div className="grid grid-cols-3 gap-4 items-center">
							<label className="text-blue-600 font-medium">Prodi</label>
							<span className="text-gray-700">:</span>
							<span className="text-gray-800">Informatika</span>
						</div>

						<div className="grid grid-cols-3 gap-4 items-center">
							<label className="text-blue-600 font-medium">Angkatan</label>
							<span className="text-gray-700">:</span>
							<span className="text-gray-800">2023</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const Laporan = () => {
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
						<h1 className="text-2xl font-bold text-dark">Laporan Saya</h1>
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
