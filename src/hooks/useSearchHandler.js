import { useCallback } from 'react';
import useDebounce from './useDebounce';

const useSearchHandler = (setSearchQuery) => {
	const debouncedSetSearch = useDebounce(setSearchQuery, 500);

	return useCallback(
		(e) => {
			debouncedSetSearch(e.target.value);
		},
		[debouncedSetSearch]
	);
};

export default useSearchHandler;
