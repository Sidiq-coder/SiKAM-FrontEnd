import { useParams, NavLink } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFilePdf, faSave, faImage, faEdit, faTrash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { mainAdvika } from '@/mocks/advikaMock';
import { useState, useEffect } from 'react';
import FilterButton from '@/components/filter-button';

const COLORS = {
	primary: '#2A2A2A',
	secondary: '#0B4D9B',
	accent: '#EE4848',
	text: '#000000',
	muted: '#6B7280',
};

export default function DetailAdvika() {
	const params = useParams();
	const [_, setArticles] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [editedData, setEditedData] = useState({});
	const article = mainAdvika.find((item) => item.id === Number(params.id));

	useEffect(() => {
		// Load all articles or filter based on your needs
		setArticles(mainAdvika);
	}, []);

	const handleEdit = (article) => {
		setEditingId(article.id);
		setEditedData({ ...article });
	};

	const handleSave = (id) => {
		setArticles((prev) => prev.map((article) => (article.id === id ? { ...editedData } : article)));
		setEditingId(null);
		setEditedData({});
		// Add your save to backend logic here
		console.log('Saving article:', editedData);
	};

	const handleCancel = () => {
		setEditingId(null);
		setEditedData({});
	};

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this article?')) {
			setArticles((prev) => prev.filter((article) => article.id !== id));
			// Add your delete from backend logic here
		}
	};

	const handleInputChange = (field, value) => {
		setEditedData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleImageUpdate = (newImagePath) => {
		setEditedData((prev) => ({
			...prev,
			imagePath: newImagePath,
		}));
	};

	// Add this function to handle PDF updates
	const handlePdfUpdate = (newPdfPath) => {
		setEditedData((prev) => ({
			...prev,
			pdfPath: newPdfPath,
		}));
	};

	const [selectedFilter, setSelectedFilter] = useState('Publish');

	return (
		<div className="px-10 md:px-20 lg:px-32 pb-1 min-h-screen mb-48">
			<div className="flex items-center justify-between pt-4">
				<div className="flex items-center gap-2">
					<BackButton />
					{/* Filtering Button */}
					<h1 className="text-xl ml-20">status : </h1>
					<FilterButton Icon={Upload} className="text-white" options={['Publish', 'Draft']} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
				</div>

				{/* Action Buttons */}
				<div className="flex justify-end gap-2 mb-4">
					{!(editingId === article.id) ? (
						<>
							<button onClick={() => handleEdit(article)} className="flex items-center gap-2 px-3 py-1 bg-yellow text-white text-xs rounded hover:opacity-80 transition-colors">
								<FontAwesomeIcon icon={faEdit} />
								Edit Berita
							</button>
							<button onClick={() => handleDelete(article.id)} className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors">
								<FontAwesomeIcon icon={faTrash} />
								Hapus Berita
							</button>
						</>
					) : (
						<>
							<button onClick={() => handleSave(article.id)} className="flex items-center gap-2 px-3 py-1 bg-yellow text-white text-xs rounded hover:opacity-80 transition-colors">
								<FontAwesomeIcon icon={faSave} />
								Simpan
							</button>
							<button onClick={handleCancel} className="flex items-center gap-2 px-3 py-1 bg-[#DC3545] text-white text-xs rounded hover:opacity-80 transition-colors">
								<FontAwesomeIcon icon={faCircleXmark} />
								Batal
							</button>
						</>
					)}
				</div>
			</div>

			<div className="space-y-8">
				{article && (
					<EditableArticleCard
						key={article.id}
						article={article}
						isEditing={editingId === article.id}
						editedData={editedData}
						onInputChange={handleInputChange}
						onImageUpdate={handleImageUpdate}
						onPdfUpdate={handlePdfUpdate}
					/>
				)}
			</div>
		</div>
	);
}

const BackButton = () => (
	<NavLink to="/admin/advika" className="flex items-center gap-4 mb-8 pt-8 cursor-pointer hover:brightness-150 transition-all duration-300">
		<FontAwesomeIcon icon={faChevronLeft} className="opacity-60" />
		<h1 className="capitalize text-black opacity-60 text-xl">advika</h1>
	</NavLink>
);

const EditableArticleCard = ({ article, isEditing, editedData, onInputChange, onImageUpdate, onPdfUpdate }) => {
	const currentData = isEditing ? editedData : article;
	const [pdfPath, setPdfPath] = useState('/images/Example.pdf');

	const handlePdfUpdate = (newPdfPath) => {
		setPdfPath(newPdfPath);
		// Also update the parent component's state
		onPdfUpdate(newPdfPath);
	};

	return (
		<div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
			{/* Title Field */}
			<div className="mb-4">
				{isEditing ? (
					<input
						type="text"
						value={currentData.title || ''}
						onChange={(e) => onInputChange('title', e.target.value)}
						className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter article title"
					/>
				) : (
					<h3 className="text-xl font-bold p-2" style={{ color: COLORS.primary }}>
						{currentData.title}
					</h3>
				)}
			</div>

			{/* Author Field */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
				{isEditing ? (
					<input
						type="text"
						value={currentData.author || ''}
						onChange={(e) => onInputChange('author', e.target.value)}
						className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter author name"
					/>
				) : (
					<p className="p-2 bg-gray-50 rounded-lg" style={{ color: COLORS.secondary }}>
						{currentData.author}
					</p>
				)}
			</div>

			{/* Date Field */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
				{isEditing ? (
					<input
						type="date"
						value={currentData.date || ''}
						onChange={(e) => onInputChange('date', e.target.value)}
						className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				) : (
					<p className="p-2 bg-gray-50 rounded-lg">{currentData.date}</p>
				)}
			</div>

			{/* Image Field */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
				{isEditing ? (
					<div className="space-y-4">
						{/* Current Image Preview */}
						{currentData.imagePath && (
							<div className="p-2 bg-gray-50 rounded-lg">
								<div className="flex justify-center w-full">
									<img src={currentData.imagePath} alt={currentData.title} className="w-200 h-100 object-cover rounded-lg shadow-md" loading="lazy" />
								</div>
							</div>
						)}

						{/* Image URL Input */}
						<div>
							<label className="block text-xs text-gray-600 mb-1">Image URL:</label>
							<input
								type="text"
								value={currentData.imagePath || ''}
								onChange={(e) => onInputChange('imagePath', e.target.value)}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter image URL or path"
							/>
						</div>

						{/* Upload New Image */}
						<ImageUpload onImageUpdate={onImageUpdate} />
					</div>
				) : (
					<div className="p-2 bg-gray-50 rounded-lg">
						<div className="flex justify-center">
							<img src={currentData.imagePath} alt={currentData.title} className="w-200 h-100 object-cover rounded-lg shadow-md" loading="lazy" />
						</div>
					</div>
				)}
			</div>

			{/* Description Field */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
				{isEditing ? (
					<textarea
						value={currentData.description || ''}
						onChange={(e) => onInputChange('description', e.target.value)}
						className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
						placeholder="Enter article description"
					/>
				) : (
					<p className="p-2 bg-gray-50 rounded-lg whitespace-pre-line" style={{ color: COLORS.primary }}>
						{currentData.description}
					</p>
				)}
			</div>

			<div>{isEditing ? <PDFUpload onPdfUpdate={handlePdfUpdate} /> : <PDFDownloadButton pdfPath={currentData.pdfPath || pdfPath} onPdfUpdate={handlePdfUpdate} />}</div>
		</div>
	);
};

const PDFDownloadButton = ({ pdfPath }) => (
	<div className="space-y-4 mb-12 mt-8">
		<div className="p-2 bg-[#EE4848] rounded-lg w-fit hover:opacity-80 transition-all duration-300 ease-in-out">
			<a href={pdfPath} target="_blank" rel="noopener noreferrer" className="text-white flex items-center gap-2" download title="Download PDF">
				<FontAwesomeIcon icon={faFilePdf} />
				rsptn.pdf
			</a>
		</div>
	</div>
);

const ImageUpload = ({ onImageUpdate }) => {
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [uploading, setUploading] = useState(false);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith('image/')) {
			setImage(file);
			setPreview(URL.createObjectURL(file));
		} else {
			alert('Please upload a valid image file.');
		}
	};

	const handleUpload = async () => {
		if (!image) return;

		setUploading(true);
		const formData = new FormData();
		formData.append('file', image);

		try {
			// Replace with your actual API endpoint
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (response.ok) {
				console.log('Upload success:', data);
				onImageUpdate(data.imagePath || preview);
				setImage(null);
				setPreview(null);
				alert('Image uploaded successfully!');
			} else {
				throw new Error(data.message || 'Upload failed');
			}
		} catch (error) {
			console.error('Upload error:', error);
			alert('Upload failed. Please try again.');
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
			<div className="flex items-center gap-4 mb-4">
				<label className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
					<FontAwesomeIcon icon={faImage} />
					Choose Image
					<input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
				</label>
				{image && (
					<button
						onClick={handleUpload}
						disabled={uploading}
						className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{uploading ? 'Uploading...' : 'Upload Image'}
					</button>
				)}
			</div>

			{preview && (
				<div className="mt-4">
					<p className="text-sm text-gray-600 mb-2">Preview:</p>
					<img src={preview} alt="preview" className="w-40 h-40 object-cover rounded-lg shadow-md" />
				</div>
			)}
		</div>
	);
};

const PDFUpload = ({ onPdfUpdate }) => {
	const [pdf, setPdf] = useState(null);
	const [uploading, setUploading] = useState(false);

	const handlePdfChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type === 'application/pdf') {
			setPdf(file);
		} else {
			alert('Please upload a valid PDF file.');
		}
	};

	const handleUpload = async () => {
		if (!pdf) return;

		setUploading(true);
		const formData = new FormData();
		formData.append('file', pdf);

		try {
			// Replace with your actual API endpoint
			const response = await fetch('/api/upload-pdf', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (response.ok) {
				console.log('PDF Upload success:', data);
				onPdfUpdate(data.pdfPath || URL.createObjectURL(pdf));
				setPdf(null);
				alert('PDF uploaded successfully!');
			} else {
				throw new Error(data.message || 'Upload failed');
			}
		} catch (error) {
			console.error('PDF Upload error:', error);
			alert('PDF upload failed. Please try again.');
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
			<div className="flex items-center gap-4 mb-4">
				<label className="flex items-center gap-2 cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
					<FontAwesomeIcon icon={faFilePdf} />
					Choose PDF
					<input type="file" accept="application/pdf" onChange={handlePdfChange} className="hidden" />
				</label>
				{pdf && (
					<button
						onClick={handleUpload}
						disabled={uploading}
						className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{uploading ? 'Uploading...' : 'Upload PDF'}
					</button>
				)}
			</div>

			{pdf && (
				<div className="mt-4">
					<p className="text-sm text-gray-600 mb-2">Selected PDF:</p>
					<div className="flex items-center gap-2 p-2 bg-white rounded-lg border">
						<FontAwesomeIcon icon={faFilePdf} className="text-red-600" />
						<span className="text-sm">{pdf.name}</span>
					</div>
				</div>
			)}
		</div>
	);
};
