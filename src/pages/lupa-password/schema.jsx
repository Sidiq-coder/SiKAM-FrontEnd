import * as z from 'zod';

export const schema = z.object({
	email: z.string().min(1, { message: 'Email tidak boleh kosong' }).email({ message: 'Email tidak valid' }),
});
