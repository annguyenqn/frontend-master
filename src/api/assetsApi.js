import axiosClient from './axiosClient';

const assetsApi = {
  create: (body) => {
    const url = '/assets';
    return axiosClient.post(url, body);
  },
  edit: ({ id, body }) => {
    const url = `/assets/${id}`;
    return axiosClient.put(url, body);
  },
  get: ({ id = '', params }) => {
    const url = `/assets/${id}`;
    return axiosClient.get(url, { params });
  },
  getMine: ({ params }) => {
    const url = '/assets/mine';
    return axiosClient.get(url, { params });
  },
  getAllAdmin: ({ params }) => {
    const url = '/assets/all';
    return axiosClient.get(url, { params });
  },
  getInvested: ({ params }) => {
    const url = '/assets/invested';
    return axiosClient.get(url, { params });
  },
  getPayment: ({ id, params }) => {
    const url = `/assets/${id}/payments`;
    return axiosClient.get(url, { params });
  },
  getInvestor: ({ id, params }) => {
    const url = `/assets/${id}/investor-payments`;
    return axiosClient.get(url, { params });
  },
  getUserInvestmentsProducts: (params) => {
    const url = '/assets/invested';
    return axiosClient.get(url, { params });
  },
  delete: (id) => {
    const url = `/assets/${id}`;
    return axiosClient.delete(url);
  },
  activate: (id) => {
    const url = `/assets/${id}/activate`;
    return axiosClient.put(url);
  },
  deactivate: (id) => {
    const url = `/assets/${id}/deactivate`;
    return axiosClient.put(url);
  },
  changeStatusToFail: (id) => {
    const url = `/assets/${id}/refund-money`;
    return axiosClient.post(url);
  },
};

export default assetsApi;
