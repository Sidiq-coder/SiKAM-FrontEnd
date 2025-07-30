const Pagination = ({ className = '', currentPage = 1, totalPages = 1, onPageChange }) => {
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

	return (
		<div className={`flex ${className}`}>
			<div className="flex items-center space-x-2">
				<button
					className={`px-3.5 py-1.5 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors'}`}
					onClick={handlePrev}
					disabled={currentPage === 1}
				>
					‹
				</button>

				<span className="px-3.5 py-1.5 rounded-lg bg-[#0E50A0] text-white font-medium">{currentPage}</span>

				<button
					className={`px-3.5 py-1.5 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors'}`}
					onClick={handleNext}
					disabled={currentPage === totalPages}
				>
					›
				</button>
			</div>
		</div>
	);
};

export default Pagination;
