import * as z from 'zod';

export const schema = z
	.object({
		otp: z
			.array(z.string())
			.length(6, { message: 'OTP harus terdiri dari 6 digit' })
			.refine((arr) => arr.every((digit) => digit !== ''), { message: 'Semua digit OTP harus diisi' })
			.refine((arr) => arr.every((digit) => /^\d$/.test(digit)), { message: 'Setiap digit OTP harus berupa angka 0-9' }),

		new_password: z
			.string()
			.min(6, { message: 'Kata sandi baru minimal 6 karakter' })
			.refine((val) => val.trim().length > 0, {
				message: 'Kata sandi baru tidak boleh kosong',
			}),

		confirm_password: z.string().min(1, 'Konfirmasi password harus diisi'),
	})
	.refine((data) => data.new_password === data.confirm_password, {
		message: 'Password dan konfirmasi password tidak sama',
		path: ['confirm_password'],
	});
