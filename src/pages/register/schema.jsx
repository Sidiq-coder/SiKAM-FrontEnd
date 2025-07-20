import * as z from 'zod';

export const schema = z
	.object({
		email: z.string().min(1, 'Email harus diisi').email('Format email tidak valid'),
		password: z
			.string()
			.min(8, 'Password minimal 8 karakter')
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, 'Password harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus'),
		nama: z.string().min(1, 'Nama harus diisi').min(2, 'Nama minimal 2 karakter'),
		confirmPassword: z.string().min(1, 'Konfirmasi password harus diisi'),
		fotoKTM: z.any().refine((file) => file && file.length > 0, 'Foto KTM harus diupload'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password dan konfirmasi password tidak sama',
		path: ['confirmPassword'],
	});
