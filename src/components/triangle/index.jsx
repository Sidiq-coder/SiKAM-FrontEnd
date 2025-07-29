const Triangle = ({ isFlip = false, fill }) => {
	if (isFlip) {
		return (
			<div className="cursor-pointer">
				<svg width="48" height="48" viewBox="0 0 48 48">
					<polygon points="24,40 4,4 44,4" fill={fill} className="drop-shadow-sm" />
				</svg>
			</div>
		);
	}

	return (
		<div className="cursor-pointer">
			<svg width="48" height="48" viewBox="0 0 48 48">
				<polygon points="24,8 4,44 44,44" fill={fill} className="drop-shadow-sm" />
			</svg>
		</div>
	);
};

export default Triangle;
