import * as z from 'zod';

export const adminDataSchema = z.object({
	name: z.string().min(3, { message: 'Nama minimal 3 karakter' }).max(100, { message: 'Nama maksimal 100 karakter' }).optional(),

	email: z.string().email({ message: 'Email tidak valid' }).max(50, { message: 'Email maksimal 50 karakter' }).optional(),
});
