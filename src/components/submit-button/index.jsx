const SubmitButton = ({ label = 'Submit', loadingLabel = 'Loading...', isValid, isSubmitting, onSubmit, className = '' }) => {
	return (
		<button
			type="button"
			onClick={onSubmit}
			disabled={!isValid || isSubmitting}
			className={`bg-primary hover:bg-darkPrimary disabled:bg-gray-200 text-white font-medium py-2.5 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed ${className}`}
		>
			{isSubmitting ? loadingLabel : label}
		</button>
	);
};

export default SubmitButton;
