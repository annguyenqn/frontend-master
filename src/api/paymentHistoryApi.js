import axiosClient from './axiosClient';

const paymentHistoryApi = {
  get: (params) => {
    const url = '/payment-histories';
    return axiosClient.get(url, { params });
  },
  getAllAdmin: (params) => {
    const url = '/payment-histories/all';
    return axiosClient.get(url, { params });
  },
};

export default paymentHistoryApi;
