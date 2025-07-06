import { Calendar, ChevronDown } from 'lucide-react';
import React from 'react';

const FilterButton = ({ options, selectedFilter, setSelectedFilter, className = '' }) => {
	return (
		<div className={`flex items-center space-x-4 ${className}`}>
			<div className="relative">
				<select
					className="bg-[#ED9E31] text-[#2A2A2A] px-10 py-2 rounded-lg font-medium appearance-none pr-8 cursor-pointer"
					value={selectedFilter}
					onChange={(e) => setSelectedFilter(e.target.value)}
				>
					{options.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>
				<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#2A2A2A] pointer-events-none" />
				<ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#2A2A2A] pointer-events-none" />
			</div>
		</div>
	);
};

export default FilterButton;
