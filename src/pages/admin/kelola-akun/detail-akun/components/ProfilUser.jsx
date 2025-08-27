import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { ArrowRight, Check } from 'lucide-react';
import { studentStatuses } from '@/utils/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '@/components/button';
import FileImageComponent from '@/components/file-image';
import useUserStore from '@/stores/useUserStore';
import { verifyStudentSchema } from '../schema';
import SubmitButton from '@/components/submit-button';
import InputField from '@/components/input-field';

const ProfilUser = () => {
	const { verifyStudent, student, isLoading, clearError, error, inputNpm } = useUserStore();

	const userStatus = useMemo(() => {
		return studentStatuses.find((status) => status.value === (student?.status ?? 'waiting'));
	}, [student?.status]);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: zodResolver(verifyStudentSchema),
		mode: 'onChange',
		defaultValues: {
			campus_email: student?.campus_email ?? '',
			status: student?.status ?? 'waiting',
			npm: student?.npm ?? '',
		},
	});

	const onSubmit = async (data) => {
		try {
			let hasUpdate = false;

			if (data.status !== 'not_verified') {
				// Update NPM jika berubah
				if (data.npm !== student?.npm) {
					const inputNpmData = {
						campus_email: data.campus_email,
						npm: data.npm,
					};

					const result = await inputNpm(inputNpmData);

					if (result?.success) {
						hasUpdate = true;
						toast.success(result.data.message);
					}
				}
			}

			// Update status jika berubah
			if (data.status !== userStatus.value) {
				const verifyStudentData = {
					campus_email: data.campus_email,
					status: data.status,
				};

				const result = await verifyStudent(verifyStudentData);

				if (result?.data?.success) {
					hasUpdate = true;
					toast.success(result.data.message);
				}
			}

			if (hasUpdate) {
				clearError();
			} else {
				toast.info('Tidak ada perubahan yang disimpan.');
			}
		} catch (error) {
			console.error('Error:', error);
			toast.error('Terjadi kesalahan saat memproses data.');
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	useEffect(() => {
		if (student) {
			reset(
				{
					campus_email: student.campus_email ?? '',
					status: student.status ?? 'waiting',
					npm: student.npm ?? '',
				},
				{
					keepDefaultValues: true,
					shouldValidate: true,
				}
			);
		}
	}, [student, reset]);

	return (
		<>
			{/* Tab Header */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex flex-wrap items-center gap-4">
					<div className="flex items-center gap-x-12">
						<span className="text-2xl text-dark font-extrabold">Profil</span>
						{userStatus && (
							<div className="flex items-center gap-x-1">
								{<userStatus.icon className={`w-4 h-4 ${userStatus.textColor}`} />}
								<span className={`${userStatus.textColor} text-sm font-medium`}>{userStatus.label}</span>
							</div>
						)}
					</div>
					<ArrowRight className="w-7 h-7 text-main-primary" />
					<select className="px-5 py-2 shadow-md rounded-md text-sm focus:outline-none pr-7 cursor-pointer" {...register('status')}>
						<option value="waiting">ubah status</option>
						{studentStatuses
							.filter((opt) => opt.value !== 'waiting')
							.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
					</select>
				</div>
				<div className="flex justify-end gap-x-6">
					<Button variant="secondary" label="Batal" />
					<SubmitButton
						label="Simpan"
						loadingLabel="Simpan..."
						isValid={isValid}
						isSubmitting={isSubmitting || isLoading}
						isDisabled={watch('status') === userStatus.value && watch('npm') === (student?.npm ?? '')}
						onSubmit={handleSubmit(onSubmit)}
						icon={<Check className="w-4 h-4" />}
						iconPosition="right"
					/>
				</div>
			</div>

			{errors?.status?.message && <p className="text-red text-sm mt-2">{errors?.status?.message}</p>}

			{/* Profile Form */}
			<table className="mt-6">
				<tbody>
					{[
						{ label: 'Nama', value: student?.name || '-' },
						{ label: 'NPM', value: <InputField name="npm" placeholder="NPM" type="text" register={register} error={errors.npm} required={false} isSmall /> },
						{ label: 'Email', value: student?.campus_email || '-' },
						{ label: 'Prodi', value: student?.program_study || '-' },
						{ label: 'Angkatan', value: student?.batch || '-' },
						{
							label: 'Foto KTM',
							value: student?.ktm_url ? (
								<a href={`${import.meta.env.VITE_API_BASE_URL}/${student?.ktm_url}`} target="_blank">
									<FileImageComponent filePath={`${import.meta.env.VITE_API_BASE_URL}/${student?.ktm_url}`} fileName={`${student?.ktm_url.split('/').pop()}`} size="w-40 sm:w-50" />
								</a>
							) : (
								'-'
							),
						},
					].map(({ label, value }) => (
						<tr key={label}>
							<td className={`text-main-primary font-semibold py-2 ${label === 'NPM' ? 'align-center' : 'align-top'}`}>{label}</td>
							<td className={`px-4 sm:px-10 py-2 ${label === 'NPM' ? 'align-center' : 'align-top'}`}>:</td>
							<td className={`py-2 ${label === 'NPM' ? 'align-center' : 'align-top'}`}>{value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ProfilUser;
