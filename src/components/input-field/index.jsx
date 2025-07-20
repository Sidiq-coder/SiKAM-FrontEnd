import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const InputField = ({
	name = null,
	label = null,
	placeholder = '',
	type = 'text',
	register = null,
	error = null,
	icon: Icon = null,
	isPassword = false,
	isForgotPassword = false,
	isSmall = false,
	onChange = null,
	description = null,
	required = true,
	className = '',
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

	return (
		<div>
			{type === 'checkbox' ? (
				<label className="flex items-center space-x-2">
					<input type="checkbox" {...(register && name ? register(name) : {})} className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-blue-500" required={required} />
					<span className="text-sm text-dark">{label}</span>
				</label>
			) : (
				<>
					{!label ? null : (
						<div className="flex flex-wrap justify-between mb-1">
							<label htmlFor={name} className="text-sm font-medium text-dark">
								{label} {required ? <span className="text-red-500">*</span> : ''}
							</label>
							{!isForgotPassword ? null : (
								<Link to="/login" className="text-sm font-light text-red-500">
									Lupa Password?
								</Link>
							)}
						</div>
					)}
					<div className={`relative ${className}`}>
						{Icon ? <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> : null}
						<input
							id={name}
							type={inputType}
							placeholder={placeholder}
							className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-12' : 'pr-4'} ${
								isSmall ? 'py-2' : 'py-3'
							} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${error ? 'border-red-500' : 'border-gray-300'}`}
							onChange={onChange}
							required={required}
							{...(register && name ? register(name) : {})}
						/>
						{isPassword ? (
							<button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
								{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
							</button>
						) : null}
					</div>
				</>
			)}
			{error?.message && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
			{!description ? null : <p className="text-gray text-sm mt-2">{description}</p>}
		</div>
	);
};

export default InputField;
