import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const Pagination = ({ className = '', currentPage = 1, totalPages = 1, onPageChange, maxVisiblePages = 3 }) => {
	const handlePrev = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const handlePageClick = (page) => {
		onPageChange(page);
	};

	// Fungsi untuk menghitung halaman yang akan ditampilkan
	const getVisiblePages = () => {
		if (totalPages <= maxVisiblePages) {
			// Jika total halaman kurang dari atau sama dengan maxVisiblePages, tampilkan semua
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const half = Math.floor(maxVisiblePages / 2);
		let start = Math.max(currentPage - half, 1);
		let end = Math.min(start + maxVisiblePages - 1, totalPages);

		// Adjust start if we're near the end
		if (end - start + 1 < maxVisiblePages) {
			start = Math.max(end - maxVisiblePages + 1, 1);
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	const visiblePages = getVisiblePages();
	const showStartEllipsis = visiblePages[0] > 1;
	const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	return (
		<div className={`flex ${className}`}>
			<div className="flex items-center space-x-1">
				{/* Previous Button */}
				<button
					className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
					onClick={handlePrev}
					disabled={currentPage === 1}
				>
					<ChevronLeft className="w-5 h-5" />
				</button>

				{/* First page + ellipsis */}
				{showStartEllipsis && (
					<>
						<button className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" onClick={() => handlePageClick(1)}>
							1
						</button>
						{visiblePages[0] > 2 && <span className="px-2 py-2 text-gray-400 text-sm">...</span>}
					</>
				)}

				{/* Visible page numbers */}
				{visiblePages.map((page) => (
					<button
						key={page}
						className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-[#0E50A0] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
						onClick={() => handlePageClick(page)}
					>
						{page}
					</button>
				))}

				{/* Last page + ellipsis */}
				{showEndEllipsis && (
					<>
						{visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="px-2 py-2 text-gray-400 text-sm">...</span>}
						<button className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" onClick={() => handlePageClick(totalPages)}>
							{totalPages}
						</button>
					</>
				)}

				{/* Next Button */}
				<button
					className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
						currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
					}`}
					onClick={handleNext}
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
