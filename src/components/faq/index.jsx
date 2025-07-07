import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const FAQ = ({ faqData }) => {
	const [expandedItems, setExpandedItems] = useState({
		0: true,
		1: false,
		2: false,
		3: false,
		4: false,
	});

	const toggleItem = (index) => {
		setExpandedItems((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	return (
		<div className="max-w-5xl rounded-lg border shadow-md shadow-[#00000025] border-[#2A2A2A] overflow-hidden">
			<div className="divide-y divide-gray-200">
				{faqData.map((item, index) => (
					<div key={index} className="bg-white">
						<button onClick={() => toggleItem(index)} className="w-full px-6 py-4 text-left flex items-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
							<div className="flex-shrink-0 text-[#2A2A2A]">{expandedItems[index] ? <ChevronDown className="h-7 w-7" /> : <ChevronRight className="h-7 w-7" />}</div>
							<span className="text-[#2A2A2A] text-lg pr-4">{item.question}</span>
						</button>

						{expandedItems[index] && (
							<div className="px-6 pb-4">
								<div className="text-gray-600 leading-relaxed">{item.answer}</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default FAQ;
