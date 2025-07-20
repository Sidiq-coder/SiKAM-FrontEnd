const Tabs = ({ tabs, activeTab, onTabChange, data = null, className = '', gap = 8, textSize = 'base' }) => {
	return (
		<div className={`flex gap-x-${gap} border-b border-gray overflow-auto ${className}`}>
			{tabs.map((tab) => {
				const isActive = activeTab === tab.value;

				const count = !data ? 0 : tab.value === 'semua' ? data.length : data.filter((item) => item.status.toLowerCase() === tab.value.toLowerCase()).length;

				return (
					<div key={tab.value} className="flex gap-x-2">
						<button
							className={`pb-3 px-1 text-${textSize} font-medium transition-colors ${isActive ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'} cursor-pointer`}
							onClick={() => onTabChange(tab.value)}
						>
							<span>{tab.label}</span>
						</button>
						{!data ? null : <span className={`w-6 h-6 flex items-center justify-center rounded-full bg-[#C9CEFF] text-white text-sm ${isActive ? 'bg-primary' : ''}`}>{count}</span>}
					</div>
				);
			})}
		</div>
	);
};

export default Tabs;
