import { CheckSquare, Clock, MessageSquare, Search, X, XSquare } from 'lucide-react';

const getStatusIcon = (status, textColor) => {
	switch (status) {
		case 'Pending':
			return <Clock className={`w-4 h-4 ${textColor}`} />;
		case 'Ditinjau':
			return <Search className={`w-4 h-4 ${textColor}`} />;
		case 'Ditanggapi':
			return <MessageSquare className={`w-4 h-4 ${textColor}`} />;
		case 'Selesai':
			return <CheckSquare className={`w-4 h-4 ${textColor}`} />;
		case 'Ditolak':
			return <X className={`w-4 h-4 ${textColor}`} />;
		case 'waiting':
			return <Clock className={`w-4 h-4 ${textColor}`} />;
		case 'verified':
			return <CheckSquare className={`w-4 h-4 ${textColor}`} />;
		case 'not verified':
			return <XSquare className={`w-4 h-4 ${textColor}`} />;
		default:
			return <Clock className={`w-4 h-4 ${textColor}`} />;
	}
};

export default getStatusIcon;
