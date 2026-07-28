import axiosInstance from '../../../shared/lib/axiosInstance';

export const createShortLink = async (linkData) => {
  const response = await axiosInstance.post('/links', linkData);
  return response.data;
};

export const fetchUserLinks = async () => {
  const response = await axiosInstance.get('/links');
  return response.data;
};

export const toggleLinkStatus = async (id) => {
  const response = await axiosInstance.patch(`/links/${id}/status`);
  return response.data;
};