import { z } from 'zod';

export const createAdminSchema = z
	.object({
		name: z.string().min(3, { message: 'Nama minimal 3 karakter' }).max(100, { message: 'Nama maksimal 100 karakter' }).nonempty({ message: 'Nama tidak boleh kosong' }),

		email: z.string().email({ message: 'Email tidak valid' }).max(50, { message: 'Email tidak boleh lebih dari 50 karakter' }).nonempty({ message: 'Email tidak boleh kosong' }),

		password: z.string().min(6, { message: 'Password minimal 6 karakter' }).max(100, { message: 'Password maksimal 100 karakter' }).nonempty({ message: 'Password tidak boleh kosong' }),

		confirmPassword: z.string().min(1, { message: 'Konfirmasi password harus diisi' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password dan konfirmasi password tidak sama',
		path: ['confirmPassword'],
	});
