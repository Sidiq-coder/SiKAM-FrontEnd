import { useState } from 'react';
export const BandingUkt = () => {
	const dataBandingUkt = [
		{
			id: '#BDG-2025-001',
			tanggal: '12 Juli 2025',
			status: 'Ditolak',
			tipe: 'Bencana Alam',
			icon: '❌',
			color: 'text-red-500',
		},
		{
			id: '#BDG-2025-002',
			tanggal: '18 Juli 2025',
			status: 'Ditinjau',
			tipe: 'Bencana non-Alam',
			icon: '🗂️',
			color: 'text-blue-500',
		},
		{
			id: '#BDG-2025-008',
			tanggal: '29 Juli 2025',
			status: 'Diterima',
			tipe: 'Bencana non-Alam',
			icon: '✔️',
			color: 'text-green-500',
		},
		{
			id: '#BDG-2025-004',
			tanggal: '1 Agustus 2025',
			status: 'Pending',
			tipe: 'Bencana Alam',
			icon: '⌛',
			color: 'text-gray-500',
		},
		{
			id: '#BDG-2025-005',
			tanggal: '2 Agustus 2025',
			status: 'Ditolak',
			tipe: 'Bencana Alam',
			icon: '❌',
			color: 'text-red-500',
		},
		{
			id: '#BDG-2025-006',
			tanggal: '3 Agustus 2025',
			status: 'Ditinjau',
			tipe: 'Bencana non-Alam',
			icon: '🗂️',
			color: 'text-blue-500',
		},
	];

	const [page, setPage] = useState(1);
	const perPage = 3;
	const totalPages = Math.ceil(dataBandingUkt.length / perPage);
	const pagedData = dataBandingUkt.slice((page - 1) * perPage, page * perPage);

	const Pagination = ({ currentPage, totalPages, onPageChange }) => {
		const getPages = () => {
			const pages = [];
			if (totalPages <= 5) {
				for (let i = 1; i <= totalPages; i++) pages.push(i);
			} else {
				if (currentPage <= 3) {
					pages.push(1, 2, 3, 4, '...', totalPages);
				} else if (currentPage >= totalPages - 2) {
					pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
				} else {
					pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
				}
			}
			return pages;
		};

		return (
			<div className="flex justify-center gap-2 mt-6 text-sm">
				<button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
					&laquo;
				</button>
				{getPages().map((pageNum, index) =>
					pageNum === '...' ? (
						<span key={index} className="px-2">
							...
						</span>
					) : (
						<button key={index} onClick={() => onPageChange(pageNum)} className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
							{pageNum}
						</button>
					)
				)}
				<button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
					&raquo;
				</button>
			</div>
		);
	};

	return (
		<div className="space-y-6 p-4">
			{pagedData.map((data, index) => (
				<div key={index} className="bg-white shadow-md rounded-md p-4 text-sm text-dark">
					<div className="mb-2 flex">
						<div className="w-40 font-semibold">ID pengajuan</div>
						<div>
							: <span className="text-[#A3A3A3]">{data.id}</span>
						</div>
					</div>
					<div className="mb-2 flex">
						<div className="w-40 font-semibold">Tanggal pengajuan</div>
						<div>
							: <span className="text-[#A3A3A3]">{data.tanggal}</span>
						</div>
					</div>
					<div className="mb-2 flex">
						<div className="w-40 font-semibold">Status</div>
						<div>
							:{' '}
							<span className={`${data.color} font-medium`}>
								{data.icon} {data.status}
							</span>
						</div>
					</div>
					<div className="mb-4 flex">
						<div className="w-40 font-semibold">Tipe bencana</div>
						<div>
							: <span className="text-[#A3A3A3]">{data.tipe}</span>
						</div>
					</div>
					<div className="text-center font-medium text-sm">
						[ <span className="underline cursor-pointer hover:text-blue-600 transition">Lihat Detail</span> ]
					</div>
				</div>
			))}
			<Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
		</div>
	);
};
