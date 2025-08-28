import { create } from "zustand";
import { votesAPI } from '@/api/endpoints/votes';

const useVotesStore = create((set, _) => ({
  myReportVotes: [],

  getMyReportVotes: async () => {
    try {
      const res = await votesAPI.getMyVotes();
      set({ myReportVotes: res.data });
    } catch (e) {
      console.error(e);
    }
  }
}));

export default useVotesStore;