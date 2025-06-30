import React from 'react';

const Hashtag = ({ label, quantity = null }) => {
	return (
		<div className="flex space-x-2 items-center">
			<span className="text-sm font-medium text-[#2A2A2A] bg-[#C9CEFF] px-4 py-1.5 rounded-full">{label}</span>
			{quantity ? <span className="text-[#909090]">x {quantity}</span> : null}
		</div>
	);
};

export default Hashtag;
