import { useState, useCallback } from 'react';
import { X, Check, File } from 'lucide-react';
import FileImageComponent from '@/components/file-image';
import { toast } from 'react-toastify';

const FileUploadDropzone = ({
	name,
	label,
	labelDescription = null,
	acceptTypes = ['image/jpeg', 'image/jpg', 'image/png'],
	maxSizeMB = 5,
	error,
	setValue,
	trigger,
	className = null,
	description = null,
	required = true,
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

	return (
		<div>
			<label className="block text-sm font-medium mb-1">
				{label} {!labelDescription ? null : <span className="text-[#ACACAC] font-normal">{labelDescription}</span>} {required ? <span className="text-red-500">*</span> : ''}
			</label>
			<div
				className={`relative border-2 border-dashed rounded-lg p-3 transition-colors ${dragActive ? 'border-blue-400 bg-gray-50' : 'border-gray-300 bg-white'} ${className || ''}`}
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
					<div className="flex items-center justify-center text-[#ACACAC] space-x-1">
						<File className="w-4 h-4" />
						<span>Pilih file atau tarik ke sini</span>
					</div>
				) : null}

				{uploadedFile && (
					<div className="flex items-center space-x-4">
						<div className="flex-shrink-0">
							<FileImageComponent filePath={uploadedFile.preview} fileName={uploadedFile.name} onClick={removeFile} isUploaded />
						</div>

						<div>
							<div className="flex flex-wrap items-center space-x-1 mb-2 text-[#ACACAC]">
								<Check className="w-4 h-4" />
								<span className="text-sm font-medium">{uploadedFile.name}</span>
								<span className="text-sm">({uploadedFile.size})</span>
							</div>
							<div className="flex flex-wrap space-x-4 opacity-50">
								<button onClick={replaceFile} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
									[Ganti]
								</button>
								<button onClick={removeFile} className="text-sm text-red-600 hover:text-red-800 cursor-pointer">
									[Hapus]
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{description && (
				<div className="flex items-center gap-x-1 text-[#909090] mt-2">
					<File className="w-4 h-4" />
					<p className="text-sm">{description}</p>
				</div>
			)}

			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
};

export default FileUploadDropzone;
