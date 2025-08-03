const StatusFilterItem = ({ status, isActive, onClick }) => {
	return (
		<div
			className={`flex w-fit items-center space-x-2 text-sm cursor-pointer hover:opacity-80 px-2 py-1 rounded-md 
				${isActive ? `${status.bgColor} text-white` : `${status.textColor}`}`}
			onClick={() => onClick?.(status.value)}
		>
			{status.icon && <status.icon className="w-4 h-4" />}
			<span>{status.label}</span>
		</div>
	);
};

const StatusFilter = ({ title = 'Status', statusList = [], onStatusClick = null, className = 'bg-white rounded-lg shadow-sm border border-gray-200 p-4', direction = 'flex-col', activeStatus }) => {
	return (
		<div className={className}>
			<h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
			<div className={`flex ${direction} flex-wrap gap-4`}>
				{statusList.length > 0 ? (
					statusList.map((status, index) => {
						return <StatusFilterItem key={index} status={status} isActive={status.value === activeStatus} onClick={onStatusClick} />;
					})
				) : (
					<p className="text-sm text-gray italic">Belum ada status yang tersedia.</p>
				)}
			</div>
		</div>
	);
};

export default StatusFilter;
