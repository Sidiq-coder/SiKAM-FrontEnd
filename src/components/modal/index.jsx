import { X } from 'lucide-react';
import { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, children, size = 'md', closeOnOverlayClick = true, showCloseButton = true, className = '' }) => {
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const sizeClasses = {
		sm: 'max-w-md',
		md: 'max-w-lg',
		lg: 'max-w-2xl',
		xl: 'max-w-4xl',
		full: 'max-w-full mx-4',
	};

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget && closeOnOverlayClick) {
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 bg-opacity-50 animate-in fade-in duration-200 overflow-auto" onClick={handleOverlayClick}>
			<div
				className={`
          relative w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl 
          animate-in zoom-in-95 duration-200 ${className}
        `}
			>
				{showCloseButton && (
					<div className={`pt-6 px-6 md:hidden text-end`}>
						<button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
							<X size={20} />
						</button>
					</div>
				)}

				{/* Content */}
				<div className={`${showCloseButton ? 'pb-6 px-6 md:p-6' : 'p-6'}`}>{children}</div>
			</div>
		</div>
	);
};

export const ModalFooter = ({ children, className = '' }) => {
	return <div className={`flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg ${className}`}>{children}</div>;
};
