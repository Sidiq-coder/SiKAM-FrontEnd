import Register from '@/pages/register';
import Login from '@/pages/login';
import Home from '@/pages/home';
import AuthLayout from '@/layouts/auth-layout';
import BaseLayout from '@/layouts/base-layout';

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
		path: '/login',
		element: (
			<AuthLayout>
				<Login />
			</AuthLayout>
		),
	},
];

export default routes;
