import axiosClient from './axiosClient';

const whitelistApi = {
  create: (body) => {
    const url = '/whitelists';
    return axiosClient.post(url, body);
  },
};

export default whitelistApi;
