const SubmitButton = ({ label = 'Submit', loadingLabel = 'Loading...', isValid, isSubmitting, onSubmit, className = '', icon = null, iconPosition = 'left' }) => {
	const content = (
		<>
			{icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
			{isSubmitting ? loadingLabel : label}
			{icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
		</>
	);

	return (
		<button
			type="button"
			onClick={onSubmit}
			disabled={!isValid || isSubmitting}
			className={`inline-flex items-center justify-center bg-main-primary hover:bg-dark-primary disabled:bg-gray-200 disabled:hover:bg-gray-200 text-white font-medium py-2.5 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed ${className}`}
		>
			{content}
		</button>
	);
};

export default SubmitButton;
