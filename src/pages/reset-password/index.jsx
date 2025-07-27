import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { schema } from './schema';
import { toast } from 'react-toastify';
import { ChevronLeft, ChevronRight, KeyRound } from 'lucide-react';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import OtpField from '@/components/otp-field';
import Header from './components/header';
import useAuth from '@/hooks/useAuth';
import useOtpStore from '@/stores/useOtpStore';
import ChevronButton from '@/components/chevron-button';

const ResetPassword = () => {
	const navigate = useNavigate();
	const { verifyPasswordReset, isLoading, error, clearError } = useAuth();
	const { email } = useOtpStore();
	const {
		register,
		handleSubmit,
		control,
		setValue,
		getValues,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			otp: ['', '', '', '', '', ''],
		},
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
			const otp = data.otp.join('');

			const result = await verifyPasswordReset({
				email,
				otp,
				new_password: data.new_password,
			});

			if (result?.data?.success) {
				toast.success(result?.data?.message);
				setTimeout(() => {
					clearError();
					navigate('/login');
				}, 2000);
			}
		} catch (error) {
			toast.error('Terjadi kesalahan');
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		if (error) toast.error(error);
	}, [error]);

	return (
		<div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl">
			{/* Back Button */}
			<Link to="/lupa-password">
				<ChevronLeft className="w-7 h-7 text-dark" />
			</Link>

			<div className="sm:px-10 py-10">
				{/* OTP Inputs */}
				{step === 1 && (
					<>
						{/* Title */}
						<h1 className="text-dark text-[26px] font-semibold text-center mb-0.5">Verifikasi OTP</h1>
						<p className="text-dark text-center font-extralight mb-6">Silahkan masukan kode OTP yang dikirim melalui Email yang anda masukkan</p>

						<OtpField name="otp" setValue={setValue} getValues={getValues} control={control} error={errors.otp} />

						<div className="flex flex-wrap items-center justify-end mt-12">
							{/* Next Button */}
							<ChevronButton onClick={nextStep} icon={ChevronRight} isDisable={!getValues('otp').every((digit) => /^\d$/.test(digit))} />
						</div>
					</>
				)}

				{step === 2 && (
					<>
						{/* Header */}
						<Header />

						<div className="grid grid-cols-1 gap-7">
							{/* Password */}
							<InputField name="new_password" label="Password" placeholder="Password" register={register} error={errors.new_password} icon={KeyRound} isPassword />

							{/* Password */}
							<InputField
								name="confirm_password"
								label="Konfirmasi Password"
								placeholder="Konfirmasi Password"
								register={register}
								error={errors.confirm_password}
								icon={KeyRound}
								isPassword
								description="Password Anda harus memiliki minimal 8 karakter dan menyertakan huruf besar, huruf kecil, angka, serta karakter khusus."
							/>
						</div>

						<div className="flex flex-wrap items-center justify-between mt-12 gap-2">
							{/* Prev Button */}
							<ChevronButton onClick={prevStep} icon={ChevronLeft} />

							{/* Submit Button */}
							<SubmitButton label="Reset Password" loadingLabel="Reset..." isValid={isValid} isSubmitting={isSubmitting || isLoading} onSubmit={handleSubmit(onSubmit)} />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ResetPassword;
