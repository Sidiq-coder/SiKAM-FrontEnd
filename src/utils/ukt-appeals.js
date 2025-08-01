import { CheckCircle, Clock, XCircle, Hourglass } from 'lucide-react';

export const uktAppealsStatusOptions = [
	{
		value: 'pending',
		label: 'Pending',
		textColor: 'text-yellow',
		icon: Hourglass,
	},
	{
		value: 'under_review',
		label: 'Ditinjau',
		textColor: 'text-primary',
		icon: Clock,
	},
	{
		value: 'approved',
		label: 'Diterima',
		textColor: 'text-green',
		icon: CheckCircle,
	},
	{
		value: 'rejected',
		label: 'Ditolak',
		textColor: 'text-red',
		icon: XCircle,
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
