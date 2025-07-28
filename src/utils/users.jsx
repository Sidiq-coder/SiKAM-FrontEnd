import { CheckCircle, XCircle, Clock } from 'lucide-react';

export const getUserStatus = (status) => {
	switch (status) {
		case 'verified':
			return {
				label: 'Terverifikasi',
				color: 'text-green-600',
				icon: <CheckCircle className="w-5 h-5 text-green-600" />,
			};
		case 'not_verified':
			return {
				label: 'Belum Terverifikasi',
				color: 'text-red-600',
				icon: <XCircle className="w-5 h-5 text-red-600" />,
			};
		case 'waiting':
			return {
				label: 'Menunggu Verifikasi',
				color: 'text-yellow-500',
				icon: <Clock className="w-5 h-5 text-yellow-500" />,
			};
		default:
			return {
				label: 'Status Tidak Diketahui',
				color: 'text-gray-500',
				icon: <Clock className="w-5 h-5 text-gray-500" />,
			};
	}
};
