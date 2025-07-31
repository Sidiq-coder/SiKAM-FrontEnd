import { create } from 'zustand';

const useNotificationStore = create((set) => ({
	isOpenModal: false,

	setOpenModal: (isOpenModal) => {
		set({ isOpenModal });
	},
}));

export default useNotificationStore;
