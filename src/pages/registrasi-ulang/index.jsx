import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { InfoIcon, User } from 'lucide-react';
import { schema } from './schema';
import { useNavigate } from 'react-router-dom';
import InputField from '@/components/input-field';
import FileUploadDropzone from '@/components/file-upload-dropzone';
import SubmitButton from '@/components/submit-button';
import Header from './components/header';

const RegistrasiUlang = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		setValue,
		trigger,
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append('nama', data.nama);
			formData.append('fotoKTM', data.fotoKTM[0]);

			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success('Registrasi ulang berhasil! Silahkan login.');

			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} catch (error) {
			toast.error('Terjadi kesalahan saat registrasi');
			console.error('Registration error:', error);
		}
	};

	return (
		<div className="bg-white rounded-2xl shadow-2xl px-8 pt-6 pb-10 md:px-12 md:pt-8 md:pb-12 w-full max-w-xl">
			{/* Header */}
			<Header />

			<div className="grid grid-cols-1 gap-x-3 gap-y-7">
				{/* Nama */}
				<InputField name="nama" label="Nama" placeholder="Nama" type="text" register={register} error={errors.nama} icon={User} />

				{/* Upload Foto KTM */}
				<FileUploadDropzone name="fotoKTM" label="Foto KTM" setValue={setValue} trigger={trigger} error={errors.fotoKTM} />
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
