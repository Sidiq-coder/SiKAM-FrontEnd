import { unstable_useBlocker as useBlocker } from 'react-router-dom';

export default function useNavigationBlocker(shouldBlock, onBlocked) {
	useBlocker((tx) => {
		if (shouldBlock) {
			onBlocked?.(tx);
		} else {
			tx.retry();
		}
	}, shouldBlock);
}
