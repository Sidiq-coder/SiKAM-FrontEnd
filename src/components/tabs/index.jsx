const Tabs = ({ tabs, activeTab, onTabChange, data = null }) => {
	return (
		<div className="flex space-x-8 mb-6 border-b border-[#ACACAC]">
			{tabs.map((tab) => {
				const isActive = activeTab === tab.value;

				const count = !data ? 0 : tab.value === 'semua' ? data.length : data.filter((item) => item.status.toLowerCase() === tab.value.toLowerCase()).length;

				return (
					<div key={tab.value} className="flex gap-x-2">
						<button
							className={`pb-3 px-1 font-medium transition-colors ${isActive ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'} cursor-pointer`}
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
