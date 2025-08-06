import { Clock, CheckSquare, XSquare } from 'lucide-react';

export const studentsStatus = {
	WAITING: 'waiting',
	VERIFIED: 'verified',
	NOT_VERIFIED: 'not_verified',
};

export const studentStatuses = [
	{
		label: studentsStatus.WAITING,
		value: studentsStatus.WAITING,
		textColor: 'text-yellow',
		bgColor: 'bg-[#EDC83180]',
		icon: Clock,
	},
	{
		label: studentsStatus.VERIFIED,
		value: studentsStatus.VERIFIED,
		textColor: 'text-green',
		bgColor: 'bg-[#2FCB7180]',
		icon: CheckSquare,
	},
	{
		label: studentsStatus.NOT_VERIFIED,
		value: studentsStatus.NOT_VERIFIED,
		textColor: 'text-red',
		bgColor: 'bg-[#EE484880]',
		icon: XSquare,
	},
];
