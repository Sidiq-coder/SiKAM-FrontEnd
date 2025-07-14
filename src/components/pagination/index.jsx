const Pagination = ({ className = '' }) => {
	return (
		<div className={`flex ${className}`}>
			<div className="flex items-center space-x-2">
				<button className="px-3.5 py-1.5 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed">‹</button>
				<button className="px-3.5 py-1.5 rounded-lg bg-[#0E50A0] text-white font-medium">1</button>
				<button className="px-3.5 py-1.5 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-200 transition-colors">›</button>
			</div>
		</div>
	);
};

export default Pagination;
