import axiosClient from './axiosClient';

const coinApi = {
  get: () => {
    const url = '/coin';
    return axiosClient.get(url);
  },
};

export default coinApi;
