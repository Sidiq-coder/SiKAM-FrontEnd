import { useState } from 'react';
import { LogOut, Edit3 } from 'lucide-react';
import { BandingUkt } from './components/BandingUkt';
import { Notifikasi } from './components/Notifikasi';
import { PasswordContent } from './components/PasswordContent';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/button';
import { studentStatuses, studentsStatus } from '@/utils/users';
import { EditProfil } from './components/EditProfil';
import { EditProfilAdmin } from './components/EditProfilAdmin';
import { setCustomPageTitle } from '@/utils/titleManager';
import useProfilStore from '@/stores/useProfilStore';
import { LogoutModal } from './components/Modal';
import Laporan from './components/Laporan';

export default function ProfilePage() {
	return (
		<div className="px-4 md:px-10 lg:px-20 mt-8 pb-8 min-h-screen bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat">
			<ProfileSection />
		</div>
	);
}

const ProfileSection = () => {
	const { profilMenu, setProfilMenu } = useProfilStore();
	const { user } = useAuth();

	const [logoutModal, setLogoutModal] = useState(false);

	return (
		<div className="bg-white rounded-2xl shadow overflow-hidden">
			{/* Header Banner */}
			<div className="bg-primary h-32 relative rounded-t-2xl"></div>

			<div className="flex flex-col lg:flex-row">
				{/* Sidebar */}
				<aside className="lg:w-80 w-full bg-white shadow-md relative rounded-b-2xl lg:rounded-bl-2xl font-semibold">
					{/* Profile Picture */}
					<div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
						<div className="w-28 h-28 lg:w-32 lg:h-32 bg-primary p-2 rounded-full border-4 border-white mx-auto flex items-center justify-center">
							<img src="/images/Artboard 3 copy 1.png" alt="User" className="object-cover rounded-full w-full h-full" />
						</div>
					</div>

					{/* Sidebar Content */}
					<div className="pt-20 px-6 lg:px-8">
						<h2 className="text-2xl font-bold text-dark text-center mb-0.5">{user?.name ?? '-'}</h2>
						<p className="text-[#90909099] text-center font-medium mb-6">{user?.npm ?? '-'}</p>

						<nav className="space-y-2">
							{[
								{ key: 'profil', label: 'Profil', show: true },
								{ key: 'password', label: 'Password', show: user?.role !== 'superadmin' },
								{ key: 'notifikasi', label: 'Notifikasi', show: user?.role !== 'superadmin' },
								{ key: 'laporan', label: 'Laporan', show: user?.role !== 'superadmin' },
								{ key: 'banding', label: 'Banding UKT', show: user?.role !== 'superadmin' },
							]
								.filter((item) => item.show)
								.map(({ key, label }) => (
									<div
										key={key}
										onClick={() => {
											setProfilMenu(key);
											setCustomPageTitle(label);
										}}
										className={`py-1.5 cursor-pointer transition ${key === 'profil' && 'border-t-2 border-gray/60 pt-3'} ${key === 'notifikasi' && 'border-b-2 border-gray/60 pb-3'} ${
											profilMenu === key || (profilMenu === 'edit-profil' && key === 'profil') ? 'text-primary' : 'text-dark'
										}`}
									>
										{label}
									</div>
								))}

							<div className="my-8 flex items-center justify-center lg:justify-start text-red hover:opacity-80 cursor-pointer py-2" onClick={() => setLogoutModal(true)}>
								<span className="mr-2">Logout</span>
								<LogOut className="w-5 h-5" />
							</div>
						</nav>
					</div>
				</aside>

				{/* Main Content */}
				<main className="flex-1 px-10 py-6">
					{profilMenu === 'profil' && <Profil />}
					{profilMenu === 'edit-profil' && <>{user?.role !== 'superadmin' ? <EditProfil /> : <EditProfilAdmin />}</>}
					{profilMenu === 'password' && <PasswordContent />}
					{profilMenu === 'notifikasi' && <Notifikasi />}
					{profilMenu === 'laporan' && <Laporan />}
					{profilMenu === 'banding' && <BandingUkt />}
				</main>

				{/* Logout Modal */}
				<LogoutModal openModal={logoutModal} closeModal={() => setLogoutModal(false)} />
			</div>
		</div>
	);
};

const Profil = () => {
	const { setProfilMenu } = useProfilStore();
	const { user } = useAuth();
	const userStatus = studentStatuses.find((status) => status.value === (user?.status ?? ''));
	const isVerified = userStatus?.value !== studentsStatus.NOT_VERIFIED;

	return (
		<div className="bg-white max-w-2xl">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-x-8">
					<h1 className="text-2xl font-bold text-dark">Profil</h1>
					{userStatus && (
						<div
							className={`flex items-center gap-x-1 ${isVerified ? '' : 'cursor-pointer'}`}
							onClick={() => {
								if (!isVerified) {
									window.location.href = '/registrasi-ulang';
								}
							}}
						>
							{<userStatus.icon className={`w-4 h-4 ${userStatus.textColor}`} />}
							<span className={`${userStatus.textColor} text-sm font-medium`}>{userStatus.label}</span>
						</div>
					)}
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
							{ label: 'Username', value: user?.name ?? '-', show: user?.role === 'superadmin' },
							{ label: 'Nama', value: user?.name ?? '-', show: true },
							{ label: 'NPM', value: user?.npm ?? '-', show: user?.role !== 'superadmin' },
							{ label: 'Email', value: (user?.role === 'superadmin' ? user?.email : user?.campus_email) ?? '-', show: true },
							{ label: 'Prodi', value: user?.program_study ?? '-', show: user?.role !== 'superadmin' },
							{ label: 'Angkatan', value: user?.batch ?? '-', show: user?.role !== 'superadmin' },
						]
							.filter((item) => item.show)
							.map(({ label, value }) => (
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
