import { useCallback, useRef } from 'react';

const useDebounce = (callback, delay) => {
	const debounceRef = useRef(null);

	return useCallback(
		(value) => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}
			debounceRef.current = setTimeout(() => callback(value), delay);
		},
		[callback, delay]
	);
};

export default useDebounce;
