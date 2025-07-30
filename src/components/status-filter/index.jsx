const StatusFilterItem = ({ icon: StatusIcon, status, textColor, onClick, label }) => {
	return (
		<div className="flex items-center space-x-2 text-sm cursor-pointer hover:opacity-80" onClick={() => onClick?.(status)}>
			{StatusIcon && <StatusIcon className={`w-4 h-4 ${textColor}`} />}
			<span className={textColor}>{label}</span>
		</div>
	);
};

const StatusFilter = ({ title = 'Status', statusList = [], onStatusClick = null, className = 'bg-white rounded-lg shadow-sm border border-gray-200 p-4', direction = 'flex-col' }) => {
	return (
		<div className={className}>
			<h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
			<div className={`flex ${direction} flex-wrap gap-4`}>
				{statusList.length > 0 ? (
					statusList.map((status, index) => {
						const { textColor, label, icon, value } = status;
						return <StatusFilterItem key={index} label={label} status={value} textColor={textColor} icon={icon} onClick={onStatusClick} />;
					})
				) : (
					<p className="text-sm text-gray italic">Belum ada status yang tersedia.</p>
				)}
			</div>
		</div>
	);
};

export default StatusFilter;
