import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import useNewsStore from '@/stores/useNewsStore';
import { useEffect } from 'react';

export default function DetailAdvika() {
	const { id } = useParams();

	const { getNewsById, newsItem } = useNewsStore();

	useEffect(() => {
		const fetch = async () => {
			await getNewsById(id);
		};
		fetch();
	}, [id]);

	return (
		<div className="bg-white px-10 md:px-20 lg:px-32 pb-1 min-h-screen">
			<BackButton />

			{newsItem ? (
				<>
					<ArticleContent />
					<PDFDownloadButton />
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
			<img src={`${import.meta.env.VITE_API_BASE_URL}/${newsItem.cover_url}`} alt={newsItem.title} className="w-[70%] mx-auto h-auto mb-6 rounded-lg shadow-md" loading="lazy" />
			<p className="text-dark whitespace-pre-line">{newsItem.description}</p>
		</article>
	);
};

const PDFDownloadButton = () => {
	const { newsItem } = useNewsStore();

	return (
		<div className="p-2 bg-red rounded-lg w-fit hover:opacity-80 transition-all duration-300 ease-in-out mb-12">
			<a href={newsItem.attachment_url} target="_blank" rel="noopener noreferrer" className="text-white flex items-center gap-2" download title="Download PDF">
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
