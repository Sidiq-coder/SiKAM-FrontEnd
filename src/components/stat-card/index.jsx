const StatCard = ({ stat }) => {
	return (
		<div className="w-full flex items-center border border-gray-300 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.08)] p-6 bg-white">
			<div className={`w-18 h-18 rounded-full flex items-center justify-center ${stat.iconBg}`}>{stat.icon}</div>
			<div className="ml-5">
				<h3 className="font-bold text-dark mb-1">{stat.title}</h3>
				<p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
			</div>
		</div>
	);
};

export default StatCard;
