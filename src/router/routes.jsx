import Register from '@/pages/register';
import Login from '@/pages/login';
import AuthLayout from '@/layouts/auth-layout';

const routes = [
	{
		path: '/',
		element: <div>Home Page</div>,
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
