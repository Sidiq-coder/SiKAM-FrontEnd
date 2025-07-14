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
import Advika from '@/pages/advika';
import DetailAdvika from '@/pages/advika/DetailAdvika';
import AdminAdvika from '../pages/adminPages/advika';
import EditAdvika from "../pages/adminPages/advika/EditAdvika"
import {default as AdminDetailAdvika} from '../pages/adminPages/advika/DetailAdvika'
import ProfilePage from '../pages/profilePage';
import LaporanProfile from '../pages/laporanProfile';
import BandingProfile from '../pages/bandingProfile';
import NotifProfile from '../pages/notificationProfile';
import PasswordProfile from '../pages/passwordProfile';
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
	{
		path: '/advika',
		element: (
			<BaseLayout>
				<Advika />
			</BaseLayout>
		),
	},
	{
		path: '/advika/detailAdvika/:id',
		element: (
			<BaseLayout>
				<DetailAdvika />
			</BaseLayout>
		),
	},
	{
		path: '/admin/advika',
		element: (
			<BaseLayout>
				<AdminAdvika />
			</BaseLayout>
		),
	},
	{
		path: '/admin/advika/detailAdvika/:id',
		element: (
			<BaseLayout>
				<AdminDetailAdvika />
			</BaseLayout>
		),
	},
	{
		path: '/admin/advika/editAdvika/:id',
		element: (
			<BaseLayout>
				<EditAdvika />
			</BaseLayout>
		),
	},
	{
		path: '/profilePage',
		element: (
			<BaseLayout>
				<ProfilePage />
			</BaseLayout>
		),
	},
	{
		path: '/profilePage/password',
		element: (
			<BaseLayout>
				<PasswordProfile />
			</BaseLayout>
		),
	},
	{
		path: '/profilePage/banding',
		element: (
			<BaseLayout>
				<BandingProfile />
			</BaseLayout>
		),
	},
	{
		path: '/profilePage/notification',
		element: (
			<BaseLayout>
				<NotifProfile/>
			</BaseLayout>
		),
	},
	{
		path: '/profilePage/laporan',
		element: (
			<BaseLayout>
				<LaporanProfile />
			</BaseLayout>
		),
	},
];

export default routes;
