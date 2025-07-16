import getStatusIcon from '@/utils/getStatusIcon';

const getStatusColor = (status) => {
	switch (status) {
		case 'waiting':
			return 'text-[#E79625]';
		case 'verified':
			return 'text-[#2FCB51]';
		case 'not verified':
			return 'text-[#EE4848]';
		default:
			return 'text-[#E79625]';
	}
};

const DataTable = ({ columns, data, onClick = null }) => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-[#F0F0F0] border-b border-gray-200">
						<tr>
							{columns.map((col) => (
								<th key={col.field} className="text-left py-3 px-6 text-sm font-semibold text-[#2A2A2AB2]">
									{col.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{data.map((item, idx) => (
							<tr key={item.id || idx} className={`hover:bg-gray-50 transition-colors ${!onClick ? '' : 'cursor-pointer'}`} onClick={onClick}>
								{columns.map((col) => (
									<td key={col.field} className="py-4 px-6 text-sm text-gray-700">
										{col.field === 'status' ? (
											<span className={`inline-flex gap-x-2 items-center px-4 py-1.5 rounded-md text-xs font-medium shadow-md ${getStatusColor(item[col.field])}`}>
												{getStatusIcon(item[col.field])}
												<span>{item[col.field]}</span>
											</span>
										) : (
											item[col.field]
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DataTable;
