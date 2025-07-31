import { Clock, CheckSquare, XSquare } from 'lucide-react';

export const studentsStatus = {
	WAITING: 'waiting',
	VERIFIED: 'verified',
	NOT_VERIFIED: 'not verified',
};

export const studentStatuses = [
	{ label: studentsStatus.WAITING, value: studentsStatus.WAITING, textColor: 'text-yellow', icon: Clock },
	{ label: studentsStatus.VERIFIED, value: studentsStatus.VERIFIED, textColor: 'text-green', icon: CheckSquare },
	{ label: studentsStatus.NOT_VERIFIED, value: studentsStatus.NOT_VERIFIED, textColor: 'text-red', icon: XSquare },
];
