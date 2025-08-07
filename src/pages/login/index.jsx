import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
import { toast } from 'react-toastify';
import { GraduationCap, KeyRound } from 'lucide-react';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import Header from './components/header';
import RedirectLink from './components/redirect-link';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';

const Login = () => {
	const { login, isLoading, error, clearError } = useAuth();

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
			const result = await login(data);

			if (result?.data?.success) {
				toast.success(result?.data?.message);
				clearError();
			}
		} catch (error) {
			toast.error('Terjadi kesalahan saat masuk');
			console.error('Login error:', error);
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	return (
		<div className="bg-white rounded-2xl shadow-2xl px-8 pt-6 pb-10 md:px-12 md:pt-8 md:pb-12 w-full max-w-lg">
			{/* Header */}
			<Header />

			<div className="grid grid-cols-1 gap-7">
				{/* NPM */}
				<InputField name="identifier" label="Email Mahasiswa/NPM" placeholder="Email Mahasiswa/NPM" type="text" register={register} error={errors.identifier} icon={GraduationCap} />

				{/* Password */}
				<InputField name="password" label="Password" placeholder="Password" register={register} error={errors.password} icon={KeyRound} isPassword isForgotPassword />
			</div>

			<div className="flex flex-wrap items-center justify-between mt-12 gap-y-4">
				{/* Register Link */}
				<RedirectLink sourceLabel="Belum memiliki akun?" targetLabel="Daftar" href="/register" />

				{/* Submit Button */}
				<SubmitButton label="Masuk" loadingLabel="Masuk..." isValid={isValid} isSubmitting={isSubmitting | isLoading} onSubmit={handleSubmit(onSubmit)} />
			</div>
		</div>
	);
};

export default Login;
