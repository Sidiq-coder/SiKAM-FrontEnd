import useAuth from '@/hooks/useAuth';
import { studentStatuses } from '@/utils/users';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import Button from '@/components/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminDataSchema } from '../schema';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useAdminStore from '@/stores/useAdminStore';
import useProfilStore from '@/stores/useProfilStore';

export const EditProfilAdmin = () => {
	const { user } = useAuth();
	const { setProfilMenu } = useProfilStore();
	const { updateAdmin, error, clearError, isLoading } = useAdminStore();
	const userStatus = studentStatuses.find((status) => status.value === user?.status);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: zodResolver(adminDataSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const result = await updateAdmin(user.id, data);

			if (result?.success) {
				toast.success(result?.data?.message);
				clearError();
				setProfilMenu('profil');
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

	useEffect(() => {
		if (user) {
			reset(
				{
					name: user.name ?? '',
					email: user.email ?? '',
				},
				{
					keepDefaultValues: true,
					shouldValidate: true,
				}
			);
		}
	}, [user, reset]);

	return (
		<div className="bg-white">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-x-8">
					<h1 className="text-2xl font-bold text-dark">Edit Profil</h1>
					{userStatus && (
						<div className="flex items-center gap-x-1">
							{<userStatus.icon className="w-4 h-4" />}
							<span className={`${userStatus.color} text-sm font-medium`}>{userStatus.label}</span>
						</div>
					)}
				</div>
			</div>

			<div className="space-y-4 text-sm sm:text-base">
				<table>
					<tbody>
						{[
							{ label: 'Nama', value: user?.name ?? '-', name: 'name' },
							{ label: 'Email', value: user?.campus_email ?? '-', name: 'email' },
						].map(({ label, name }) => (
							<tr key={label}>
								<td className="text-primary font-semibold py-2">{label}</td>
								<td className="px-4 sm:px-10 py-2">:</td>
								<td className="py-2">
									<InputField name={name} placeholder={label} type="text" register={register} error={errors[name]} required={false} isSmall />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex flex-wrap items-center justify-end mt-12 gap-4">
				{/* Back Button */}
				<Button variant="outline" label="Batal" onClick={() => setProfilMenu('profil')} />

				{/* Submit Button */}
				<SubmitButton label="Simpan" loadingLabel="Simpan..." isValid={isValid} isSubmitting={isSubmitting | isLoading} onSubmit={handleSubmit(onSubmit)} />
			</div>
		</div>
	);
};
