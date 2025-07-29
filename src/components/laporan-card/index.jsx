import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Edit, FileImage, MessageSquare, Plus, Share2, Trash, User } from 'lucide-react';
import Hashtag from '@/components/hashtag';
import Triangle from '@/components/triangle';
import Button from '@/components/button';
import { Modal } from '@/components/modal';
import FileImageComponent from '@/components/file-image';
import { truncateText } from '@/utils/truncateText';
import { formatDate, timeAgo } from '@/utils/date';
import UpdateStatusForm from '@/pages/adminPages/laporan/detail-laporan/update-status-form';
import useAuthStore from '@/stores/useAuthStore';
import { getReportStatuses, getCategoryLabel } from '@/utils/reports';
import useReportStore from '@/stores/useReportStore';
import { toast } from 'react-toastify';
import { useState } from 'react';

const DeleteLaporanModal = ({ id, openModal, closeModal }) => {
	const navigate = useNavigate();
	const { deleteReport, clearError } = useReportStore();

	const handleDeleteReport = async () => {
		try {
			const result = await deleteReport(id);

			if (result?.data?.success) {
				closeModal();
				clearError();
				toast.success('Berhasil menghapus laporan');
				if (location.pathname !== '/laporan') {
					navigate('/laporan');
				}
			}
		} catch (error) {
			toast.error('Terjadi kesalahan!');
			console.error('Error:', error);
		}
	};

	return (
		<Modal isOpen={openModal} onClose={closeModal} size="md">
			<div className="flex flex-col items-center text-center md:pt-10">
				<img src="/images/trash.png" alt="trash.png" className="w-30" />
				<h2 className="text-2xl text-dark font-semibold mt-10">Hapus laporan ini?</h2>
				<p className="text-[#6C757D] mt-2">Tindakan ini akan menghapus laporan secara permanen dari sistem. Anda tidak dapat mengembalikannya.</p>
			</div>
			<div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-10 pb-4">
				<Button variant="secondary" label="Batal" size="large" onClick={closeModal} />
				<Button variant="danger" label="Hapus" size="large" onClick={handleDeleteReport} />
			</div>
		</Modal>
	);
};

const EditLaporanModal = ({ id, openModal, closeModal }) => {
	return (
		<Modal isOpen={openModal} onClose={closeModal} size="md">
			<div className="flex flex-col items-center text-center md:pt-10">
				<img src="/images/pen-to-square.png" alt="pen-to-square.png" className="w-30" />
				<h2 className="text-2xl text-dark font-semibold mt-10">Ubah Laporan Anda</h2>
				<p className="text-[#6C757D] mt-2">
					Anda dapat mengubah laporan selama status laporan <span className="text-yellow italic">pending</span>
				</p>
			</div>
			<div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-10 pb-4">
				<Button variant="secondary" label="Batal" size="large" onClick={closeModal} />
				<Button anchor href={`/laporan/${id}/ubah`} variant="primary" label="Edit" size="large" />
			</div>
		</Modal>
	);
};

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
	const { user } = useAuthStore();

	const [deleteModal, setDeleteModal] = useState(false);
	const [editModal, setEditModal] = useState(false);

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
						<a href={isDetail ? null : detailPath} className="flex-1 cursor-pointer">
							<LaporanBody report={report} isDetail={isDetail} />
						</a>

						{showActions && (
							<div className="flex items-center space-x-2">
								<button onClick={() => setEditModal(true)} className="p-1 text-primary hover:text-dark-primary transition-colors cursor-pointer">
									<Edit className="w-5 h-5 md:w-6 md:h-6" />
								</button>
								<button onClick={() => setDeleteModal(true)} className="p-1 text-[#EE4848] hover:text-red-600 transition-colors cursor-pointer">
									<Trash className="w-5 h-5 md:w-6 md:h-6" />
								</button>
							</div>
						)}
					</div>

					<LaporanFooter report={report} isDetail={isDetail} />
				</div>

				<DeleteLaporanModal id={report.id} openModal={deleteModal} closeModal={() => setDeleteModal(false)} />
				<EditLaporanModal id={report.id} openModal={editModal} closeModal={() => setEditModal(false)} />

				{isDetail && <LaporanDetailSection report={report} isAdmin={isAdmin} />}
			</div>
		</div>
	);
};

export default LaporanCard;
