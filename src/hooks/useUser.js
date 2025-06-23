import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context/context';

export const useUser = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useUser must be used within an AuthContextProvider');
	}
	return context;
};
