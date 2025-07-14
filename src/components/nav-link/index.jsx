import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ href, children }) => {
	const location = useLocation();

	return (
		<Link to={href} className={`hover:text-[#ED9E31] transition-colors ${location.pathname === href ? 'text-[#ED9E31]' : ''}`}>
			{children}
		</Link>
	);
};

export default NavLink;
