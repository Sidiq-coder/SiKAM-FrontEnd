import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { User, Mail, KeyRound, GraduationCap } from 'lucide-react';
import { setPageTitle } from '../../utils/titleManager';
import { schema } from './schema';
import { useNavigate } from 'react-router-dom';
import InputField from '@/components/input-field';
import FileUploadDropzone from '@/components/file-upload-dropzone';
import Header from './components/header';
import RedirectLink from './components/redirect-link';

const Registration = () => {
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
			formData.append('npm', data.npm);
			formData.append('email', data.email);
			formData.append('password', data.password);
			formData.append('nama', data.nama);
			formData.append('fotoKTM', data.fotoKTM[0]);

			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success('Registrasi berhasil! Silakan login.');

			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} catch (error) {
			toast.error('Terjadi kesalahan saat registrasi');
			console.error('Registration error:', error);
		}
	};

	useEffect(() => {
		setPageTitle('/register');
	}, []);

	return (
		<div className="bg-white rounded-2xl shadow-2xl px-12 pt-8 pb-12 w-full max-w-4xl">
			{/* Header */}
			<Header />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* NPM */}
				<InputField name="npm" label="NPM" placeholder="NPM" type="text" register={register} error={errors.npm} icon={GraduationCap} />

				{/* Password */}
				<InputField name="password" label="Password" placeholder="Password" register={register} error={errors.password} icon={KeyRound} isPassword />

				{/* Email */}
				<InputField name="email" label="Email" placeholder="Email" type="email" register={register} error={errors.email} icon={Mail} />

				{/* Konfirmasi Password */}
				<InputField name="confirmPassword" label="Konfirmasi Password" placeholder="Konfirmasi Password" register={register} error={errors.confirmPassword} icon={KeyRound} isPassword />

				{/* Nama */}
				<InputField name="nama" label="Nama" placeholder="Nama" type="text" register={register} error={errors.nama} icon={User} />

				{/* Upload Foto KTM */}
				<FileUploadDropzone name="fotoKTM" label="Foto KTM" setValue={setValue} trigger={trigger} error={errors.fotoKTM} />
			</div>

			<div className="flex items-center justify-between mt-12">
				{/* Login Link */}
				<RedirectLink sourceLabel="Sudah memiliki akun?" targetLabel="Login" href="/login" />

				{/* Submit Button */}
				<button
					type="button"
					onClick={handleSubmit(onSubmit)}
					disabled={!isValid || isSubmitting}
					className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
				>
					{isSubmitting ? 'Mendaftar...' : 'Daftar'}
				</button>
			</div>
		</div>
	);
};

export default Registration;
