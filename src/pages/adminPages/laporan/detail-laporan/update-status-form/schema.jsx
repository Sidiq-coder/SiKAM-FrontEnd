import { z } from 'zod';

export const schema = z.object({
	status: z.enum(['responded', 'rejected'], {
		required_error: 'Status wajib dipilih',
	}),
	response: z
		.string()
		.min(1, {
			message: 'Tanggapan wajib diisi',
		})
		.max(1000, {
			message: 'Tanggapan maksimal 1000 karakter',
		}),
});
