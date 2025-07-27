import { useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from '@/components/submit-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from './schema';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import useOtpStore from '@/stores/useOtpStore';

export default function VerifikasiOTP() {
	const { verifyEmail, isLoading, error, clearError } = useAuth();
	const { email } = useOtpStore();
	const navigate = useNavigate();

	const {
		handleSubmit,
		control,
		setValue,
		getValues,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: zodResolver(otpSchema),
		mode: 'onChange',
		defaultValues: {
			otp: ['', '', '', '', '', ''],
		},
	});

	const inputsRef = useRef([]);

	const onSubmit = async (data) => {
		try {
			const otp_code = data.otp.join('');

			const result = await verifyEmail({
				email,
				otp_code,
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

	return (
		<div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl">
			{/* Back Button */}
			<Link to="/register">
				<ChevronLeft className="w-7 h-7 text-dark" />
			</Link>

			<div className="sm:px-10 lg:px-16 py-10">
				{/* Title */}
				<h1 className="text-dark text-[26px] font-semibold text-center mb-0.5">Verifikasi OTP</h1>
				<p className="text-dark text-center font-extralight mb-6">Silahkan masukan kode OTP yang dikirim melalui Email yang anda daftarkan</p>

				{/* OTP Inputs */}
				<form className="text-center">
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

					{/* Submit Button */}
					<SubmitButton label="Verifikasi" loadingLabel="Verifikasi..." isValid={isValid} isSubmitting={isSubmitting || isLoading} onSubmit={handleSubmit(onSubmit)} className="mt-6" />
				</form>
			</div>
		</div>
	);
}
