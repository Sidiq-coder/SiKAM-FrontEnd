import * as z from 'zod';

export const schema = z.object({
	judulLaporan: z.string().min(1, 'Judul Laporan harus diisi'),
	tingkatLaporan: z.string().min(1, 'Tingkat Laporan harus diisi'),
	kategoriLaporan: z.string().min(1, 'Kategori Laporan harus diisi'),
	isiLaporan: z.string().min(1, 'Isi Laporan harus diisi'),
	lampiran: z.any().refine((file) => file && file.length > 0, 'Lampiran harus diupload'),
	isAnonim: z.boolean(),
});
