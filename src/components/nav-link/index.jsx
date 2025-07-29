import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ href, children }) => {
	const location = useLocation();

	return (
		<Link to={href} className={`hover:text-yellow transition-colors ${location.pathname.includes(href) ? 'text-yellow' : ''}`}>
			{children}
		</Link>
	);
};

export default NavLink;
