const getStatusColor = (status) => {
	switch (status) {
		case 'waiting':
			return 'text-orange-800 bg-orange-100';
		case 'verified':
			return 'text-green-800 bg-green-100';
		case 'rejected':
			return 'text-red-800 bg-red-100';
		default:
			return 'text-gray-800 bg-gray-100';
	}
};

const getDotColor = (status) => {
	switch (status) {
		case 'waiting':
			return 'bg-orange-400';
		case 'verified':
			return 'bg-green-400';
		case 'rejected':
			return 'bg-red-400';
		default:
			return 'bg-gray-400';
	}
};

const getStatusText = (status) => {
	switch (status) {
		case 'waiting':
			return 'Menunggu';
		case 'verified':
			return 'Terverifikasi';
		case 'rejected':
			return 'Ditolak';
		default:
			return status;
	}
};

const DataTable = ({ columns, data }) => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50 border-b border-gray-200">
						<tr>
							{columns.map((col) => (
								<th key={col.field} className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
									{col.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{data.map((item, idx) => (
							<tr key={item.id || idx} className="hover:bg-gray-50 transition-colors">
								{columns.map((col) => (
									<td key={col.field} className="py-4 px-6 text-sm text-gray-700">
										{col.field === 'status' ? (
											<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item[col.field])}`}>
												<span className={`w-2 h-2 rounded-full mr-1.5 ${getDotColor(item[col.field])}`}></span>
												{getStatusText(item[col.field])}
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
