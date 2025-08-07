import Button from '@/components/button';
import useAdminStore from '@/stores/useAdminStore';
import { useDetailAkunStore } from '../stores/useDetailAkunStore';
import InputField from '@/components/input-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { adminDataSchema } from '../schema';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubmitButton from '@/components/submit-button';

const ProfilAdmin = () => {
	const { id } = useParams();
	const { updateAdmin, admin, error, clearError, isLoading } = useAdminStore();
	const { setActiveMenu } = useDetailAkunStore();

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
			const result = await updateAdmin(id, data);

			if (result?.success) {
				toast.success(result?.data?.message);
				clearError();
				setActiveMenu('profil');
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
		if (admin) {
			reset(
				{
					name: admin.name ?? '',
					email: admin.email ?? '',
				},
				{
					keepDefaultValues: true,
					shouldValidate: true,
				}
			);
		}
	}, [admin, reset]);

	return (
		<>
			<h2 className="text-2xl text-dark font-extrabold">Edit Profil</h2>

			<table className="w-full max-w-2xl mt-2">
				<tbody>
					{[
						{ label: 'Nama', name: 'name' },
						{ label: 'Email', name: 'email' },
					].map(({ label, name }) => (
						<tr key={`edit-${label}`}>
							<td className="text-main-primary font-semibold py-2 w-2">{label}</td>
							<td className="px-4 py-2 w-2">:</td>
							<td className="py-2">
								<InputField name={name} placeholder={label} type="text" register={register} error={errors[name]} required={false} isSmall />
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex flex-wrap items-center justify-end mt-12 gap-4">
				{/* Back Button */}
				<Button variant="outline" label="Batal" onClick={() => setActiveMenu('profil')} />

				{/* Submit Button */}
				<SubmitButton label="Simpan" loadingLabel="Simpan..." isValid={isValid} isSubmitting={isSubmitting | isLoading} onSubmit={handleSubmit(onSubmit)} />
			</div>
		</>
	);
};

export default ProfilAdmin;
