import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, Mail, KeyRound, ChevronRight, ChevronLeft } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schema';
import InputField from '@/components/input-field';
import FileUploadDropzone from '@/components/file-upload-dropzone';
import SubmitButton from '@/components/submit-button';
import ChevronButton from '@/components/chevron-button';
import Header from './components/header';
import RedirectLink from './components/redirect-link';
import useIsMobile from '@/hooks/useIsMobile';
import useAuth from '@/hooks/useAuth';
import useOtpStore from '@/stores/useOtpStore';

const Register = () => {
	const { register: registerUser, isLoading, error, clearError } = useAuth();
	const { setEmail } = useOtpStore();

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
			const result = await registerUser(data);

			if (result?.data?.success) {
				setEmail(data.campus_email);
				toast.success(result?.data?.message);
				clearError();
				navigate('/verifikasi-otp');
			}
		} catch (error) {
			toast.error('Terjadi kesalahan saat registrasi');
			console.error('Registration error:', error);
		}
	};

	useEffect(() => {
		if (error) toast.error(error);
	}, [error]);

	return (
		<div className="bg-white rounded-2xl shadow-2xl px-8 pt-6 pb-10 md:px-12 md:pt-8 md:pb-12 w-full max-w-4xl">
			{/* Header */}
			<Header />

			{/* Desktop View */}
			{!isMobile && (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-7">
						{/* Email */}
						<InputField name="campus_email" label="Email" placeholder="Email" type="email" register={register} error={errors.campus_email} icon={Mail} />

						{/* Password */}
						<InputField name="password" label="Password" placeholder="Password" register={register} error={errors.password} icon={KeyRound} isPassword />

						{/* Nama */}
						<InputField name="name" label="Nama" placeholder="Nama" type="text" register={register} error={errors.name} icon={User} />

						{/* Konfirmasi Password */}
						<InputField name="confirmPassword" label="Konfirmasi Password" placeholder="Konfirmasi Password" register={register} error={errors.confirmPassword} icon={KeyRound} isPassword />

						{/* Upload Foto KTM */}
						<div className="col-span-full">
							<FileUploadDropzone name="ktm" label="Foto KTM" setValue={setValue} trigger={trigger} error={errors.ktm} inputIcon={null} inputDescription="Pilih file atau tarik ke sini" />
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
						<InputField name="name" label="Nama" placeholder="Nama" type="text" register={register} error={errors.name} icon={User} />

						{/* Email */}
						<InputField name="campus_email" label="Email" placeholder="Email" type="email" register={register} error={errors.campus_email} icon={Mail} />
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
							<FileUploadDropzone name="ktm" label="Foto KTM" setValue={setValue} trigger={trigger} error={errors.ktm} inputIcon={null} inputDescription="Pilih file atau tarik ke sini" />
						</div>
					</div>

					<div className="flex flex-wrap items-center justify-between mt-12 gap-2">
						{/* Prev Button */}
						<ChevronButton onClick={prevStep} icon={ChevronLeft} />

						{/* Submit Button */}
						<SubmitButton label="Daftar" loadingLabel="Mendaftar..." isValid={isValid} isSubmitting={isSubmitting || isLoading} onSubmit={handleSubmit(onSubmit)} />
					</div>
				</>
			)}
		</div>
	);
};

export default Register;
