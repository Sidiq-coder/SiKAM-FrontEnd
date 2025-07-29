import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProfilStore = create(
	persist(
		(set) => ({
			profilMenu: 'profil',

			setProfilMenu: (profilMenu) => {
				set({ profilMenu });
			},
		}),
		{
			name: 'profil-storage',
			partialize: (state) => ({
				profilMenu: state.profilMenu,
			}),
		}
	)
);

export default useProfilStore;
