import axios from 'axios';
import { API_BASE_URL } from 'config/config';
import queryString from 'query-string';
import { USER_LOGIN } from 'utils/storage';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = USER_LOGIN.get();
  if (token) {
    config.headers.Authorization = token;
  }
  // check sever side
  if (typeof window !== 'undefined') {
    // config formData
    if (config?.customUrl) {
      config.baseURL = config.customUrl;
    }
    if (config?.wallet) {
      config.headers.wallet = config.wallet;
    }
    if (config?.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data?.payload) {
      return response.data.payload;
    }

    if (response?.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);

export default axiosClient;
