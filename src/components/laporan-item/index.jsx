import { Calendar, Edit, FileImage, Hourglass, MessageSquare, Plus, Share2, Trash, User } from 'lucide-react';
import Hashtag from '@/components/hashtag';
import Triangle from '@/components/triangle';
import FileImageComponent from '@/components/file-image';
import { Link } from 'react-router-dom';

const LaporanContent = ({ report, isDetail = false }) => {
	return (
		<>
			<div className="flex flex-col items-center space-y-2">
				{!report.isMy ? null : <span className="text-darkPrimary text-sm">Vote</span>}
				<div className="flex flex-col items-center">
					{report.isMy ? null : <Triangle fill="#0B4D9B" />}
					<span className={`${!isDetail ? 'text-2xl' : 'text-4xl'} font-bold text-[#2A2A2A]`}>{report.votes}</span>
					{report.isMy ? null : <Triangle fill="#0B4D9B" isFlip />}
				</div>
			</div>
			<div>
				<div className={isDetail ? 'border-b border-[#ACACAC] pb-6' : ''}>
					<div className="flex flex-wrap items-start justify-between mb-6 gap-y-3">
						<div className="flex items-center space-x-3">
							<div className="flex items-center gap-x-6">
								<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
									<User className="w-8 h-8 text-darkPrimary" />
								</div>
								<div>
									<h3 className="text-sm font-medium text-darkPrimary mb-1.5">{report.author}</h3>
									<div className="flex flex-wrap items-center gap-x-6 text-sm text-gray-500 gap-y-1">
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
						<div className="flex flex-col md:flex-row md:items-center justify-between gap-y-2 mb-2">
							<h2 className="text-xl font-bold text-[#2A2A2A]">{report.title}</h2>
							{!report.isMy ? null : (
								<div className="flex items-center space-x-2">
									<button className="p-1 text-primary hover:text-darkPrimary transition-colors cursor-pointer">
										<Edit className="w-5 h-5 md:w-6 md:h-6" />
									</button>
									<button className="p-1 text-[#EE4848] hover:text-red-600 transition-colors cursor-pointer">
										<Trash className="w-5 h-5 md:w-6 md:h-6" />
									</button>
								</div>
							)}
						</div>
						<p className="text-gray-600 text-sm leading-relaxed">{report.description}</p>
					</div>

					<div className="flex justify-between">
						<Hashtag label={report.category} />
						{report.file === null || isDetail ? null : (
							<div className="flex justify-center items-center bg-[#C9CEFF] text-[#2A2A2A] px-2 rounded-xl">
								<Plus className="w-4 h-4" />
								<FileImage className="w-4 h-4" />
							</div>
						)}
					</div>
				</div>
				<div className="mt-4">
					<div className="flex items-center space-x-1.5 mb-3">
						<p>Lampiran</p>
						<FileImage className="w-4 h-4" />
					</div>

					<div className="mb-8">
						<FileImageComponent filePath="/images/img-laporan.png" fileName="IMG.jpg" />
					</div>

					<div className="flex border-b border-gray-200 mb-8">
						<div className="flex items-center px-2 py-3 text-blue-600 border-b-2 border-blue-600 font-medium">
							<MessageSquare className="w-4 h-4 text-primary mr-2" />
							Tindak Lanjut
						</div>
						<button className="flex items-center px-2 py-3 text-gray-600 hover:text-gray-900 font-medium ml-6">
							<Share2 className="w-4 h-4 mr-2" />
							Bagikan
						</button>
					</div>

					<div className="flex items-center justify-center text-[#ED9E3199] gap-x-2">
						<Hourglass className="w-5 h-5" />
						<p className="font-semibold text-lg">Menunggu Verifikasi</p>
					</div>
				</div>
			</div>
		</>
	);
};

const LaporanItem = ({ report, isDetail = false }) => {
	if (isDetail) {
		return (
			<div key={report.id} className={`flex gap-x-8 bg-white px-10 p-6 py-12 ${isDetail ? 'shadow-sm' : 'border-b border-[#ACACAC]'}`}>
				<LaporanContent report={report} isDetail={isDetail} />
			</div>
		);
	}

	return (
		<Link to="/detail-laporan" key={report.id} className={`flex gap-x-8 bg-white p-6 pb-12 ${isDetail ? 'shadow-sm' : 'border-b border-[#ACACAC]'}`}>
			<LaporanContent report={report} isDetail={isDetail} />
		</Link>
	);
};

export default LaporanItem;
