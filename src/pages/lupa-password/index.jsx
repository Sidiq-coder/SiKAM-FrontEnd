import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { schema } from './schema';
import { toast } from 'react-toastify';
import { GraduationCap } from 'lucide-react';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import Header from './components/header';
import RedirectLink from './components/redirect-link';
import useAuth from '@/hooks/useAuth';
import useOtpStore from '@/stores/useOtpStore';

const LupaPasswordPage = () => {
	const { requestPasswordReset, isLoading, error, clearError } = useAuth();
	const { setEmail } = useOtpStore();

	const navigate = useNavigate();

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
			const result = await requestPasswordReset(data);

			if (result?.data?.success) {
				setEmail(data.email);
				toast.success(result?.data?.message);
				clearError();
				navigate('/reset-password');
			}
		} catch (error) {
			toast.error('Terjadi kesalahan');
			console.error('Error:', error);
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
				<InputField name="email" label="Email Mahasiswa/NPM" placeholder="Email Mahasiswa/NPM" type="text" register={register} error={errors.email} icon={GraduationCap} />
			</div>

			<div className="flex flex-wrap items-center justify-between mt-12 gap-y-4">
				{/* Register Link */}
				<RedirectLink sourceLabel="Ingat password Anda?" targetLabel="Masuk" href="/login" />

				{/* Submit Button */}
				<SubmitButton label="Kirim" loadingLabel="Kirim..." isValid={isValid} isSubmitting={isSubmitting || isLoading} onSubmit={handleSubmit(onSubmit)} />
			</div>
		</div>
	);
};

export default LupaPasswordPage;
