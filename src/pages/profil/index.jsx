import { useState, useEffect, useMemo } from 'react';
import { LogOut, Edit3, Edit } from 'lucide-react';
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
import { getUserStatus } from '@/utils/users';
import { EditProfil } from './components/EditProfil';
import { setCustomPageTitle } from '@/utils/titleManager';
import useProfilStore from '@/stores/useProfilStore';

export default function ProfilePage() {
	return (
		<div className="px-4 md:px-10 lg:px-20 mt-8 pb-8 min-h-screen bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat">
			<ProfileSection />
		</div>
	);
}

const ProfileSection = () => {
	const { profilMenu, setProfilMenu } = useProfilStore();
	const { logout, user } = useAuth();
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
		<div className="bg-white rounded-2xl shadow overflow-hidden">
			{/* Header Banner */}
			<div className="bg-primary h-32 relative rounded-t-2xl"></div>

			<div className="flex flex-col lg:flex-row">
				{/* Sidebar */}
				<aside className="lg:w-80 w-full bg-white shadow-md relative rounded-b-2xl lg:rounded-bl-2xl font-semibold">
					{/* Profile Picture */}
					<div className="absolute -top-16 left-1/2 lg:left-8 transform -translate-x-1/2 lg:translate-x-0">
						<div className="w-28 h-28 lg:w-32 lg:h-32 bg-primary p-2 rounded-full border-4 border-white mx-auto flex items-center justify-center">
							<img src="/images/Artboard 3 copy 1.png" alt="User" className="object-cover rounded-full w-full h-full" />
						</div>
					</div>

					{/* Sidebar Content */}
					<div className="pt-20 px-6 lg:px-8 text-center lg:text-left">
						<h2 className="text-xl font-bold text-dark mb-1">{user?.name ?? '-'}</h2>
						<p className="text-gray-500 text-sm mb-6">{user?.npm ?? '-'}</p>

						<nav className="space-y-2">
							{[
								{ key: 'profil', label: 'Profil' },
								{ key: 'password', label: 'Password' },
								{ key: 'notifikasi', label: 'Notifikasi' },
								{ key: 'laporan', label: 'Laporan' },
								{ key: 'banding', label: 'Banding UKT' },
							].map(({ key, label }) => (
								<div
									key={key}
									onClick={() => {
										setProfilMenu(key);
										setCustomPageTitle(label);
									}}
									className={`py-2 px-4 border-l-4 cursor-pointer transition ${
										profilMenu === key || (profilMenu === 'edit-profil' && key === 'profil') ? 'text-primary border-primary bg-blue-50' : 'text-dark border-transparent hover:bg-gray-50'
									}`}
								>
									{label}
								</div>
							))}

							<div className="my-8 flex items-center justify-center lg:justify-start text-[#EE4848] hover:opacity-80 cursor-pointer px-4 py-2" onClick={handleLogout}>
								<span className="mr-2">Logout</span>
								<LogOut className="w-5 h-5" />
							</div>
						</nav>
					</div>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-4 md:p-6 lg:p-8">
					{profilMenu === 'profil' && <Profil />}
					{profilMenu === 'edit-profil' && <EditProfil />}
					{profilMenu === 'password' && <PasswordContent />}
					{profilMenu === 'notifikasi' && <Notifikasi />}
					{profilMenu === 'laporan' && <Laporan />}
					{profilMenu === 'banding' && <BandingUkt />}
				</main>
			</div>
		</div>
	);
};

const Profil = () => {
	const { setProfilMenu } = useProfilStore();
	const { user } = useAuth();
	const userStatus = getUserStatus(user?.status ?? '');

	return (
		<div className="bg-white p-6 sm:p-8 max-w-2xl">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-x-8">
					<h1 className="text-2xl font-bold text-dark">Profil</h1>
					<div className="flex items-center gap-x-1">
						{userStatus.icon}
						<span className={`${userStatus.color} text-sm font-medium`}>{userStatus.label}</span>
					</div>
				</div>
				<Button
					variant="outline"
					label="Edit"
					icon={<Edit3 className="w-4 h-4" />}
					onClick={() => {
						setProfilMenu('edit-profil');
						setCustomPageTitle('Edit Profil');
					}}
				/>
			</div>

			<div className="space-y-4 text-sm sm:text-base">
				<table>
					<tbody>
						{[
							{ label: 'Nama', value: user?.name ?? '-' },
							{ label: 'NPM', value: user?.npm ?? '-' },
							{ label: 'Email', value: user?.campus_email ?? '-' },
							{ label: 'Prodi', value: user?.program_study ?? '-' },
							{ label: 'Angkatan', value: user?.batch ?? '-' },
						].map(({ label, value }) => (
							<tr key={label}>
								<td className="text-primary font-semibold py-2">{label}</td>
								<td className="px-4 sm:px-10 py-2">:</td>
								<td className="py-2">{value}</td>
							</tr>
						))}
					</tbody>
				</table>
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
		{ label: 'Selesai', value: 'selesai' },
	];

	const filteredReports = useMemo(() => {
		return activeTab === 'laporan-saya' ? daftarLaporan.filter((r) => r.isMy) : daftarLaporan;
	}, [activeTab]);

	useEffect(() => {
		setReports(filteredReports);
	}, [filteredReports]);

	return (
		<div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
				<h1 className="text-xl md:text-2xl font-bold text-dark">Laporan Saya</h1>
				<Button variant="primary" label="Ajukan Laporan" icon={<FontAwesomeIcon icon={faBullhorn} />} href="/aju-laporan" />
			</div>

			<Tabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} />

			<div className="mt-6 space-y-4">
				{reports.length > 0 ? reports.map((report) => <LaporanCard key={report.id} report={report} />) : <p className="text-gray-500 text-center mt-10">Belum ada laporan.</p>}
			</div>

			{reports.length > 0 && <Pagination className="mt-8" />}
		</div>
	);
};
