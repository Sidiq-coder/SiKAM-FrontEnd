import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { schema } from './schema';
import { toast } from 'react-toastify';
import { ChevronLeft, ChevronRight, KeyRound } from 'lucide-react';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import Header from './components/header';
import { useEffect, useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useOtpStore from '@/stores/useOtpStore';

const ChevronButton = ({ icon: Icon, onClick, isDisable = false }) => {
	return (
		<button onClick={onClick} className="bg-primary text-white rounded-lg p-2 hover:bg-dark-primary disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:cursor-not-allowed" disabled={isDisable}>
			{Icon && <Icon className="w-5 h-5" />}
		</button>
	);
};

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

	const inputsRef = useRef([]);

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

	const handleChange = (e, index) => {
		const value = e.target.value.replace(/\D/g, '');
		const digit = value.slice(-1);

		setValue(`otp.${index}`, digit);

		if (digit && index < 5) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === 'Backspace' && !getValues(`otp.${index}`) && index > 0) {
			inputsRef.current[index - 1]?.focus();
		} else if (e.key === 'Backspace' && getValues(`otp.${index}`)) {
			setValue(`otp.${index}`, '');
		}
	};

	const handlePaste = (e) => {
		const pasteData = e.clipboardData.getData('Text').replace(/\D/g, '');
		const otpArray = pasteData.split('').slice(0, 6);

		for (let i = 0; i < 6; i++) {
			setValue(`otp.${i}`, '');
		}

		otpArray.forEach((digit, idx) => {
			setValue(`otp.${idx}`, digit);
		});

		if (otpArray.length > 0) {
			const focusIndex = Math.min(otpArray.length, 5);
			inputsRef.current[focusIndex]?.focus();
		}

		e.preventDefault();
	};

	const handleFocus = (e) => {
		e.target.select();
	};

	useEffect(() => {
		if (error) toast.error(error);
	}, [error]);

	console.log(email);

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

						<div className="flex flex-wrap justify-center gap-3 mb-6">
							{Array.from({ length: 6 }).map((_, index) => (
								<Controller
									key={index}
									name={`otp.${index}`}
									control={control}
									render={({ field: { value, ...field } }) => (
										<input
											{...field}
											type="text"
											inputMode="numeric"
											pattern="[0-9]*"
											maxLength="1"
											value={value || ''}
											className="w-10 h-10 sm:w-12 sm:h-12 text-center text-dark sm:text-lg bg-[#EFEFEF] border border-primary rounded-md focus:outline-none focus:border-dark-primary"
											onChange={(e) => {
												field.onChange(e);
												handleChange(e, index);
											}}
											onKeyDown={(e) => handleKeyDown(e, index)}
											onPaste={handlePaste}
											onFocus={handleFocus}
											ref={(el) => (inputsRef.current[index] = el)}
											autoComplete="one-time-code"
										/>
									)}
								/>
							))}
						</div>

						{errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}

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
