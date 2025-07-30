import React from 'react';

const Hashtag = ({ label, quantity = null, onClick = null, className = '' }) => {
	return (
		<div className="flex space-x-2 items-center">
			<span onClick={onClick} className={`text-sm font-medium text-dark bg-[#C9CEFF] px-4 py-1.5 rounded-full ${className}`}>
				{label}
			</span>
			{quantity !== null ? <span className="text-[#909090]">x {quantity}</span> : null}
		</div>
	);
};

export default Hashtag;
