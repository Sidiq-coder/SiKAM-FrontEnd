import { CalendarDays, FileText, MoreHorizontal, MessageSquare, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatusBadge = ({ status }) => {
	let icon, color, text;

	switch (status.toLowerCase()) {
		case 'pending':
			icon = <MoreHorizontal size={16} />;
			color = 'text-yellow-500';
			text = 'Pending';
			break;
		case 'ditinjau':
			icon = <MessageSquare size={16} />;
			color = 'text-blue-500';
			text = 'Ditinjau';
			break;
		case 'diterima':
			icon = <Check size={16} />;
			color = 'text-green-500';
			text = 'Diterima';
			break;
		case 'ditolak':
			icon = <X size={16} />;
			color = 'text-red-500';
			text = 'Ditolak';
			break;
		default:
			icon = <MoreHorizontal size={16} />;
			color = 'text-gray-500';
			text = status;
	}

	return (
		<div className={`flex items-center gap-1 ${color}`}>
			{icon}
			<span>{text}</span>
		</div>
	);
};

const BandingUKTCard = ({ name, npm, date, status, files }) => {
	return (
		<div className="bg-white rounded-lg drop-shadow-lg p-2 flex flex-col space-y-3 w-full max-w-md">
			{/* Header */}
			<div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3">
				{/* Avatar */}
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">👤</div>
					<p className="text-dark">{name}</p>
				</div>
				<p className="text-dark">NPM: {npm}</p>
			</div>

			<div className="space-y-2 px-4">
				{/* Info */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<div className="flex items-center space-x-2">
						<CalendarDays size={16} className="text-dark" />
						<span className="text-dark">Dikirim : {date}</span>
					</div>
					<div className="flex items-center text-dark gap-1">
						Status : <StatusBadge status={status} />
					</div>
				</div>

				{/* Files */}
				<div className="flex items-center space-x-2 mt-0.5">
					<FileText size={16} className="text-dark" />
					<span className="text-dark">File: {files.join(', ')}</span>
				</div>
			</div>

			{/* Footer */}
			<div className="text-center mt-5">
				<Link to="/admin/detail-banding-ukt" className="text-dark px-3 py-1 rounded hover:bg-gray-100">
					[ Lihat Detail ]
				</Link>
			</div>
		</div>
	);
};

export default BandingUKTCard;
