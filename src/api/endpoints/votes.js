import apiClient from '@/api/client';

const baseURL = '/votes';

export const votesAPI = {
  getMyVotes: async () => {
    const res = await apiClient.get(`${baseURL}/me`);
    return res.data;
  },
};