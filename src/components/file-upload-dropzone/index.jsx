import { Info } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const FileUploadDropzone = ({ name, label, acceptTypes = ['image/jpeg', 'image/jpg', 'image/png'], maxSizeMB = 5, error, setValue, trigger, className = null, description = null }) => {
	const [uploadedFile, setUploadedFile] = useState(null);

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

			setUploadedFile(file);
			setValue(name, [file]);
			trigger(name);
			toast.success('File berhasil diupload');
		},
		[acceptTypes, maxSizeMB, name, setValue, trigger]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpg', '.jpeg', '.png'],
		},
		multiple: false,
	});

	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
			<div
				{...getRootProps()}
				className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors ${
					isDragActive ? 'border-blue-500 bg-blue-50' : error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
				} ${className}`}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center space-y-2 truncate">
					{uploadedFile ? (
						<p className="text-sm font-medium text-green-600">
							{uploadedFile.name} - <span className="text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
						</p>
					) : (
						<p className="text-[#ACACAC]">{isDragActive ? 'Lepaskan file di sini' : 'Pilih file atau tarik ke sini'}</p>
					)}
				</div>
			</div>
			{description ? (
				<div className="flex items-center gap-x-1 text-[#909090] mt-2">
					<Info className="w-4 h-4" />
					<p className="text-sm">{description}</p>
				</div>
			) : null}
			{error ? <p className="text-red-500 text-sm mt-1">{error.message}</p> : null}
		</div>
	);
};

export default FileUploadDropzone;
