import * as z from 'zod';

export const schema = z
	.object({
		password: z
			.string()
			.min(8, 'Password minimal 8 karakter')
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, 'Password harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus'),
		confirmPassword: z.string().min(1, 'Konfirmasi password harus diisi'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password dan konfirmasi password tidak sama',
		path: ['confirmPassword'],
	});
