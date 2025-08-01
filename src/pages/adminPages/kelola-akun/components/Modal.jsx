import { KeyRound, Mail, Plus, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Modal } from '@/components/modal';
import Button from '@/components/button';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAdminSchema } from '../schema';
import useAdminStore from '@/stores/useAdminStore';

export const TambahAdminModal = ({ isOpen, closeModal }) => {
	const { createAdmin, clearError, isLoading } = useAdminStore();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: zodResolver(createAdminSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			delete data.confirmPassword;
			data.role = 'reviewer';
			const result = await createAdmin(data);

			if (result?.data?.success) {
				clearError();
				closeModal();
				reset();
				toast.success(result?.data?.message);
			}
		} catch (error) {
			toast.error('Terjadi kesalahan saat registrasi');
			console.error('Registration error:', error);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={closeModal} size="md">
			<div className="md:pt-2">
				<h2 className="text-2xl text-dark font-semibold mb-6">Akun Admin</h2>
				<div className="flex flex-col gap-x-3 gap-y-7">
					{/* Nama */}
					<InputField name="name" label="Nama" placeholder="Nama" type="text" register={register} error={errors.name} icon={User} />

					{/* Email */}
					<InputField name="email" label="Email" placeholder="Email" type="email" register={register} error={errors.email} icon={Mail} />

					{/* Password */}
					<InputField name="password" label="Password" placeholder="Password" register={register} error={errors.password} icon={KeyRound} isPassword />

					{/* Konfirmasi Password */}
					<InputField name="confirmPassword" label="Konfirmasi Password" placeholder="Konfirmasi Password" register={register} error={errors.confirmPassword} icon={KeyRound} isPassword />
				</div>
			</div>
			<div className="flex flex-wrap justify-end items-center gap-x-8 gap-y-4 pt-10 pb-4">
				<Button variant="secondary" label="Batal" size="large" onClick={closeModal} />
				<SubmitButton
					label="Tambah"
					loadingLabel="Tambah..."
					isValid={isValid}
					isSubmitting={isSubmitting || isLoading}
					onSubmit={handleSubmit(onSubmit)}
					icon={<Plus className="w-4 h-4" />}
					iconPosition="right"
				/>
			</div>
		</Modal>
	);
};
