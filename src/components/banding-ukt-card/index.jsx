import { CalendarDays, FileText } from 'lucide-react';
import { getUktAppealsStatus, getAvailableDocuments } from '@/utils/ukt-appeals';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

const BandingUKTCard = ({ data }) => {
	const status = getUktAppealsStatus(data?.status);

	return (
		<div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-5 space-y-5">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-full bg-main-primary flex items-center justify-center text-white text-lg font-semibold overflow-hidden">
						<img src="/images/Artboard 3 copy 1.png" alt="artboard" />
					</div>
					<div>
						<p className="font-medium text-dark">{data?.students?.name}</p>
						<p className="text-sm text-gray-500">NPM: {data?.students?.campus_email?.split('@')[0]}</p>
					</div>
				</div>
			</div>

			{/* Info Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-dark">
				<div className="flex items-center gap-2">
					<CalendarDays size={16} className="text-dark" />
					<span className="text-gray-700">Dikirim: {dayjs(data?.submitted_at).format('D MMMM YYYY')}</span>
				</div>
				<div className="flex items-center gap-2">
					<span>Status:</span>
					<div className={`${status.textColor} font-medium flex items-center gap-1`}>
						<status.icon className="w-4 h-4" />
						<span>{status.label}</span>
					</div>
				</div>
			</div>

			{/* Files */}
			<div className="flex items-center gap-2 text-sm text-dark">
				<FileText size={16} className="text-dark" />
				<span>File: {getAvailableDocuments(data)}</span>
			</div>

			{/* Footer */}
			<div className="text-center pt-3">
				<a href={`/admin/banding-ukt/${data.id}`} className="inline-block text-sm text-main-primary font-medium px-4 py-2 rounded hover:bg-main-primary/10 transition">
					[ Lihat Detail ]
				</a>
			</div>
		</div>
	);
};

export default BandingUKTCard;
