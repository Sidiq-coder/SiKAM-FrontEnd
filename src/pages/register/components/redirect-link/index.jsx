import { Link } from 'react-router-dom';

const RedirectLink = ({ sourceLabel, targetLabel, href }) => {
	return (
		<p className="text-sm text-gray">
			{sourceLabel}{' '}
			<Link to={href} className="text-primary hover:text-dark-primary font-medium">
				{targetLabel}
			</Link>
		</p>
	);
};

export default RedirectLink;
