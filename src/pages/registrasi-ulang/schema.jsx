import * as z from 'zod';

export const schema = z.object({
	name: z.string({ required_error: 'Nama wajib diisi' }).min(3, 'Nama minimal 3 karakter').max(100, 'Nama maksimal 100 karakter').nonempty({ message: 'Nama tidak boleh kosong' }),

	ktm: z.any().refine((file) => file !== null, 'Foto KTM harus diupload'),
});
