import { z } from 'zod';

export const updateNewsSchema = z.object({
	title: z
		.string({
			required_error: 'Judul wajib diisi',
			invalid_type_error: 'Judul harus berupa teks',
		})
		.min(3, { message: 'Judul minimal terdiri dari 3 karakter' })
		.max(50, { message: 'Judul maksimal terdiri dari 50 karakter' }),

	description: z
		.string({
			required_error: 'Deskripsi wajib diisi',
			invalid_type_error: 'Deskripsi harus berupa teks',
		})
		.min(10, { message: 'Deskripsi minimal terdiri dari 10 karakter' }),

	status: z
		.enum(['draft', 'published'], {
			errorMap: () => ({ message: 'Status hanya boleh berisi "draft" atau "published"' }),
		})
		.default('draft'),

	cover: z.any().optional(),

	attachment: z.any().optional(),
});
