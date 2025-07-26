import * as z from 'zod';

export const schema = z
	.object({
		campus_email: z
			.string()
			.min(1, 'Email kampus wajib diisi')
			.email('Email kampus tidak valid')
			.max(50, 'Email kampus tidak boleh lebih dari 50 karakter')
			.regex(/^\d{10}@students\.unila\.ac\.id$/, 'Email kampus harus menggunakan format NPM@students.unila.ac.id'),

		password: z.string().min(1, 'Password wajib diisi').min(6, 'Password minimal 6 karakter').max(100, 'Password tidak boleh lebih dari 100 karakter'),

		name: z.string().min(1, 'Nama wajib diisi').min(3, 'Nama minimal harus 3 huruf').max(100, 'Nama tidak boleh lebih dari 100 huruf'),

		confirmPassword: z.string().min(1, 'Konfirmasi password harus diisi'),

		ktm: z
			.any()
			.refine((files) => files?.length > 0, 'Foto KTM wajib diupload')
			.refine(
				(files) => files?.[0]?.size <= 5000000, // 5MB
				'Ukuran file maksimal 5MB'
			)
			.refine((files) => ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type), 'Format file harus JPG, JPEG, atau PNG'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password dan konfirmasi password tidak sama',
		path: ['confirmPassword'],
	});
