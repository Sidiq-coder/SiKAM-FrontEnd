import { z } from 'zod';

export const otpSchema = z.object({
	otp: z
		.array(z.string())
		.length(6, { message: 'OTP harus terdiri dari 6 digit' })
		.refine((arr) => arr.every((digit) => digit !== ''), { message: 'Semua digit OTP harus diisi' })
		.refine((arr) => arr.every((digit) => /^\d$/.test(digit)), { message: 'Setiap digit OTP harus berupa angka 0-9' }),
});
