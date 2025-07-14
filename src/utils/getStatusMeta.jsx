import { CheckSquare, Clock, MessageSquare, Search, X } from 'lucide-react';

export const getStatusMeta = (status) => {
	const normalized = status.toLowerCase();

	switch (normalized) {
		case 'pending':
			return {
				icon: Clock,
				textColor: 'text-yellow-600',
				label: 'Pending',
			};
		case 'ditinjau':
			return {
				icon: Search,
				textColor: 'text-blue-600',
				label: 'Ditinjau',
			};
		case 'ditanggapi':
			return {
				icon: MessageSquare,
				textColor: 'text-green-600',
				label: 'Ditanggapi',
			};
		case 'selesai':
			return {
				icon: CheckSquare,
				textColor: 'text-emerald-600',
				label: 'Selesai',
			};
		case 'ditolak':
			return {
				icon: X,
				textColor: 'text-red-600',
				label: 'Ditolak',
			};
		default:
			return {
				icon: Clock,
				textColor: 'text-gray-400',
				label: status,
			};
	}
};
