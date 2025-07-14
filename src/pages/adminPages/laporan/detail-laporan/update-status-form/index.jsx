import { useState } from 'react';
import { ArrowRight, Info, MessageSquare, Pin, Hourglass, Search, X, Check } from 'lucide-react';
import Button from '@/components/button';

const statusOptions = [
	{ label: 'Pending', value: 'Pending', icon: <Hourglass className="w-4 h-4 text-yellow-600" />, color: 'text-yellow-600' },
	{ label: 'Ditinjau', value: 'Ditinjau', icon: <Search className="w-4 h-4 text-blue-600" />, color: 'text-blue-600' },
	{ label: 'Ditanggapi', value: 'Ditanggapi', icon: <MessageSquare className="w-4 h-4 text-indigo-600" />, color: 'text-indigo-600' },
	{ label: 'Selesai', value: 'Selesai', icon: <Check className="w-4 h-4 text-green-600" />, color: 'text-green-600' },
	{ label: 'Ditolak', value: 'Ditolak', icon: <X className="w-4 h-4 text-red-600" />, color: 'text-red-600' },
];

const UpdateStatusForm = () => {
	const [currentStatus] = useState('Pending');
	const [newStatus, setNewStatus] = useState('Ditinjau');
	const [response, setResponse] = useState('');

	const currentOption = statusOptions.find((opt) => opt.value === currentStatus);

	return (
		<div className="space-y-10 w-full">
			{/* Ubah Status */}
			<div>
				<label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
					<Pin className="w-4 h-4" />
					Ubah Status <span className="text-red-500">*</span>
				</label>

				<div className="flex items-center gap-3 relative">
					{/* Current Status */}
					<div className={`flex items-center gap-1 px-5 py-3 bg-white rounded-md shadow-md text-sm font-medium ${currentOption.color}`}>
						{currentOption?.icon}
						{currentStatus}
					</div>

					<ArrowRight className="text-gray-500 w-4 h-4" />

					{/* Dropdown */}
					<select className="px-5 py-3 shadow-md rounded-md text-sm focus:outline-none pr-7" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
						{statusOptions.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>

					{/* Info Tooltip */}
					<div className="group relative ml-1">
						<Info className="w-4 h-4 text-gray-400 cursor-pointer" />
						<div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#2A2A2A] text-white text-xs rounded-md py-2 px-3 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
							Pilih perubahan status berdasarkan
							<br />
							tahap penanganan laporan saat ini
						</div>
					</div>
				</div>
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
					value={response}
					onChange={(e) => setResponse(e.target.value)}
				/>
			</div>

			{/* Actions */}
			<div className="flex justify-end gap-4">
				<Button variant="danger" label="Batal" />
				<Button variant="primary" label="Simpan" icon={<Check className="w-4 h-4" />} iconPosition="right" />
			</div>
		</div>
	);
};

export default UpdateStatusForm;
