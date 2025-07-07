import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { schema } from './schema';
import { toast } from 'react-toastify';
import { setPageTitle } from '../../utils/titleManager';
import { KeyRound, User } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import Header from './components/header';
import RedirectLink from './components/redirect-link';

const Login = () => {
	const navigate = useNavigate();
	const { getUserData } = useUser();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append('npm', data.npm);
			formData.append('password', data.password);

			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success('Berhasil Masuk!');

			getUserData(1);

			setTimeout(() => {
				navigate('/');
			}, 2000);
		} catch (error) {
			toast.error('Terjadi kesalahan saat masuk');
			console.error('Login error:', error);
		}
	};

	useEffect(() => {
		setPageTitle('/login');
	}, []);

	return (
		<div className="bg-white rounded-2xl shadow-2xl px-8 pt-6 pb-10 md:px-12 md:pt-8 md:pb-12 w-full max-w-lg">
			{/* Header */}
			<Header />

			<div className="grid grid-cols-1 gap-7">
				{/* NPM */}
				<InputField name="npm" label="NPM" placeholder="NPM" type="text" register={register} error={errors.npm} icon={User} />

				{/* Password */}
				<InputField name="password" label="Password" placeholder="Password" register={register} error={errors.password} icon={KeyRound} isPassword isForgotPassword />
			</div>

			<div className="flex items-center justify-between mt-12">
				{/* Register Link */}
				<RedirectLink sourceLabel="Belum memiliki akun?" targetLabel="Daftar" href="/register" />

				{/* Submit Button */}
				<SubmitButton label="Masuk" loadingLabel="Masuk..." isValid={isValid} isSubmitting={isSubmitting} onSubmit={handleSubmit(onSubmit)} />
			</div>
		</div>
	);
};

export default Login;
