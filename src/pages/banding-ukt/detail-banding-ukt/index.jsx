import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, FileText, MessageSquareText, User, XCircle } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@/components/modal';
import Button from '@/components/button';
import useUktAppealStore from '@/stores/useUktAppealStore';
import dayjs from 'dayjs';
import { getUktAppealsStatus } from '@/utils/ukt-appeals';
import { toast } from 'react-toastify';
import { formatDateToShortIndonesian } from '@/utils/date';
import useProfilStore from '@/stores/useProfilStore';

const DeleteBandingUktModal = ({ id, openModal, closeModal }) => {
	const navigate = useNavigate();
	const { deleteUktAppeal, clearError } = useUktAppealStore();
	const { setProfilMenu } = useProfilStore();

	const handleDeleteUktAppeal = async () => {
		try {
			const result = await deleteUktAppeal(id);

			if (result?.data?.success) {
				closeModal();
				clearError();
				toast.success(result?.data?.message);
				setProfilMenu('banding');
				navigate('/profil');
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
				<h2 className="text-2xl text-dark font-semibold mt-10">Batalkan banding?</h2>
				<p className="text-[#6C757D] mt-2">Tindakan ini akan menghapus data secara permanen dari sistem. Anda tidak dapat mengembalikannya.</p>
			</div>
			<div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-10 pb-4">
				<Button variant="secondary" label="Batal" size="large" onClick={closeModal} />
				<Button variant="danger" label="Batalkan" size="large" onClick={handleDeleteUktAppeal} />
			</div>
		</Modal>
	);
};

export default function DetailBandingUKT() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { uktAppeal, getUktAppeal, error, clearError, refresh } = useUktAppealStore();
	const { setProfilMenu } = useProfilStore();

	const [status, setStatus] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const uktAppealStatus = useMemo(() => {
		return getUktAppealsStatus(status);
	}, [status]);

	useEffect(() => {
		const fetch = async () => {
			await getUktAppeal(id);
		};
		fetch();
	}, [id, refresh]);

	useEffect(() => {
		setStatus(uktAppeal?.status ?? 'pending');
	}, [uktAppeal, refresh]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearError();
		}
	}, [error]);

	return (
		<div className="container mx-auto md:px-10 lg:px-20 px-4 py-8 pb-[120px]">
			<div className="mx-auto bg-white text-dark rounded-2xl px-12 pt-8 pb-12 w-full max-w-5xl">
				{/* Header */}
				<div className="flex justify-between items-center mb-10">
					<div
						className="cursor-pointer"
						onClick={() => {
							setProfilMenu('banding');
							navigate('/profil');
						}}
					>
						<ChevronLeft className="w-8 h-8" />
					</div>
					<h2 className="text-3xl text-center text-dark font-bold">DETAIL BANDING UKT</h2>
					<div></div>
				</div>

				{/* Profile Info */}
				<div className="flex flex-wrap items-center gap-4 mb-4">
					<img src="/images/artboard-3-1.png" alt="avatar" className="w-16 h-16 rounded-full bg-main-primary" />
					<h2 className="text-dark font-medium">{uktAppeal?.students?.name}</h2>
					<p className="text-dark sm:ml-8">NPM: {uktAppeal?.students?.npm}</p>
				</div>

				<p className="text-dark mb-4">
					{uktAppeal?.id} • Dikirim pada {dayjs(uktAppeal?.submitted_at).format('DD MMM YYYY')}
				</p>

				<table className="mb-8">
					<tbody>
						<tr>
							<td>Status</td>
							<td className="px-4">:</td>
							<td>
								<div className="relative">
									<button onClick={() => setIsOpen(!isOpen)} className={`flex items-center space-x-1 bg-white ${uktAppealStatus?.textColor} px-2 py-1 rounded text-sm font-medium opacity-60`}>
										{uktAppealStatus?.icon && <uktAppealStatus.icon className="w-4 h-4" />}
										<span>{uktAppealStatus?.label}</span>
									</button>
								</div>
							</td>
						</tr>
						<tr>
							<td>Tipe Bencana</td>
							<td className="px-4">:</td>
							<td>{uktAppeal?.problem === 'natural' ? 'Bencana Alam' : 'Bencana non-Alam'}</td>
						</tr>
					</tbody>
				</table>

				<Button variant="danger" icon={<XCircle className="w-4 h-4" />} label="Batalkan Banding" onClick={() => setDeleteModal(true)} className="mb-6" />

				{/* Semester */}
				<div className="mb-6">
					<label className="block text-dark font-medium mb-1">
						Semester Mahasiswa <span className="text-red-500">*</span>
					</label>
					<input type="text" value={`Semester ${uktAppeal?.semester}`} readOnly className="w-full rounded-md border-gray-300 bg-gray-100 px-3 py-2 text-dark" />
				</div>

				{/* Files */}
				{[
					{ label: 'Fotocopy KTM', url: uktAppeal?.ktm },
					{ label: 'Fotocopy Bukti Pemayaran UKT (Legalisir)', url: uktAppeal?.ukt_proof },
					{ label: 'Fotocopy Transkrip Semester Terakhir (Legalisir)', url: uktAppeal?.transcript },
					{ label: 'Surat Keterangan Bencana Alam/non-Alam', url: uktAppeal?.sk },
				].map((item, idx) => (
					<div className="mb-4" key={idx}>
						<label className="block text-dark font-medium mb-1">
							{item.label} <span className="text-red-500">*</span>
						</label>
						<p className="text-sm text-gray mb-2">Upload file dalam bentuk pdf</p>
						<a href={`${import.meta.env.VITE_API_BASE_URL}/${item.url}`} target="_blank" rel="noopener noreferrer">
							<button className="flex items-center text-dark bg-white border border-black/50 px-3 py-2 rounded-md cursor-pointer hover:bg-main-primary hover:text-white transition-colors">
								<FileText className="mr-2 w-4 h-4" /> Lihat File
							</button>
						</a>
					</div>
				))}

				{/* Tipe Bencana Radio */}
				<div className="mb-6">
					<label className="block text-dark font-medium mb-2">
						Tipe Bencana <span className="text-red">*</span>
					</label>
					<div className="space-y-2">
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="bencana"
								checked={uktAppeal?.problem === 'natural'}
								className="appearance-none w-5 h-5 rounded-full border-2 border-gray bg-white checked:bg-main-primary checked:border-main-primary transition-colors"
								readOnly
							/>
							<span>Bencana Alam</span>
						</label>
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="bencana"
								checked={uktAppeal?.problem === 'non_natural'}
								className="appearance-none w-5 h-5 rounded-full border-2 border-gray bg-white checked:bg-main-primary checked:border-main-primary transition-colors"
								readOnly
							/>
							<span>Bencana non-Alam</span>
						</label>
					</div>
				</div>

				{uktAppealStatus?.value !== 'pending' && (
					<>
						<div className="flex items-center space-x-2 mb-2 text-dark">
							<MessageSquareText className="w-5 h-5" />
							<span>Tanggapan</span>
						</div>

						<div className={`px-7 pt-4 pb-14 rounded-lg ${uktAppealStatus?.bgColor}`}>
							{uktAppeal?.admin_note && (
								<>
									<div className="flex flex-wrap justify-between items-center gap-4">
										<div className="flex flex-wrap items-center gap-4">
											<div className="bg-main-primary inline-flex items-center justify-center p-2 rounded-full">
												<User className="w-8 h-8 text-white" />
											</div>
											<h2 className={`text-xl text-main-primary font-semibold`}>{uktAppeal?.admins?.name ?? 'Admin'}</h2>
										</div>
										<p className="text-[#0B4D9B99]">{uktAppeal?.submitted_at && formatDateToShortIndonesian(uktAppeal?.submitted_at)}</p>
									</div>
									<p className="text-dark mt-5">{uktAppeal?.admin_note}</p>
								</>
							)}
						</div>
					</>
				)}
			</div>

			<DeleteBandingUktModal id={uktAppeal?.id} openModal={deleteModal} closeModal={() => setDeleteModal(false)} />
		</div>
	);
}
