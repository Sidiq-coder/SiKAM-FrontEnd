import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { mainAdvika, beritaTerbaru } from '../../mocks/advikaMock';

const COLORS = {
	primary: '#2A2A2A',
	secondary: '#0B4D9B',
	accent: '#EE4848',
	text: '#000000',
	muted: '#6B7280',
};

export default function DetailAdvika() {
	const params = useParams();

	const article = mainAdvika.find((item) => item.id === Number(params.id));

	return (
		<div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat px-10 md:px-20 lg:px-32 pb-1 min-h-screen">
			<BackButton />

			{article ? (
				<>
					<ArticleContent article={article} />
					<PDFDownloadButton />
					<hr className="my-6" />
					<RelatedNews news={beritaTerbaru} />
				</>
			) : (
				<NotFound />
			)}
		</div>
	);
}

const BackButton = () => (
	<NavLink to="/advika" className="flex items-center gap-4 mb-8 pt-12 cursor-pointer hover:brightness-150 transition-all duration-300">
		<FontAwesomeIcon icon={faChevronLeft} className="opacity-60" />
		<h1 className="capitalize text-black opacity-60 text-xl">advika</h1>
	</NavLink>
);

const ArticleContent = ({ article }) => (
	<article className="mb-12">
		<h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>
			{article.title}
		</h2>
		<p className="opacity-80 mb-6" style={{ color: COLORS.primary }}>
			<span style={{ color: COLORS.secondary }}>{article.author}</span> - {article.date}
		</p>
		<img src={article.imagePath} alt={article.title} className="w-[70%] mx-auto h-auto mb-6 rounded-lg shadow-md" loading="lazy" />
		<p className="whitespace-pre-line" style={{ color: COLORS.primary }}>
			{article.description}
		</p>
	</article>
);

const PDFDownloadButton = () => (
	<div className="p-2 bg-[#EE4848] rounded-lg w-fit hover:opacity-80 transition-all duration-300 ease-in-out mb-12">
		<a href="/images/Example.pdf" target="_blank" rel="noopener noreferrer" className="text-white flex items-center gap-2" download title="Download PDF">
			<FontAwesomeIcon icon={faFilePdf} />
			rsptn.pdf
		</a>
	</div>
);

const RelatedNews = ({ news }) => (
	<section>
		<h2 className="text-white capitalize bg-[#2A2A2A] w-fit p-2 rounded-md my-4">berita lainnya</h2>
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
			{news.map((item) => (
				<article key={item.id} className="rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
					<img src={item.imagePath} alt={item.title} className="w-full h-[100px] object-cover rounded-lg" loading="lazy" />
					<div className="p-3">
						<h3 className="text-sm font-semibold mb-1 leading-snug" style={{ color: COLORS.primary }}>
							{item.title}
						</h3>
						<time className="text-xs text-gray-500">{item.date}</time>
					</div>
				</article>
			))}
		</div>
	</section>
);

const NotFound = () => (
	<div className="text-center py-12">
		<h2 className="text-2xl font-bold text-gray-600 mb-4">Article not found</h2>
		<p className="text-gray-500">The requested article could not be found.</p>
	</div>
);
