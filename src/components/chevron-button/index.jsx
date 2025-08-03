import React from 'react';

const ChevronButton = ({ icon: Icon, onClick, isDisable = false }) => {
	return (
		<button
			onClick={onClick}
			className="bg-main-primary text-white rounded-lg p-2 hover:bg-dark-primary disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:cursor-not-allowed"
			disabled={isDisable}
		>
			{Icon && <Icon className="w-5 h-5" />}
		</button>
	);
};

export default ChevronButton;
