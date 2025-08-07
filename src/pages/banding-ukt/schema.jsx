import { z } from 'zod';

export const createUktAppealSchema = z.object({
	semester: z.string().regex(/^\d{1,2}$/, { message: 'Semester harus berupa angka maksimal 2 digit (misal: "1", "12")' }),

	problem: z.enum(['natural', 'non_natural'], {
		errorMap: () => ({ message: 'Pilih salah satu tipe bencana' }),
	}),

	ktm: z.any().optional(),

	ukt_proof: z.any().optional(),

	transcript: z.any().optional(),

	sk: z.any().optional(),
});
