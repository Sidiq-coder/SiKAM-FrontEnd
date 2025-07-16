import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const BackLink = ({ to = '/', label = 'Kembali', icon: Icon = ChevronLeft, className = '' }) => {
	return (
		<Link to={to} className={`flex items-center text-gray-500 ${className}`}>
			{Icon && <Icon className="w-6 h-6 mr-2" />}
			<h1 className="text-xl">{label}</h1>
		</Link>
	);
};

export default BackLink;
