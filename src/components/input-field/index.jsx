import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const InputField = ({ name, label, placeholder = '', type = 'text', register, error, icon: Icon, isPassword = false, isForgotPassword = false }) => {
	const [showPassword, setShowPassword] = useState(false);
	const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

	return (
		<div>
			<div className="flex justify-between mb-1">
				<label className="text-sm font-medium text-gray-700">{label}</label>
				{!isForgotPassword ? null : (
					<Link to="/login" className="text-sm font-light text-red-500">
						Lupa Password?
					</Link>
				)}
			</div>
			<div className="relative">
				{Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
				<input
					{...register(name)}
					type={inputType}
					placeholder={placeholder}
					className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-12' : 'pr-4'} py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
						error ? 'border-red-500' : 'border-gray-300'
					}`}
				/>
				{isPassword && (
					<button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
						{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
					</button>
				)}
			</div>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
};

export default InputField;
