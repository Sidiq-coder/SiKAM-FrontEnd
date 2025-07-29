import { KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../schema';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const PasswordContent = () => {
	const { resetPassword, error, clearError, isLoading } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: zodResolver(resetPasswordSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const result = await resetPassword(data);

			if (result?.data?.success) {
				toast.success(result?.data?.message);
				clearError();
			}
		} catch (error) {
			toast.error('Terjadi kesalahan');
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		if (error) toast.error(error);
	}, [error]);

	return (
		<div className="p-8 bg-white h-full">
			<h1 className="font-bold text-2xl capitalize">Password</h1>

			<div>
				<h3 className="mt-4 w-full border-0 border-b-2 border-gray-300 text-[#909090] opacity-60">Reset Password</h3>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7 mt-4">
				{/* Old Password */}
				<div className="col-span-full">
					<InputField name="old_password" label="Password Lama" placeholder="Password Lama" register={register} error={errors.old_password} icon={KeyRound} isPassword />
				</div>

				{/* Password */}
				<InputField name="new_password" label="Password" placeholder="Password" register={register} error={errors.new_password} icon={KeyRound} isPassword />

				{/* Konfirmasi Password */}
				<InputField name="confirm_new_password" label="Konfirmasi Password" placeholder="Konfirmasi Password" register={register} error={errors.confirm_new_password} icon={KeyRound} isPassword />
			</div>

			<p className="text-gray text-sm mt-2">Password Anda harus memiliki minimal 8 karakter dan menyertakan huruf besar, huruf kecil, angka, serta karakter khusus.</p>

			{/* Submit Button */}
			<SubmitButton label="Reset Password" loadingLabel="Reset..." isValid={isValid} isSubmitting={isSubmitting || isLoading} onSubmit={handleSubmit(onSubmit)} className="mt-10" />
		</div>
	);
};
