import axiosClient from './axiosClient';

const locationApi = {
  getProvince: () => {
    const url = '/locations/provinces';
    return axiosClient.get(url, { params: { page: 1, rowPerPage: 70 } });
  },
  getDistrict: ({ provinceSlug }) => {
    const url = '/locations/districts';
    return axiosClient.get(url, { params: { page: 1, rowPerPage: 60, provinceSlug } });
  },
};

export default locationApi;
