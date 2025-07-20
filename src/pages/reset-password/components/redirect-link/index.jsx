import { Link } from 'react-router-dom';

const RedirectLink = ({ sourceLabel, targetLabel, href }) => {
	return (
		<div className="text-center">
			<p className="text-sm text-gray-400">
				{sourceLabel}{' '}
				<Link to={href} className="text-blue-600 hover:text-blue-700 font-medium">
					{targetLabel}
				</Link>
			</p>
		</div>
	);
};

export default RedirectLink;
