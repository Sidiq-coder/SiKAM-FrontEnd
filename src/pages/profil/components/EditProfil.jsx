import useAuth from '@/hooks/useAuth';
import { getUserStatus } from '@/utils/users';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import Button from '@/components/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentDataSchema } from '../schema';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useUserStore from '@/stores/useUserStore';
import useProfilStore from '@/stores/useProfilStore';

export const EditProfil = () => {
	const { user } = useAuth();
	const { setProfilMenu } = useProfilStore();
	const { updateProfile, error, clearError, isLoading } = useUserStore();
	const userStatus = getUserStatus(user?.status ?? '');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: zodResolver(studentDataSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			data.batch = parseInt(data.batch);
			const result = await updateProfile(data);

			if (result?.data?.success) {
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
		if (error) toast.error(error);
	}, [error]);

	useEffect(() => {
		if (user) {
			reset(
				{
					name: user.name ?? '',
					program_study: user.program_study ?? '',
					batch: user.batch?.toString(),
				},
				{
					keepDefaultValues: true,
					shouldValidate: true,
				}
			);
		}
	}, [user, reset]);

	return (
		<div className="bg-white p-6 sm:p-8">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-x-8">
					<h1 className="text-2xl font-bold text-dark">Edit Profil</h1>
					<div className="flex items-center gap-x-1">
						{userStatus.icon}
						<span className={`${userStatus.color} text-sm font-medium`}>{userStatus.label}</span>
					</div>
				</div>
			</div>

			<div className="space-y-4 text-sm sm:text-base">
				<table>
					<tbody>
						{[
							{ label: 'Nama', value: user?.name ?? '-', editable: true, name: 'name' },
							{ label: 'NPM', value: user?.npm ?? '-', editable: false, name: 'npm' },
							{ label: 'Email', value: user?.campus_email ?? '-', editable: false, name: 'campus_email' },
							{ label: 'Prodi', value: user?.program_study ?? '-', editable: true, name: 'program_study' },
							{ label: 'Angkatan', value: user?.batch ?? '-', editable: true, name: 'batch' },
						].map(({ label, value, editable, name }) => (
							<tr key={label}>
								<td className="text-primary font-semibold py-2">{label}</td>
								<td className="px-4 sm:px-10 py-2">:</td>
								<td className="py-2">{editable ? <InputField name={name} placeholder={label} type="text" register={register} error={errors[name]} required={false} isSmall /> : value}</td>
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
