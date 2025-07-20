import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, Mail, KeyRound, ChevronRight, ChevronLeft } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schema';
import InputField from '@/components/input-field';
import FileUploadDropzone from '@/components/file-upload-dropzone';
import SubmitButton from '@/components/submit-button';
import Header from './components/header';
import RedirectLink from './components/redirect-link';
import useIsMobile from '@/hooks/useIsMobile';

const ChevronButton = ({ icon: Icon, onClick }) => {
	return (
		<button onClick={onClick} className="bg-primary text-white rounded-lg p-2 hover:bg-darkPrimary">
			{Icon && <Icon className="w-5 h-5" />}
		</button>
	);
};

const Register = () => {
	const isMobile = useIsMobile();
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
	const [step, setStep] = useState(1);

	const nextStep = () => {
		if (step === 1) setStep(step + 1);
	};
	const prevStep = () => {
		if (step === 2) setStep(step - 1);
	};

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();
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

	return (
		<div className="bg-white rounded-2xl shadow-2xl px-8 pt-6 pb-10 md:px-12 md:pt-8 md:pb-12 w-full max-w-4xl">
			{/* Header */}
			<Header />

			{/* Desktop View */}
			{!isMobile && (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-7">
						{/* Email */}
						<InputField name="email" label="Email" placeholder="Email" type="email" register={register} error={errors.email} icon={Mail} />

						{/* Password */}
						<InputField name="password" label="Password" placeholder="Password" register={register} error={errors.password} icon={KeyRound} isPassword />

						{/* Nama */}
						<InputField name="nama" label="Nama" placeholder="Nama" type="text" register={register} error={errors.nama} icon={User} />

						{/* Konfirmasi Password */}
						<InputField name="confirmPassword" label="Konfirmasi Password" placeholder="Konfirmasi Password" register={register} error={errors.confirmPassword} icon={KeyRound} isPassword />

						{/* Upload Foto KTM */}
						<div className="col-span-full">
							<FileUploadDropzone name="fotoKTM" label="Foto KTM" setValue={setValue} trigger={trigger} error={errors.fotoKTM} inputIcon={null} inputDescription="Pilih file atau tarik ke sini" />
						</div>
					</div>

					<div className="flex items-center justify-between mt-12">
						{/* Login Link */}
						<RedirectLink sourceLabel="Sudah memiliki akun?" targetLabel="Login" href="/login" />

						{/* Submit Button */}
						<SubmitButton label="Daftar" loadingLabel="Mendaftar..." isValid={isValid} isSubmitting={isSubmitting} onSubmit={handleSubmit(onSubmit)} />
					</div>
				</>
			)}

			{/* Mobile View */}
			{isMobile && step === 1 && (
				<>
					<div className="grid grid-cols-1 gap-y-7">
						{/* Nama */}
						<InputField name="nama" label="Nama" placeholder="Nama" type="text" register={register} error={errors.nama} icon={User} />

						{/* Email */}
						<InputField name="email" label="Email" placeholder="Email" type="email" register={register} error={errors.email} icon={Mail} />
					</div>

					<div className="flex flex-wrap items-center justify-between mt-12 gap-2">
						{/* Login Link */}
						<RedirectLink sourceLabel="Sudah memiliki akun?" targetLabel="Login" href="/login" />

						{/* Next Button */}
						<ChevronButton onClick={nextStep} icon={ChevronRight} />
					</div>
				</>
			)}

			{isMobile && step === 2 && (
				<>
					<div className="grid grid-cols-1 gap-y-7">
						{/* Password */}
						<InputField name="password" label="Password" placeholder="Password" register={register} error={errors.password} icon={KeyRound} isPassword />

						{/* Konfirmasi Password */}
						<InputField name="confirmPassword" label="Konfirmasi Password" placeholder="Konfirmasi Password" register={register} error={errors.confirmPassword} icon={KeyRound} isPassword />

						{/* Upload Foto KTM */}
						<div className="col-span-full">
							<FileUploadDropzone name="fotoKTM" label="Foto KTM" setValue={setValue} trigger={trigger} error={errors.fotoKTM} inputIcon={null} inputDescription="Pilih file atau tarik ke sini" />
						</div>
					</div>

					<div className="flex flex-wrap items-center justify-between mt-12 gap-2">
						{/* Prev Button */}
						<ChevronButton onClick={prevStep} icon={ChevronLeft} />

						{/* Submit Button */}
						<SubmitButton label="Daftar" loadingLabel="Mendaftar..." isValid={isValid} isSubmitting={isSubmitting} onSubmit={handleSubmit(onSubmit)} />
					</div>
				</>
			)}
		</div>
	);
};

export default Register;
