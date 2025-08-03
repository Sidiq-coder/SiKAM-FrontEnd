import { useState, useCallback, useEffect } from 'react';
import { Check, File } from 'lucide-react';
import FileImageComponent from '@/components/file-image';
import { toast } from 'react-toastify';

const FileUploadDropzone = ({
	name,
	label,
	labelDescription = null,
	inputIcon: InputIcon = File,
	inputDescription = 'Upload file atau tarik ke sini',
	acceptTypes = ['image/jpeg', 'image/jpg', 'image/png'],
	maxSizeMB = 5,
	error,
	setValue,
	trigger,
	className = null,
	description = null,
	required = true,
	value = null,
}) => {
	const [uploadedFile, setUploadedFile] = useState(null);
	const [dragActive, setDragActive] = useState(false);

	const onDrop = useCallback(
		(acceptedFiles) => {
			if (!Array.isArray(acceptedFiles) || acceptedFiles.length === 0) {
				toast.error('File tidak valid');
				return;
			}

			const file = acceptedFiles[0];

			if (file.size > maxSizeMB * 1024 * 1024) {
				toast.error(`Ukuran file maksimal ${maxSizeMB}MB`);
				return;
			}

			if (!acceptTypes.includes(file.type)) {
				toast.error(`Format file tidak didukung: ${file.type}`);
				return;
			}

			const newFile = {
				id: Date.now(),
				file: file,
				name: file.name,
				size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
				type: file.type,
				preview: URL.createObjectURL(file),
				status: 'completed',
			};

			setUploadedFile(newFile);
			if (setValue) setValue(name, [file]);
			if (trigger) trigger(name);
			toast.success('File berhasil diupload');
		},
		[acceptTypes, maxSizeMB, name, setValue, trigger]
	);

	const handleFileUpload = (files) => {
		if (files && files.length > 0) {
			onDrop(Array.from(files));
		}
	};

	const handleDrag = (e) => {
		if (uploadedFile !== null) return;
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e) => {
		if (uploadedFile !== null) return;
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFileUpload(e.dataTransfer.files);
		}
	};

	const removeFile = () => {
		if (uploadedFile && uploadedFile.preview) {
			URL.revokeObjectURL(uploadedFile.preview);
			document.getElementById('file-input').value = null;
		}
		setUploadedFile(null);
		if (setValue) setValue(name, null);
		toast.success('File berhasil dihapus');
	};

	const replaceFile = () => {
		document.getElementById('file-input').click();
	};

	useEffect(() => {
		if (value && !uploadedFile) {
			const previewFile = {
				id: Date.now(),
				file: value,
				name: value.name,
				size: (value.size / (1024 * 1024)).toFixed(1) + ' MB',
				type: value.type,
				preview: URL.createObjectURL(value),
				status: 'completed',
			};
			setUploadedFile(previewFile);
		}
	}, [value]);

	useEffect(() => {
		return () => {
			if (uploadedFile?.preview) {
				URL.revokeObjectURL(uploadedFile.preview);
			}
		};
	}, [uploadedFile]);

	return (
		<div className="w-full">
			<label className="block text-sm font-medium mb-1">
				{label} {!labelDescription ? null : <span className="text-gray-500 font-normal">{labelDescription}</span>} {required ? <span className="text-red-500">*</span> : ''}
			</label>

			<div
				className={`relative border-2 border-dashed rounded-lg p-3 transition-colors duration-200 ${dragActive ? 'border-blue-400 bg-gray-50' : 'border-gray-300 bg-white'} ${className || ''}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
			>
				<input
					id="file-input"
					type="file"
					accept="image/*"
					className={`absolute inset-0 w-full h-full opacity-0 ${uploadedFile === null ? 'cursor-pointer' : ''}`}
					onChange={(e) => handleFileUpload(e.target.files)}
					required={required}
				/>

				{!uploadedFile ? (
					<div className="flex flex-col items-center justify-center text-gray-500 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
						{InputIcon && <InputIcon className="w-6 h-6" />}
						<span className="text-center sm:text-left">{inputDescription}</span>
					</div>
				) : (
					<div className="flex flex-wrap flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
						<div className="flex-shrink-0">
							<FileImageComponent filePath={uploadedFile.preview} fileName={uploadedFile.name} onClick={removeFile} isUploaded size="max-w-xs" />
						</div>

						<div>
							<div className="flex flex-wrap items-center space-x-1 mb-2 text-gray-700">
								<Check className="w-4 h-4" />
								<span className="text-sm font-medium">{uploadedFile.name}</span>
								<span className="text-sm">({uploadedFile.size})</span>
							</div>
							<div className="flex flex-wrap gap-2 opacity-70">
								<button onClick={replaceFile} className="text-sm text-main-primary hover:text-dark-primary transition cursor-pointer">
									[Ganti]
								</button>
								<button onClick={removeFile} className="text-sm text-red-600 hover:text-red-800 transition cursor-pointer">
									[Hapus]
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{description && (
				<div className="flex items-center gap-x-2 text-[#909090] mt-2">
					<File className="w-4 h-4" />
					<p className="text-sm">{description}</p>
				</div>
			)}

			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
};

export default FileUploadDropzone;
