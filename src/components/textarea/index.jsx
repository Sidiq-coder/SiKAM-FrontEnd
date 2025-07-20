import React from 'react';

const Textarea = ({ name, label, placeholder = '', register, error, rows = 4 }) => {
	return (
		<div>
			<div className="flex justify-between mb-1">
				<label htmlFor={name} className="text-sm font-medium text-dark">
					{label}
				</label>
			</div>
			<div className="relative">
				<textarea
					id={name}
					{...register(name)}
					placeholder={placeholder}
					rows={rows}
					className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${error ? 'border-red-500' : 'border-gray-300'}`}
				/>
			</div>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
};

export default Textarea;
