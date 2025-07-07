import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, X } from 'lucide-react';

const SelectField = ({ name, label, placeholder = '', register, error, options, multiple = false, value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValues, setSelectedValues] = useState(multiple ? value || [] : value || '');
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSelect = (option) => {
		if (multiple) {
			const newValues = selectedValues.includes(option.value) ? selectedValues.filter((v) => v !== option.value) : [...selectedValues, option.value];

			setSelectedValues(newValues);
			onChange?.(newValues);
		} else {
			setSelectedValues(option.value);
			onChange?.(option.value);
			setIsOpen(false);
		}
	};

	const handleRemoveTag = (valueToRemove) => {
		const newValues = selectedValues.filter((v) => v !== valueToRemove);
		setSelectedValues(newValues);
		onChange?.(newValues);
	};

	const getSelectedLabel = (value) => {
		const option = options.find((opt) => opt.value === value);
		return option ? option.label : value;
	};

	const getDisplayValue = () => {
		if (multiple) {
			return selectedValues.length > 0 ? `${selectedValues.length} item dipilih` : placeholder;
		} else {
			return selectedValues ? getSelectedLabel(selectedValues) : placeholder;
		}
	};

	return (
		<div className="relative">
			<label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
				{label} <span className="text-red-500">*</span>
			</label>

			<div className="relative" ref={dropdownRef}>
				<div
					className={`
            w-full px-4 py-2 border rounded-md bg-white cursor-pointer
            flex items-center justify-between
            transition-all duration-200 ease-in-out
            ${isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}
            ${error ? 'border-red-500' : 'hover:border-gray-300'}
          `}
					onClick={() => setIsOpen(!isOpen)}
				>
					<div className="flex-1 flex items-center flex-wrap gap-2">
						{multiple && selectedValues.length > 0 ? (
							selectedValues.map((value) => (
								<span key={value} className="inline-flex items-center px-5 py-2 rounded-xl text-sm bg-[#C9CEFF] text-[#2A2A2A] font-medium">
									{name === 'kategoriLaporan' && <span>#</span>}
									{name === 'tingkatLaporan' && <Globe className="w-4 h-4 mr-1" />}
									{getSelectedLabel(value)}
									<button
										type="button"
										onClick={(e) => {
											e.stopPropagation();
											handleRemoveTag(value);
										}}
										className="ml-2 hover:text-blue-600"
									>
										<X size={14} />
									</button>
								</span>
							))
						) : !multiple && selectedValues ? (
							<>
								<span className="inline-flex items-center px-5 py-2 rounded-xl text-sm bg-[#C9CEFF] text-[#2A2A2A] font-medium">
									{name === 'kategoriLaporan' && <span>#</span>}
									{name === 'tingkatLaporan' && <Globe className="w-4 h-4 mr-1" />}
									{getSelectedLabel(selectedValues)}
								</span>
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										setSelectedValues('');
										onChange?.('');
									}}
									className="text-[#909090]"
								>
									<X size={20} />
								</button>
							</>
						) : (
							<span className="text-gray-500">{getDisplayValue()}</span>
						)}
					</div>

					<ChevronDown size={20} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
				</div>

				{isOpen && (
					<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
						{options.map((option) => (
							<div
								key={option.value}
								className={`
                  px-4 py-2 cursor-pointer transition-colors duration-150
                  hover:bg-gray-50 flex items-center
                  ${multiple && selectedValues.includes(option.value) ? 'bg-blue-50 text-blue-700' : ''}
                  ${!multiple && selectedValues === option.value ? 'bg-blue-50 text-blue-700' : ''}
                `}
								onClick={() => handleSelect(option)}
							>
								{multiple && <input type="checkbox" checked={selectedValues.includes(option.value)} onChange={() => {}} className="mr-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />}
								<span className="flex items-center">
									{option.icon && <span className="mr-2">{option.icon}</span>}
									{option.label}
								</span>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Hidden input for form registration */}
			<input type="hidden" {...register(name)} value={multiple ? JSON.stringify(selectedValues) : selectedValues} />

			{error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
		</div>
	);
};

export default SelectField;
