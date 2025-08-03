import { CheckSquare, Clock, Globe, MessageSquare, Search, X } from 'lucide-react';

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
		label: 'Pending',
		value: 'pending',
		icon: Clock,
		textColor: 'text-yellow',
		bgColor: 'bg-[#EDC83180]',
	},
	{
		label: 'Ditinjau',
		value: 'under_review',
		icon: Search,
		textColor: 'text-light-yellow',
		bgColor: 'bg-[#EDC83180]',
	},
	{
		label: 'Ditanggapi',
		value: 'responded',
		icon: MessageSquare,
		textColor: 'text-main-primary',
		bgColor: 'bg-[#007BFF80]',
	},
	{
		label: 'Selesai',
		value: 'done',
		icon: CheckSquare,
		textColor: 'text-green',
		bgColor: 'bg-[#2FCB7180]',
	},
	{
		label: 'Ditolak',
		value: 'rejected',
		icon: X,
		textColor: 'text-red',
		bgColor: 'bg-[#EE484880]',
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
	{ label: 'Fakultas', value: 'faculty', icon: Globe },
	{ label: 'Universitas', value: 'university', icon: Globe },
];

export const getReportLevels = (level) => {
	return (
		reportLevels.find((s) => s.value === level?.toLowerCase()) ?? {
			icon: Globe,
			label: level ?? 'Tidak Diketahui',
		}
	);
};
