import * as z from 'zod';

export const schema = z.object({
	identifier: z.union([z.string().email('Identifier harus berupa email valid atau NPM 10 digit'), z.string().regex(/^\d{10}$/, 'NPM harus 10 digit angka')], {
		errorMap: () => ({ message: 'Identifier harus berupa email valid atau NPM 10 digit' }),
	}),

	password: z.string().min(1, 'Password wajib diisi').min(6, 'Password minimal 6 karakter').max(100, 'Password tidak boleh lebih dari 100 karakter'),
});
