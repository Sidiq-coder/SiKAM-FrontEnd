import * as z from 'zod';

export const schema = z.object({
	npm: z.string().min(10, 'NPM minimal 10 angka').regex(/^\d+$/, 'NPM harus berupa angka'),
	password: z.string().min(1, 'Password harus diisi'),
});
