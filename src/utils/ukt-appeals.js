import { Check, MessageSquare, X, MoreHorizontal } from 'lucide-react';

export const uktAppealsStatusOptions = [
	{
		value: 'pending',
		label: 'Pending',
		textColor: 'text-yellow',
		icon: MoreHorizontal,
		bgColor: 'bg-[#EDC83180]',
	},
	{
		value: 'under_review',
		label: 'Ditinjau',
		textColor: 'text-main-primary',
		icon: MessageSquare,
		bgColor: 'bg-[#EDC83180]',
	},
	{
		value: 'approved',
		label: 'Diterima',
		textColor: 'text-green',
		icon: Check,
		bgColor: 'bg-[#007BFF80]',
	},
	{
		value: 'rejected',
		label: 'Ditolak',
		textColor: 'text-red',
		icon: X,
		bgColor: 'bg-[#EE484880]',
	},
];

export const uktAppealsProblemOptions = [
	{
		value: 'natural',
		label: 'Bencana Alam',
	},
	{
		value: 'non_natural',
		label: 'Bencana Non Alam',
	},
];

export const getUktAppealsStatus = (value) => uktAppealsStatusOptions.find((item) => item.value === value);

export const getUktAppealsProblem = (value) => uktAppealsProblemOptions.find((item) => item.value === value);

export const getAvailableDocuments = (appeal) => {
	const available = [];

	if (appeal.ktm) available.push('KTM');
	if (appeal.ukt_proof) available.push('Bukti UKT');
	if (appeal.transcript) available.push('Transkrip');
	if (appeal.sk) available.push('Surat Keterangan');

	return available.join(', ');
};
