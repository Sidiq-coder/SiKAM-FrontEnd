import Register from '@/pages/register';
import Login from '@/pages/login';
import Home from '@/pages/home';
import BandingUkt from '@/pages/bandingUkt';
import LaporanPage from '@/pages/laporan';
import AuthLayout from '@/layouts/auth-layout';
import BaseLayout from '@/layouts/base-layout';
import DetailLaporan from '@/pages/laporan/detail-laporan';
import UbahLaporan from '@/pages/laporan/ubah-laporan';
import AjuLaporan from '@/pages/laporan/aju-laporan';
import RegistrasiUlang from '@/pages/registrasi-ulang';

const routes = [
	{
		path: '/',
		element: (
			<BaseLayout>
				<Home />
			</BaseLayout>
		),
	},
	{
		path: '/register',
		element: (
			<AuthLayout>
				<Register />
			</AuthLayout>
		),
	},
	{
		path: '/registrasi-ulang',
		element: (
			<AuthLayout>
				<RegistrasiUlang />
			</AuthLayout>
		),
	},
	{
		path: '/login',
		element: (
			<AuthLayout>
				<Login />
			</AuthLayout>
		),
	},
	{
		path: '/laporan',
		element: (
			<BaseLayout>
				<LaporanPage />
			</BaseLayout>
		),
	},
	{
		path: '/detail-laporan',
		element: (
			<BaseLayout>
				<DetailLaporan />
			</BaseLayout>
		),
	},
	{
		path: '/aju-laporan',
		element: (
			<BaseLayout>
				<AjuLaporan />
			</BaseLayout>
		),
	},
	{
		path: '/ubah-laporan',
		element: (
			<BaseLayout>
				<UbahLaporan />
			</BaseLayout>
		),
	},
	{
		path: '/bandingukt',
		element: (
			<BaseLayout>
				<BandingUkt />
			</BaseLayout>
		),
	},
];

export default routes;
