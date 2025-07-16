import getStatusIcon from '@/utils/getStatusIcon';

const StatusFilterItem = ({ status, textColor, onClick }) => {
	return (
		<div className="flex items-center space-x-2 text-sm cursor-pointer hover:opacity-80" onClick={() => onClick?.(status)}>
			{getStatusIcon(status, textColor)}
			<span className={textColor}>{status}</span>
		</div>
	);
};

const StatusFilter = ({ title = 'Status', statusList = [], onStatusClick = null }) => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
			<h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
			<div className="space-y-3">
				{statusList.map(({ status, color }, index) => (
					<StatusFilterItem key={index} status={status} textColor={color} onClick={onStatusClick} />
				))}
			</div>
		</div>
	);
};

export default StatusFilter;
