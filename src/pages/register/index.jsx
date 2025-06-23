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
import SubmitButton from '@/components/submit-button';
import Header from './components/header';
import RedirectLink from './components/redirect-link';

const Register = () => {
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

			toast.success('Registrasi berhasil! Silahkan login.');

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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-7">
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
				<SubmitButton label="Daftar" loadingLabel="Mendaftar..." isValid={isValid} isSubmitting={isSubmitting} onSubmit={handleSubmit(onSubmit)} />
			</div>
		</div>
	);
};

export default Register;
