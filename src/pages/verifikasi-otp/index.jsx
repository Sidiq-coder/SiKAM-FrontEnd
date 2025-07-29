import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from '@/components/submit-button';
import OtpField from '@/components/otp-field';
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

	const onSubmit = async (data) => {
		try {
			const otp_code = data.otp.join('');

			const result = await verifyEmail({
				email,
				otp_code,
			});

			if (result?.data?.success) {
				toast.success(result?.data?.message);
				clearError();
				navigate('/login');
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
			<Link to="/register">
				<ChevronLeft className="w-7 h-7 text-dark" />
			</Link>

			<div className="sm:px-10 lg:px-16 py-10">
				{/* Title */}
				<h1 className="text-dark text-[26px] font-semibold text-center mb-0.5">Verifikasi OTP</h1>
				<p className="text-dark text-center font-extralight mb-6">Silahkan masukan kode OTP yang dikirim melalui Email yang anda daftarkan</p>

				{/* OTP Inputs */}
				<form className="text-center">
					<OtpField name="otp" setValue={setValue} getValues={getValues} control={control} error={errors.otp} />

					{/* Submit Button */}
					<SubmitButton label="Verifikasi" loadingLabel="Verifikasi..." isValid={isValid} isSubmitting={isSubmitting || isLoading} onSubmit={handleSubmit(onSubmit)} className="mt-6" />
				</form>
			</div>
		</div>
	);
}
