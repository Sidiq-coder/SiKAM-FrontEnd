import { Check, Clock, MessageSquare, Search, X } from 'lucide-react';

const getStatusIcon = (status, textColor) => {
	switch (status) {
		case 'Pending':
			return <Clock className={`w-4 h-4 ${textColor}`} />;
		case 'Ditinjau':
			return <Search className={`w-4 h-4 ${textColor}`} />;
		case 'Ditanggapi':
			return <MessageSquare className={`w-4 h-4 ${textColor}`} />;
		case 'Selesai':
			return <Check className={`w-4 h-4 ${textColor}`} />;
		case 'Ditolak':
			return <X className={`w-4 h-4 ${textColor}`} />;
		default:
			return <Clock className={`w-4 h-4 ${textColor}`} />;
	}
};

export default getStatusIcon;
