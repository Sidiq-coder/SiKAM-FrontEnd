import * as z from 'zod';

export const adminDataSchema = z.object({
	name: z.string().min(3, { message: 'Nama minimal 3 karakter' }).max(100, { message: 'Nama maksimal 100 karakter' }).optional(),

	email: z.string().email({ message: 'Email tidak valid' }).max(50, { message: 'Email maksimal 50 karakter' }).optional(),
});

export const verifyStudentSchema = z.object({
	campus_email: z
		.string({
			required_error: 'Email kampus wajib diisi',
			invalid_type_error: 'Email kampus tidak valid',
		})
		.max(50, { message: 'Email kampus tidak boleh lebih dari 50 karakter' })
		.email({ message: 'Email kampus tidak valid' })
		.regex(/^\d{10}@students\.unila\.ac\.id$/, {
			message: 'Email kampus harus menggunakan format NPM@students.unila.ac.id',
		}),

	status: z.enum(['verified', 'not_verified'], {
		errorMap: () => ({ message: 'Status hanya boleh bernilai verified atau not_verified' }),
	}),

	npm: z
		.string({
			required_error: 'NPM wajib diisi',
			invalid_type_error: 'NPM tidak valid',
		})
		.regex(/^\d{10}$/, {
			message: 'NPM harus terdiri dari 10 digit angka',
		}),
});
