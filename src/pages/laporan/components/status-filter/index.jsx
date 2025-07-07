import getStatusIcon from '@/utils/getStatusIcon';

const StatusFilterItem = ({ status, textColor }) => {
	return (
		<div className="flex items-center space-x-2 text-sm">
			{getStatusIcon(status, textColor)}
			<span className={textColor}>{status}</span>
		</div>
	);
};

const StatusFilter = ({ activeTab }) => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
			<h3 className="text-2xl font-bold text-gray-800 mb-4">Status</h3>
			<div className="space-y-3">
				{activeTab === 'semua' ? null : <StatusFilterItem status="Pending" textColor="text-[#ED9E31]" />}
				<StatusFilterItem status="Ditinjau" textColor="text-[#EDC831]" />
				<StatusFilterItem status="Ditanggapi" textColor="text-[#007BFF]" />
				<StatusFilterItem status="Selesai" textColor="text-[#2FCB51]" />
				{activeTab === 'semua' ? null : <StatusFilterItem status="Ditolak" textColor="text-[#EE4848]" />}
			</div>
		</div>
	);
};

export default StatusFilter;
