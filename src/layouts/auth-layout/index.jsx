import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<div className="min-h-screen bg-[url('/images/top-blue-bg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
			<Outlet />
		</div>
	);
};

export default AuthLayout;
