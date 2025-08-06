import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeft, CircleQuestionMark, Edit } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schema';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '@/components/input-field';
import SubmitButton from '@/components/submit-button';
import SelectField from '@/components/select-field';
import Textarea from '@/components/textarea';
import FileUploadDropzone from '@/components/file-upload-dropzone';
import { reportCategories, reportLevels } from '@/utils/reports';
import { urlToFile } from '@/utils/file';
import useReportStore from '@/stores/useReportStore';

const UbahLaporan = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { getReport, report, updateReport, clearError, error } = useReportStore();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		setValue,
		trigger,
		watch,
		reset,
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const result = await updateReport(id, data);

			if (result?.data?.success) {
				clearError();
				toast.success('Berhasil memperbarui laporan');
				navigate('/laporan');
			}
		} catch (error) {
			toast.error('Terjadi kesalahan!');
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		const fetch = async () => {
			await getReport(id);
		};
		fetch();
	}, [id]);

	useEffect(() => {
		if (report) {
			reset(
				{
					title: report?.title ?? '',
					report_level: report?.report_level ?? '',
					category: report?.category ?? '',
					description: report?.description ?? '',
				},
				{
					keepDefaultValues: true,
					shouldValidate: true,
				}
			);
		}
	}, [report, reset]);

	useEffect(() => {
		const fetchFile = async () => {
			if (!report?.file_url) return;

			try {
				const filename = report.file_url.split('/').pop() || 'file';
				const file = await urlToFile(`${import.meta.env.VITE_API_BASE_URL}/${report.file_url}`, filename);
				if (file) setValue('file', file);
			} catch (error) {
				console.error('Failed to fetch file:', error);
			}
		};

		fetchFile();
	}, [report?.file_url, setValue]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	return (
		<div className="container mx-auto md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="mx-auto bg-white text-dark rounded-2xl px-12 pt-8 pb-12 w-full max-w-5xl">
				<div className="flex justify-between items-center mb-10">
					<div className="cursor-pointer" onClick={() => window.history.back()}>
						<ChevronLeft className="w-8 h-8" />
					</div>
					<h2 className="text-3xl text-center text-dark font-bold">LAPORAN</h2>
					<div className="flex items-center space-x-3">
						<Edit className="w-6 h-6 text-[#0B4A94]" />
						<CircleQuestionMark className="w-8 h-8 text-[#EE4848]" />
					</div>
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
						value={watch('file')}
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

export default UbahLaporan;
