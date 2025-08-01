import { KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../schema';
import InputField from '@/components/input-field';
import Button from '@/components/button';
import { Modal } from '@/components/modal';
import SubmitButton from '@/components/submit-button';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export const PasswordContent = () => {
	const { resetPassword, error, clearError, isLoading } = useAuth();
	const [isOpenModal, setIsOpenModal] = useState(false);

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
				setIsOpenModal(false);
				toast.success(result?.data?.message);
				clearError();
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
		<div className="bg-white h-full">
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

			<Button variant="primary" label="Reset Password" size="medium" className="mt-10" onClick={() => setIsOpenModal(true)} disabled={!isValid} />

			<Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} size="md">
				<div className="flex flex-col items-center text-center md:pt-10">
					<img src="/images/key-round.png" alt="key-round.png" className="w-30" />
					<h2 className="text-2xl text-dark font-semibold mt-10">Reset Password</h2>
					<p className="text-[#6C757D] mt-2">Anda yakin ingin mengubah password Anda?</p>
				</div>
				<div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-10 pb-4">
					<Button variant="secondary" label="Batal" size="large" onClick={() => setIsOpenModal(false)} />
					<SubmitButton label="Reset Password" loadingLabel="Reset..." isValid={isValid} isSubmitting={isSubmitting || isLoading} onSubmit={handleSubmit(onSubmit)} />
				</div>
			</Modal>
		</div>
	);
};
