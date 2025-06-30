const SelectField = ({ name, label, placeholder = '', register, error, options }) => {
	return (
		<div>
			<label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
				{label}
			</label>
			<select
				id={name}
				{...register(name, {
					required: 'Kategori harus dipilih',
				})}
				placeholder={placeholder}
				className={`
              w-full px-3 py-2 border rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${error ? 'border-red-500' : 'border-gray-300'}
            `}
			>
				<option value="">{placeholder}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error ? <p className="mt-1 text-sm text-red-600">{error.message}</p> : null}
		</div>
	);
};

export default SelectField;
