import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { InfoIcon, User } from 'lucide-react';
import { schema } from './schema';
import { Navigate, useNavigate } from 'react-router-dom';
import InputField from '@/components/input-field';
import FileUploadDropzone from '@/components/file-upload-dropzone';
import SubmitButton from '@/components/submit-button';
import Header from './components/header';
import useAuth from '@/hooks/useAuth';
import useUserStore from '@/stores/useUserStore';
import { urlToFile } from '@/utils/file';
import { studentsStatus } from '@/utils/users';

const RegistrasiUlang = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { reRegister, clearError } = useUserStore();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		setValue,
		trigger,
		reset,
		watch,
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const result = await reRegister(data);

			if (result?.data?.success) {
				clearError();
				toast.success('Berhasil registrasi ulang');
				navigate('/profil');
			}
		} catch (error) {
			toast.error('Terjadi kesalahan!');
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		if (user) {
			reset(
				{
					name: user?.name ?? '',
				},
				{
					keepDefaultValues: true,
					shouldValidate: true,
				}
			);
		}
	}, [user, reset]);

	useEffect(() => {
		const fetchFile = async () => {
			if (!user?.ktm_url) return;

			try {
				const filename = user.ktm_url.split('/').pop() || 'file';
				const file = await urlToFile(`${import.meta.env.VITE_API_BASE_URL}/${user.ktm_url}`, filename);
				if (file) setValue('ktm', file);
			} catch (error) {
				console.error('Failed to fetch file:', error);
			}
		};

		fetchFile();
	}, [user?.ktm_url, setValue]);

	if (user && user.status !== studentsStatus.NOT_VERIFIED) {
		return <Navigate to="/profil" replace />;
	}

	return (
		<div className="bg-white rounded-2xl shadow-2xl px-8 pt-6 pb-10 md:px-12 md:pt-8 md:pb-12 w-full max-w-xl">
			{/* Header */}
			<Header />

			<div className="grid grid-cols-1 gap-x-3 gap-y-7">
				{/* Nama */}
				<InputField name="name" label="Nama" placeholder="Nama" type="text" register={register} error={errors.name} icon={User} />

				{/* Upload Foto KTM */}
				<FileUploadDropzone name="ktm" label="Foto KTM" setValue={setValue} trigger={trigger} error={errors.ktm} required={false} className="p-6" value={watch('ktm')} />
			</div>

			<div className="flex items-center text-[#909090] gap-1 mt-20">
				<InfoIcon className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
				<span className="text-sm sm:text-base">Pastikan Data yang Anda kirim sudah sesuai</span>
			</div>

			<div className="flex items-center justify-end mt-8">
				{/* Submit Button */}
				<SubmitButton label="Kirim Ulang Data" loadingLabel="Mengirim..." isValid={isValid} isSubmitting={isSubmitting} onSubmit={handleSubmit(onSubmit)} className="py-3.5 px-5" />
			</div>
		</div>
	);
};

export default RegistrasiUlang;
