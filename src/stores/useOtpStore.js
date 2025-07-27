import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useOtpStore = create(
	persist(
		(set) => ({
			// State
			email: null,

			// Actions
			setEmail: (email) => {
				set({ email });
			},
		}),
		{
			name: 'otp-storage',
			partialize: (state) => ({
				email: state.email,
			}),
		}
	)
);

export default useOtpStore;
