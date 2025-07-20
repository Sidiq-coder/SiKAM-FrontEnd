import { Link } from 'react-router-dom';

const RedirectLink = ({ sourceLabel, targetLabel, href }) => {
	return (
		<p className="text-sm text-[#ACACAC]">
			{sourceLabel}{' '}
			<Link to={href} className="text-primary hover:text-darkPrimary font-medium">
				{targetLabel}
			</Link>
		</p>
	);
};

export default RedirectLink;
