import axiosClient from './axiosClient';

const usersApi = {
  create: (body, role = 1) => {
    body.role = role;
    const url = '/users/registry';
    return axiosClient.post(url, body);
  },
  login: (body) => {
    const url = '/users/login';
    return axiosClient.post(url, body);
  },
  getAllAdmin: ({ params }) => {
    const url = '/users';
    return axiosClient.get(url, { params });
  },
  me: () => {
    const url = '/users/me';
    return axiosClient.get(url);
  },
  update: (formData) => {
    const url = '/users';
    return axiosClient.put(url, formData);
  },
  changePassword: (data) => {
    const url = '/users/password';
    return axiosClient.put(url, data);
  },
  forgetPassword: (body) => {
    const url = '/users/forgot-password';
    return axiosClient.post(url, body);
  },
};

export default usersApi;
