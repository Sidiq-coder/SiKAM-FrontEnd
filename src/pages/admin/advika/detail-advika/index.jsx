import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Edit, Trash } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import useNewsStore from '@/stores/useNewsStore';
import Button from '@/components/button';
import { Modal } from '@/components/modal';

export default function DetailAdvika() {
	const { id } = useParams();

	const { getNewsById, newsItem } = useNewsStore();

	const [deleteModal, setDeleteModal] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			await getNewsById(id);
		};
		fetch();
	}, [id]);

	return (
		<div className="bg-white px-10 md:px-20 lg:px-32 pb-1 min-h-screen">
			<div className="flex flex-wrap items-center justify-between">
				<BackButton />
				{newsItem && (
					<div className="flex flex-wrap items-center gap-4">
						<Button variant="warning" label="Edit Berita" size="medium" className="text-white" icon={<Edit className="w-4 h-4" />} href={`/admin/advika/${newsItem.id}/edit`} anchor />
						<Button variant="danger" label="Hapus" size="medium" icon={<Trash className="w-4 h-4" />} onClick={() => setDeleteModal(true)} />
					</div>
				)}
			</div>

			{newsItem ? (
				<>
					<ArticleContent />
					<PDFDownloadButton />
					<DeleteLaporanModal isOpen={deleteModal} closeModal={() => setDeleteModal(false)} />
				</>
			) : (
				<NotFound />
			)}
		</div>
	);
}

const BackButton = () => (
	<Link to="/admin/advika" className="flex items-center gap-4 mb-8 pt-12 cursor-pointer hover:brightness-150 transition-all duration-300">
		<FontAwesomeIcon icon={faChevronLeft} className="opacity-60" />
		<h1 className="capitalize text-black opacity-60 text-xl">advika</h1>
	</Link>
);

const ArticleContent = () => {
	const { newsItem } = useNewsStore();

	return (
		<article className="mb-12">
			<h2 className="text-3xl text-dark font-bold mb-4">{newsItem.title}</h2>
			<p className="text-dark opacity-80 mb-6">
				<span className="text-main-primary">{newsItem.admin_name}</span> - {new Date(newsItem.published_at).toLocaleDateString()}
			</p>
			<img
				src={newsItem.cover_url ? `${import.meta.env.VITE_API_BASE_URL}/${newsItem.cover_url}` : '/images/img-placeholder.png'}
				alt={newsItem.title}
				className="w-[70%] mx-auto h-auto max-h-120 mb-6"
				loading="lazy"
			/>
			<p className="text-dark whitespace-pre-line">{newsItem.description}</p>
		</article>
	);
};

const PDFDownloadButton = () => {
	const { newsItem } = useNewsStore();

	if (newsItem.attachment_url === null) return null;

	return (
		<div className="p-2 bg-red rounded-lg w-fit hover:opacity-80 transition-all duration-300 ease-in-out mb-12">
			<a href={`${import.meta.env.VITE_API_BASE_URL}/${newsItem.attachment_url}`} target="_blank" rel="noopener noreferrer" className="text-white flex items-center gap-2" title="Download PDF">
				<FontAwesomeIcon icon={faFilePdf} />
				Attachment
			</a>
		</div>
	);
};

const NotFound = () => (
	<div className="text-center py-12">
		<h2 className="text-2xl font-bold text-gray-600 mb-4">Artikel tidak ditemukan</h2>
		<p className="text-gray-500">Artikel yang dicari tidak dapat ditemukan.</p>
	</div>
);

const DeleteLaporanModal = ({ isOpen, closeModal }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { deleteNews, clearError } = useNewsStore();

	const handleDeleteNews = async () => {
		try {
			const result = await deleteNews(id);

			if (result?.data?.success) {
				closeModal();
				clearError();
				toast.success('Berhasil menghapus berita');
				navigate('/admin/advika');
			}
		} catch (error) {
			toast.error('Terjadi kesalahan!');
			console.error('Error:', error);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={closeModal} size="md">
			<div className="flex flex-col items-center text-center md:pt-10">
				<img src="/images/trash.png" alt="trash.png" className="w-30" />
				<h2 className="text-2xl text-dark font-semibold mt-10">Hapus berita ini?</h2>
				<p className="text-[#6C757D] mt-2">Tindakan ini akan menghapus berita secara permanen dari sistem. Anda tidak dapat mengembalikannya.</p>
			</div>
			<div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-10 pb-4">
				<Button variant="secondary" label="Batal" size="large" onClick={closeModal} />
				<Button variant="danger" label="Hapus" size="large" onClick={handleDeleteNews} />
			</div>
		</Modal>
	);
};
