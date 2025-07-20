import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { schema } from './schema';
import { toast } from 'react-toastify';
import { KeyRound } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import Header from './components/header';

const ResetPassword = () => {
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
			formData.append('password', data.password);
			formData.append('confirmPassword', data.confirmPassword);

			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success('Berhasil Masuk!');

			if (formData.get('npm') === '1234567890') {
				getUserData(2);

				setTimeout(() => {
					navigate('/admin');
				}, 2000);
			} else {
				getUserData(1);

				setTimeout(() => {
					navigate('/');
				}, 2000);
			}
		} catch (error) {
			toast.error('Terjadi kesalahan saat masuk');
			console.error('Reset password error:', error);
		}
	};

	return (
		<div className="bg-white rounded-2xl shadow-2xl px-8 pt-6 pb-10 md:px-12 md:pt-8 md:pb-12 w-full max-w-lg">
			{/* Header */}
			<Header />

			<div className="grid grid-cols-1 gap-7">
				{/* Password */}
				<InputField name="password" label="Password" placeholder="Password" register={register} error={errors.password} icon={KeyRound} isPassword />

				{/* Password */}
				<InputField
					name="confirmPassword"
					label="Konfirmasi Password"
					placeholder="Konfirmasi Password"
					register={register}
					error={errors.confirmPassword}
					icon={KeyRound}
					isPassword
					description="Password Anda harus memiliki minimal 8 karakter dan menyertakan huruf besar, huruf kecil, angka, serta karakter khusus."
				/>
			</div>

			<div className="flex items-center justify-end mt-12">
				{/* Submit Button */}
				<SubmitButton label="Reset Password" loadingLabel="Reset..." isValid={isValid} isSubmitting={isSubmitting} onSubmit={handleSubmit(onSubmit)} />
			</div>
		</div>
	);
};

export default ResetPassword;
