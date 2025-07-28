import * as z from 'zod';

export const studentDataSchema = z.object({
	name: z.string().min(3, { message: 'Nama minimal terdiri dari 3 karakter' }).max(100, { message: 'Nama tidak boleh lebih dari 100 karakter' }).optional(),

	program_study: z.string().max(45, { message: 'Program studi tidak boleh lebih dari 45 karakter' }).optional(),

	batch: z.string().regex(/^\d+$/, { message: 'Angkatan harus berupa angka' }).optional(),
});

export const resetPasswordSchema = z
	.object({
		old_password: z.string({
			required_error: 'Password lama wajib diisi',
		}),
		new_password: z
			.string({
				required_error: 'Password baru wajib diisi',
			})
			.min(6, { message: 'Password baru minimal 6 karakter' }),
		confirm_new_password: z.string({
			required_error: 'Konfirmasi password wajib diisi',
		}),
	})
	.refine((data) => data.new_password === data.confirm_new_password, {
		path: ['confirm_new_password'],
		message: 'Konfirmasi kata sandi tidak cocok dengan kata sandi baru',
	});
