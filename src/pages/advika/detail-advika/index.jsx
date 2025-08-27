import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import useNewsStore from '@/stores/useNewsStore';
import { useEffect } from 'react';

export default function DetailAdvika() {
	const { id } = useParams();

	const { getNews, getNewsById, newsItem } = useNewsStore();

	useEffect(() => {
		const fetch = async () => {
			await getNews({ page: 1, itemPerPage: 8, sort: 'newest' });
			await getNewsById(id);
		};
		fetch();
	}, [id]);

	return (
		<div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat px-10 md:px-20 lg:px-32 pb-1 min-h-screen">
			<BackButton />

			{newsItem ? (
				<>
					<ArticleContent />
					<PDFDownloadButton />
					<hr className="my-6" />
					<RelatedNews />
				</>
			) : (
				<NotFound />
			)}
		</div>
	);
}

const BackButton = () => (
	<Link to="/advika" className="flex items-center gap-4 mb-8 pt-12 cursor-pointer hover:brightness-150 transition-all duration-300">
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
				<span className="text-main-primary">{newsItem.admins.name ?? '-'}</span> {
					newsItem.published_at && ' - ' + new Date(newsItem.published_at).toLocaleDateString()
				}
			</p>
			<img
				src={newsItem.cover_url ? `${import.meta.env.VITE_API_BASE_URL}/${newsItem.cover_url}` : '/images/img-placeholder.png'}
				alt={newsItem.title}
				className="w-[70%] mx-auto h-auto max-h-120 object-cover mb-6"
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

const RelatedNews = () => {
	const { news } = useNewsStore();

	return (
		<section className="my-8">
			<h2 className="text-white capitalize bg-[#2A2A2A] w-fit p-2 rounded-md my-4">berita lainnya</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{news.map((item) => (
					<a key={item.id} href={`/advika/${item.id}`} className="rounded-lg overflow-hidden cursor-pointer">
						<img
							src={item.cover_url ? `${import.meta.env.VITE_API_BASE_URL}/${item.cover_url}` : '/images/img-placeholder.png'}
							alt={item.title}
							className="w-full h-[100px] object-cover rounded-lg"
							loading="lazy"
						/>
						<div className="p-3">
							<h3 className="text-sm text-dark font-semibold mb-1 leading-snug">{item.title}</h3>
							<time className="text-xs text-gray-500">{new Date(item.published_at).toLocaleDateString()}</time>
						</div>
					</a>
				))}
			</div>
		</section>
	);
};

const NotFound = () => (
	<div className="text-center py-12">
		<h2 className="text-2xl font-bold text-gray-600 mb-4">Artikel tidak ditemukan</h2>
		<p className="text-gray-500">Artikel yang dicari tidak dapat ditemukan.</p>
	</div>
);
