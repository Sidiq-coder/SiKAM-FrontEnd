import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFile, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { mainAdvika } from '@/mocks/advikaMock';
import Button from '@/components/button';

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
		<div className="px-10 md:px-20 lg:px-32 pb-1 min-h-screen mb-48">
			<div className="flex items-center justify-between pt-4">
				<BackButton />
				<Button
					label={`Edit Berita`}
					href={`/admin/advika/editAdvika/${params.id}`}
					icon={<FontAwesomeIcon icon={faFile} />}
					className={`bg-yellow text-white text-xs hover:opacity-80 transition-all transition-duration-500 cursor-pointer`}
				/>
			</div>
			{article ? (
				<>
					<ArticleContent article={article} />
					<PDFDownloadButton />
					<hr className="my-6" />
				</>
			) : (
				<NotFound />
			)}
		</div>
	);
}

const BackButton = () => (
	<NavLink to="/admin/advika" className="flex items-center gap-4 mb-8 pt-8 cursor-pointer hover:brightness-150 transition-all duration-300">
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

const NotFound = () => (
	<div className="text-center py-12">
		<h2 className="text-2xl font-bold text-gray-600 mb-4">Article not found</h2>
		<p className="text-gray-500">The requested article could not be found.</p>
	</div>
);
