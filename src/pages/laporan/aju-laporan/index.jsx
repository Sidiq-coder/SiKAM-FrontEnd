import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schema';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import SelectField from '@/components/select-field';
import Textarea from '@/components/textarea';
import FileUploadDropzone from '@/components/file-upload-dropzone';
import { ChevronLeft, CircleQuestionMark } from 'lucide-react';
import useReportStore from '@/stores/useReportStore';
import { reportCategories, reportLevels } from '@/utils/reports';

const AjuLaporan = () => {
	const { createReport } = useReportStore();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		setValue,
		trigger,
		watch,
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const result = await createReport(data);

			if (result?.data?.success) {
				toast.success('Berhasil mengajukan laporan');

				setTimeout(() => {
					navigate('/laporan');
				}, 2000);
			}
		} catch (error) {
			toast.error('Terjadi kesalahan!');
			console.error('Error:', error);
		}
	};

	return (
		<div className="container mx-auto md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="mx-auto bg-white text-dark rounded-2xl px-12 pt-8 pb-12 w-full max-w-5xl">
				<div className="flex justify-between items-center mb-10">
					<Link to="/laporan">
						<ChevronLeft className="w-8 h-8" />
					</Link>
					<h2 className="text-3xl text-center text-dark font-bold">LAPORAN</h2>
					<CircleQuestionMark className="w-8 h-8 text-[#EE4848]" />
				</div>

				<div className="grid grid-cols-1 gap-7">
					{/* Judul Laporan */}
					<InputField name="title" label="Judul Laporan" placeholder="Judul Laporan" type="text" register={register} error={errors.title} isSmall />

					{/* Tingkat Laporan */}
					<SelectField
						name="report_level"
						label="Tingkat Laporan"
						placeholder="Tingkatan laporan Anda"
						register={register}
						error={errors.report_level}
						options={reportLevels}
						setValue={setValue}
						watch={watch}
					/>

					{/* Kategori Laporan */}
					<SelectField
						name="category"
						label="Kategori Laporan"
						placeholder="Kategori laporan Anda"
						register={register}
						error={errors.category}
						options={reportCategories}
						setValue={setValue}
						watch={watch}
					/>

					{/* Isi Laporan */}
					<Textarea name="description" label="Isi Laporan" placeholder="Isi Laporan" register={register} error={errors.description} />

					{/* Upload Lampiran */}
					<FileUploadDropzone
						name="file"
						label="Lampiran"
						labelDescription="(File atau foto bukti pendukung)"
						setValue={setValue}
						trigger={trigger}
						error={errors.file}
						required={false}
						className="p-6"
					/>

					{/* Anonim */}
					<InputField name="isAnonymous" label="Anonim" placeholder="Anonim" type="checkbox" register={register} error={errors.isAnonymous} isSmall />
				</div>

				<div className="flex items-center justify-between mt-12">
					{/* Submit Button */}
					<SubmitButton label="Laporkan" loadingLabel="Melaporkan..." isValid={isValid} isSubmitting={isSubmitting} onSubmit={handleSubmit(onSubmit)} className="w-full" />
				</div>
			</div>
		</div>
	);
};

export default AjuLaporan;
