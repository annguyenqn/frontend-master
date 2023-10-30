import axiosClient from './axiosClient';

const categoryApi = {
  get: () => {
    const url = '/categories';
    return axiosClient.get(url);
  },
};

export default categoryApi;
