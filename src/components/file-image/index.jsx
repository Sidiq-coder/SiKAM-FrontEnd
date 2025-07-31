import { Check, X } from 'lucide-react';

const FileImage = ({ filePath, fileName, isUploaded = false, onClick = null, size = 'w-full h-full sm:w-48 sm:h-32 md:w-96 md:h-64' }) => {
	return (
		<div className={`${size} rounded-md relative ${!onClick ? 'overflow-hidden' : ''}`}>
			<img src={filePath} alt={fileName} className="w-full h-full rounded-md object-cover" />
			<div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#0E50A0] to-transparent opacity-80"></div>
			<div className="flex items-center space-x-1 absolute top-3 left-3 text-white text-sm font-medium z-50">
				<span>{fileName}</span>
				{!isUploaded ? null : <Check className="w-5 h-5 text-green-500" />}
			</div>
			{!onClick ? null : (
				<button onClick={onClick} className="absolute -top-2 -right-2 p-1 text-white bg-[#EE4848] rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
					<X className="w-5 h-5" />
				</button>
			)}
		</div>
	);
};

export default FileImage;
