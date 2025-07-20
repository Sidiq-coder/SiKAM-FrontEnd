import * as z from 'zod';

export const schema = z.object({
	nama: z.string().min(1, 'Nama harus diisi').min(2, 'Nama minimal 2 karakter'),
	fotoKTM: z.any().refine((file) => file && file.length > 0, 'Foto KTM harus diupload'),
});
