const IconButton = ({ children, rounded = 'rounded-md', onClick = null }) => (
	<div onClick={onClick} className={`bg-white p-2 ${rounded} flex items-center justify-center cursor-pointer`}>
		{children}
	</div>
);

export default IconButton;
