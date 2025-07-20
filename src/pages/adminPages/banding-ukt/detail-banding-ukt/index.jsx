import { useState } from 'react';
import { ChevronLeft, FileText, Trash2, MessageSquareText, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DetailBandingUKT() {
	const [status, setStatus] = useState('Ditinjau');
	const [isOpen, setIsOpen] = useState(false);

	const statusOptions = ['Ditinjau', 'Diterima', 'Ditolak', 'Pending'];

	const changeStatus = (newStatus) => {
		setStatus(newStatus);
		setIsOpen(false);
	};

	return (
		<div className="container mx-auto md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="mx-auto bg-white text-dark rounded-2xl px-12 pt-8 pb-12 w-full max-w-5xl">
				{/* Header */}
				<div className="flex justify-between items-center mb-10">
					<Link to="/admin/banding-ukt">
						<ChevronLeft className="w-8 h-8" />
					</Link>
					<h2 className="text-3xl text-center text-dark font-bold">DETAIL BANDING UKT</h2>
					<div></div>
				</div>

				{/* Profile Info */}
				<div className="flex items-center space-x-4 mb-4">
					<img src="https://i.pravatar.cc/80?img=3" alt="avatar" className="w-16 h-16 rounded-full border" />
					<h2 className="text-dark font-medium">Jhon Doe</h2>
					<p className="text-dark ml-8">NPM: 2315061113</p>
				</div>

				<p className="text-dark mb-4">#BDG-2025-001 • Dikirim pada 12 Juli 2025</p>

				<table className="mb-8">
					<tbody>
						<tr>
							<td>Status</td>
							<td className="px-4">:</td>
							<td>
								<div className="relative">
									<button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-1 bg-white text-primary px-2 py-1 rounded text-sm font-medium opacity-60">
										<FileText className="w-4 h-4" />
										<span>{status}</span>
										<ChevronDown className="w-6 h-6 text-yellow-600" />
									</button>
									{isOpen && (
										<div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-32">
											{statusOptions.map((opt) => (
												<button
													key={opt}
													onClick={() => changeStatus(opt)}
													className={`block w-full text-left px-3 py-2 text-sm hover:bg-blue-50 ${status === opt ? 'text-primary font-medium' : 'text-gray-700'}`}
												>
													{opt}
												</button>
											))}
										</div>
									)}
								</div>
							</td>
							<td className="px-2 opacity-60">ubah status banding ukt</td>
						</tr>
						<tr>
							<td>Tipe Bencana</td>
							<td className="px-4">:</td>
							<td>Bencana Alam</td>
						</tr>
					</tbody>
				</table>

				{/* Semester */}
				<div className="mb-6">
					<label className="block text-gray-700 font-medium mb-1">
						Semester Mahasiswa <span className="text-red-500">*</span>
					</label>
					<input type="text" value="Semester 4" readOnly className="w-full rounded-md border-gray-300 bg-gray-100 px-3 py-2 text-gray-700" />
				</div>

				{/* Files */}
				{['Fotocopy KTM', 'Fotocopy Bukti Pemayaran UKT (Legalisir)', 'Fotocopy Transkrip Semester Terakhir (Legalisir)', 'Surat Keterangan Bencana Alam/non-Alam'].map((item, idx) => (
					<div className="mb-4" key={idx}>
						<label className="block text-gray-700 font-medium mb-1">
							{item} <span className="text-red-500">*</span>
						</label>
						<p className="text-xs text-gray-400 mb-2">Upload file dalam bentuk pdf</p>
						<button className="flex items-center bg-blue-50 border border-blue-300 text-blue-600 px-3 py-2 rounded-md hover:bg-blue-100">
							<FileText className="mr-2 w-4 h-4" /> Lihat File
						</button>
					</div>
				))}

				{/* Tipe Bencana Radio */}
				<div className="mb-6">
					<label className="block text-gray-700 font-medium mb-2">
						Tipe Bencana <span className="text-red-500">*</span>
					</label>
					<div className="space-y-2">
						<label className="flex items-center space-x-2">
							<input type="radio" name="bencana" defaultChecked />
							<span>Bencana Alam</span>
						</label>
						<label className="flex items-center space-x-2">
							<input type="radio" name="bencana" />
							<span>Bencana non-Alam</span>
						</label>
					</div>
				</div>

				{/* Tanggapi */}
				<div className="mb-6">
					<label className="flex items-center space-x-2 mb-2 text-gray-700">
						<MessageSquareText className="w-5 h-5" />
						<span>Tanggapi</span>
					</label>
					<textarea
						placeholder="Tulis tanggapan terhadap Banding ini"
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
						rows="3"
					></textarea>
				</div>

				{/* Hapus Banding */}
				<button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
					<Trash2 className="w-4 h-4" /> <span>Hapus Banding</span>
				</button>
			</div>
		</div>
	);
}
