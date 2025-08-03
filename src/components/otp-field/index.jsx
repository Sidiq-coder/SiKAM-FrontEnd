import { useRef } from 'react';
import { Controller } from 'react-hook-form';

const OtpField = ({ name, setValue, getValues, control, error }) => {
	const inputsRef = useRef([]);

	const handleChange = (e, index) => {
		const value = e.target.value.replace(/\D/g, '');
		const digit = value.slice(-1);

		setValue(`${name}.${index}`, digit);

		if (digit && index < 5) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === 'Backspace' && !getValues(`${name}.${index}`) && index > 0) {
			inputsRef.current[index - 1]?.focus();
		} else if (e.key === 'Backspace' && getValues(`${name}.${index}`)) {
			setValue(`${name}.${index}`, '');
		}
	};

	const handlePaste = (e) => {
		const pasteData = e.clipboardData.getData('Text').replace(/\D/g, '');
		const otpArray = pasteData.split('').slice(0, 6);

		for (let i = 0; i < 6; i++) {
			setValue(`${name}.${i}`, '');
		}

		otpArray.forEach((digit, idx) => {
			setValue(`${name}.${idx}`, digit);
		});

		if (otpArray.length > 0) {
			const focusIndex = Math.min(otpArray.length, 5);
			inputsRef.current[focusIndex]?.focus();
		}

		e.preventDefault();
	};

	const handleFocus = (e) => {
		e.target.select();
	};

	return (
		<>
			<div className="flex flex-wrap justify-center gap-3 mb-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<Controller
						key={index}
						name={`${name}.${index}`}
						control={control}
						render={({ field: { value, ...field } }) => (
							<input
								{...field}
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
								maxLength="1"
								value={value || ''}
								className="w-10 h-10 sm:w-12 sm:h-12 text-center text-dark sm:text-lg bg-[#EFEFEF] border border-main-primary rounded-md focus:outline-none focus:border-dark-primary"
								onChange={(e) => {
									field.onChange(e);
									handleChange(e, index);
								}}
								onKeyDown={(e) => handleKeyDown(e, index)}
								onPaste={handlePaste}
								onFocus={handleFocus}
								ref={(el) => (inputsRef.current[index] = el)}
								autoComplete="one-time-code"
							/>
						)}
					/>
				))}
			</div>

			{error?.message && <p className="text-red-500 text-sm mt-1">{error?.message}</p>}
		</>
	);
};

export default OtpField;
