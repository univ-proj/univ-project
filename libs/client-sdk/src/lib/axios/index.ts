import axios from 'axios';
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

// TODO: add authentication

export default instance;
