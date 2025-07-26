import * as z from 'zod';
import { reportCategories, reportLevels } from '@/utils/reports';

export const schema = z.object({
	title: z.string({ required_error: 'Judul wajib diisi' }).max(50, { message: 'Judul maksimal 50 karakter' }).nonempty({ message: 'Judul wajib diisi' }),

	report_level: z.enum(
		reportLevels.map((item) => item.value),
		{
			required_error: 'Tingkat laporan wajib dipilih',
			invalid_type_error: 'Tingkat laporan tidak valid',
		}
	),

	category: z.enum(
		reportCategories.map((item) => item.value),
		{
			required_error: 'Kategori wajib dipilih',
			invalid_type_error: 'Kategori tidak valid',
		}
	),

	description: z.string({ required_error: 'Deskripsi wajib diisi' }).max(1000, { message: 'Deskripsi maksimal 1000 karakter' }).nonempty({ message: 'Deskripsi wajib diisi' }),

	isAnonymous: z.boolean().default(false),

	file: z
		.any()
		.optional()
		.refine((file) => !file || file.length > 0, {
			message: 'Lampiran harus diupload',
		}),
});
