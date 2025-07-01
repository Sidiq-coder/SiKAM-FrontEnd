import { Calendar, Edit, Hourglass, Trash2, User } from 'lucide-react';
import Hashtag from '@/components/hashtag';

const LaporanItem = ({ report }) => {
	return (
		<div key={report.id} className="flex gap-x-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<div className="flex flex-col items-center">
				<button className="text-primary hover:text-darkPrimary transition-colors">
					<span className="text-sm">Vote</span>
				</button>
				<span className="text-2xl font-bold text-gray-700">{report.votes}</span>
			</div>
			<div>
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center space-x-3">
						<div className="flex items-center gap-x-6">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
								<User className="w-8 h-8 text-darkPrimary" />
							</div>
							<div>
								<h3 className="text-sm font-medium text-darkPrimary mb-1.5">{report.author}</h3>
								<div className="flex items-center gap-x-6 text-sm text-gray-500">
									<div className="flex items-center space-x-1">
										<Calendar className="w-4 h-4 " />
										<span>{report.date}</span>
									</div>
									<div className="flex items-center space-x-1 text-yellow-600">
										<Hourglass className="w-4 h-4" />
										<span>Pending</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<span className="text-sm text-gray-500">{report.timeAgo}</span>
				</div>

				<div className="mb-4">
					<div className="flex items-center justify-between mb-2">
						<h2 className="text-xl font-bold text-[#2A2A2A]">{report.title}</h2>
						<div className="flex items-center space-x-2">
							<button className="p-1 text-gray-400 hover:text-darkPrimary transition-colors">
								<Edit className="w-4 h-4" />
							</button>
							<button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
								<Trash2 className="w-4 h-4" />
							</button>
						</div>
					</div>
					<p className="text-gray-600 text-sm leading-relaxed">{report.description}</p>
				</div>

				<Hashtag label={report.category} />
			</div>
		</div>
	);
};

export default LaporanItem;
