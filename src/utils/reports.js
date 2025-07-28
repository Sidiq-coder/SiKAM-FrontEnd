import { CheckSquare, Clock, MessageSquare, Search, X } from 'lucide-react';

export const reportCategories = [
	{ label: 'Umum', value: 'general' },
	{ label: 'Administrasi', value: 'administration' },
	{ label: 'Birokrasi', value: 'bureaucracy' },
	{ label: 'Fasilitas', value: 'facilities' },
	{ label: 'Akademik', value: 'academic' },
];

export const getCategoryLabel = (value) => {
	return reportCategories.find((c) => c.value === value)?.label ?? value;
};

export const reportStatuses = [
	{
		label: 'Menunggu',
		value: 'pending',
		icon: Clock,
		textColor: 'text-yellow-600',
	},
	{
		label: 'Sedang Ditinjau',
		value: 'under_review',
		icon: Search,
		textColor: 'text-primary',
	},
	{
		label: 'Ditanggapi',
		value: 'responded',
		icon: MessageSquare,
		textColor: 'text-green-600',
	},
	{
		label: 'Selesai',
		value: 'done',
		icon: CheckSquare,
		textColor: 'text-emerald-600',
	},
	{
		label: 'Ditolak',
		value: 'rejected',
		icon: X,
		textColor: 'text-red-600',
	},
];

export const getReportStatuses = (status) => {
	return (
		reportStatuses.find((s) => s.value === status?.toLowerCase()) ?? {
			icon: Clock,
			textColor: 'text-gray',
			label: status ?? 'Tidak Diketahui',
		}
	);
};

export const reportLevels = [
	{ label: 'Fakultas', value: 'faculty' },
	{ label: 'Universitas', value: 'university' },
];
