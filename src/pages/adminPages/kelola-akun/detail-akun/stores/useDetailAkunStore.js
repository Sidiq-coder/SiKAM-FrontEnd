import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDetailAkunStore = create(
	persist(
		(set) => ({
			activeMenu: 'profil',

			setActiveMenu: (activeMenu) => {
				set({ activeMenu });
			},
		}),
		{
			name: 'detail-akun-storage',
			partialize: (state) => ({
				activeMenu: state.activeMenu,
			}),
		}
	)
);
