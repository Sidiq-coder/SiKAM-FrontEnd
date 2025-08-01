import { Check, MessageSquare, X, MoreHorizontal } from 'lucide-react';

export const uktAppealsStatusOptions = [
	{
		value: 'pending',
		label: 'Pending',
		textColor: 'text-yellow',
		icon: MoreHorizontal,
	},
	{
		value: 'under_review',
		label: 'Ditinjau',
		textColor: 'text-primary',
		icon: MessageSquare,
	},
	{
		value: 'approved',
		label: 'Diterima',
		textColor: 'text-green',
		icon: Check,
	},
	{
		value: 'rejected',
		label: 'Ditolak',
		textColor: 'text-red',
		icon: X,
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
