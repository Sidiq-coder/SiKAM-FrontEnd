import { useEffect } from 'react';
import BackLink from '@/components/back-link';
import { useParams } from 'react-router-dom';
import useAdminStore from '@/stores/useAdminStore';
import useUserStore from '@/stores/useUserStore';
import ProfilAdmin from './components/ProfilAdmin';
import ProfilUser from './components/ProfilUser';
import EditProfilAdmin from './components/EditProfilAdmin';
import Laporan from './components/Laporan';
import BandingUKT from './components/BandingUKT';
import { useDetailAkunStore } from './stores/useDetailAkunStore';

const DetailAkunPage = () => {
	const { id, role } = useParams();
	const { getAdmin, admin, refresh } = useAdminStore();
	const { getStudent, student, refresh: refreshStudent } = useUserStore();
	const { activeMenu, setActiveMenu } = useDetailAkunStore();

	useEffect(() => {
		const fetchAdmin = async () => {
			await getAdmin(id);
		};
		const fetchStudent = async () => {
			await getStudent(6);
		};

		if (role === 'admin') fetchAdmin();
		if (role === 'mahasiswa') fetchStudent();
	}, [id, refresh, refreshStudent, role]);

	return (
		<div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat md:px-10 lg:px-20 px-4 py-18 pb-[120px]">
			<div className="container mx-auto">
				<div className="px-10">
					<BackLink to="/admin/kelola-akun" label="Kelola Akun" className="mb-6" />
				</div>
				{/* Header */}
				<div className="bg-[url('/images/top-blue-bg.png')] bg-cover bg-center bg-no-repeat p-4">
					<div className="w-full h-26"></div>
				</div>

				{(admin || student) && (
					<div className="flex flex-col md:flex-row">
						{/* Sidebar */}
						<div className="w-full md:w-64 bg-white shadow-sm pt-13 relative">
							<div className="p-6">
								<div className="absolute left-1/2 -top-18 -translate-x-1/2">
									<div className="w-34 h-34 bg-primary rounded-full flex items-center justify-center border-4 border-white">
										<span className="text-6xl">👤</span>
									</div>
								</div>
								<div className="text-center mb-6">
									<h2 className="text-2xl font-extrabold text-dark">{role === 'mahasiswa' ? student?.name : admin?.name}</h2>
									{role === 'mahasiswa' && <p className="text-[#91575799] text-sm font-medium tracking-wide">{student?.npm}</p>}
								</div>
								<nav className="space-y-2">
									{[
										{ key: 'profil', label: 'Profil', show: true },
										{ key: 'laporan', label: 'Laporan', show: role === 'mahasiswa' },
										{ key: 'banding-ukt', label: 'Banding UKT', show: role === 'mahasiswa' },
									]
										.filter((item) => item.show)
										.map((item) => (
											<div
												key={item.key}
												className={`text-dark font-semibold py-2 px-3 ${['profil', 'laporan'].includes(item.key) ? 'border-t border-gray' : ''} rounded cursor-pointer ${
													activeMenu === item.key ? 'text-primary' : ''
												}`}
												onClick={() => setActiveMenu(item.key)}
											>
												{item.label}
											</div>
										))}
								</nav>
							</div>
						</div>

						{/* Main Content */}
						<div className="bg-white shadow-sm flex-1 px-10 py-6">
							{(() => {
								switch (activeMenu) {
									case 'profil':
										if (role === 'admin') return <ProfilAdmin />;
										if (role === 'mahasiswa') return <ProfilUser />;
										return null;

									case 'edit-profil':
										return role === 'admin' ? <EditProfilAdmin /> : null;

									case 'laporan':
										return <Laporan />;

									case 'banding-ukt':
										return <BandingUKT />;

									default:
										return null;
								}
							})()}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DetailAkunPage;
