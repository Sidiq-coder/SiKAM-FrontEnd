import { Link } from 'react-router-dom';

const VARIANT_CLASSES = {
	primary: 'bg-primary text-white hover:bg-darkPrimary',
	secondary: 'bg-[#ACACAC] text-white',
	outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
	danger: 'bg-[#EE4848] text-white hover:bg-[#EE4848]',
	ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
	link: 'bg-transparent text-blue-600 hover:underline px-0 py-0',
};

const Button = ({ variant = 'primary', label, icon = null, iconPosition = 'left', className = '', href = null, type = 'button', onClick = null, disabled = false }) => {
	const baseClass = 'inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium transition-colors cursor-pointer';

	const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;

	const combinedClass = `${baseClass} ${variantClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

	const content = (
		<>
			{icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
			{label}
			{icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
		</>
	);

	if (href) {
		return (
			<Link to={href} className={combinedClass}>
				{content}
			</Link>
		);
	}

	return (
		<button type={type} onClick={onClick} disabled={disabled} className={combinedClass}>
			{content}
		</button>
	);
};

export default Button;
