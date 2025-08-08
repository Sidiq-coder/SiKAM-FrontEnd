const DataTable = ({ columns, data, onClick = null }) => {
	return (
		<div className="bg-white rounded-lg overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-[#F0F0F0]">
						<tr>
							{columns.map((col) => (
								<th key={`${col.field}-${col.label}`} className={`text-left py-3 px-6 text-sm font-semibold text-[#2A2A2AB2] ${col.onSort ? 'cursor-pointer' : ''}`} onClick={() => col.onSort?.()}>
									<div className="flex items-center gap-2">{col.renderHead ? col.renderHead() : col.label}</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{data.length > 0 ? (
							data.map((item, idx) => (
								<tr key={item.id || idx} className={`hover:bg-gray-50 transition-colors ${!onClick ? '' : 'cursor-pointer'}`} onClick={() => onClick?.(item.id)}>
									{columns.map((col) => (
										<td key={`${col.field}-${col.label}`} className="py-4 px-6 text-sm text-dark">
											{col.render ? col.render(item) : item[col.field] ?? '-'}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td colSpan={columns.length} className="py-6 px-6 text-center text-sm text-dark">
									Tidak ada data untuk ditampilkan.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DataTable;
