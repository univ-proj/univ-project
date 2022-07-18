import axios from 'axios';
import host from '@jsdevtools/host-environment';

const instance = axios.create({
  baseURL: 'http://192.168.1.9:3006/api',
});

instance.interceptors.response.use(
  (res) => {
    // console.log(res);
    return res.data;
  },
  (error) => {
    throw error;
  }
);

instance.interceptors.request.use(function (config) {
  // to handle testing
  let token: string | null | undefined = host.env['token'];

  // in browser env
  if (host.browser) {
    token = localStorage.getItem('Token');

    if (token) {
      try {
        token = JSON.parse(token);
      } catch (e) {
        //
      }
    }
  }

  if (config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default instance;
