import { Link } from 'react-router-dom';

const VARIANT_CLASSES = {
	primary: 'bg-main-primary text-white hover:bg-dark-primary',
	secondary: 'bg-gray text-white',
	warning: 'bg-yellow text-dark',
	outline: 'border border-main-primary text-main-primary hover:bg-main-primary hover:text-white',
	danger: 'bg-red text-white',
	ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
	link: 'bg-transparent text-blue-600 hover:underline px-0 py-0',
};

const SIZE_CLASSES = {
	small: 'px-2 py-1 text-xs',
	medium: 'px-4 py-3 text-sm',
	large: 'px-6 py-3 text-base',
};

const Button = ({
	variant = 'primary',
	size = 'medium',
	label,
	icon = null,
	iconPosition = 'left',
	className = '',
	href = null,
	type = 'button',
	onClick = null,
	disabled = false,
	anchor = false,
}) => {
	const baseClass = `${className.includes('hidden') ? '' : 'inline-flex'} items-center justify-center rounded-lg font-medium transition-colors cursor-pointer`;

	const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
	const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.medium;

	const combinedClass = `${baseClass} ${variantClass} ${sizeClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

	const content = (
		<>
			{icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
			{label}
			{icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
		</>
	);

	if (href && !anchor) {
		return (
			<Link to={href} className={combinedClass}>
				{content}
			</Link>
		);
	}

	if (href && anchor) {
		return (
			<a href={href} className={combinedClass}>
				{content}
			</a>
		);
	}

	return (
		<button type={type} onClick={onClick} disabled={disabled} className={combinedClass}>
			{content}
		</button>
	);
};

export default Button;
