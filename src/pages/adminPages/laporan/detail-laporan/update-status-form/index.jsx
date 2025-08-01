import { useEffect, useMemo } from 'react';
import { ArrowRight, Info, MessageSquare, Pin, Check } from 'lucide-react';
import Button from '@/components/button';
import SubmitButton from '@/components/submit-button';
import { reportStatuses } from '@/utils/reports';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schema';
import useReportStore from '@/stores/useReportStore';
import { toast } from 'react-toastify';

const UpdateStatusForm = () => {
	const { updateReportStatus, report, clearError, isLoading } = useReportStore();

	const currentOption = useMemo(() => {
		return reportStatuses.find((opt) => opt.value === report.status);
	}, [report.status]);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			data.id = report.id;
			const result = await updateReportStatus(data);

			if (result?.data?.success) {
				toast.success('Perubahan status berhasil disimpan');
				clearError();
			}
		} catch (error) {
			toast.error('Terjadi kesalahan');
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		if (report) {
			reset(
				{
					status: report?.status ?? 'pending',
					response: report?.response ?? '',
				},
				{
					keepDefaultValues: true,
					shouldValidate: true,
				}
			);
		}
	}, [report, reset]);

	return (
		<div className="space-y-10 w-full">
			{/* Ubah Status */}
			<div>
				<label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
					<Pin className="w-4 h-4" />
					Ubah Status <span className="text-red">*</span>
				</label>

				<div className="flex items-center gap-3 relative">
					{/* Current Status */}
					<div className={`flex items-center gap-1 px-5 py-3 bg-white rounded-md shadow-md text-sm font-medium ${currentOption.textColor}`}>
						{<currentOption.icon className="w-4 h-4" />}
						{currentOption.label}
					</div>

					<ArrowRight className="text-gray-500 w-4 h-4" />

					{/* Dropdown */}
					<select className="px-5 py-3 shadow-md rounded-md text-sm focus:outline-none pr-7" {...register('status')}>
						{reportStatuses.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>

					{/* Info Tooltip */}
					<div className="group relative ml-1">
						<Info className="w-4 h-4 text-gray cursor-pointer" />
						<div className="absolute top-6 left-1/2 -translate-x-1/2 bg-dark text-white text-xs rounded-md py-2 px-3 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
							Pilih perubahan status berdasarkan
							<br />
							tahap penanganan laporan saat ini
						</div>
					</div>
				</div>

				{errors?.status?.message && <p className="text-red text-sm mt-1">{errors?.status?.message}</p>}
			</div>

			{/* Tanggapi */}
			<div>
				<label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
					<MessageSquare className="w-4 h-4" />
					Tanggapi
				</label>
				<textarea
					placeholder="Tulis tanggapan terhadap laporan ini (opsional, tapi disarankan jika ubah status)"
					className="w-full border border-[#ACACAC99] rounded-md p-3 text-sm focus:outline-none focus:ring focus:ring-blue-300 min-h-[120px]"
					{...register('response')}
				/>
				{errors?.response?.message && <p className="text-red text-sm mt-1">{errors?.response?.message}</p>}
			</div>

			{/* Actions */}
			<div className="flex justify-end gap-4">
				<Button variant="danger" label="Batal" />
				<SubmitButton
					label="Simpan"
					loadingLabel="Simpan..."
					isValid={isValid}
					isSubmitting={isSubmitting | isLoading}
					onSubmit={handleSubmit(onSubmit)}
					icon={<Check className="w-4 h-4" />}
					iconPosition="right"
				/>
			</div>
		</div>
	);
};

export default UpdateStatusForm;
