import AuthLayout from '@/layouts/auth-layout';
import BaseLayout from '@/layouts/base-layout';
import Register from '@/pages/register';
import Login from '@/pages/login';
import Home from '@/pages/home';
import LaporanPage from '@/pages/laporan';
import DetailLaporan from '@/pages/laporan/detail-laporan';
import UbahLaporan from '@/pages/laporan/ubah-laporan';
import AjuLaporan from '@/pages/laporan/aju-laporan';
import RegistrasiUlang from '@/pages/registrasi-ulang';
import Advika from '@/pages/advika';
import DetailAdvika from '@/pages/advika/DetailAdvika';
import AdminAdvika from '@/pages/adminPages/advika';
import EditAdvika from '@/pages/adminPages/advika/EditAdvika';
import { default as AdminDetailAdvika } from '@/pages/adminPages/advika/DetailAdvika';
import ProfilePage from '@/pages/profilePage';
import AdminLaporanPage from '@/pages/adminPages/laporan';
import AdminGuard from './admin-guard';
import AdminDetailLaporanPage from '@/pages/adminPages/laporan/detail-laporan';
import KelolaAkunPage from '@/pages/adminPages/kelola-akun';
import DetailAkunPage from '@/pages/adminPages/kelola-akun/detail-akun';
import AdminBandingUKTPage from '@/pages/adminPages/banding-ukt';
import DetailBandingUKT from '@/pages/adminPages/banding-ukt/detail-banding-ukt';
import TentangSikam from '@/pages/tentang-sikam';
import ResetPassword from '@/pages/reset-password';
import VerifikasiOTP from '@/pages/verifikasi-otp';
import BandingUkt from '@/pages/bandingUkt';
import AuthGuard from './auth-guard';
import GuestGuard from './guest-guard';
import LupaPasswordPage from '@/pages/lupa-password';

const routes = [
	// Auth Routes
	{
		path: '/',
		element: <GuestGuard />,
		children: [
			{
				element: <AuthLayout />,
				children: [
					{ path: 'login', element: <Login /> },
					{ path: 'register', element: <Register /> },
					{ path: 'registrasi-ulang', element: <RegistrasiUlang /> },
					{ path: 'lupa-password', element: <LupaPasswordPage /> },
					{ path: 'reset-password', element: <ResetPassword /> },
					{ path: 'verifikasi-otp', element: <VerifikasiOTP /> },
				],
			},
		],
	},

	// Main Routes
	{
		path: '/',
		element: <AuthGuard />,
		children: [
			{
				element: <BaseLayout />,
				children: [
					{ index: true, element: <Home /> },

					{ path: 'laporan', element: <LaporanPage /> },
					{ path: 'detail-laporan', element: <DetailLaporan /> },
					{ path: 'aju-laporan', element: <AjuLaporan /> },
					{ path: 'ubah-laporan', element: <UbahLaporan /> },

					{ path: 'banding-ukt', element: <BandingUkt /> },

					{ path: 'advika', element: <Advika /> },
					{ path: 'advika/detailAdvika/:id', element: <DetailAdvika /> },

					{ path: 'tentang', element: <TentangSikam /> },

					{ path: 'profilePage', element: <ProfilePage /> },
				],
			},
		],
	},

	// Admin Routes
	{
		path: '/admin',
		element: <AdminGuard />,
		children: [
			{
				element: <BaseLayout />,
				children: [
					// Laporan
					{ path: 'laporan', element: <AdminLaporanPage /> },
					{ path: 'detail-laporan', element: <AdminDetailLaporanPage /> },

					// Kelola Akun
					{ path: 'kelola-akun', element: <KelolaAkunPage /> },
					{ path: 'detail-akun', element: <DetailAkunPage /> },

					// Banding UKT
					{ path: 'banding-ukt', element: <AdminBandingUKTPage /> },
					{ path: 'detail-banding-ukt', element: <DetailBandingUKT /> },

					// Advika
					{ path: 'advika', element: <AdminAdvika /> },
					{ path: 'advika/detailAdvika/:id', element: <AdminDetailAdvika /> },
					{ path: 'advika/editAdvika/:id', element: <EditAdvika /> },
				],
			},
		],
	},
];

export default routes;
