import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import { useEffect } from 'react';
import { setPageTitle } from '@/utils/titleManager';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schema';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import SelectField from '@/components/select-field';
import Textarea from '@/components/textarea';
import FileUploadDropzone from '@/components/file-upload-dropzone';
import { ChevronLeft, CircleQuestionMark, Edit } from 'lucide-react';

const reportData = {
	id: 1,
	title: 'Lampu Kelas C.1 Sering Padam Saat Perkuliahan',
	description:
		'Saya ingin melaporkan bahwa lampu di ruang kelas C.1 sering padam secara tiba-tiba selama kegiatan perkuliahan berlangsung. Hal ini sudah terjadi beberapa kali sejak awal bulan Juni. Kondisi ini mengganggu kenyamanan belajar, terutama saat jadwal kuliah sore menjelang malam.',
	author: 'John Doe',
	date: '27 Jun 09:20',
	status: 'Pending',
	category: 'Fasilitas',
	level: 'Universitas',
	votes: 0,
	timeAgo: '2 Jam lalu',
	isMy: true,
	file: 'file.jpg',
};

const UbahLaporan = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		setValue,
		trigger,
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append('npm', data.npm);
			formData.append('password', data.password);

			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success('Berhasil Mengajukan Laporan!');

			setTimeout(() => {
				navigate('/laporan');
			}, 2000);
		} catch (error) {
			toast.error('Terjadi kesalahan!');
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		setPageTitle('/ubah-laporan');
		setValue('judulLaporan', reportData.title);
		setValue('tingkatLaporan', reportData.level);
		setValue('kategoriLaporan', reportData.category);
		setValue('isiLaporan', reportData.description);
		setValue('lampiran', reportData.file);
		setValue('isAnonim', reportData.author === null);
	}, []);

	const tingkatLaporanOptions = [
		{
			label: 'Universitas',
			value: 'universitas',
		},
		{
			label: 'Fakultas',
			value: 'fakultas',
		},
	];

	const kategoriLaporanOptions = [
		{
			label: 'Fasilitas',
			value: 'fasilitas',
		},
		{
			label: 'Kebersihan',
			value: 'kebersihan',
		},
	];

	return (
		<div className="container mx-auto md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="mx-auto bg-white text-[#2A2A2A] rounded-2xl px-12 pt-8 pb-12 w-full max-w-5xl">
				<div className="flex justify-between items-center mb-10">
					<Link to="/laporan">
						<ChevronLeft className="w-8 h-8" />
					</Link>
					<h2 className="text-3xl text-center text-[#2A2A2A] font-bold">LAPORAN</h2>
					<div className="flex items-center space-x-3">
						<Edit className="w-6 h-6 text-[#0B4A94]" />
						<CircleQuestionMark className="w-8 h-8 text-[#EE4848]" />
					</div>
				</div>
				<div className="grid grid-cols-1 gap-7">
					{/* Judul Laporan */}
					<InputField name="judulLaporan" label="Judul Laporan" placeholder="Judul Laporan" type="text" register={register} error={errors.judulLaporan} isSmall />

					{/* Tingkat Laporan */}
					<SelectField name="tingkatLaporan" label="Tingkat Laporan" placeholder="Tingkatan laporan Anda" register={register} error={errors.tingkatLaporan} options={tingkatLaporanOptions} />

					{/* Kategori Laporan */}
					<SelectField name="kategoriLaporan" label="Kategori Laporan" placeholder="Kategori laporan Anda" register={register} error={errors.kategoriLaporan} options={kategoriLaporanOptions} />

					{/* Isi Laporan */}
					<Textarea name="isiLaporan" label="Isi Laporan" placeholder="Isi Laporan" register={register} error={errors.isiLaporan} />

					{/* Upload Lampiran */}
					<FileUploadDropzone name="lampiran" label="Lampiran" labelDescription="(File atau foto bukti pendukung)" setValue={setValue} trigger={trigger} error={errors.lampiran} className="p-6" />

					{/* Anonim */}
					<InputField name="isAnonim" label="Anonim" placeholder="Anonim" type="checkbox" register={register} error={errors.isAnonim} isSmall />
				</div>

				<div className="flex items-center justify-between mt-12">
					{/* Submit Button */}
					<SubmitButton label="Laporkan" loadingLabel="Melaporkan..." isValid={isValid} isSubmitting={isSubmitting} onSubmit={handleSubmit(onSubmit)} className="w-full" />
				</div>
			</div>
		</div>
	);
};

export default UbahLaporan;
