const IconButton = ({ children, rounded = 'rounded-md', onClick = null, bgColor = 'bg-white' }) => (
	<div onClick={onClick} className={`${bgColor} p-2 ${rounded} flex items-center justify-center cursor-pointer`}>
		{children}
	</div>
);

export default IconButton;
