import axiosClient from './axiosClient';

const refundApi = {
  get: ({ params, id = '' }) => {
    const url = `/refund-histories/${id}`;
    return axiosClient.get(url, { params });
  },
  update: ({ id = '', body }) => {
    const url = `/refund-histories/${id}`;
    return axiosClient.put(url, body);
  },
};

export default refundApi;
