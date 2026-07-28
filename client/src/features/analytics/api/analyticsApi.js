import axiosInstance from '../../../shared/lib/axiosInstance';

export const fetchLinkAnalytics = async (linkId, days = 30) => {
  const response = await axiosInstance.get(`/analytics/${linkId}?days=${days}`);
  return response.data;
};