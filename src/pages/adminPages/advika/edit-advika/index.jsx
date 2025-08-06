import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Upload, Save, FileText, Image, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateNewsSchema } from './schema';
import useNewsStore from '@/stores/useNewsStore';
import useAuth from '@/hooks/useAuth';
import { urlToFile } from '@/utils/file';

export default function BuatAdvika() {
	const { id } = useParams();
	const { getNewsById, updateNews, newsItem, error, clearError, isLoading } = useNewsStore();
	const { user } = useAuth();

	const [selectedFilter, setSelectedFilter] = useState('published');
	const [imagePreview, setImagePreview] = useState(null);
	const [pdfFile, setPdfFile] = useState(null);

	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: zodResolver(updateNewsSchema),
		mode: 'onChange',
		defaultValues: {
			title: '',
			description: '',
			status: 'published',
			cover: null,
			attachment: null,
		},
	});

	const onSubmit = async (data) => {
		try {
			const result = await updateNews(id, data);
			if (result?.data?.success) {
				toast.success(result?.data?.message);
				clearError();
			}
		} catch (error) {
			toast.error('Terjadi kesalahan');
			console.error('Error:', error);
		}
	};

	const handleCoverChange = (file) => {
		if (file && file.type.startsWith('image/')) {
			setValue('cover', file);
			setImagePreview(URL.createObjectURL(file));
		} else {
			toast.error('Please upload a valid image file.');
		}
	};

	const handlePdfChange = (file) => {
		if (file && file.type === 'application/pdf') {
			setValue('attachment', file);
			setPdfFile(file);
		} else {
			toast.error('Please upload a valid PDF file.');
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const files = Array.from(e.dataTransfer.files);
		const file = files[0];

		if (file && file.type === 'application/pdf') {
			handlePdfChange(file);
		} else {
			toast.error('Please drop a valid PDF file.');
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		const fetch = async () => {
			await getNewsById(id);
		};
		fetch();
	}, [id]);

	useEffect(() => {
		if (newsItem) {
			reset(
				{
					title: newsItem?.title ?? '',
					description: newsItem?.description ?? '',
					status: newsItem?.status ?? 'published',
				},
				{
					keepDefaultValues: true,
					shouldValidate: true,
				}
			);
		}
	}, [newsItem, reset]);

	useEffect(() => {
		const fetchCoverFile = async () => {
			if (!newsItem?.cover_url) return;

			try {
				const filename = newsItem.cover_url.split('/').pop() || 'file';
				const file = await urlToFile(`${import.meta.env.VITE_API_BASE_URL}/${newsItem.cover_url}`, filename);
				if (file) setValue('cover', file);
			} catch (error) {
				console.error('Failed to fetch file:', error);
			}
		};

		const fetchAttachmentFile = async () => {
			if (!newsItem?.attachment_url) return;

			try {
				const filename = newsItem.attachment_url.split('/').pop() || 'file';
				const file = await urlToFile(`${import.meta.env.VITE_API_BASE_URL}/${newsItem.attachment_url}`, filename);
				if (file) setValue('attachment', file);
			} catch (error) {
				console.error('Failed to fetch file:', error);
			}
		};

		fetchCoverFile();
		fetchAttachmentFile();
	}, [newsItem?.cover_url, newsItem?.attachment_url, setValue]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	return (
		<div className="bg-white md:px-10 lg:px-20 px-4 py-18 pb-[120px]">
			<div className="container mx-auto">
				{/* Header */}
				<div className="flex flex-wrap items-center justify-between gap-4 mb-8">
					<div className="flex flex-wrap items-center gap-4">
						{/* Back Button */}
						<Link to="/admin/advika" className="flex items-center gap-2 text-dark">
							<ChevronLeft size={24} />
							<span className="text-lg">Advika</span>
						</Link>

						{/* Status Filter */}
						<div className="flex items-center gap-2 ml-8">
							<span className="text-lg">status :</span>
							<div className="relative text-white">
								<div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
									{selectedFilter === 'published' && <Upload size={16} />}
									{selectedFilter === 'draft' && <FileText size={16} />}
								</div>

								<select
									value={selectedFilter}
									onChange={(e) => {
										setSelectedFilter(e.target.value);
										setValue('status', e.target.value);
									}}
									className="bg-yellow px-10 py-2 rounded-md appearance-none cursor-pointer pr-8"
								>
									<option value="published">Publish</option>
									<option value="draft">Draft</option>
								</select>

								<div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
									<ChevronLeft size={16} className="rotate-90" />
								</div>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-wrap gap-2">
						<button
							onClick={handleSubmit(onSubmit)}
							disabled={!isValid || isSubmitting || isLoading}
							className="flex items-center gap-2 bg-yellow text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<Save size={16} />
							{isSubmitting || isLoading ? 'Menyimpan...' : 'Simpan'}
						</button>

						<button className="flex items-center gap-2 bg-red text-white px-4 py-2 rounded-md">
							<XCircle size={16} />
							Batal
						</button>
					</div>
				</div>

				{/* Main Content */}
				<div className="space-y-6">
					{/* Title Input */}
					<div>
						<div className="bg-white rounded-lg border border-gray-200 p-4">
							<Controller
								name="title"
								control={control}
								render={({ field }) => <input {...field} type="text" placeholder="Judul Advika" className="w-full text-lg font-medium border-none outline-none placeholder-gray-400" />}
							/>
						</div>

						{errors?.title?.message && <p className="text-red text-sm mt-1">{errors?.title?.message}</p>}
					</div>

					{/* Reporter Info */}
					<div className="text-sm text-main-primary">
						{user?.name} - {new Date().toLocaleDateString()}
					</div>

					{/* Image Upload Section */}
					<div className="bg-white rounded-lg border border-gray-200 p-4">
						{imagePreview ? (
							<div className="relative">
								<img src={imagePreview} alt="Preview" className="w-full h-auto object-contain rounded-lg" />
								<div className="absolute bottom-4 right-4">
									<label className="bg-yellow text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2">
										<Image size={16} />
										Ubah Gambar
										<input type="file" accept="image/*" onChange={(e) => handleCoverChange(e.target.files[0])} className="hidden" />
									</label>
								</div>
							</div>
						) : (
							<div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
								<div className="text-center">
									<div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
										<Image size={24} className="text-gray-500" />
									</div>
									<label className="bg-yellow text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 mx-auto w-fit">
										<Image size={16} />
										Ubah Gambar
										<input type="file" accept="image/*" onChange={(e) => handleCoverChange(e.target.files[0])} className="hidden" />
									</label>
								</div>
							</div>
						)}

						{errors?.cover?.message && <p className="text-red text-sm mt-4">{errors?.cover?.message}</p>}
					</div>

					{/* Description Input */}
					<div>
						<div className="bg-white rounded-lg border border-gray-200 p-4">
							<Controller
								name="description"
								control={control}
								render={({ field }) => <textarea {...field} placeholder="Isi Advika" rows={8} className="w-full border-none outline-none placeholder-gray-400 resize-none" />}
							/>
						</div>

						{errors?.description?.message && <p className="text-red text-sm mt-1">{errors?.description?.message}</p>}
					</div>

					{/* PDF Upload Section */}
					<div className="bg-white rounded-lg border border-gray-200 p-4">
						{pdfFile ? (
							<div className="flex items-center justify-between p-4 rounded-lg">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
										<FileText size={20} className="text-yellow" />
									</div>
									<span className="font-medium">{pdfFile.name}</span>
								</div>
								<label className="bg-yellow text-white px-4 py-2 rounded-md cursor-pointer">
									Upload Lampiran
									<input type="file" accept="application/pdf" onChange={(e) => handlePdfChange(e.target.files[0])} className="hidden" />
								</label>
							</div>
						) : (
							<div className="border-2 border-dashed border-gray-300 rounded-lg p-8" onDrop={handleDrop} onDragOver={handleDragOver}>
								<div className="text-center">
									<div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
										<Upload size={24} className="text-yellow" />
									</div>
									<div className="mb-4">
										<p className="text-gray-600 mb-2">Drag Files To Upload</p>
									</div>
									<label className="bg-yellow text-white px-6 py-2 rounded-md cursor-pointer inline-flex items-center gap-2">
										<Upload size={16} />
										Upload Lampiran
										<input type="file" accept="application/pdf" onChange={(e) => handlePdfChange(e.target.files[0])} className="hidden" />
									</label>
								</div>
							</div>
						)}

						{errors?.attachment?.message && <p className="text-red text-sm mt-4">{errors?.attachment?.message}</p>}
					</div>
				</div>
			</div>
		</div>
	);
}
