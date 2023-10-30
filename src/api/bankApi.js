import axiosClient from './axiosClient';

const bankAccountApi = {
  create: (data) => {
    const url = '/bank-accounts';
    return axiosClient.post(url, data);
  },
  get: () => {
    const url = '/bank-accounts';
    return axiosClient.get(url);
  },
  delete: (bankId) => {
    const url = `/bank-accounts/${bankId}`;
    return axiosClient.delete(url);
  },
  payment: (body) => {
    const url = '/payment-histories';
    return axiosClient.post(url, body);
  },
  estimate: (params) => {
    const url = '/payment-histories/estimate';
    return axiosClient.get(url, { params });
  },
};

export default bankAccountApi;
