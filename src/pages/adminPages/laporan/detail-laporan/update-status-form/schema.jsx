import { z } from 'zod';
import { reportStatuses } from '@/utils/reports';

export const schema = z.object({
	status: z.enum(
		reportStatuses.map((status) => status.value),
		{
			required_error: 'Status wajib diisi',
			invalid_type_error: 'Status harus berupa string',
		}
	),
	response: z
		.string({
			invalid_type_error: 'Response harus berupa string',
		})
		.min(5, { message: 'Response minimal terdiri dari 5 karakter' })
		.optional(),
});
