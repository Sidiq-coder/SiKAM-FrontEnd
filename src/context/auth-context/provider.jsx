import { useState } from 'react';
import { AuthContext } from './context';

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const getUserData = async (userId) => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const userData = {
				id: userId,
				name: 'John Doe',
				email: 'johndoe@gmail.com',
				studentId: '12345678',
				reports: [
					{ id: 1, title: 'Laporan 1', status: 'approved', date: '2024-01-15' },
					{ id: 2, title: 'Laporan 2', status: 'pending', date: '2024-02-20' },
				],
			};
			setUser(userData);
		} catch (error) {
			console.error('Error fetching user data:', error);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
	};

	const value = {
		user,
		loading,
		getUserData,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
