import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Calendar, Clock, Edit, FileImage, Hourglass, MessageSquare, Plus, Share2, Trash, User } from 'lucide-react';
import Hashtag from '@/components/hashtag';
import Triangle from '@/components/triangle';
import FileImageComponent from '@/components/file-image';
import { truncateText } from '@/utils/truncateText';
import { formatDate, timeAgo } from '@/utils/date';
import UpdateStatusForm from '@/pages/adminPages/laporan/detail-laporan/update-status-form';
import useAuthStore from '@/stores/useAuthStore';
import { getReportStatuses, getCategoryLabel } from '@/utils/reports';

const LaporanVoteSection = ({ report, isVoteable }) => {
	if (!isVoteable)
		return (
			<div className="flex flex-col items-center space-y-2">
				<span className="text-primary text font-medium">Vote</span>
				<div className="flex flex-col items-center">
					<span className="text-4xl font-bold text-dark">{report?.vote_total}</span>
				</div>
			</div>
		);

	return (
		<div className="flex flex-col items-center">
			<Triangle fill="#0B4D9B" />
			<span className="text-2xl font-bold text-dark">{report?.vote_total}</span>
			<Triangle fill="#0B4D9B" isFlip />
		</div>
	);
};

const LaporanHeader = ({ report, isVoteable }) => {
	const { icon: StatusIcon, textColor, label } = getReportStatuses(report?.status ?? '');

	return (
		<div className="flex flex-wrap items-start justify-between mb-6 gap-y-3">
			<div className="flex items-center space-x-3">
				<div className="flex items-center gap-x-6">
					<div className="lg:hidden">
						<LaporanVoteSection report={report} isVoteable={isVoteable} />
					</div>
					<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
						<User className="w-8 h-8 text-dark-primary" />
					</div>
					<div>
						<h3 className="text-sm font-medium text-dark-primary mb-1.5">{report?.students?.name ?? 'Anonim'}</h3>
						<div className="flex flex-wrap items-center gap-x-6 text-sm text-gray-500 gap-y-1">
							<div className="flex items-center space-x-1">
								<Calendar className="w-4 h-4" />
								<span>{report?.submitted_at && formatDate(report?.submitted_at)}</span>
							</div>
							<div className={`flex items-center space-x-1 ${textColor}`}>
								<StatusIcon className="w-4 h-4" />
								<span>{label}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<span className="text-sm text-gray-500">{report?.submitted_at && timeAgo(report?.submitted_at)}</span>
		</div>
	);
};

const LaporanBody = ({ report, isDetail }) => {
	return (
		<div className="mb-4">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-y-2 mb-2">
				<h2 className="text-2xl font-bold text-dark">{report?.title}</h2>
			</div>
			<p className="text-[#909090] text-sm leading-relaxed">{isDetail ? report?.description : truncateText(report?.description, 300)}</p>
		</div>
	);
};

const LaporanFooter = ({ report, isDetail }) => {
	return (
		<div className="flex justify-between">
			<Hashtag label={`#${getCategoryLabel(report?.category ?? '')}`} />
			{report?.file_url && !isDetail ? (
				<div className="flex justify-center items-center bg-[#C9CEFF] text-dark px-2 rounded-xl">
					<Plus className="w-4 h-4" />
					<FileImage className="w-4 h-4" />
				</div>
			) : null}
		</div>
	);
};

const LaporanDetailSection = ({ report, isAdmin }) => {
	const { icon: StatusIcon, textColor, label } = getReportStatuses(report?.status ?? '');

	return (
		<div className="mt-4">
			<div className="flex items-center space-x-1.5 mb-3">
				<p>Lampiran</p>
				<FileImage className="w-4 h-4" />
			</div>

			{report?.file_url ? (
				<div className="mb-8">
					<FileImageComponent filePath={`${import.meta.env.VITE_API_BASE_URL}/${report.file_url}`} fileName="Lampiran" />
				</div>
			) : (
				<p className="text-gray-500 mb-8">Tidak ada lampiran</p>
			)}

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

			{!isAdmin ? (
				<div className={`flex items-center justify-center gap-x-2 ${textColor}`}>
					<StatusIcon className="w-5 h-5" />
					<p className="font-semibold text-lg">{label}</p>
				</div>
			) : (
				<UpdateStatusForm />
			)}
		</div>
	);
};

const LaporanCard = ({ report, isDetail = false, className = '' }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useAuthStore();

	const isAdmin = location.pathname.includes('admin');
	const isMy = user?.id === report?.student_id;
	const isVote = user?.id !== report?.student_id;

	const showActions = isMy && !isAdmin;
	const isVoteable = isVote && !isMy && !isAdmin;
	const detailPath = isAdmin ? '/admin/detail-laporan' : `/laporan/${report?.id}`;

	return (
		<div className={`flex gap-x-8 bg-white ${isDetail ? 'px-10 py-12 shadow-sm' : 'p-6 pb-12 border-b border-gray'} ${className}`}>
			<div className="hidden lg:block">
				<LaporanVoteSection report={report} isVoteable={isVoteable} />
			</div>

			<div className="w-full">
				<div className={isDetail ? 'border-b border-gray pb-6' : ''}>
					<LaporanHeader report={report} isVoteable={isVoteable} />

					<div className="flex">
						<div className="flex-1 cursor-pointer" onClick={() => (isDetail ? null : navigate(detailPath))}>
							<LaporanBody report={report} isDetail={isDetail} />
						</div>

						{showActions && (
							<div className="flex items-center space-x-2">
								<Link to={`/laporan/${report?.id}/ubah`} className="p-1 text-primary hover:text-dark-primary transition-colors cursor-pointer">
									<Edit className="w-5 h-5 md:w-6 md:h-6" />
								</Link>
								<button className="p-1 text-[#EE4848] hover:text-red-600 transition-colors cursor-pointer">
									<Trash className="w-5 h-5 md:w-6 md:h-6" />
								</button>
							</div>
						)}
					</div>

					<LaporanFooter report={report} isDetail={isDetail} />
				</div>

				{isDetail && <LaporanDetailSection report={report} isAdmin={isAdmin} />}
			</div>
		</div>
	);
};

export default LaporanCard;
