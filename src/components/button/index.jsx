import { Link } from 'react-router-dom';

const Button = ({ variant, label, icon = null, className = null, href = null }) => {
	let buttonClass = 'px-4 py-3 rounded-lg';
	const primaryClass = 'block bg-primary text-center text-white hover:bg-darkPrimary transition-colors';

	if (variant === 'primary') {
		buttonClass = `${buttonClass} ${primaryClass}`;
	}

	if (href) {
		return (
			<Link to={href} className={`${buttonClass} ${className}`}>
				<span className={icon ? 'mr-2' : ''}>{icon ?? null}
</span>{label}
			</Link>
		);
	}

	return (
		<button className={`${buttonClass} ${className}`}>
			<span className={icon ? 'mr-2' : ''}>{icon ?? null}</span>{label}
		</button>
	);
};

export default Button;
